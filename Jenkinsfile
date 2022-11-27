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

    string(
      name: 'IMAGE_NAME',
      defaultValue: "",
      description: 'Image name'
    )
  }

  stages {
    stage('Docker build and push') {
      steps {
        script {
          params.IMAGE_NAME="${params.CONTAINER_REGISTRY}/user-api:${GIT_COMMIT}"
          def app = docker.build "params.IMAGE_NAME"
          docker.withRegistry("${params.CONTAINER_REGISTRY}") {
            app.push()
          }
        }
      }
    }
  }
}
