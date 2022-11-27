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
          def image_name = "localhost:5001:${GIT_COMMIT}"
          def app = docker.build(image_name, ".")
          docker.withRegistry("http://localhost:5001", "") {
            app.push()
          }
        }
      }
    }
  }
}
