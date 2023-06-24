User Registration API
API endpoint to register a new user.

API Endpoint
arduino
Copy code
/api/user/register
Request Method
Copy code
POST
Request Body
The request body should contain the following parameters in JSON format:

Parameter	Type	Required	Description
firstName	string	Yes	First name of the user.
lastName	string	Yes	Last name of the user.
emailId	string	Yes	Email ID of the user.
password	string	Yes	Password of the user.
securityQuestion	string	Yes	Answer to a security question.
Example Request Body:

json
Copy code
{
    "firstName": "Nithish",
    "lastName": "Thirunavukkasarsu",
    "emailId": "nituu2411@hmail.com",
    "password": "Nithish@2411",
    "securityQuestion": "Halifax"
}
Response
Success Response: 200 OK

Example Response Body:

json
Copy code
{
    "message": "User Registration Success"
}
Error Response: 400 Bad Request

Example Response Body:

json
Copy code
{
    "message": "User already exists"
}
Error Response: 500 Internal Server Error

Example Response Body:

json
Copy code
{
    "message": "There is an error in the server side"
}
Please note that this is a sample API documentation template, and you can modify it according to your specific needs and requirements.