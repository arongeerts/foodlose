import http from "../util/http";
import config from '../config';
import MockClient from "./mockClient";
import {updateLoginState, loginState} from "../util/login";

export class Client {
    constructor(props) {
        this.processLogin = this.processLogin.bind(this)
    }
    
    processLogin(login_response) {
        if (login_response.token) {
            localStorage.setItem("token", login_response.token)
            updateLoginState()
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

    async getUserInfo(userId) {
        if (! userId) {
            userId = loginState.userId;
        }
        return http.get(config.url) + '/user/' + userId
    }

    async getUserRecords(userId) {
        if (!userId) {
            userId = loginState.userId;
        }
        return http.get(config.url) + '/user/' + userId + '/record'
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

    async uploadPost(post_id, name, text, tags, image, timestamp) {
        return http.put(
            config.url + '/post',
            {
                post_id: post_id,
                name: name,
                text: text,
                tags: tags,
                img_data: image,
                timestamp: timestamp
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

    async deletePost(id) {
        return http.delete(config.url + '/post/' + id)
    }
}

const apiClient = window.location.origin.includes('//localhost:3000') ? new MockClient() : new Client()
export default apiClient;