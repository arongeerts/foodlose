const local = {
    name: 'local',
    url: 'http://localhost:5000'
}

const dev = {
    name: 'dev',
    url: 'https://zp80khwwa2.execute-api.eu-west-1.amazonaws.com/Prod'
}

const prod = {
    name: 'prod',
    url: 'https://utijddwg18.execute-api.eu-west-1.amazonaws.com/Prod'
}

const config = window.location.origin.includes('//localhost:3000') ? local : (window.location.origin.includes('foodlose-site-dev') ? dev : prod)

export default config