import {updateLoginState} from "../util/login";

export default class MockClient {
    processLogin(login_response) {
        if (login_response.token) {
            localStorage.setItem("token", login_response.token)
            updateLoginState()
        }
        return login_response
    }

    login(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    { token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMjAyMDA4MDUwOTQyMjU3NzA3ODUiLCJleHAiOjE3NzY3MDc1MjIsInJvbGUiOiJBRE1JTiJ9.lbchU4veTaBpMenHfkwyxe8hiRtV8gkln9DxMgThiZk" }
                );
            }, 250);
        }).then(this.processLogin);
    }

    getUsers() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    [{
                        first_name: "Test",
                        last_name: "User",
                        email: "user@test.com"
                    },
                    {
                        first_name: "Another",
                        last_name: "User",
                        email: "another@test.com"
                    }]
                );
            }, 250);
        })
    }

    getUserInfo(user_id) {

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                var user = null;
                if (user_id === "user@test.com") {
                    user = {
                        first_name: "Test",
                        last_name: "User",
                        email: "user@test.com",
                        zip_code: "2980",
                        length: "180",
                        phone: "+320 0000 0000 00",
                        consent_version: "0.0.0",
                        date_of_birth: "01-01-2000",
                        gender: "M"
                    }
                } else if (user_id === "another@test.com") {
                    user = {
                        first_name: "Another",
                        last_name: "User",
                        email: "another@test.com",
                        zip_code: "2980",
                        length: "180",
                        phone: "+320 0000 0000 00",
                        consent_version: "0.0.0",
                        date_of_birth: "01-01-2000",
                        gender: "V"
                    }
                };
                resolve(user);
            }, 250);
        })
    }

    getUserRecords(user_id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    {
                        record_date: "01-01-2020",
                        weight: 55.5,
                        perimeter_arm: 25.0,
                        perimeter_cut: 60,
                        perimeter_belly: 80,
                        perimeter_leg: 45,
                        perimeter_hips: 60,
                        intake_score: 3,
                        sports_score: 4
                    },
                    {
                        record_date: "02-01-2020",
                        weight: 54.5,
                        perimeter_arm: 25.0,
                        perimeter_cut: 60,
                        perimeter_belly: 80,
                        perimeter_leg: 45,
                        perimeter_hips: 60,
                        intake_score: 3,
                        sports_score: 4
                    },
                    {
                        record_date: "03-01-2020",
                        weight: 54.7,
                        perimeter_arm: 25.0,
                        perimeter_cut: 60,
                        perimeter_belly: 80,
                        perimeter_leg: 45,
                        perimeter_hips: 60,
                        intake_score: 3,
                        sports_score: 4
                    },
                    {
                        record_date: "04-01-2020",
                        weight: 53.9,
                        perimeter_arm: 25.0,
                        perimeter_cut: 60,
                        perimeter_belly: 80,
                        perimeter_leg: 45,
                        perimeter_hips: 60,
                        intake_score: 3,
                        sports_score: 4
                    }
                ]);
            }, 250);
        })
    }

    createProfile(profile) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    { response: "ok" }
                );
            }, 250);
        });
    }

    createPost(content, images, timestamp) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    { response: "ok" }
                );
            }, 250);
        });
    }

    uploadPost(content, images, timestamp) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    { response: "ok" }
                );
            }, 250);
        });
    }

    getPosts(offset, category) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    [
                        {
                            name: "Kikkererwt chocomousse",
                            img_url: "https://foodlose-images.s3.eu-west-2.amazonaws.com/choco_mousse.jpeg",
                            post_id: "20200518222222",
                            tags: ["sweet"]
                        },
                        {
                            name: "Asperges met burrata",
                            img_url: "https://foodlose-images.s3.eu-west-2.amazonaws.com/asparagus.jpeg",
                            post_id: "20200518222223",
                            tags: ["lunch", "dinner"]
                        },
                        {
                            name: "Falafel bowl",
                            img_url: "https://foodlose-images.s3.eu-west-2.amazonaws.com/falafel.jpeg",
                            post_id: "20200518222224",
                            tags: ["lunch", "dinner"]
                        },
                        {
                            name: "Blueberry pancakes",
                            img_url: "https://foodlose-images.s3.eu-west-2.amazonaws.com/pancakes.jpeg",
                            post_id: "20200518222225",
                            tags: ["zoet"]

                        },
                        {
                            name: "Torentje van zalm",
                            img_url: "https://foodlose-images.s3.eu-west-2.amazonaws.com/salmon.jpeg",
                            post_id: "20200518222226",
                            tags: ["lunch", "dinner"]

                        },
                        {
                            name: "Fruitsla",
                            img_url: "https://foodlose-images.s3.eu-west-2.amazonaws.com/fruit.jpeg",
                            post_id: "20200518222227",
                            tags: ["snack", "lunch", "breakfast"]

                        }

                    ]
                );
            }, 250);
        }).then(items => category ? items.filter(item => item.tags.includes(category)) : items);
    }

    contactMessage(first_name, last_name, email, message) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ response: "Bericht werd verzonden", color: "green" })
            }, 250);
        });
    }

    getPostDetails(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    post_id: id,
                    name: "Chocomousse met Kikkererwten",
                    img_url: "https://foodlose-images.s3.eu-west-2.amazonaws.com/choco_mousse.jpeg",
                    tags: ["sweet"],
                    text: "<p>Deze overheerlijke chocomousse kan je maken met deze ingredienten:</p><p><br></p><ul><li>Kikkererwten</li><li>Chocolade</li><li>Boter</li></ul><p><br></p><p>Mix de ingredienten en zet in de koelkast.</p><p><br></p><p><strong>Smakelijk</strong>!</p>",
                    timestamp: "2020-01-01 00:00:00"
                })
            }, 1000);
        });
    }

    deletePost(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    { response: "ok" }
                );
            }, 250);
        });
    }
}
