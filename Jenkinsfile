pipeline {
    agent any

    environment {
        // 基本参数：根据你的账户与区域调整
        AWS_ACCOUNT_ID = '739287608007'
        AWS_REGION = 'ap-southeast-2'
        ECR_REPOSITORY = 'meetlyomni/frontend'
        ECR_REGISTRY = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
        IMAGE = "${ECR_REGISTRY}/${ECR_REPOSITORY}"

        // 部署目标（修改为你的EC2登录与部署目录）
        EC2_HOST = 'ubuntu@44.224.30.221'
        EC2_DEPLOY_DIR = '/opt/meetly-frontend'
        DEPLOY_BRANCH = 'dev-biaojin'
    }

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Prepare Tags') {
            when {
                anyOf {
                    branch 'dev-biaojin'
                    changeRequest(target: 'dev-biaojin')
                }
            }
            steps {
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws_biaojin', accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                        powershell '''
$ErrorActionPreference = "Stop"
$env:AWS_REGION = "${env:AWS_REGION}"
$env:ECR_REPOSITORY = "${env:ECR_REPOSITORY}"
# 获取所有已打标签的镜像标签
$tags = aws ecr list-images --region $env:AWS_REGION --repository-name $env:ECR_REPOSITORY --filter tagStatus=TAGGED --query "imageIds[*].imageTag" --output text 2>$null
$tagList = @()
if ($tags) { $tagList = ($tags -split "`t|`n") | Where-Object { $_ } }

$prefix = 'meetlyomni-frontend-dev.'
$numericTags = @()
foreach ($t in $tagList) {
  if ($t.StartsWith($prefix)) {
    $parts = $t.Split('.')
    if ($parts.Length -eq 4 -and ($parts[1] -as [int]) -ne $null -and ($parts[2] -as [int]) -ne $null -and ($parts[3] -as [int]) -ne $null) {
      $numericTags += $t
    }
  }
}

$latest = $null
if ($numericTags.Count -gt 0) {
  $latest = $numericTags | Sort-Object {[int]($_.Split('.')[-1])} | Select-Object -Last 1
}

if ([string]::IsNullOrEmpty($latest)) {
  $next = 'meetlyomni-frontend-dev.1.1.1'
} else {
  $parts = $latest.Split('.')
  $parts[3] = ([int]$parts[3] + 1).ToString()
  $next = ($parts -join '.')
}
Set-Content -Path next_dev_tag.txt -Value $next -NoNewline
'''
                    }
                    env.DEV_TAG = readFile('next_dev_tag.txt').trim()
                    env.PROD_TAG = 'meetlyomni-frontend-prod.1.1.1'
                    echo "DEV_TAG resolved to ${DEV_TAG}; PROD_TAG is ${PROD_TAG}"
                }
            }
        }

        stage('CI - Install Dependencies') {
            when {
                anyOf {
                    branch 'dev-biaojin'
                    changeRequest(target: 'dev-biaojin')
                }
            }
            steps {
                powershell 'npm ci'
            }
        }

        stage('CI - Run Tests') {
            when {
                anyOf {
                    branch 'dev-biaojin'
                    changeRequest(target: 'dev-biaojin')
                }
            }
            steps {
                powershell 'npm test'
            }
        }

        stage('CI - Build Project') {
            when {
                anyOf {
                    branch 'dev-biaojin'
                    changeRequest(target: 'dev-biaojin')
                }
            }
            steps {
                powershell 'npm run build'
            }
        }

        stage('Docker Build') {
            when {
                anyOf {
                    branch 'dev-biaojin'
                    changeRequest(target: 'dev-biaojin')
                }
            }
            steps {
                powershell "docker build --pull -t ${IMAGE}:${DEV_TAG} ."
            }
        }

        stage('Login ECR') {
            when {
                anyOf {
                    branch 'dev-biaojin'
                    changeRequest(target: 'dev-biaojin')
                }
            }
            steps {
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws_biaojin', accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                        powershell 'aws --version | Out-Host'
                        powershell "aws ecr describe-repositories --region ${AWS_REGION} --repository-names ${ECR_REPOSITORY} 2>$null; if (-not $?) { aws ecr create-repository --region ${AWS_REGION} --repository-name ${ECR_REPOSITORY} | Out-Null }"
                        powershell "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}"
                    }
                }
            }
        }

        stage('Push Image to ECR') {
            when {
                anyOf {
                    branch 'dev-biaojin'
                    changeRequest(target: 'dev-biaojin')
                }
            }
            steps {
                powershell "docker push ${IMAGE}:${DEV_TAG}"
            }
        }

        stage('Deploy to EC2 (docker run)') {
            when {
                allOf {
                    branch 'dev-biaojin'
                    not { changeRequest() }
                }
            }
            steps {
                script {
                    sshagent(credentials: ['02e89ccd-0b72-47fb-b5d5-893d7c1b67c8']) {
                        powershell "ssh -o StrictHostKeyChecking=no ${EC2_HOST} 'aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY} && docker pull ${IMAGE}:${PROD_TAG} && (docker rm -f meetly-frontend || true) && docker run -d --name meetly-frontend -p 3000:3000 --restart unless-stopped ${IMAGE}:${PROD_TAG} && docker image prune -f'"
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "Pipeline completed successfully"
        }
        failure {
            echo "Pipeline failed"
        }
    }
}
