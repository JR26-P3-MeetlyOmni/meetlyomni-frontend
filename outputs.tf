#vpc outputs
output "vpc_id" { value = module.vpc.vpc_id }
output "public_subnet_ids" { value = module.vpc.public_subnet_ids }
output "private_subnet_ids" { value = module.vpc.private_subnet_ids }
output "alb_frontend_dns" { value = module.alb_frontend.dns_name }
output "alb_backend_dns" { value = module.alb_backend.dns_name }
output "ecr_frontend_repo" { value = aws_ecr_repository.frontend_env.repository_url }
output "ecr_backend_repo" { value = aws_ecr_repository.backend_env.repository_url }

# cloudwatch & IAM role & SSM parameter
output "cw_log_group_frontend" {
  value = aws_cloudwatch_log_group.frontend.name
}

output "cw_log_group_backend" {
  value = aws_cloudwatch_log_group.backend.name
}

output "ecs_execution_role_arn" {
  value = aws_iam_role.ecs_task_execution.arn
}

output "ecs_task_role_arn" {
  value = aws_iam_role.ecs_task.arn
}

output "ssm_frontend_api_param_arn" {
  value = aws_ssm_parameter.frontend_api_base_url.arn
}

output "ssm_backend_db_param_arn" {
  value     = aws_ssm_parameter.backend_db_url.arn
  sensitive = true
}

output "sg_alb_frontend_security_group_id" {
  value = module.sg_alb_frontend_security_group_id
}