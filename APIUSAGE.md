# HNG CALIBAN BACKEND TEAM - FREE LUNCH APP

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

   - git clone <repository-url>(https://github.com/hngx-org/Caliban-food-backend/)
   - cd Caliban-food-backend

2. Install dependencies:

   - npm install

### Configuration

- Create a `.env` file in the project root and configure environment-specific variables there.
- ### Example
  - PORT=6000
  - DB_URI=mysql://admin:BaDMh4G2@mysql-146458-0.cloudcluster.net:10007/CaribanDB
  - NODE_ENV="development"


### Running the API

Start the API locally using the following commands:

    - npm start
    - npm run dev

The API will be accessible at http://localhost:3000 by default.

## Endpoints

The base URL for all API endpoints is: [https://freelunchcaliban.onrender.com/api/](https://freelunchcaliban.onrender.com/api/)

### 1. Withdraw Funds

- **Endpoint:** `/api/withdraw`
- **HTTP Method:** POST
- **Url**: [https://freelunchcaliban.onrender.com/api/withdraw](https://freelunchcaliban.onrender.com/api/withdraw)
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

