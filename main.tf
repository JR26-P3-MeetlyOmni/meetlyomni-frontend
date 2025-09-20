terraform {
  backend "s3" {
    bucket = "myterraform-biaojin"
    key    = "meetlyomni-frontend/terraform.tfstate"
    region = "ap-southeast-2"
  }
}

provider "aws" {
  region = var.region
}

module "network" {
  source      = "./modules/network"
  name_prefix = var.name_prefix

  env                    = var.env
  tags                   = var.tags
  vpc_name               = var.vpc_name
  vpc_cidr               = var.vpc_cidr
  vpc_azs                = var.vpc_azs
  public_subnets         = var.vpc_public_subnets
  private_subnets        = var.vpc_private_subnets
  enable_nat_gateway     = var.vpc_enable_nat_gateway
  one_nat_gateway_per_az = var.one_nat_gateway_per_az
}

module "security" {
  source      = "./modules/security"
  name_prefix = var.name_prefix

  env                     = var.env
  tags                    = var.tags
  vpc_id                  = module.network.vpc_id
  alb_frontend            = var.alb_frontend
  alb_backend             = var.alb_backend
  sg_app_frontend         = var.sg_app_frontend
  sg_app_backend          = var.sg_app_backend
  frontend_container_port = var.frontend_container_port
  backend_container_port  = var.backend_container_port
  enable_https            = var.enable_https
}

module "alb_frontend" {
  source   = "./modules/application_lb"
  alb_name = "${var.name_prefix}-${var.alb_frontend}"

  tags                             = var.tags
  security_group_id                = module.security.alb_frontend_sg_id
  subnet_ids                       = module.network.public_subnet_ids
  target_group_name_prefix         = "fe-"
  target_group_port                = var.frontend_container_port
  target_group_protocol            = "HTTP"
  target_group_target_type         = "ip"
  health_check_path                = "/"
  health_check_matcher             = "200-399"
  health_check_interval            = 30
  health_check_timeout             = 5
  health_check_healthy_threshold   = 2
  health_check_unhealthy_threshold = 2
  enable_https                     = var.enable_https
  certificate_arn                  = var.acm_certificate_arn
}

module "alb_backend" {
  source   = "./modules/application_lb"
  alb_name = "${var.name_prefix}-${var.alb_backend}"

  tags                             = var.tags
  security_group_id                = module.security.alb_backend_sg_id
  subnet_ids                       = module.network.public_subnet_ids
  target_group_name_prefix         = "be-"
  target_group_port                = var.backend_container_port
  target_group_protocol            = "HTTP"
  target_group_target_type         = "ip"
  health_check_path                = "/health"
  health_check_matcher             = "200-399"
  health_check_interval            = 30
  health_check_timeout             = 5
  health_check_healthy_threshold   = 2
  health_check_unhealthy_threshold = 2
  enable_https                     = var.enable_https
  certificate_arn                  = var.acm_certificate_arn
}

module "cloudfront" {
  source = "./modules/cloudfront"

  enabled                = var.enable_cloudfront
  origin_domain_name     = module.alb_frontend.lb_dns_name
  aliases                = var.cloudfront_aliases
  acm_certificate_arn    = var.cloudfront_certificate_arn
  origin_protocol_policy = var.enable_https ? "https-only" : "http-only"
}
resource "aws_cloudwatch_log_group" "frontend" {
  name              = "/ecs/${var.name_prefix}/${var.env}/frontend"
  retention_in_days = var.logs_retention_days
}

resource "aws_cloudwatch_log_group" "backend" {
  name              = "/ecs/${var.name_prefix}/${var.env}/backend"
  retention_in_days = var.logs_retention_days
}

module "ecs_iam" {
  source = "./modules/ecs_iam"

  name_prefix        = var.name_prefix
  env                = var.env
  ecs_execution_role = var.ecs_execution_role
  ecs_task_role      = var.ecs_task_role
}

module "ssm_parameters" {
  source = "./modules/ssm_parameters"

  name_prefix                  = var.name_prefix
  env                          = var.env
  frontend_api_base_url        = var.frontend_api_base_url
  backend_db_connection_string = var.backend_db_connection_string
}

module "ecs_frontend" {
  source = "./modules/ecs_service"

  env                            = var.env
  tags                           = var.tags
  cluster_name                   = "${var.name_prefix}-${var.env}-ecs"
  task_family                    = "${var.name_prefix}-${var.env}-frontend"
  execution_role_arn             = module.ecs_iam.execution_role_arn
  task_role_arn                  = module.ecs_iam.task_role_arn
  container_name                 = "frontend"
  container_image                = var.frontend_image
  container_port                 = var.frontend_container_port
  cpu                            = var.frontend_cpu != null ? tostring(var.frontend_cpu) : "256"
  memory                         = var.frontend_memory != null ? tostring(var.frontend_memory) : "512"
  desired_count                  = var.desired_count_frontend
  subnet_ids                     = module.network.public_subnet_ids
  security_group_ids             = [module.security.ecs_frontend_sg_id]
  target_group_arn               = module.alb_frontend.target_group_arn
  assign_public_ip               = true
  platform_version               = "1.4.0"
  enable_execute_command         = true
  log_group_name                 = aws_cloudwatch_log_group.frontend.name
  log_group_region               = var.region
  environment_variables          = {}
  propagate_tags                 = "SERVICE"
  deployment_min_healthy_percent = 50
  deployment_max_percent         = 200
}

resource "aws_ecr_repository" "frontend_env" {
  name                 = "${var.name_prefix}/frontend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "backend_env" {
  name                 = "${var.name_prefix}/backend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}


