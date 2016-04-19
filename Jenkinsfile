#!groovy

node {

    properties ([[$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '5', daysToKeepStr: '', numToKeepStr: '5']]])


    // PIPELINE STAGE
    stage 'Provisioning'

    // PIPELINE STAGE
    stage 'Checkout'

    // Checkout code from repository
    checkout scm

    // PIPELINE STAGE
    stage 'Build'

    // Run the npm install + gulp compile (build)
    sh "npm install"

    // PIPELINE STAGE
    stage 'Test'
    sh "npm test"

    // PIPELINE STAGE
    stage 'Deploy'
    //sh "deploy code"

}


return this;