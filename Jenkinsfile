pipeline {
  agent any

  options {
    timeout(time: 20, unit: 'MINUTES')
    timestamps()
  }

  stages {
    stage('Install') {
      steps {
        runCommand('npm install')
      }
    }

    stage('Format Check') {
      steps {
        runCommand('npm run format-check')
      }
    }

    stage('Lint Check') {
      steps {
        runCommand('npm run lint-check')
      }
    }

    stage('Test Coverage') {
      steps {
        runCommand('npm run test-coverage')
      }
      post {
        always {
          archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
        }
      }
    }

    stage('Build') {
      steps {
        runCommand('npm run build')
      }
      post {
        success {
          archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: false
        }
      }
    }
  }
}

void runCommand(String command) {
  if (isUnix()) {
    sh command
  } else {
    bat command
  }
}
