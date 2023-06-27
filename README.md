

# SplitwiseClone - Node.js

This is the backend implementation of a Splitwise clone application built with Node.js. It provides the server-side functionality for managing groups, transactions, and settlements between users.

## Features

- User authentication and authorization
- Create and manage groups
- Add and remove group members - yet to implement
- Create and settle transactions within groups
- Calculate and update group balances
- Generate settlement suggestions
- Simplifying debt 

## Technologies Used

- Node.js: A JavaScript runtime environment for executing server-side code.
- Express: A fast and minimalist web application framework for Node.js.
- MongoDB: A NoSQL database for storing user, group, and transaction data.
- Mongoose: An object modeling library for MongoDB and Node.js.
- JWT (JSON Web Tokens): For user authentication and authorization.
- Bcrypt: A library for hashing and salting passwords.

## Getting Started

### Prerequisites

- Node.js (version v20.1.0): You can download and install Node.js from [https://nodejs.org](https://nodejs.org).

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/NithishCodes-2411/SplitwiseClone-Node.js/tree/main
   ```

2. Navigate to the project directory:

   ```shell
   cd splitwiseClone.Node.js
   ```

3. Install dependencies:

   ```shell
   npm install
   ```

4. Set up the environment variables:
   - Create a `.env` file in the project root directory.
   - Define the necessary environment variables in the `.env` file, such as database connection URI, JWT secret, etc.

5. Start the server:

   ```shell
   npm start
   ```

   The server will start running on `http://localhost:3000` (or a different port if specified).

6. You're ready to use the Splitwise clone backend! You can now make API requests to the available endpoints.

## API Documentation

For detailed information about the available endpoints and how to use them, refer to the API documentation provided in the [API Documentation](/docs/api.md) file.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## Contact

If you have any questions or inquiries, please contact [your-name](mailto:nituu2411@gmail.com).

---


