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
                        sh '''
LATEST_DEV_TAG=$(aws ecr list-images --region ${AWS_REGION} --repository-name ${ECR_REPOSITORY} --filter tagStatus=TAGGED --query 'imageIds[*].imageTag' --output text | tr '\t' '\n' | grep -E '^meetlyomni-frontend-dev\.[0-9]+\.[0-9]+\.[0-9]+$' | sort -t. -k4,4n | tail -n1)
if [ -z "$LATEST_DEV_TAG" ]; then
  NEXT_DEV_TAG="meetlyomni-frontend-dev.1.1.1"
else
  PATCH=${LATEST_DEV_TAG##*.}
  BASE=${LATEST_DEV_TAG%.*}
  NEXT_PATCH=$((PATCH+1))
  NEXT_DEV_TAG="${BASE}.${NEXT_PATCH}"
fi
printf "%s" "$NEXT_DEV_TAG" > next_dev_tag.txt
'''
                    }
                    env.DEV_TAG = readFile('next_dev_tag.txt').trim()
                    env.PROD_TAG = 'meetlyomni-frontend-prod'
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
                script {
                    sh 'npm ci'
                }
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
                script {
                    sh 'npm test'
                }
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
                script {
                    sh 'npm run build'
                }
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
                script {
                    sh "docker build --pull -t ${IMAGE}:${DEV_TAG} ."
                }
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
                        sh "aws --version | cat"
                        sh "aws ecr describe-repositories --region ${AWS_REGION} --repository-names ${ECR_REPOSITORY} || aws ecr create-repository --region ${AWS_REGION} --repository-name ${ECR_REPOSITORY}"
                        sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}"
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
                sh "docker push ${IMAGE}:${DEV_TAG}"
            }
        }

        stage('Deploy to EC2 (docker-compose)') {
            when {
                allOf {
                    branch 'dev-biaojin'
                    not { changeRequest() }
                }
            }
            steps {
                script {
                    sshagent(credentials: ['02e89ccd-0b72-47fb-b5d5-893d7c1b67c8']) {
                        sh "ssh -o StrictHostKeyChecking=no ${EC2_HOST} 'aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY} && docker pull ${IMAGE}:${PROD_TAG} && cd ${EC2_DEPLOY_DIR} && (docker compose pull || docker-compose pull) && (docker compose up -d || docker-compose up -d) && docker image prune -f'"
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
