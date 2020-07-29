def get_new_profile():
    return {
        "email": "arongeerts@hotmail.com",
        "password": "Pa$$W0rd",
        "role": "USER",
        "first_name": "Test",
        "last_name": "User",
        "gender": "X",
        "date_of_birth": "2000-01-01",
        "phone": "0032000000000",
        "zip_code": "0000",
        "consent_version": "1.0",
        "height": "200"
    }


def get_new_admin_profile():
    p = get_new_profile()
    p['email'] = "admin@foodlose.com"
    p["role"] = "ADMIN"
    return p


def get_profile_update():
    return {
        "email": "arongeerts2@hotmail.com",
        "password": "MyNewP@ssword",
        "zip_code": "9999"
    }
