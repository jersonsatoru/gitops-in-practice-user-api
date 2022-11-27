pipeline {
  agent {
    docker {
      image 'ubuntu:22.04'
    }
  }

  options {
    timestamps()
  }

  stages {
    stage('Docker build') {
      steps {
        script {
          echo "${GIT_COMMIT}"
          def IMAGE_NAME = "localhost:5001:${GIT_COMMIT}"
          echo "${IMAGE_NAME}"
          def app = docker.build("${IMAGE_NAME}", ".")
          // docker.withRegistry("http://localhost:5001", "") {
          //   app.push()
          // }
        }
      }
    }
  }
}
