#global variables
variable "name_prefix" {
  description = "Resource name prefix"
  type        = string
  default     = "meetlyomni"
}

variable "env" {
  description = "Define the environment"
  type        = string
  default     = "dev"
}

variable "tags" {
  type    = map(string)
  default = {}
}

#vpc&network variables
variable "region" {
  description = "The region to deploy the infrastructure"
  type        = string
  default     = "ap-southeast-2"
}

variable "vpc_name" {
  description = "The name of the VPC"
  type        = string
  default     = "meetly-dev-vpc"
}

variable "vpc_cidr" {
  description = "The CIDR block of the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "vpc_azs" {
  description = "The availability zones of the VPC"
  type        = list(string)
  default     = ["ap-southeast-2a", "ap-southeast-2b", "ap-southeast-2c"]
}

variable "vpc_public_subnets" {
  description = "The public subnets of the VPC"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "vpc_private_subnets" {
  description = "The private subnets of the VPC"
  type        = list(string)
  default     = ["10.0.11.0/24", "10.0.12.0/24"]
}

variable "vpc_enable_nat_gateway" {
  description = "Enable NAT gatway for VPC"
  type        = bool
  default     = true
}

variable "one_nat_gateway_per_az" {
  description = "one_nat_gateway_per_az"
  type        = bool
  default     = true
}

variable "vpc_tages" {
  description = "tags to apply to resources created by vpc module"
  type        = map(string)
  default = {
    Terraform   = "true"
    Environment = "dev"
  }
}

#cloudwatch log group
variable "logs_retention_days" {
  type        = number
  default     = 30
  description = "CloudWatch Logs retention in days"
}

# IAM role
variable "ecs_execution_role" {
  description = "ecs task execution role name"
  type        = string
  default     = "ecs-execution-role"
}

variable "ecs_task_role" {
  description = "ecs task role name"
  type        = string
  default     = "ecs-task-role"
}

#ssm parameter store
variable "frontend_api_base_url" {
  type        = string
  description = "Frontend calls this API base URL (e.g. https://api-uat.meetlyomni.com)"
}

variable "backend_db_connection_string" {
  type        = string
  description = "Backend database connection string"
  sensitive   = true
}

# sg
variable "sg_app_frontend" {
  description = "frontend application security group"
  type        = string
  default     = "sg-app-frontend"
}

variable "sg_app_backend" {
  description = "backend application security group"
  type        = string
  default     = "sg-app-backend"
}

#alb
variable "alb_frontend" {
  description = "frontend load balancer"
  type        = string
  default     = "alb-frontend"
}

variable "alb_backend" {
  description = "backend load balancer"
  type        = string
  default     = "alb-backend"
}

variable "enable_https" {
  description = "Enable HTTPS listeners on both ALBs"
  type        = bool
  default     = false
}

variable "acm_certificate_arn" {
  description = "ACM certificate ARN (if enable_https = true)"
  type        = string
  default     = ""
}

#ECS service
variable "frontend_cpu" {
  description = "ecs service cpu"
  type        = string
  default     = "512"
}

variable "frontend_memory" {
  description = "ecs service cpu"
  type        = string
  default     = "1024"
}


# ECR image URIs 
variable "frontend_image" {
  type = string
}
variable "backend_image" {
  type = string
}

# Container settings
variable "frontend_container_port" {
  type    = number
  default = 3000
}

variable "backend_container_port" {
  type    = number
  default = 8080
}


variable "desired_count_frontend" {
  type    = number
  default = 2
}

variable "desired_count_backend" {
  type    = number
  default = 2
}


variable "enable_cloudfront" {
  description = "Create CloudFront distribution in front of the frontend ALB"
  type        = bool
  default     = false
}

variable "cloudfront_aliases" {
  description = "Custom domain names for the CloudFront distribution"
  type        = list(string)
  default     = []
}

variable "cloudfront_certificate_arn" {
  description = "ACM certificate ARN (in us-east-1) for CloudFront aliases"
  type        = string
  default     = ""
}

