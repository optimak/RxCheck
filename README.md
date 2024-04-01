# Rx Check

## Overview


The RxCheck app is a user-friendly web platform designed to empower patients in making informed decisions about their medications. It serves as a visual database, presenting comprehensive information on various drugs, enabling patients to select the most suitable medication for their needs.

This project has an accompanyin backend found here: https://github.com/optimak/rxcheck-backend
### How to Run the App
Clone the repository and run  `npm install ` in your terminal .
Then run  `npm start`.

### Problem

RxCheck is essential because it addresses common challenges patients face when managing their medications. These challenges include limited access to understandable drug information, high drug prices, and concerns about side effects. By offering features like price comparison, allergy alerts, and user reviews, the app empowers patients to find affordable, suitable medications and make informed decisions about their health. Overall, it simplifies medication management and improves health outcomes for users.

### User Profile

The RxCheck app is designed for anyone who needs to manage their medications effectively, including patients of all ages and demographics. Users will access the app through a user-friendly interface on their smartphones, tablets, or computers.

Here's how different users might use the app:

**Patients**: Patients will use the app to search for medications, compare prices, and access information about drug safety and side effects. They can also set up personalized profiles to receive allergy alerts and demographic-specific recommendations tailored to their needs.

**Caregivers**: Caregivers, such as family members or healthcare professionals, can use the app to help manage medications for their loved ones or patients. They can assist in searching for medications, tracking adherence, and accessing educational resources.


Special considerations for the app include:

Accessibility: Ensuring that the app is accessible to users with disabilities by incorporating features such as adjustable font sizes.

Privacy and Security: Implementing security measures like Authentication to protect user data.


### Features

User Registration and Authentication:
- As a user, I want to be able to register for an account with my email address and password, so I can access personalized features and securely manage my medications without having to update my filters each time.

Medication Search and Information:
- As a user, I want to search for medications by name, condition, or active ingredient, so I can find information about their uses, dosage, side effects, and interactions.

Price Comparison Tool:
- As a user, I want to compare prices for medications across different pharmacies and online retailers, so I can find the most affordable options for my prescriptions.

Allergy Alerts:
- As a user, I want to receive alerts for medications that contain ingredients I'm allergic to, so I can avoid potential allergic reactions and adverse effects.

Demographic-specific Recommendations:
- As a user, I want to receive personalized recommendations for medications based on my age, sex, and other demographic factors, so I can make informed decisions about my treatment options.

User Reviews and Ratings:
- As a user, I want to read reviews and ratings from other users about their experiences with medications, so I can gauge their effectiveness and tolerability.

Drug Interaction Checker:
- As a user, I want to check for potential interactions between medications, supplements, and over-the-counter drugs, so I can prevent adverse drug interactions and ensure medication safety.

Text-to-Speech Output:
- As a visually-impaired user, I want the app to read out relevant information about medications using text-to-speech functionality, so I can access information audibly.

Privacy and Security Measures:
- As a user, I want assurance that my personal health information and usage data will be kept secure and private, in compliance with relevant regulations and best practices.

Feedback and Support:
- As a user, I want to provide feedback on medications, report issues, and request assistance through the app, so I can get the most out of my medication.

Accessibility Features:
- As a user, I want the app to be accessible to individuals with disabilities, with features such as adjustable font sizes.

Gamification Elements:
- As a user, I want to earn rewards, achievements, and incentives for staying engaged with the app regularly, so I can feel motivated and empowered to manage my health effectively.


## Implementation

### Tech Stack

- React.js:  Used to improve user interface development.
- Node.js: Utilized for scalable server-side application development.
- Express.js: Simplified web application development.
- JSON Web Tokens (JWT): Ensured secure information transmission.
- Axios: Handled HTTP requests effectively.
- Sass: Styled React components to meet requirements



### APIs

Due to the limited access to data, particularly for race and size-related drug side effects, mock data was be generated for these attributes.



### Sitemap

Sign-In Page:

Description: Allows users to sign in to their accounts or register for a new account if they are new users.

Dashboard:

Description: The main page displaying an overview of user data, not yet including personalized recommendations, health metrics, and options to book pharmacist calls.

Medication Search :

Description: Allows users to search for medications 

Details / Information :
Here useres can view detailed information and later check for interactions and allergens, and read user reviews. Users will later be able to book pharmacist calls for further assistance.


### Mockups

-to come

### Data

#### User:
- **Attributes:** User ID, full name, email, password, profile information (e.g., age, gender), medication history like pre-existing conditions.
- **Relationships:**
  - A user can comment on multiple medications.

#### Medication:
- **Attributes:** Medication ID, name, active ingredients, dosage, usage instructions, side effects, allergens.
- **Relationships:**
  - A medication can be associated with multiple users (in their history).
  - A medication can have multiple anonymous reviews.
  - A medication can be compared in the price comparison feature.



#### Comments/Review (uses User-Medication Relationship):
- **Attributes:** Review ID, medication ID, rating, comments.
- **Relationships:**
  - A review is tied to the user and corresponds to a specific medication.



### Endpoints

The following endpoints were created, though some will be used in future updates:
- Sign up : POST */users/register* ; 
Body: 
`{
    "full_name": "Test Name ",
    "email" : "test@gmail.com",
    "password": "testpassword"
}`
- Log in : POST  */users/login* ; 
Body: 
`{
    "email" : "test@gmail.com",
    "password": "testpassword"
}`
- Get Profile : GET */users/profile* ; 
Bearer token obtained from Log in is used.

- Get Medication Comments : GET *comments/:medicationID* ; 
- Add Comment : POST *comments/:medicationID*; 
Sample Body:
`{ "user_id": 2, "medication_id": 10, "content": "content of comment submitted" }`
- Delete Comment : DELETE *comments/:medicationID*; 
- Get Medications : GET *medications* ; 
- Get Medications by condication (indication): GET *medications/search* ; 
?query=*query*

### Auth


Client-side and Server-side authorization were used to authenticate each user for the app. This allows the app to tailor recommendations based on choices made by the user.

## Roadmap

### Deliverables by the end of Sprint:
- Completed sign-in page
- Dashboard with user overview and pharmacist call booking option
- Medication search and information page with interaction checker and allergen alerts


## Nice-to-haves


The following features would be nice to haves and will be explored in future updates:
1. A simple summary of all reviews of a drug product using natural language processing.
2. Ability for a user to add their own reviews and be rewarded; Gamifying the app to encourage reviews.
3. A read-aloud feature, using text to speech for easy interaction with the app.
