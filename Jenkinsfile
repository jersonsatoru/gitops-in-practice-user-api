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
          def IMAGE_NAME="${params.CONTAINER_REGISTRY}/user-api:${GIT_COMMIT}"
          def app = docker.build IMAGE_NAME
          echo "${params.CONTAINER_REGISTRY}"
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
