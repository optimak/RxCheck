
# :pill: Rx Check

## Overview


The RxCheck app is a responsive user-friendly platform designed to empower patients and caretakers in making informed decisions about their medications. It serves as a visual database, presenting comprehensive information on various drugs in a simple cutter-free way, enabling patients to select the most suitable medication for their needs.

This project has an accompanying backend repository found here: 
[RxCheck Backend Repository](https://github.com/optimak/rxcheck-backend "RxCheck Backend")


  
##  
<! --## Preview

![Alt Text](https://lh3.googleusercontent.com/drive-viewer/AKGpihYuZCvhS5gCfGIhL7qG6gA6C9g_xmWYyZw7GJK6fuhW9VUbn5u7a0xikxrAqTF71bagJZBzAqJJyyR3cuvidn3ItAJM2ho8ZBU=s2560)
##  -->

## Live Site
Checkout rxcheck at https://rxcheck.chiaghaizu.com.

Use the demo account:
username: testname@example.com
password: J.hnd.e
##
## Installation
To run locally, you will need node, npm and MySQL already installed. The backend will also need to be setup to get the app to work accurately.

The process can be found [here](https://github.com/optimak/rxcheck-backend#installation).

With these already completed, continue with the following steps:

- Clone the repository and run  `npm install ` in the rxcheck directory of your terminal.
```bash
npm install
``` 
- Configure Environment variables:
Create a file named  `.env` and add the line below. 
```bash
REACT_APP_API_URL= http://localhost:8080/
```
> :memo: **Note**
 Since *8080* is the port number, it could be changed to the port where the server (rxcheck-backend) is actively running.


- Then run  `npm start`.
``` bash
npm start
```



##
## Features

*User Registration and Authentication*

*Medication Search and Information:*
- Users can search for medications by name, condition, or active ingredient.
  

*Risk / Allergy Alerts:*
- Users are notified of potential allergic reactions and adverse effects.


*User Reviews and Feedback:*
- Users can read reviews from other users about their experiences with medications, and also give theirs.



## Implementation

### Tech Stack

Front-End
- React.js:  Used to improve user interface development.
- Axios: Handled HTTP requests effectively.
- Sass: Styled React components to meet requirements

Back-End
- Node.js: Utilized for scalable server-side application development.
- Express.js: Simplified web application development.
- JSON Web Tokens (JWT): Ensured secure information transmission.
- bcrypt: password hashing

<br>

### Sitemap

*Sign-In Page:*

Allows users to sign in to their accounts or register for a new account if they are new users. This is the default page.

*Dashboard:*

The main page displaying an overview of user data, not yet including personalized recommendations and app usage metrics.

*Medication Search :*

Allows users to search for medications 

*Details / Information :*
Here users can view detailed information and later check for potential interactions and allergens, and read user reviews. 

*About Page:*
Users are given an overview of the RxCheck site on this page. It is also linked to the dashboard and the Medication Search page.
###
## Backend Information
  
### APIs

No external APIs were used.
Due to the limited access to data, particularly for obtaining information for more personalized drug side effects, mock data was be generated for all medications and their attributes. 

### Data
![Alt Text](https://lh3.googleusercontent.com/drive-viewer/AKGpihahfoU-SUzxwynjGjlNihTt5BKdMR36ON8Qs65JDfBwRHRt4GebcDW7apD8NG8xYFpKbx7csz2uiF_shI91TIwLZIqIIqsXuw=s1600-rw-v1)
#### User:
- **Attributes:** User ID, full name, email, password (encrypted), age, gender, pre-existing conditions, account creation date and last login date.
- **Relationships:**
  - A user can comment on multiple medications and comments.

#### Medication:
- **Attributes:** Medication ID, name, active ingredients, indications, side effects, food interactions and contra-indications.
- **Relationships:**
  - A medication can be associated with multiple users (in their history).
  - A medication can have multiple anonymous reviews.
  - A medication can be compared in the price comparison feature.



#### Comments/Review (uses a User-Medication Relationship):
- **Attributes:** Comment/Review ID, medication ID, user ID, comment content, time created, time updated.
- **Relationships:**
  - A review is tied to the user and corresponds to a specific medication.

#### User-Medications (Medications saved by a User) :
- **Attributes:** User-Medication ID, User ID, Medication ID.
- **Relationships:**
  - Each entry ties the user to the medication they have saved a specific medication.
##
### Endpoints

The following endpoints were created, though some will be used in future updates:

**Sign Up User**
-  POST  *api/users/register* 

Sample Body: 
```
{
    "full_name": "Test Name ",
    "email" : "test@gmail.com",
    "password": "testpassword"
}
```
**Log In User** 
- POST  *api/users/login* 

Sample Body: 
```
{
    "email" : "test@gmail.com",
    "password": "testpassword"
}
```
Sample Response: 
```
{
    "token" : "kyhdgHyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImVtYWlsIjoibWF5QGV4YsbF9uYW1lIjoiTWF5IEp1bHkiLCJpYXQiOjE3MTQzNTY4ODQsImV4cCI6MTcxNDM4NTY4NH0.TxSYodYC0cweOXTXnNr_ybdpRJ02EjsRT8QeZhSfNE4",
}
```
**Get User Profile**
 - GET *api/users/profile* 
Bearer token obtained from Log in is used in body.

Sample Body: 
```
{
    "token" : "kyhdgHyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImVtYWlsIjoibWF5QGV4YsbF9uYW1lIjoiTWF5IEp1bHkiLCJpYXQiOjE3MTQzNTY4ODQsImV4cCI6MTcxNDM4NTY4NH0.TxSYodYC0cweOXTXnNr_ybdpRJ02EjsRT8QeZhSfNE4",
}
```
**Get all User's Comments**

 GET *api/all/:userID*  


**Get a Medication's Comments**

 GET *api/comments/:medicationID*  

**Add Comment to Medication**

 POST *api/comments/:medicationID* 
 
Sample Body:
```
{ "user_id": 2, "medication_id": 10, "content": "it works great!" }
```
**Delete a Medication's Comment** 
 
 DELETE *api/comments/:commentID*


**Get All Medications**

GET *api/medications* 

**Get Medications Saved by User**

GET *api/users/:userID/meds*

**Delete a Medication Saved by User**

DELETE *api/users/:userID/meds/:medicationID*

**Get Medications by condition (indication)**

GET *api/medications/search/?query=*query**


### Auth


Client-side and Server-side authorization were used to authenticate each user for the app. This allows the app to tailor recommendations based on choices made by the user.
#
<br>

## Roadmap

### Deliverables completed by the end of Sprint:
- Completed log-in and sign-up page
- Dashboard with user overview and app usage details
- Medication search and information page with interaction checker and allergen alerts


### Nice-to-haves


The following features would be nice to haves and will be explored in future updates:
1. A simple summary of all reviews of a drug product using natural language processing.
2. Ability for a user to add their own reviews and be rewarded; Gamifying the app to encourage reviews.
3. A read-aloud feature, using text to speech for easy interaction with the app.
