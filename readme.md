# Course Selling App Backend

A Node.js backend application for a course selling platform with user authentication, admin management, and course operations.

## Features

### User Features
- **User Registration**: Secure signup with email validation and password hashing
- **User Authentication**: JWT-based login system
- **Course Browsing**: View available courses
- **Course Purchase**: Buy courses with purchase tracking

### Admin Features
- **Admin Registration**: Secure admin account creation
- **Admin Authentication**: JWT-based admin login
- **Course Management**: Create, update, and manage courses
- **Course Catalog**: View all courses in the system

### Security Features
- **Password Hashing**: Uses bcrypt for secure password storage
- **Input Validation**: Zod schema validation for all endpoints
- **JWT Authentication**: Secure token-based authentication
- **Environment Variables**: Sensitive data protection

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt
- **Validation**: Zod
- **Environment**: dotenv

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "course seling app backend"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install additional packages** (if not already installed)
   ```bash
   npm install zod bcrypt
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   JWT_SECRET=your_jwt_secret_here
   ADMIN_JWT_SECRET=your_admin_jwt_secret_here
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```

5. **Start the server**
   ```bash
   node index.js
   ```
## Project Structure

```
├── config.js              # Configuration settings
├── db.js                   # Database models and connection
├── index.js                # Main application file
├── package.json            # Dependencies and scripts
├── .gitignore             # Git ignore rules
├── .env                   # Environment variables (not tracked)
├── middleware/
│   ├── admin.js           # Admin authentication middleware
│   └── user.js            # User authentication middleware
└── routes/
    ├── admin.js           # Admin route handlers
    ├── course.js          # Course route handlers
    └── user.js            # User route handlers
```

## Security

- **Password Encryption**: All passwords are hashed using bcrypt with 10 salt rounds
- **JWT Tokens**: Secure token-based authentication with expiration
- **Input Validation**: All inputs are validated using Zod schemas
- **Environment Variables**: Sensitive data stored in environment variables
- **Error Handling**: Comprehensive error handling and validation

## Development

### Adding New Features
1. Create new routes in the appropriate route file
2. Add necessary validation schemas
3. Update database models if needed
4. Test the endpoints

### Environment Setup
Make sure to set up your `.env` file with the required variables before running the application.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

