# API Documentation

## Authentication Endpoints

- **POST** `/api/auth/register`
  - Description: Register a new user.
  - Request Body: 
    - `username`: string
    - `password`: string
    - `email`: string
  - Response: 
    - `201 Created`: User registered successfully.
    - `400 Bad Request`: Validation errors.

- **POST** `/api/auth/login`
  - Description: Log in an existing user.
  - Request Body: 
    - `username`: string
    - `password`: string
  - Response: 
    - `200 OK`: Login successful, returns user data and token.
    - `401 Unauthorized`: Invalid credentials.

- **POST** `/api/auth/refresh-token`
  - Description: Refresh the authentication token.
  - Request Body: 
    - `refreshToken`: string
  - Response: 
    - `200 OK`: Returns new access token.
    - `401 Unauthorized`: Invalid refresh token.

## Student Endpoints

- **GET** `/api/students`
  - Description: Retrieve a list of students.
  - Response: 
    - `200 OK`: Returns an array of student objects.

- **POST** `/api/students/submit`
  - Description: Submit a new student record.
  - Request Body: 
    - `name`: string
    - `age`: integer
    - `class`: string
  - Response: 
    - `201 Created`: Student record created successfully.
    - `400 Bad Request`: Validation errors.

## Parent Endpoints

- **GET** `/api/parents`
  - Description: Retrieve a list of parents.
  - Response: 
    - `200 OK`: Returns an array of parent objects.

- **POST** `/api/parents/submit`
  - Description: Submit a new parent record.
  - Request Body: 
    - `name`: string
    - `relationship`: string
  - Response: 
    - `201 Created`: Parent record created successfully.
    - `400 Bad Request`: Validation errors.

## Medical Endpoints

- **GET** `/api/medical`
  - Description: Retrieve medical records.
  - Response: 
    - `200 OK`: Returns an array of medical records.

- **POST** `/api/medical/submit`
  - Description: Submit a new medical record.
  - Request Body: 
    - `studentId`: string
    - `medicalCondition`: string
  - Response: 
    - `201 Created`: Medical record created successfully.
    - `400 Bad Request`: Validation errors.
