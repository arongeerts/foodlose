import { setGlobalHeader } from "./http";

export const loginState = {
    userId: "",
    token: "",
    role: "",
    loggedIn: false
}

export function updateLoginState() {
    const token = localStorage.getItem('token') || ''

    if (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        var decoded = JSON.parse(jsonPayload);
        if (decoded.user_id && decoded.role && decoded.exp) {
            // Check if token is still valid
            if (Date.now() <= decoded.exp * 1000) {
                loginState.userId = decoded.user_id;
                loginState.role = decoded.role;
                loginState.token = token
                loginState.loggedIn = true
                setGlobalHeader('Authorization', token)
            }
        }
    }
}

export function logout() {
    loginState.userId = "";
    loginState.token = "";
    loginState.role = "";
    loginState.loggedIn = false;
    setGlobalHeader('Authorization', '')
}