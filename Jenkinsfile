pipeline {
  agent any

  environment {
    IMAGE = "${ECR_REGISTRY}/${ECR_REPOSITORY}"
    IMAGE_NAME = 'meetly-omni-frontend-dev'
    CLUSTER = 'meetly-frontend'
    SERVICE = 'meetly-frontend-svc'

    
    ECR_REGISTRY = "739287608007.dkr.ecr.ap-southeast-2.amazonaws.com"

    NEXT_PUBLIC_API_BASE_URL = 'https://api-uat.meetlyomni.com'
    //NODE_ENV = 'production' //环境变量写死在Dockerfile中
  }

  options { timestamps() }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Calc Dev Version') {
      //agent { label 'build-agent' }
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
      //agent { label 'build-agent' }
      when { anyOf { branch 'dev-biaojin'; changeRequest(target: 'dev-biaojin') } }
      steps { sh 'npm ci' }
    }

    stage('CI - Build Project') {
      //agent { label 'build-agent' }
      when { anyOf { branch 'dev-biaojin'; changeRequest(target: 'dev-biaojin') } }
      steps { sh 'npm run build' }
    }

    stage('Docker Build') {
      //agent { label 'build-agent' }
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

    stage('push to ECR') {
      //agent { label 'build-agent' }
      when { anyOf { branch 'dev-biaojin'; changeRequest(target: 'dev-biaojin') } }
      steps {
        script {
          withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws_biaojin']]) {
            sh """
              aws --version | cat
              aws ecr describe-repositories --region ap-southeast-2 --repository-names ${IMAGE_NAME} \
              || aws ecr create-repository --region ap-southeast-2 --repository-name ${IMAGE_NAME}
              aws ecr get-login-password --region ap-southeast-2 \
                | docker login --username AWS --password-stdin ${ECR_REGISTRY}

              docker tag ${IMAGE_NAME}:${VERSION} ${ECR_VERSION_URI}
              docker push ${ECR_VERSION_URI}
            """
          }
        }
      }
    }

  stage('Deploy to ECS') {
  steps {
    withAWS(credentials: 'aws_biaojin', region: 'ap-southeast-2') {
      sh '''
        set -euo pipefail

        # 1) 计算将要部署的镜像 URI（复用前面算好的 VERSION）
        IMAGE_URI="${ECR_REGISTRY}/${IMAGE_NAME}:${VERSION}"

        # 2) 用 sed 就地替换占位符
        sed -i "s|__IMAGE__|${IMAGE_URI}|g" taskdefinition.json

        # 3) 注册新的任务定义修订版，并拿到 ARN
        NEW_TD_ARN=$(
          aws ecs register-task-definition \
            --cli-input-json file://taskdefinition.json \
            --query 'taskDefinition.taskDefinitionArn' \
            --output text
        )

        echo "New task definition: ${NEW_TD_ARN}"

        # 4) 更新服务到新修订版（关键！一定要传 --task-definition）
        aws ecs update-service \
          --cluster "${CLUSTER}" \
          --service "${SERVICE}" \
          --task-definition "${NEW_TD_ARN}"

        # （可选）还原工作区，避免把替换后的 JSON 提交回仓库
        git checkout -- taskdefinition.json || true
      '''
    }
  }
}




  post {
    always { cleanWs() }
    success { echo "Pipeline completed successfully" }
    failure { echo "Pipeline failed" }
  }
  
  // post {
  //   success {
  //     slackSend(channel: '#deployments', message: "✅ FE Dev CD ok — ${env.ECR_VERSION_URI}")
  //   }
  //   failure {
  //     slackSend(channel: '#deployments', message: "❌ FE Dev CD failed (build #${env.BUILD_NUMBER})")
  //   }
  // }
}