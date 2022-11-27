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
          def app = docker.build 'localhost:5001/user-api:latest'
          // docker.withRegistry("http://localhost:5001", "") {
          //   app.push()
          // }
        }
      }
    }
  }
}
