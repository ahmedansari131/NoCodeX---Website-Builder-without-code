
# NoCodeX - Website Builder

NoCodeX is an innovative website builder application designed for non-technical users. With NoCodeX, anyone can create stunning websites without the need for coding skills. Whether you want to build a personal blog, an online portfolio, or a small business website, NoCodeX has you covered. This README provides essential information for setting up, running, and contributing to the NoCodeX project.


## Table of Contents

 - [Introduction](#Introduction)
 - [Features](#featres)
 - [Technologies](#Technologies)
 - [Getting Started](#GettingStarted)
    - Prerequisites
    - Installation
 - [Development](#Development)
    - Folder Structure
    - Authentication


## Introduction

NoCodeX aims to empower individuals and small businesses to create their online presence effortlessly. Our platform provides an intuitive, no-code interface for building websites through drag-and-drop components and a library of pre-built templates. While the project is currently in development, the authentication system has been implemented, and we have exciting plans for adding dynamic web application capabilities in the future.
## Features

- Drag-and-Drop Builder: Easily design your website by dragging and dropping elements onto the canvas.
- Pre-built Templates: Choose from a variety of professionally designed templates to kickstart your project.
- User Authentication: Secure user registration and login functionality.
- Dynamic Web Apps (Future): Our roadmap includes the development of dynamic web application features.
- Responsive Design: Ensure your website looks great on all devices with built-in responsive design tools.
- Customizable Styling: Fine-tune your website's appearance with easy-to-use styling options.
- Collaboration (Future): Collaborate with others on website projects (on the roadmap).
  
## Technologies

**Client:**
 - ReactJS - A popular JavaScript library for building user interfaces.
 - Redux | Redux-Toolkit - State management for React applications.
 - Redux-Toolkit Query - Simplified data fetching for Redux.
 - Tailwind CSS - A utility-first CSS framework for rapid development.
 - React-Router - Navigation components for React.

**Server:**
 - Django | Django-Rest-Framework - A powerful Python-based backend framework.
 - JWT (JSON Web Tokens) - Securely manage user authentication
 - SQLite (For now) - A lightweight database for development (will be upgraded to PostgreSQL).


## Getting Started

**Prerequisites**

- NodeJs and npm
- Python and pip
- Virtualenv (recommended)
- Git
 
## Installation

1. Clone the repository
```bash
  https://github.com/ahmedansari131/NoCodeX---Website-Builder-without-code.git
```
2. Navigate to the fontend directory
```bash
  cd NoCodeX---Website-Builder-without-code/frontend
```

3. Install frontend dependencies
```bash
  npm install
```

4. Start the frontend development server:
```bash
  npm run dev
```

5. Navigate to the backend directory:
```bash
  cd ../backend
```

6. Install the virtual environment (recommended):
```bash
  pip install virtualenv
```

7. Start the virtual environment
```bash
  python<version> -m venv <virtual-environment-name>
```

8. Activate the virtual environment
 - On Windows
```bash
  .\<virtual-environment-name>\Scripts\activate
```
 - On MacOs/Linux
```bash
  source <virtual-environment-name>/bin/activate
```

9. Install backend dependencies:
```bash
  pip install -r requirements.txt || python -m pip install -r requirements.txt
```

10. Apply migrations:
```bash
  python manage.py migrate
```

11. Create superuser
```bash
  python manage.py createsuperuser
```

11. Start the Django development server:
```bash
  python manage.py runserver
```

**Note:** The frontend will be accessible at http://localhost:5173, and the backend at http://localhost:8000.
    
## Development

**Folder Structure**

- `/frontend:` Contains the React frontend code.
- `/backend:` Contains the Django backend code. 

**Authentication**

The authentication system has been implemented to get you started. You can register and log in to NoCodeX. **`More features will be added soon.`**
