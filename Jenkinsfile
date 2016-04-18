node {

   // PIPELINE STAGE
   stage "Checkout"

   // Checkout code from repository
   checkout scm

   // Get the maven tool.
   // ** NOTE: This 'M3' maven tool must be configured
   // **       in the global configuration.
   // def mvnHome = tool 'M3'

   // PIPELINE STAGE
   stage "Build"

   // Run the npm install + gulp compile (build)
   sh "npm install"
   sh "gulp build production"

    // PIPELINE STAGE
    stage "Test"
    sh "npm test"

    // PIPELINE STAGE
    stage "Deploy"
    sh "deploy"

}
