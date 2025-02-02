Front-End Assessment: User and Comment Management Application

This project is part of an assessment for the position of Front-End Engineer. The application allows users to manage users and comments through a user-friendly interface and RESTful API integration.

Table of Contents

Project Overview

Features

Technologies Used

Installation and Setup

Usage

Good-To-Have Implementations

API Details

License

Project Overview

This application integrates a RESTful API to manage users and comments. It features a responsive, aesthetically pleasing interface, built with modern web development practices and tools.

Features

Add User: Create new users and update the table dynamically.

List Users: Display all users in a reusable table component.

Edit User: Update user information and reflect the changes in the UI.

Add Comment: Create new comments and update the table dynamically.

List Comments: Display all comments in a reusable table component.

Edit Comment: Update comment details and reflect the changes in the UI.

Delete Comment: Delete comments and reflect the changes in the UI.

Good-To-Have Implementations

Reusable table component for listing data.

Lazy loading of pages for improved performance.

Git commits following best practices.

Basic test cases using Jest.

Technologies Used

Framework: React (with TypeScript)

Bundler: Vite

Styling: Tailwind CSS

State Management: React hooks and context API

Icons: ReactIcons

Installation and Setup

Prerequisites

Node.js (v16 or higher)

npm or yarn

## Steps

Clone the repository:

git clone <repository-link>
cd <repository-folder>

Install dependencies:

npm install

# or

yarn install

Start the development server:

npm run dev

# or

yarn dev

Open your browser and navigate to http://localhost:3000.

## Usage

Adding a User

Navigate to the "User" page the click on the "New Entry" button.

Fill in the required fields.

Click "Submit."

Viewing and Editing Users

Navigate to the "Users" page.

Click the "Edit" button beside a user to update their details.

Adding a Comment

Navigate to the "Add Comment" section.

Fill in the comment details.

Click "Submit."

Viewing and Editing Comments

Navigate to the "Comments" page.

Click the "Edit" button beside a comment to update its details.

API Details

Base URL: https://jsonplaceholder.typicode.com

Endpoints

Users

GET /users: Fetch a list of users.

POST /users: Add a new user (client-side update required).

Comments

GET /comments: Fetch a list of comments.

POST /comments: Add a new comment (client-side update required).

Note: The API server does not persist data for POST requests.

Good-To-Have Implementations

Reusable Components: The table component is designed to work for both users and comments.

Lazy Loading: Pages are dynamically loaded to improve performance.

License

This project is licensed under the MIT License. See the LICENSE file for more information.

Author
Aguegbodo Martins
