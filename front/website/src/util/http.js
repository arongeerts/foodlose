import qs from 'qs'

const globalHeaders = {}

export function setGlobalHeader(name, value) {
    globalHeaders[name] = value
}

function processError(r, contentType) {
    if (contentType === 'application/json') {
        return r.json().then(res => {
            const error = new Error(res ? res.detail : r.status)
            error.status = r.status
            if (error.status == 401 || error.status == 403) {
                window.location.href = window.location.origin + "/#/login"
            }
            throw error
        })
    }
    throw new Error()
}

function processResponse(r) {
    const contentType = r.headers.get('content-type')
    if (!r.ok) {
        return processError(r, contentType)
    }
    if (contentType === 'application/json') {
        return r.json()
    } else if (contentType === 'application/octet-stream') {
        return r.blob()
    }
    return r
}

export default {
    post(url, payload, headers) {
        return fetch(url, {
            method: 'POST',
            headers: Object.assign(
                { 'Content-Type': 'application/json' },
                globalHeaders,
                headers
            ),
            body: JSON.stringify(payload)
        }).then(processResponse)
    },
    get(url, query) {
        if (query) {
            const queryString = qs.stringify(query)
            url = url + '?' + queryString
        }

        return fetch(url, {
            headers: globalHeaders
        }).then(processResponse)
    },
    delete(url) {
        return fetch(url, {
            method: 'DELETE',
            headers: globalHeaders
        }).then(processResponse)
    },
    put(url, payload, headers) {
        return fetch(url, {
            method: 'PUT',
            headers: Object.assign(
                { 'Content-Type': 'application/json' },
                globalHeaders,
                headers
            ),
            body: JSON.stringify(payload)
        }).then(processResponse)
    }
}
