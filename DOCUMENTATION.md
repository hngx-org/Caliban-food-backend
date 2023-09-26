# Team Caliban - Free Lunch Endpoint

An Express.js CRUD (Create, Read, Update, Delete) API for a MySQL Database to manage free lunch given to staffs within an organization.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the API](#running-the-api)
- [Endpoints](#endpoints)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed. [Download Node.js](https://nodejs.org/)

## Getting Started

### Installation

1. Clone the repository:

```
 git clone <repository-url>(https://github.com/hngx-org/Caliban-food-backend/)
 cd Caliban-food-backend
```

2. Install dependencies:

```
npm install
```

### Configuration

- Create a `.env` file in the project root and configure environment-specific variables.
- ### Example:
- PORT=6000
- DB_URI=mysql://admin:BaDMh4G2@mysql-146458-0.cloudcluster.net:10007/CaribanDB
- NODE_ENV="development"

### Running the API

Start the API locally using the following commands:

```
npm start
npm run dev
```

The API will be accessible at http://localhost:3000 by default.

## Endpoints

The base URL for all API endpoints is: [https://freelunchcaliban.onrender.com/api/](https://freelunchcaliban.onrender.com/api/)

## Authentication

1. User Login (_organization/user_)

- **Endpoint:** `/api/login`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "data": {
      "access_token": "your-auth-token-here",
      "email": "email@mail.com",
      "id": "random_id",
      "isAdmin": false
    }
  }
  ```

2. User Signup (_organization only_)

- **Endpoint:** `/api/staff/signup`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "first_name": "John",
    "last_name": "Doe",
    "phonenumber": "1234567890"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User created successfully",
    "statusCode": 201
  }
  ```

3. Create Organization

- **Endpoint:** `/api/create`
- **Method:** POST
- **Headers:** Authorization: Bearer <access_token>
- **Description:** This is a PUT Method because a lunch prize is assigned to the organization table along with the org_id field on creating the user. The user must be logged in automatically after being created using the access token returned. The access token would then be used to update the organization name and lunch price on the table. [CONSUMED.]
- **Request Body:**
  ```json
  {
    "organization_name": "HNG",
    "lunch_price": 1000
  }
  ```
- **Response :**
  ```json
  {
    "message": "Organisation created successfully",
    "statusCode": 201
  }
  ```

4. Create Organization Invite (_Admin Only_)

- **Endpoint:** `/api/invite`
- **Method:** POST
- **Headers:** Authorization: Bearer <access_token>
- **Description:** Allows an admin user to send an invitation to join the organization.
- **Request Body:**
  ```json
  {
    "email": "jane@example.com"
  }
  ```
- **Response Body:**
  ```json
  {
    "message": "success",
    "statusCode": 200,
    "data": null
  }
  ```

5. Staff Signup (_Staff only_)

- **Endpoint:** `/api/staff/signup`
- **Method:** POST
- **Description:** A 6-digit OTP code will be sent to the user's email during the invitation, the token sent will be used within the otp_token field
- **Request Body:**

  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "otp_token": 134256,
    "first_name": "John",
    "last_name": "Doe",
    "phonenumber": "1234567890"
  }
  ```

- **Response:**
  ```json
  {
    "message": "Staff created successfully",
    "statusCode": 201,
    "data": {
      "email": "user@example.com",
      "password": "password123",
      "otp_token": 134256,
      "first_name": "John",
      "last_name": "Doe",
      "phonenumber": "1234567890"
    }
  }
  ```

## User Section

1. Get a User Profile

- **Endpoint:** `/api/profile`
- **Method:** GET
- **Headers:** Authorization: Bearer <access_token>
- **Request Response:**
  ```json
  {
    "message": "User data fetched successfully",
    "statusCode": 200,
    "data": {
      "first_name": "John",
      "last_name": "Doe",
      "phonenumber": "1234567890",
      "email": "john@mail.com",
      "profile_picture": "user-profile-picture-url",
      "bank_number": "1234-5678-9012-3456",
      "bank_code": "123456",
      "bank_name": "Bank Name",
      "isAdmin": true
    }
  }
  ```

2. Add Bank Account

- **Endpoint:** `/api/bank`
- **Method:** POST
- **Headers:** Authorization: Bearer <access_token>
- **Request Body:**
  ```json
  {
    "bank_number": "1234-5678-9012-3456",
    "bank_code": "123456",
    "bank_name": "Bank Name"
  }
  ```
- **Response:**
  ```json
  {
    "message": "successfully created bank account",
    "statusCode": 200
  }
  ```

3. Get all Users

- **Endpoint:** `/api/users`
- **Method:** GET
- **Headers:** Authorization: Bearer <access_token>
- **Request Body: None**
- **Response:**
  ```json
  {
    "message": "successfully created bank account",
    "statusCode": 200,
    "data": [
      {
        "name": "John Doe",
        "email": "john@mail.com",
        "profile_picture": "user-profile-picture-url",
        "user_id": ""
      },
      {
        "name": "John Doe",
        "email": "john@mail.com",
        "profile_picture": "user-profile-picture-url",
        "user_id": ""
      }
    ]
  }
  ```

4. Search Users

- **Endpoint:** `/api/search`
- **Method:** GET
- **Headers:** Authorization: Bearer <access_token>
- **Request Body: None**
- **Response:**
  ```json
  {
    "message": "User found",
    "statusCode": 200,
    "data": {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@mail.com",
      "profile_picture": "user-profile-picture-url",
      "user_id": ""
    }
  }
  ```

## Lunch Section

1. Send a Lunch

- **Endpoint:** `/api/send`
- **Method:** POST
- **Description:** Create a new lunch request.
- **Headers:** Authorization: Bearer <access_token>
- **Request Body:**
  ```json
  {
    "receivers": ["user_id"],
    "quantity": 5,
    "note": "Special instructions for the lunch"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Lunch request created successfully",
    "statusCode": 201,
    "data": {}
  }
  ```

2. Get a Lunch

- **Endpoint:** `/api/:id`
- **Method:** GET
- **Description:** Get a specific lunch
- **Headers:** Authorization: Bearer <access_token>
- **Request Body: None**
- **Response:**
  ```json
  {
    "message": "Lunch request fetched successfully",
    "statusCode": 200,
    "data": {
      "receiverId": "",
      "senderId": "",
      "quantity": 5,
      "redeemed": false,
      "note": "Special instructions for the lunch",
      "created_at": "",
      "id": ""
    }
  }
  ```

3. Get all Lunches

- **Endpoint:** `/api/all`
- **Method:** GET
- **Description:** Get all lunch requests available for that user
- **Headers:** Authorization: Bearer <access_token>
- **Request Body: None**
- **Response:**
  ```json
  {
    "message": "Lunch requests fetched successfully",
    "statusCode": 200,
    "data": [
      {
        "receiverId": 2,
        "senderId": 1,
        "quantity": 5,
        "redeemed": false,
        "note": "Special instructions for the lunch",
        "created_at": "",
        "id": 1
      },
      {
        "receiverId": 1,
        "senderId": 2,
        "quantity": 5,
        "redeemed": false,
        "note": "Special instructions for the lunch",
        "created_at": "",
        "id": 2
      }
    ]
  }
  ```

## Withdraw Funds

- **Endpoint:** `/api/withdraw`
- **HTTP Method:** POST
- **Url**: [https://freelunchcaliban.onrender.com/api/withdraw](https://freelunchcaliban.onrender.com/api/withdraw)
- **Request Body**:
  ```json
  {
    "userId": "",
    "orgId": "",
    "bank": "",
    "accountNo": "",
    "name": "",
    "amount": ""
  }
  ```
