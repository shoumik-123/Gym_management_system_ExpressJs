
# Gym Management System

## Features
- **User Registration** and **Login** with JWT authentication.
- **Admin Access** for managing schedules, including CRUD operations.
- **Trainee Profiles** create, update, view, and delete.
- **Book Class Schedule** for trainees.
- **Authorization roles**: Admins can manage schedules, while trainees can create and manage their profiles and book schedules.

## API Documentation
### Authentication Routes
- **POST /register** - Register a new user.
- **POST /login** - User login.
- **POST /trainee-profile** - Create or update trainee profile.
- **GET /trainee-profile** - Get trainee profile.
- **DELETE /trainee-profile** - Delete trainee profile.

### Schedule Management
- **POST /schedule** (Admin only) - Create a new schedule.
- **PUT /schedule/:id** (Admin only) - Update an existing schedule.
- **DELETE /schedule/:id** (Admin only) - Delete a schedule.
- **GET /schedule/:id** - View a specific schedule.
- **GET /schedule/trainer/:trainerId** - View schedules by trainer.
- **GET /schedule/trainee/:traineeId** - View schedules by trainee.
- **POST /trainee/book-schedule** - Book a class schedule (for trainees only).

## Environment Setup
To run the application locally, set the following environment variables in your `.env` file:

   DB_URL="mongodb+srv://shoumik123:shoumik123@cluster0.mafox.mongodb.net/gym_management"
   PORT=8000
   JWT_SECRET=jwt_12345
   JWT_EXPIRES=1d


## Installation
1. **Clone the repository**:
   git clone https://github.com/shoumik-123/Gym_management_system_ExpressJs.git

2. **Install dependencies**:
   cd Gym_management_system_ExpressJs
   npm install

3. **Start the server**:
   npm start

The server will be available at `http://localhost:8000`.

## Contributing
To contribute to this project:
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.
