pipeline {
    agent {
        docker {
            image "ubuntu:22.04"
        }
    }

    stages {
        stage("say Hello") {
            step("Say hello") {
                echo "Say Hello"
            }
        }
    }
}
