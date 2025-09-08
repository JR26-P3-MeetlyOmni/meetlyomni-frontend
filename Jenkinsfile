pipeline {
    agent any

    environment {
        AWS_CREDENTIALS_ID = 'aws-credentials-admin'
        IMAGE_NAME = 'meetly-omni-frontend-dev'
        EC2_HOST = 'ec2-user@52.64.167.94'
        ECR_REGISTRY = '351889159066.dkr.ecr.ap-southeast-2.amazonaws.com'
        ECR_URI = "${ECR_REGISTRY}/${IMAGE_NAME}:latest"
        NEXT_PUBLIC_API_BASE_URL = 'https://api-uat.meetlyomni.com'
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            agent { label 'build-agent' }
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            agent { label 'deploy-agent' } 
            steps {
                sh """
                docker build \
                --build-arg NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL} \
                --build-arg NODE_ENV=${NODE_ENV} \
                -t ${IMAGE_NAME}:latest .
                """
            }
        }

        stage('Push to ECR') {
            agent { label 'deploy-agent' }
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: env.AWS_CREDENTIALS_ID]]) {
                    sh '''
                        aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin $ECR_REGISTRY
                        docker tag ${IMAGE_NAME}:latest ${ECR_URI}
                        docker push ${ECR_URI}
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            agent { label 'deploy-agent' }
            steps {
            sshagent(['ec2-dev-key']) {
                sh """
                ssh -o StrictHostKeyChecking=no ${EC2_HOST} '
                    set -e
                    aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin ${ECR_REGISTRY}
                    docker pull ${ECR_URI}
                    docker stop ${IMAGE_NAME} || true
                    docker rm -f ${IMAGE_NAME} || true
                    docker run -d -p 3000:3000 --name ${IMAGE_NAME} ${ECR_URI}
                    echo "Deployment successful!"
                '
                """
                }
            }
        }
    }

    post {
        success {
            slackSend(channel: '#deployments', message: "✅ FE Deployment completed successfully")
        }
        failure {
            slackSend(channel: '#deployments', message: "❌ FE Deployment failed")
        }
    }
}