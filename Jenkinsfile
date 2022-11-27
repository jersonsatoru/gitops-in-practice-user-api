pipeline {
  agent any

  options {
    timestamps()
  }

  stages {
    stage('Docker build') {
      steps {
        script {
          def app = docker.build 'localhost:5001/user-api:latest'
          docker.withRegistry("http://localhost:5001", "") {
            app.push()
          }
        }
      }
    }
  }
}
