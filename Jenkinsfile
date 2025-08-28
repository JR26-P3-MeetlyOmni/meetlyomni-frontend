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
                    env.GIT_COMMIT_SHORT = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                    // 所有在 dev-biaojin（包含指向 dev-biaojin 的 PR）统一用 dev-biaojin 前缀
                    env.TAG_PREFIX = 'dev-biaojin'
                    env.TAG_COMMIT = "${TAG_PREFIX}-${GIT_COMMIT_SHORT}"
                    env.TAG_LATEST = "${TAG_PREFIX}-latest"
                    echo "Will build ${IMAGE}:${TAG_COMMIT} and ${IMAGE}:${TAG_LATEST}"
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
                    sh "docker build --pull -t ${IMAGE}:${TAG_COMMIT} -t ${IMAGE}:${TAG_LATEST} ."
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
                sh "docker push ${IMAGE}:${TAG_COMMIT}"
                sh "docker push ${IMAGE}:${TAG_LATEST}"
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
                        sh "ssh -o StrictHostKeyChecking=no ${EC2_HOST} 'aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY} && cd ${EC2_DEPLOY_DIR} && (docker compose pull || docker-compose pull) && (docker compose up -d || docker-compose up -d) && docker image prune -f'"
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
