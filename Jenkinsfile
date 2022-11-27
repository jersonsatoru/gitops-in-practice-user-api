pipeline {
  agent any

  options {
    timestamps()
  }

  parameters {
    string(
      name: CONTAINER_REGISTRY,
      defaultValue: 'localhost:5001',
      description: 'Container registry'
    )

    string(
      name: IMAGE_TAG,
      defaultValue: "${GIT_COMMIT}",
      description: 'Image tag'
    )

    string(
      name: IMAGE_NAME,
      defaultValue: "",
      description: 'Image name'
    )
  }

  stages {
    stage('Docker build and push') {
      steps {
        script {
          params.IMAGE_NAME="${params.CONTAINER_REGISTRY}/user-api:${params.IMAGE_TAG}"
          def app = docker.build "params.IMAGE_NAME"
          docker.withRegistry("${params.CONTAINER_REGISTRY}") {
            app.push()
          }
        }
      }
    }
  }
}
