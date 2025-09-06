pipeline {
  agent any

  options { timestamps() }

  environment {
    ECR_REGISTRY = "739287608007.dkr.ecr.ap-southeast-2.amazonaws.com"
    IMAGE_NAME   = 'meetly-omni-frontend-dev'

    NEXT_PUBLIC_API_BASE_URL = 'https://api-uat.meetlyomni.com'
    AWS_DEFAULT_REGION = 'ap-southeast-2'

    // 你自己的 ECS 集群与服务名（按实际改）
    CLUSTER = 'meetly-cluster'
    SERVICE = 'meetly-frontend-service'
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Calc Dev Version') {
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

    stage('CI - Install Dependencies') {
      when { anyOf { branch 'dev-biaojin'; changeRequest(target: 'dev-biaojin') } }
      steps { sh 'npm ci' }
    }

    stage('CI - Build Project') {
      when { anyOf { branch 'dev-biaojin'; changeRequest(target: 'dev-biaojin') } }
      steps { sh 'npm run build' }
    }

    stage('Docker Build') {
      when { anyOf { branch 'dev-biaojin'; changeRequest(target: 'dev-biaojin') } }
      steps {
        sh """
          docker build \\
            --build-arg NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL} \\
            --build-arg NODE_ENV=production \\
            -t ${IMAGE_NAME}:${VERSION} \\
            .
        """
      }
    }

    stage('Push to ECR') {
      when { anyOf { branch 'dev-biaojin'; changeRequest(target: 'dev-biaojin') } }
      steps {
        script {
          withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws_biaojin']]) {
            sh """
              aws --version | cat
              aws ecr describe-repositories --region ${AWS_DEFAULT_REGION} --repository-names ${IMAGE_NAME} \
              || aws ecr create-repository   --region ${AWS_DEFAULT_REGION} --repository-name  ${IMAGE_NAME}

              aws ecr get-login-password --region ${AWS_DEFAULT_REGION} \
                | docker login --username AWS --password-stdin ${ECR_REGISTRY}

              docker tag  ${IMAGE_NAME}:${VERSION} ${ECR_REGISTRY}/${IMAGE_NAME}:${VERSION}
              docker push ${ECR_REGISTRY}/${IMAGE_NAME}:${VERSION}
            """
          }
        }
      }
    }

    stage('Deploy to ECS') {
      steps {
        withAWS(credentials: 'aws_biaojin', region: 'ap-southeast-2') {
          sh '''
            set -e

            IMAGE_URI="${ECR_REGISTRY}/${IMAGE_NAME}:${VERSION}"

            # 就地替换占位符
            sed -i "s|__IMAGE__|${IMAGE_URI}|g" taskdefinition.json

            # 注册新的任务定义修订版，并拿到 ARN
            NEW_TD_ARN=$(
              aws ecs register-task-definition \
                --cli-input-json file://taskdefinition.json \
                --query 'taskDefinition.taskDefinitionArn' \
                --output text
            )
            echo "New task definition: ${NEW_TD_ARN}"

            # 更新服务到新修订版（关键！一定要传 --task-definition）
            aws ecs update-service \
              --cluster "${CLUSTER}" \
              --service "${SERVICE}" \
              --task-definition "${NEW_TD_ARN}"

            # 还原文件，避免把替换后的 JSON 提交回仓库（可选）
            git checkout -- taskdefinition.json || true
          '''
        }
      }
    }
  } 

  post {
    always { cleanWs() }
    success { echo "Pipeline completed successfully" }
    failure { echo "Pipeline failed" }
  }
}    
