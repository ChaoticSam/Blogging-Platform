# Blog Platform

A full-featured blog platform built with Next.js, TypeScript, Tailwind CSS, Node.js, Express.js, and MongoDB. This platform allows users to sign up, log in, create, view, and filter blog posts by users.

## Features

- User authentication (sign up, log in, log out)
- Create, view, and filter blog posts
- Dynamic and responsive UI using Tailwind CSS
- Server-side rendering and static generation with Next.js
- RESTful API built with Node.js and Express.js
- MongoDB for data storage

## Prerequisites

- Node.js (>=14.x)
- MongoDB (>=4.x)

## Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/blog-platform.git
cd blog-platform
```
Install dependencies for both frontend and backend:
``` sh
cd frontend
npm install
• Open other terminal
cd backend
npm install
```
Set up environment variables:
``` Create a .env file in the backend directory and add the following:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```
Start the backend server:
```
cd backend
node server.js
```
Start the frontend server:
```
cd frontend
npm run build
npm start
```


