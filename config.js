const dev = {
  apiGateway: {
    URL: 'API_BASE_URL',
  },
  cognito: {
    REGION: 'YOUR_DEV_COGNITO_REGION',
    USER_POOL_ID: 'YOUR_DEV_COGNITO_USER_POOL_ID',
    APP_CLIENT_ID: 'YOUR_DEV_COGNITO_APP_CLIENT_ID',
    IDENTITY_POOL_ID: 'YOUR_DEV_IDENTITY_POOL_ID',
  },
}

const prod = {
  apiGateway: {
    URL: 'API_BASE_URL',
  },
  cognito: {
    REGION: 'YOUR_PROD_COGNITO_REGION',
    USER_POOL_ID: 'YOUR_PROD_COGNITO_USER_POOL_ID',
    APP_CLIENT_ID: 'YOUR_PROD_COGNITO_APP_CLIENT_ID',
    IDENTITY_POOL_ID: 'YOUR_PROD_IDENTITY_POOL_ID',
  },
}

const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev

export default {
  // Add common config values here
  ...config,
}
