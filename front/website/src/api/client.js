import http, { setGlobalHeader } from "../util/http";
import config from '../config';
import MockClient from "./mockClient";

export class Client {
    constructor(props) {
        this.user_id = null;
        this.token = null;
        this.login = this.login.bind(this)
        this.processLogin = this.processLogin.bind(this)
    }
    
    processLogin(login_response) {
        if (login_response.token) {
            this.token = login_response.token;

            var base64Url = this.token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            var decoded = JSON.parse(jsonPayload);
            if (decoded.user_id) {
                this.user_id = decoded.user_id;
            }

            setGlobalHeader('Authorization', this.token)
            localStorage.setItem('token', this.token)
        }

        return login_response
    }

    async login(email, password) {
        return http.post(config.url + '/login',
            {
                email: email,
                password: password
            }
        ).then(this.processLogin)
    }

    async getUsers() {
        return http.get(config.url + '/user')
    }

    async getUserInfo(user_id) {
        if (! user_id) {
            user_id = this.user_id;
        }
        return http.get(config.url) + '/user/' + user_id
    }

    async getUserRecords(user_id) {
        if (!user_id) {
            user_id = this.user_id;
        }
        return http.get(config.url) + '/user/' + user_id + '/record'
    }

    async createProfile(profile) {
        return http.post(
            config.url + '/user',
            profile
        )
    }

    async createPost(name, text, tags, image) {
        return http.post(
            config.url + '/post',
            {
                name: name,
                text: text,
                tags: tags,
                img_data: image
            }
        )
    }

    async getPosts(offset, category) {
        return http.get(config.url + '/post?last_post_id=' + offset).then(items => category ? items.filter(item => item.tags.includes(category)) : items);
    }

    async contactMessage(first_name, last_name, email, message) {
        return http.post(config.url + '/contact',
            {
                first_name: first_name,
                last_name: last_name,
                email: email,
                message: message
            }
        )
    }

    async getPostDetails(id) {
        return http.get(config.url + '/post/' + id)
    }
}

const apiClient = window.location.origin.includes('//localhost:3000') ? new MockClient() : new Client()
export default apiClient;