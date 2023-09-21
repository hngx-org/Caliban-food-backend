# HNG CALIBAN BACKEND TEAM - FREE LAUNCH APP

An Express.js CRUD (Create, Read, Update, Delete) API for a MySQL Database to manage free lauch given to staffs within an organization.

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

   - git clone <repository-url>(https://github.com/hngx-org/Caliban-food-backend/)
   - cd Caliban-food-backend

2. Install dependencies:

   - npm install

### Configuration

- Create a `.env` file in the project root and configure environment-specific variables there.
- ### Example
  - PORT=6000
  - SQL_URI=mysql://myuser:mypassword@localhost:3306/mydatabase
  - NODE_ENV="development"



### Running the API

Start the API locally using the following commands:

    - npm start
    - npm run dev

The API will be accessible at http://localhost:3000 by default.

## Endpoints

The base URL for all API endpoints is: [https://](https://)

### 1. Withdraw Funds

- **Endpoint:** `/api/withdraw`
- **HTTP Method:** POST
- **Url**: [https:///api](https://)
- **Request Body**: JSON with a "userId, orgId, bank, accountNo, name, amount" field

- **Example**:
  ```json
  {
    "userId": "",
    "orgId": "",
    "bank": "",
    "accountNo": "",
    "name": "",
    "amount": "",
  }
  ```

