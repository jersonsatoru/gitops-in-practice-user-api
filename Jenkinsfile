pipeline {
  agent any

  options {
    timestamps()
  }

  parameters {
    string(
      name: 'CONTAINER_REGISTRY',
      defaultValue: 'localhost:5001',
      description: 'Container registry'
    )

  }

  stages {
    stage('Docker build and push') {
      steps {
        script {
          def SHORT_SHA = env.GIT_COMMIT.take(7)
          def IMAGE_NAME="${params.CONTAINER_REGISTRY}/user-api:${SHORT_SHA}"
          echo "${IMAGE_NAME}"
          def app = docker.build(
            "${IMAGE_NAME}",
            "--build-arg=SHORT_SHA=${SHORT_SHA} ."
          )
          docker.withRegistry("http://${params.CONTAINER_REGISTRY}") {
            app.push()
          }
        }
      }
    }

    stage('Update k8s repository') {
      options {
        skipDefaultCheckout()
      }
      agent {
        docker {
          image 'ubuntu:22.04'
        }
      }
      steps {
        checkout([$class: 'GitSCM',
                  branches: [[name: 'develop']],
                  userRemoteConfigs: [[credentialsId:  'jenkins_k8s',
                                      url: 'ssh://git@github.com:jersonsatoru/gitops-in-practice.git']]])
        sh 'ls -lha'
      }
    }
  }
}
