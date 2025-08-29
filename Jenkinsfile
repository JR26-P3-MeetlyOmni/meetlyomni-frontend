pipeline {
  agent any

  environment {
    AWS_ACCOUNT_ID = '739287608007'
    AWS_REGION = 'ap-southeast-2'
    ECR_REPOSITORY = 'meetlyomni/frontend'
    ECR_REGISTRY = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
    IMAGE = "${ECR_REGISTRY}/${ECR_REPOSITORY}"

    EC2_HOST = 'ubuntu@44.224.30.221'
    EC2_DEPLOY_DIR = '/opt/meetly-frontend'
    DEPLOY_BRANCH = 'dev-biaojin'
  }

  options { timestamps() }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    //✅ 新的取号逻辑（替代原 Prepare Tags）
    // stage('Resolve Tags') {
    //   when {
    //     anyOf { branch 'dev-biaojin'; changeRequest(target: 'dev-biaojin') }
    //   }
    //   steps {
    //     script {
    //       withCredentials([[$class: 'AmazonWebServicesCredentialsBinding',
    //                         credentialsId: 'aws_biaojin',
    //                         accessKeyVariable: 'AWS_ACCESS_KEY_ID',
    //                         secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {

    //         def lastTag = sh(
    //           returnStdout: true,
    //           script: """
    //             set -e
    //             aws ecr list-images --region ${AWS_REGION} --repository-name ${ECR_REPOSITORY} \
    //               --filter tagStatus=TAGGED --query "imageIds[].imageTag" --output text \
    //             | tr '\\t' '\\n' \
    //             | grep -E '^meetlyomni-frontend-dev[.][0-9]+[.][0-9]+[.][0-9]+$' \
    //             | sort -t. -k4,4n \
    //             | tail -n1
    //           """
    //         ).trim()

    //         if (!lastTag) {
    //           env.DEV_TAG = 'meetlyomni-frontend-dev.1.1.1'
    //         } else {
    //           // 拆分并把最后一段 +1
    //           def parts = lastTag.tokenize('.')
    //           def patch = (parts[-1] as int) + 1
    //           env.DEV_TAG = "${parts[0]}.${parts[1]}.${parts[2]}.${patch}"
    //         }
    //         // 如果你需要固定一个占位的 PROD_TAG 也可以保留
    //         env.PROD_TAG = 'meetlyomni-frontend-prod.1.1.1'
    //         echo "Resolved DEV_TAG = ${env.DEV_TAG}"
    //       }
    //     }
    //   }
    // }
    
    stage('CI - Install Dependencies') {
      when { anyOf { branch 'dev-biaojin'; changeRequest(target: 'dev-biaojin') } }
      steps { sh 'npm ci' }
    }

    stage('CI - Run Tests') {
      when { anyOf { branch 'dev-biaojin'; changeRequest(target: 'dev-biaojin') } }
      steps { sh 'npm test' }
    }

    stage('CI - Build Project') {
      when { anyOf { branch 'dev-biaojin'; changeRequest(target: 'dev-biaojin') } }
      steps { sh 'npm run build' }
    }

    stage('Docker Build') {
      when { anyOf { branch 'dev-biaojin'; changeRequest(target: 'dev-biaojin') } }
      steps {
        sh "docker build --pull -t ${IMAGE}:meetlyomni-frontend-dev.1.1.2 ."
      }
    }

    stage('Login ECR') {
      when { anyOf { branch 'dev-biaojin'; changeRequest(target: 'dev-biaojin') } }
      steps {
        script {
          withCredentials([[$class: 'AmazonWebServicesCredentialsBinding',
                            credentialsId: 'aws_biaojin',
                            accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                            secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
            sh """
              aws --version | cat
              aws ecr describe-repositories --region ${AWS_REGION} --repository-names ${ECR_REPOSITORY} \
                || aws ecr create-repository --region ${AWS_REGION} --repository-name ${ECR_REPOSITORY}
              aws ecr get-login-password --region ${AWS_REGION} \
                | docker login --username AWS --password-stdin ${ECR_REGISTRY}
            """
          }
        }
      }
    }

    stage('Push Image to ECR') {
      when { anyOf { branch 'dev-biaojin'; changeRequest(target: 'dev-biaojin') } }
      steps { sh "docker push ${IMAGE}:${DEV_TAG}" }
    }

    stage('Deploy to EC2 (docker run)') {
      when {
        allOf { branch 'dev-biaojin'; not { changeRequest() } } // 只在分支直推时部署
      }
      steps {
        script {
          sshagent(credentials: ['02e89ccd-0b72-47fb-b5d5-893d7c1b67c8']) {
            sh """
              ssh -o StrictHostKeyChecking=no ${EC2_HOST} '
                set -e
                aws ecr get-login-password --region ${AWS_REGION} \
                  | docker login --username AWS --password-stdin ${ECR_REGISTRY} &&
                docker pull ${IMAGE}:${DEV_TAG} &&
                (docker rm -f meetly-frontend || true) &&
                docker run -d --name meetly-frontend -p 3000:3000 --restart unless-stopped ${IMAGE}:${DEV_TAG} &&
                docker image prune -f
              '
            """
          }
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
