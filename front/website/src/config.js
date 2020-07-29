const local = {
    name: 'local',
    url: 'http://localhost:5000'
}

const dev = {
    name: 'dev',
    url: 'https://lz0g8kc36l.execute-api.eu-west-1.amazonaws.com/Prod'
}

const prod = {
    name: 'prod',
    url: 'https://utijddwg18.execute-api.eu-west-1.amazonaws.com/Prod'
}

const config = window.location.origin.includes('//localhost:3000') ? local : (window.location.origin.includes('//localhost:3001') ? dev : prod)

export default config