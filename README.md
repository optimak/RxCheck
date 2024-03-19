# Rx Check

## Overview


The RxCheck app is a user-friendly web platform designed to empower patients in making informed decisions about their medications. It serves as a visual database, presenting comprehensive information on various drugs, enabling patients to select the most suitable medication for their needs.

### Problem

RxCheck is essential because it addresses common challenges patients face when managing their medications. These challenges include limited access to understandable drug information, high drug prices, and concerns about side effects. By offering features like price comparison, allergy alerts, and user reviews, the app empowers patients to find affordable, suitable medications and make informed decisions about their health. Overall, it simplifies medication management and improves health outcomes for users.

### User Profile

The RxCheck app is designed for anyone who needs to manage their medications effectively, including patients of all ages and demographics. Users will access the app through a user-friendly interface on their smartphones, tablets, or computers.

Here's how different users might use the app:

**Patients**: Patients will use the app to search for medications, compare prices, and access information about drug safety and side effects. They can also set up personalized profiles to receive allergy alerts and demographic-specific recommendations tailored to their needs.

**Caregivers**: Caregivers, such as family members or healthcare professionals, can use the app to help manage medications for their loved ones or patients. They can assist in searching for medications, tracking adherence, and accessing educational resources.

**Healthcare Providers**: Healthcare providers can utilize the app as a resource to educate patients about their medications, review drug information, and address any concerns or questions related to treatment plans.

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

- React.js: It will be used to improve user interface development.
- Node.js: It will be utilized for scalable server-side application development.
- Express.js: It will simplify web application development.
- JSON Web Tokens (JWT): It will ensure secure information transmission.
- Passport.js: It will simplify authentication integration.
- Axios: It will handle HTTP requests effectively.
- Material-UI: It will offer consistent and visually appealing UI design.

When exploring technologies such as Passport.js and others, it's essential to recognize potential limitations, particularly for those unfamiliar with them. These tools often come with learning curves, necessitating time to grasp their functionalities. For instance, familiarity with configuration is crucial for both Express.js and Passport.js. Moreover, understanding Material-UI's APIs may require some investment. Allocating time for learning and experimentation is vital to effectively utilize these technologies in development. To accommodate this, pure Sass will serve as a styling backup. 

### APIs

Due to the limited access to data, particularly for race and size-related drug side effects, mock data will be generated for these attributes using Chat GPT.


The open FDA API to get drug information including reactions: https://open.fda.gov/apis
The GoodRx API to obtain price information: https://www.goodrx.com/developer/documentation#ds-formathttps://www.goodrx.com/developer/documentation#ds-format



### Sitemap

Sign-In Page:

Description: Allows users to sign in to their accounts or register for a new account if they are new users.

Dashboard:

Description: The main page displaying an overview of user data, including personalized recommendations, health metrics, and options to book pharmacist calls.

Medication Search & Information:

Description: Allows users to search for medications, view detailed information, check for interactions and allergens, and read user reviews. Users can also book pharmacist calls for further assistance.

Price Comparison:

Description: Provides users with a tool to compare medication prices across different pharmacies and online retailers.

Profile & Settings:

Description: Allows users to manage their profile information, access their medical history, view and track health metrics, and adjust notification preferences. Users can also book pharmacist calls from this page.

About Us:

Description: Provides information about the app, its purpose, development team, and any relevant disclaimers or terms of service.

Trivia Section with Leaderboard:

Description: Provides users with a fun and educational trivia game related to medications, health, and wellness. Users can test their knowledge, learn new facts, and earn rewards or achievements for participating. Additionally, the trivia section includes a leaderboard that displays the top performers based on their scores and activity on the app.


### Mockups

-to come

### Data

#### User:
- **Attributes:** User ID, username, email, password, profile information (e.g., name, age, gender), preferences (e.g., notification settings), medication history.
- **Relationships:**
  - A user can have multiple medications in their history.
  - A user can interact with the trivia section and potentially have leaderboard entries.

#### Medication:
- **Attributes:** Medication ID, name, active ingredients, dosage, usage instructions, side effects, allergens.
- **Relationships:**
  - A medication can be associated with multiple users (in their history).
  - A medication can have multiple anonymous reviews.
  - A medication can be compared in the price comparison feature.

#### User-Medication Relationship:
- **Attributes:** User-Medication ID, User ID, Medication ID.
- **Relationships:**
  - This table captures the relationship between users and medications, representing instances where a user is associated with a specific medication.

#### Review:
- **Attributes:** Review ID, medication ID, rating, comments.
- **Relationships:**
  - A review is anonymous and corresponds to a specific medication.

#### Trivia Entry:
- **Attributes:** Entry ID, user ID, score.
- **Relationships:**
  - A trivia entry is associated with a user's performance in the trivia section.

#### Price Comparison Entry:
- **Attributes:** Entry ID, medication ID, pharmacy name, price.
- **Relationships:**
  - A price comparison entry corresponds to a medication being compared across different pharmacies.


### Endpoints

#### User Authentication Endpoint:

- **Method:** POST
- **Endpoint:** `/api/auth/login`
- **Parameters:**
  - `email` (string): User's email address
  - `password` (string): User's password
- **Example Response:**
  - Success: `{"success": true, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}`
  - Failure: `{"success": false, "error": "Invalid credentials"}`

#### Medication Search Endpoint:

- **Method:** GET
- **Endpoint:** `/api/medications/search`
- **Parameters:**
  - `query` (string): Search query for medication name or active ingredient
- **Example Response:**
  - Success: `[{"id": 1, "name": "Medication A", "dosage": "10mg", "side_effects": ["Drowsiness"], "price": 25.99}, ...]`
  - Failure: `{"error": "No medications found matching the search query"}`

#### User Medication History Endpoint:

- **Method:** GET
- **Endpoint:** `/api/users/:userId/medications`
- **Parameters:**
  - `userId` (string): User's unique identifier
- **Example Response:**
  - Success: `[{"id": 101, "name": "Medication A", "dosage": "10mg", "usage_instructions": "Take once daily"}, ...]`
  - Failure: `{"error": "User medication history not found"}`

#### Medication Reviews Endpoint:

- **Method:** GET
- **Endpoint:** `/api/medications/:medicationId/reviews`
- **Parameters:**
  - `medicationId` (string): Medication's unique identifier
- **Example Response:**
  - Success: `[{"id": 1, "rating": 4, "comments": "Helped with my condition", "user": "Anonymous"}, ...]`
  - Failure: `{"error": "No reviews found for this medication"}`

#### Add Medication Review Endpoint:

- **Method:** POST
- **Endpoint:** `/api/medications/:medicationId/reviews`
- **Parameters:**
  - `medicationId` (string): Medication's unique identifier
  - `rating` (integer): User's rating for the medication (1-5)
  - `comments` (string, optional): User's comments about the medication
- **Example Response:**
  - Success: `{"success": true, "message": "Review added successfully"}`
  - Failure: `{"success": false, "error": "Failed to add review"}`

#### Trivia Questions Endpoint:

- **Method:** GET
- **Endpoint:** `/api/trivia/questions`
- **Parameters:** None
- **Example Response:**
  - Success: `[{"id": 1, "question": "What is the active ingredient in Medication A?", "options": ["Ingredient A", "Ingredient B", "Ingredient C", "Ingredient D"], "correct_answer": "Ingredient A"}, ...]`
  - Failure: `{"error": "Failed to retrieve trivia questions"}`

#### Update User Information Endpoint:

- **Method:** PUT
- **Endpoint:** `/api/users/:userId`
- **Parameters:**
  - `userId` (string): User's unique identifier
  - Request body containing updated user information (e.g., username, email, password, profile information)
- **Example Response:**
  - Success: `{"success": true, "message": "User information updated successfully"}`
  - Failure: `{"success": false, "error": "Failed to update user information"}`

#### Delete Review Endpoint:

- **Method:** DELETE
- **Endpoint:** `/api/reviews/:reviewId`
- **Parameters:**
  - `reviewId` (string): Review's unique identifier
- **Example Response:**
  - Success: `{"success": true, "message": "Review deleted successfully"}`
  - Failure: `{"success": false, "error": "Failed to delete review"}`


### Auth


Server-side authorization will be used to authenticate each user for the app. This will allow the app to tailor recommendations based on choices made by the user.

## Roadmap

### Sprint Duration: 11 days

### Tasks:
### Day 0:
- Define project requirements and goals
- Create initial wireframes/mockups for app interface
- Set up project repository and version control (e.g., GitHub)

### Days 1-2: Planning and Setup
- Set up development environment (React.js, Node.js, etc.)
- Research and choose necessary libraries and frameworks (e.g., Material-UI for UI design)
- Obtain all necessary data
- Map out backend structure

### Days 3-4: Development of Sign-In Page
- Implement sign-in page functionality (frontend and backend)

### Days 5-6: Development of Dashboard Page
- Develop dashboard page with user overview and pharmacist call booking option

### Days 7-8: Development of Medication Search & Information Page
- Build medication search and information page with interaction checker and allergen alerts

### Day 9: Integration of Price Comparison Feature
- Integrate price comparison feature into the app

### Day 10: Development of Profile & Settings Page
- Develop profile and settings page for user customization and management of health metrics
- Update wireframes/mockups for app interface

### Day 11: Development of About Us Page and Trivia Section
- Implement about us page with relevant information about the app
- Create trivia section with leaderboard functionality for user engagement (least critical elements)

### Timeframe for Implementation:
- Sprint starts on Day 1.
- Sprint ends on Day 11.

### Deliverables by the end of Sprint:
- Completed sign-in page
- Dashboard with user overview and pharmacist call booking option
- Medication search and information page with interaction checker and allergen alerts
- Price comparison feature integrated into the app
- Profile and settings page for user customization and health metric management
- About us page with relevant information
- Trivia section with leaderboard functionality


## Nice-to-haves

Your project will be marked based on what you committed to in the above document. Under nice-to-haves, you can list any additional features you may complete if you have extra time, or after finishing.
The following features would be nice to haves:
1. A simple summary of all reviews of a drug product using natural language processing.
2. Ability for a user to add their own reviews and be rewarded; Gamifying the app to encourage reviews.
3. A read-aloud feature, using text to speech for easy interaction with the app.
