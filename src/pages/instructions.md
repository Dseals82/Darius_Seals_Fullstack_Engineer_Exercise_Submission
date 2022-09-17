# Exercises

The data be fetched is all publicly available at https://datausa.io/, which is powered by a public API that can be accessed without an API key. The goal of these exercises is to write implementations that match the acceptance criteria.

Recommended approach:

-   For each exercise, create a pull request (PR) and merge your PR into main for your repository

## Reference

There is an example page at http://localhost:3000/states, that searches for all the available states and returns that data in a tabular form that you can reference as part of completing these exercises.
It contains a rough example of an acceptable UI for displaying the data as well as showing how to retrieve the ID for a state which is a required input for the subsquent APIs you'll need to complete the exercises.

## Setup

-   `yarn install` : downloads all the dependencies for the app
-   `yarn start` : starts the frontend React app. Changes will cause a reload
-   `yarn server:watch` : starts the backend API. Changes will cause a reload of the server

## 1. Create a UI for visualizing interstate trade for a state

### Acceptance Criteria

-   As a user, I should be able to search for a state
-   This should be implemented at http://localhost:3000/trade
-   As a user, I should be able to see (per state):
    -   The total $ amount for all interstate trade for the state
    -   The total tons for all interstate trade for for the state
    -   The top five states in terms of $ amounts
    -   The top five states in terms of tons
-   There are tests covering this functionality

### Implementation Notes

-   Implement your solution in InterstateTrade.tsx
-   [This](https://datausa.io/api/data?Origin%20State=04000US51&measure=Millions%20Of%20Dollars,Thousands%20Of%20Tons&drilldowns=Destination%20State&year=latest) is an example URL (for Virginia/04000US51) that returns the data.
-   The data can be fetched directly from the datause.io API in the browser (this is how the example State search is implemented)

### Example UI

![Exercise 1](images/exercise-1.png)

## 2. Update the graphql server to return states, the employment industry and median household income

### Acceptance Criteria

-   As a user, I would like be able to query a graphql endpoint to fetch data on
    -   Interstate trade
    -   Employment industries
    -   Domestic Production
-   As a user, I would like to be select the data I would like to see (per state):
    -   Interstate trade (identical view to the one created in Exercise 1)
    -   Employment Industries
        -   The top industry in terms of number of people working in it
        -   The top industry in terms of average salary
    -   Domestic Production
        -   The top five produced goods per state in terms of dollars
        -   The top five produced goods per state in terms of tons
    -   This should be implemented at http://localhost:3000/economy
-   There are tests covering this feature

### Implementation Notes

-   There is an existing graphql query that can be referenced as an example. It queries for states and accepts an optional name parameter
-   The graphql queries can be explored and tested locally at [graphql](http://localhost:4000/graphql)
-   Example link for domestic production data for Virgnia: https://datausa.io/api/data?Origin%20State=04000US51&measure=Millions%20Of%20Dollars,Thousands%20Of%20Tons&drilldowns=SCTG2&year=latest
-   Example link for employment industries data for Virginia: https://datausa.io/api/data?Geography=04000US51&measure=Total%20Population,Average%20Wage&drilldowns=Industry%20Group&Year=latest

### Example UI

![Exercise 2](images/exercise-2.png)

## 3. Create a login flow and restrict access to the existing pages when a user is not logged in

### Acceptance Criteria

-   As a user, I should be able to sign up for an account and access the other pages
    -   To sign up, I need to enter a username and password; implemented at http://localhost:3000/signup
    -   The sign up form should ask user to confirm the password; implemented at http://localhost:3000/login
-   As as a user, I should be able to login and be shown an error message if the username or password are wrong
-   As a user, I should only be able to access the home route (`/`) if I'm not logged in

#### Implementation Notes

-   Recommended approach is use to passport, but you are welcome to choose any implementation
-   There is an existing table/model for a user
-   Encrypting a password is not a requirement of this ticket
-   The new endpoints should be implemented as RESTful endpoints in the express API

### Example UI

![Exercise 3 Signup](images/exercise-3-signup.png)
![Exercise 3 Login](images/exercise-3-login.png)

## Troubleshooting

-   If you encounter an issue fetching a data from the API, it is possible that you've hit the rate limiting implemented by datausa.io. To resolve it, simply visit https://datausa.io/api/data?Origin%20State=04000US51&measure=Millions%20Of%20Dollars,Thousands%20Of%20Tons&drilldowns=Destination%20State&year=latest directly and complete the captcha.
-   If you encounter an issue with `yarn install` while installing sqlite3 (likely only if you have an M1 machine), it is likely caused by using the wrong version of python. To fix it run, `yarn install -python=/usr/bin/python2`
