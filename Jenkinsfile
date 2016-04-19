#!groovy

node {


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
    //sh "npm test unit"

    // PIPELINE STAGE
    stage 'Deploy'
    //sh "deploy code"

}


return this;