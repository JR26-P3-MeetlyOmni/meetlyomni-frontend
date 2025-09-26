pipeline {
    agent any

    environment {
        AWS_CREDENTIALS_ID = 'aws-credentials-admin'
        IMAGE_NAME = 'meetly-omni-frontend-dev'
        EC2_HOST = 'ec2-user@3.25.52.0'
        ECR_REGISTRY = '351889159066.dkr.ecr.ap-southeast-2.amazonaws.com'
        ECR_URI = "${ECR_REGISTRY}/${IMAGE_NAME}:latest"
        NEXT_PUBLIC_API_BASE_URL = 'https://api-uat.meetlyomni.com'
        NODE_ENV = 'production'
         // ecs service
        CLUSTER = 'meetlyomni-dev-ecs'
        SERVICE = 'meetlyomni-dev-frontend-svc'
    }

    stages {
        stage('Checkout') {
            agent { label 'build-agent' }
            steps {
                checkout scm
            }
        }

        stage('Calc Dev Version') {
            agent { label 'deploy-agent' } 
            steps {
                script {
                    def ver = sh(
                        returnStdout: true,
                        script: '''
                            TS=$(date +%Y%m%d%H%M)
                            SHA=$(git rev-parse --short HEAD || echo unknown)
                            echo "${TS}-${BUILD_NUMBER}-${SHA}"
                        '''
                    ).trim()
                    env.VERSION = ver
                    env.ECR_VERSION_URI = "${env.ECR_REGISTRY}/${env.IMAGE_NAME}:${env.VERSION}"
                    echo "Dev image version: ${env.VERSION}"
                }
            }
        }

        stage('Build Docker Image') {
            agent { label 'deploy-agent' } 
            steps {
                sh """
                docker build \
                --build-arg NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL} \
                --build-arg NODE_ENV=${NODE_ENV} \
                -t ${IMAGE_NAME}:${VERSION} .
                """
            }
        }

        stage('Push to ECR') {
            agent { label 'deploy-agent' }
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: env.AWS_CREDENTIALS_ID]]) {
                    sh '''
                        aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin $ECR_REGISTRY
                        docker tag ${IMAGE_NAME}:${VERSION} ${ECR_VERSION_URI}
                        docker push ${ECR_VERSION_URI}
                    '''
                }
            }
        }

        stage('Deploy to ECS') {
            agent { label 'deploy-agent' }
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: env.AWS_CREDENTIALS_ID]]) {
                    sh '''
                        set -e
                        IMAGE_URI="${ECR_REGISTRY}/${IMAGE_NAME}:${VERSION}"
                        sed -i "s|__IMAGE__|${IMAGE_URI}|g" taskdefinition.json

                        # register new role
                        NEW_TD_ARN=$(
                        aws ecs register-task-definition \
                        --cli-input-json file://taskdefinition.json \
                        --query 'taskDefinition.taskDefinitionArn' \
                        --output text
                        )
                        echo "New task definition: ${NEW_TD_ARN}"

                        # update ecs service
                        aws ecs update-service \
                        --cluster "${CLUSTER}" \
                        --service "${SERVICE}" \
                        --task-definition "${NEW_TD_ARN}"

                        # replace original json file
                        git checkout -- taskdefinition.json || true
                    '''
                }
            }
        }
    } 

    post {
        success {
            slackSend(channel: '#deployments', message: "鉁?FE Deployment completed successfully")
        }
        failure {
            slackSend(channel: '#deployments', message: "鉂?FE Deployment failed")
        }
    }
}