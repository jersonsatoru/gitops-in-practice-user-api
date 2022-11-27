pipeline {
  agent any

  options {
    timestamps()
  }

  parameters {
    string(
      name: 'CONTAINER_REGISTRY',
      defaultValue: 'http://localhost:5001',
      description: 'Container registry'
    )

  }

  stages {
    stage('Docker build and push') {
      steps {
        script {
          echo "${GIT_COMMIT, length=6}"
          def IMAGE_NAME="${params.CONTAINER_REGISTRY}/user-api:latest"
          def app = docker.build IMAGE_NAME
          docker.withRegistry("${params.CONTAINER_REGISTRY}", "") {
            app.push()
          }
        }
      }
    }

    stage('Update k8s repository') {
      steps {
        sh 'kustomize version'
      }
    }
  }
}
