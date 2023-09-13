# MyBlog

MyBlog is a blogging application built with [React](https://reactjs.org/) on the frontend and [Express](https://expressjs.com/) on the backend, using [SQLite](https://www.sqlite.org/index.html) as the database. Despite its compact size, it's designed to showcase robust frontend and backend skills.

## Features

- **CRUD for Posts**: Users can create, read, update, and delete posts.
- **Authentication**: Implementation of a sign-up and login system.
- **Protected Routes**: Only authenticated users can access certain routes.

## Authentication

Authentication is handled using JWT tokens. Users can sign up by providing a username and password. Once registered, they can log in to obtain a token that will allow them to access protected routes.

