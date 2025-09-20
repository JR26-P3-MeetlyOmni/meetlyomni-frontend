provider "aws" {
    region = var.region
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = var.vpc_name
  cidr = var.vpc_cidr

  # two azs
  azs             = var.vpc_azs
  public_subnets  = var.vpc_public_subnets
  private_subnets = var.vpc_private_subnets

  # create igw
  create_igw                  = true          
  enable_dns_support          = true
  enable_dns_hostnames        = true

  # enable auto assign public ipv4 address
  map_public_ip_on_launch     = true

  # one nat per az
  enable_nat_gateway          = var.vpc_enable_nat_gateway
  single_nat_gateway          = false
  one_nat_gateway_per_az      = var.one_nat_gateway_per_az

  tags = var.tags
}

# cloudwatch log
resource "aws_cloudwatch_log_group" "frontend" {
  name              = "/ecs/${var.name_prefix}/${var.env}/frontend"
  retention_in_days = var.logs_retention_days
}

resource "aws_cloudwatch_log_group" "backend" {
  name              = "/ecs/${var.name_prefix}/${var.env}/backend"
  retention_in_days = var.logs_retention_days
}

#IAM task role& execution role
# ---------- Assume Role Policies ----------
data "aws_iam_policy_document" "ecs_tasks_trust" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

# ---------- Execution Role ----------
resource "aws_iam_role" "ecs_task_execution" {
  name               = "${var.name_prefix}-${var.env}-${var.ecs_execution_role}"
  assume_role_policy = data.aws_iam_policy_document.ecs_tasks_trust.json
}

# AWS police: ecr pull, logs and kms encrpt
resource "aws_iam_role_policy_attachment" "execution_managed" {
  role       = aws_iam_role.ecs_task_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

data "aws_region" "current" {}

# extra police: only read this project SSM
data "aws_iam_policy_document" "execution_extra" {
  statement {
    sid     = "ReadProjectSSMParams"
    actions = [
      "ssm:GetParameter",
      "ssm:GetParameters",
      "ssm:GetParametersByPath"
    ]
    resources = [
      "arn:aws:ssm:*:*:parameter${var.name_prefix}/*"
    ]
  }

  # 如果使用 SecureString，执行角色需要 KMS 解密（这里放宽到 alias/aws/ssm；如用自定义 KMS，请改成你的 KMS ARN）
  statement {
    sid     = "KMSDecryptForSSM"
    actions = ["kms:Decrypt"]
    resources = ["*"]
    condition {
      test     = "StringEquals"
      variable = "kms:ViaService"
      values   = ["ssm.${data.aws_region.current.name}.amazonaws.com"]
    }
  }
}

resource "aws_iam_policy" "execution_extra" {
  name   = "${var.name_prefix}-${var.env}-${var.ecs_execution_role}"
  policy = data.aws_iam_policy_document.execution_extra.json
}

resource "aws_iam_role_policy_attachment" "execution_extra_attach" {
  role       = aws_iam_role.ecs_task_execution.name
  policy_arn = aws_iam_policy.execution_extra.arn
}

# ---------- Task Role (for app runtime AWS access) ----------
resource "aws_iam_role" "ecs_task" {
  name               = "${var.name_prefix}-${var.env}-${var.ecs_task_role}"
  assume_role_policy = data.aws_iam_policy_document.ecs_tasks_trust.json
}

#SSM parameter
resource "aws_ssm_parameter" "frontend_api_base_url" {
  name  = "${var.name_prefix}/${var.env}/frontend/API_BASE_URL"
  type  = "String"
  value = var.frontend_api_base_url
}

resource "aws_ssm_parameter" "backend_db_url" {
  name  = "${var.name_prefix}/${var.env}/backend/DB_URL"
  type  = "SecureString" # 默认使用 alias/aws/ssm KMS Key；如需自定义 KMS 请再配 key_id
  value = var.backend_db_url
}

#frontend alb sg
module "sg_alb_frontend" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 5.1"

  name        = "${var.name_prefix}-sg-${var.alb_frontend}"
  description = "Frontend ALB SG"
  vpc_id      = module.vpc.vpc_id

  ingress_rules       = ["http-80-tcp", "https-443-tcp"] # 0.0.0.0/0
  egress_rules        = ["all-all"]
  ingress_cidr_blocks = ["0.0.0.0/0"]
  tags                = var.tags
}

#backend alb sg
module "sg_alb_backend" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 5.1"

  name        = "${var.name_prefix}-sg-${var.alb_backend}"
  description = "Backend ALB SG"
  vpc_id      = module.vpc.vpc_id

  ingress_rules       = ["http-80-tcp", "https-443-tcp"]
  egress_rules        = ["all-all"]
  ingress_cidr_blocks = ["0.0.0.0/0"]
  tags                = var.tags
}

#frontend ecs/ec2 work sg
module "sg_app_frontend" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 5.1"

  name        = "${var.name_prefix}-${var.sg_app_frontend}"
  description = "Allow traffic from FE ALB to FE tasks"
  vpc_id      = module.vpc.vpc_id

  ingress_with_source_security_group_id = [
    {
      rule                     = "http-3000-tcp"
      source_security_group_id = module.sg_alb_frontend.security_group_id
      description              = "FE ALB -> FE app (3000)"
    }
  ]
  egress_rules = ["all-all"]
  tags         = var.tags
}

#backend ecs/ec2 work sg
module "sg_app_backend" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 5.1"

  name        = "${var.name_prefix}-${var.sg_app_backend}"
  description = "Allow traffic from BE ALB to BE tasks"
  vpc_id      = module.vpc.vpc_id

  ingress_with_source_security_group_id = [
    {
      rule                     = "http-8080-tcp"
      source_security_group_id = module.sg_alb_backend.security_group_id
      description              = "BE ALB -> BE app (8080)"
    }
  ]
  egress_rules = ["all-all"]
  tags         = var.tags
}


#frontend alb
module "alb_frontend" {
  source  = "terraform-aws-modules/alb/aws"
  version = "~> 9.7"

  name = "${var.name_prefix}-${var.alb_frontend}"

  load_balancer_type = "application"
  vpc_id             = module.vpc.vpc_id
  subnets            = module.vpc.public_subnets
  security_groups    = [module.sg_alb_frontend.security_group_id]

  enable_deletion_protection = false

  listeners = merge(
    {
      http_80 = {
        port     = 80
        protocol = "HTTP"
        forward  = { target_group_key = "fe" }
      }
    },
    var.enable_https ? {
      https_443 = {
        port            = 443
        protocol        = "HTTPS"
        certificate_arn = var.acm_certificate_arn
        forward         = { target_group_key = "fe" }
      }
    } : {}
  )
  
  # target group
  target_groups = {
    fe = {
      name_prefix      = "fe-"
      backend_protocol = "HTTP"
      backend_port     = 3000
      target_type      = "ip"
      health_check = {
        enabled             = true
        healthy_threshold   = 2
        unhealthy_threshold = 2
        timeout             = 5
        interval            = 30
        path                = "/"
        matcher             = "200-399"
      }
    }
  }

  tags = var.tags
}

#backend alb
module "alb_backend" {
  source  = "terraform-aws-modules/alb/aws"
  version = "~> 9.7"

  name               = "${var.name_prefix}-${var.alb_backend}"
  load_balancer_type = "application"

  vpc_id          = module.vpc.vpc_id
  subnets         = module.vpc.public_subnets
  security_groups = [module.sg_alb_backend.security_group_id]

  enable_deletion_protection = false

  listeners = merge(
    {
      http_80 = {
        port     = 80
        protocol = "HTTP"
        forward  = { target_group_key = "be" }
      }
    },
    var.enable_https ? {
      https_443 = {
        port            = 443
        protocol        = "HTTPS"
        certificate_arn = var.acm_certificate_arn
        forward         = { target_group_key = "be" }
      }
    } : {}
  )

  #backend target group
  target_groups = {
    be = {
      name_prefix = "be-"
      protocol    = "HTTP"
      port        = 8080
      target_type = "ip"

      health_check = {
        enabled             = true
        path                = "/health"
        matcher             = "200-399"
        interval            = 30
        timeout             = 5
        healthy_threshold   = 2
        unhealthy_threshold = 2
      }
    }
  }

  tags = var.tags
}

# ECS Cluster
module "ecs" {
  source       = "terraform-aws-modules/ecs/aws"
  version      = "~> 5.11"           
  cluster_name = "${var.name_prefix}-${var.env}-ecs"
}
#ECS Frontend(Fargate)
module "svc_frontend" {
  source  = "terraform-aws-modules/ecs/aws//modules/service"
  version = "~> 5.11"

  name        = "${var.name_prefix}-${var.env}-frontend-svc"
  cluster_arn = module.ecs.cluster_arn

  # Fargate service sizing
  launch_type    = "FARGATE"
  cpu            = var.frontend_cpu != null ? var.frontend_cpu : 256
  memory         = var.frontend_memory != null ? var.frontend_memory : 512
  desired_count  = var.desired_count_frontend
  platform_version = "1.4.0"

  # Networking
  subnet_ids        = module.vpc.public_subnet_ids
  security_group_ids = [module.sg_ecs_frontend.security_group_id] # SG should allow 3000 from ALB SG only
  enable_execute_command = true

  # Task roles (pass your ARNs; or let the module create—see notes)
 

  # Task definition (module creates it)
  create_task_definition = true
  container_definitions = {
    frontend = {
      image     = var.frontend_image
      essential = true

      port_mappings = [{
        containerPort = var.frontend_container_port
        hostPort      = var.frontend_container_port
        protocol      = "tcp"
      }]

      environment = [for k, v in var.env : { name = k, value = v }]

      log_configuration = {
        logDriver = "awslogs"
        options = {
          awslogs-create-group  = "true"
          awslogs-region        = var.region
          awslogs-group         = "/ecs/${var.name_prefix}/${var.env}/frontend"
          awslogs-stream-prefix = "ecs"
        }
      }
    }
  }

  # Attach to existing ALB TG created by your ALB module
  load_balancer = {
    frontend = {
      target_group_arn = module.alb_frontend.target_group_arns[0]
      container_name   = "frontend"
      container_port   = var.frontend_container_port
    }
  }

  propagate_tags = "SERVICE"
  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 200

  tags = var.tags
}



#ECR
resource "aws_ecr_repository" "frontend_env" {
    name = "${var.name_prefix}/frontend"
    image_tag_mutability = "MUTABLE"
    image_scanning_configuration {
      scan_on_push = true
    }
}

resource "aws_ecr_repository" "backend_env" {
    name = "${var.name_prefix}/backend"
    image_tag_mutability = "MUTABLE"
    image_scanning_configuration {
      scan_on_push = true
    }
}

