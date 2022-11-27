def SHORT_SHA

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
          SHORT_SHA = env.GIT_COMMIT.take(7)
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
      steps {
        cleanWs()
        checkout([$class: 'GitSCM',
                  branches: [[name: 'develop']],
                  userRemoteConfigs: [[credentialsId:  'jenkins_k8s',
                                      url: 'git@github.com:jersonsatoru/gitops-in-practice.git']]])
        sh 'ls -lha'
        sh 'cd k8s/projects/user-api/overlays/development'
        echo "${SHORT_SHA}"
        sh "kustomize edit set image localhost:5001/user-api:${SHORT_SHA}"
      }
    }
  }
}
