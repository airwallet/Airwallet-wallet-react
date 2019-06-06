let _Environments = {
    production:  {BASE_URL: 'http://15.164.49.90:3001'},
    // development:  {BASE_URL: 'https://apiairwallet.com'},
    development: {BASE_URL: 'http://15.164.49.90:3001'},
}

const getEnvironment = () => {
    let platform = getPlatform()
    return _Environments[platform]
}

const getPlatform = () => {
    let environment = '';
    if (__DEV__) {
        environment = 'development';
    } else {
        environment = 'production';
    }
    return environment;
}

export const Environment = getEnvironment()
