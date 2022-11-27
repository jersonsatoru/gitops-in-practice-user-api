def SHORT_SHA
def CURRENT_ENV

def getCurrentEnv(branch_name) {
  if (branch_name == 'develop') {
    return 'develop'
  } else {
    return 'local'
  }
}

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
          CURRENT_ENV = getCurrentEnv("${env.BRANCH_NAME}")
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
        dir('k8s/projects/user-api/overlays/development') {
          sh 'ls -lha'
          sh "kustomize edit set image localhost:5001/user-api:${SHORT_SHA}"
        }

        // withCredentials([sshUserPrivateKey(credentialsId: "jenkins_k8s", keyFileVariable: 'SSH_KEY')]) {
          sh 'git config --global user.name jenkins'
          sh 'git config --global user.email jenkins@jersonsatoru.com.br'
          sh 'git add -A'
          sh "git commit -m 'env: ${CURRENT_ENV}: hash: ${SHORT_SHA}'"
          sh "git remote -v"
          sh "git push origin develop"
          // sh "GIT_SSH_COMMAND=\"ssh -i ${SSH_KEY}\" git push origin develop"
        // }
      }
    }
  }
}
