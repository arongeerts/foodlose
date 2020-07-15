from pydantic import BaseModel


class ContactMessage(BaseModel):
    email: str
    first_name: str
    last_name: str
    text: str

    def __str__(self):
        return f"""
Automatisch bericht gestuurd via Foodlose.be

Van: {self.first_name} {self.last_name}
Email: {self.email}
Bericht: 
{self.text}
"""
