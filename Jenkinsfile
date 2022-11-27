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
          sh 'ls -lha'
          echo "${GIT_COMMIT}"
          def IMAGE_NAME = "localhost:5001:${GIT_COMMIT}"
          echo "${IMAGE_NAME}"
          def app = docker.build 'localhost:5001:latest'
          // docker.withRegistry("http://localhost:5001", "") {
          //   app.push()
          // }
        }
      }
    }
  }
}
