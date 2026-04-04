# Finance Dashboard Backend

A production-quality finance dashboard backend built with Node.js, Express, and MongoDB.

## Features

- **Authentication & RBAC**: JWT-based authentication with role-based access control (Admin, Analyst, Viewer).
- **User Management**: Admin can manage users (create, update, delete, role changes, toggle active/inactive status).
- **Financial Records**: Full CRUD for income and expense records with soft delete support.
- **Dashboard Analytics**: Advanced aggregation pipelines for summary stats and monthly trends.
- **Robustness**: Rate limiting, security headers (Helmet), CORS, and centralized error handling.
- **Validation**: Strict schema validation using Joi.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security**: JWT, BcryptJS, Helmet, Express-Rate-Limit
- **Validation**: Joi
- **Logging**: Morgan

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB Atlas account or local MongoDB instance

### Installation

1.  Clone the repository and install dependencies:
    ```bash
    npm install
    ```

2.  Configure Environment Variables:
    Create a `.env` file in the root directory and add:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_atlas_uri
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRE=30d
    NODE_ENV=development
    ```

3.  Run the Application:
    ```bash
    # For development (with nodemon)
    npm run dev

    # For production
    npm start
    ```

## API Specification (Endpoints)

### Auth & User Management
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/api/v1/auth/register` | Register new user | Public |
| POST | `/api/v1/auth/login` | Login user | Public |
| GET | `/api/v1/auth/users` | Get all users | Admin |
| PUT | `/api/v1/auth/users/:id`| Update user (role, status) | Admin |
| DELETE | `/api/v1/auth/users/:id`| Soft delete user | Admin |

### Financial Records
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| GET | `/api/v1/records` | List records (filter/search/page) | All Roles |
| POST | `/api/v1/records` | Create record | Admin |
| GET | `/api/v1/records/:id` | Get record details | All Roles |
| PUT | `/api/v1/records/:id` | Update record | Admin |
| DELETE | `/api/v1/records/:id`| Soft delete record | Admin |

### Dashboard Analytics
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| GET | `/api/v1/dashboard/summary` | Stats, categories, recent txns | Analyst, Admin |
| GET | `/api/v1/dashboard/monthly` | Income vs Expense monthly trend | Analyst, Admin |

## Filtering & Pagination Examples

- **Search by Category/Note**: `GET /api/v1/records?search=food`
- **Filter by Type**: `GET /api/v1/records?type=expense`
- **Pagination**: `GET /api/v1/records?page=1&limit=5`
- **Date Range**: `GET /api/v1/records?startDate=2023-01-01&endDate=2023-12-31`
