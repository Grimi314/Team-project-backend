# Природні Мандри Backend

Backend частина вебзастосунку **«Природні Мандри»**.

Сервер відповідає за роботу з користувачами, авторизацією, історіями, категоріями, збереженими матеріалами, завантаженням зображень та взаємодією з базою даних.

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- Cookie Parser
- Celebrate
- Multer
- Cloudinary
- Nodemailer
- Swagger UI

## Features

- Реєстрація користувача
- Авторизація користувача
- Logout
- Оновлення сесії
- Отримання поточного користувача
- Отримання публічного профілю користувача
- Отримання історій користувача
- Отримання збережених історій користувача
- Додавання історії до збережених
- Видалення історії зі збережених
- Отримання списку історій
- Отримання детальної інформації про історію
- Отримання популярних історій
- Отримання рекомендованих історій
- Створення нової історії
- Отримання категорій
- Оновлення профілю користувача
- Swagger-документація API

## API Routes

### Auth

```bash
POST /auth/register
POST /auth/login
POST /auth/logout
POST /auth/refresh
```

### Users

```bash
GET /users/me
GET /users/:userId
GET /users/:userId/stories
GET /users/saved
PATCH /users/profile
GET /users/verify-email/:token
```

### Stories

```bash
GET /
GET /stories/:storyId
GET /popular
GET /recommended
POST /stories
POST /stories/:storyId/saved
DELETE /stories/:storyId/saved
```

### Other

```bash
GET /categories
GET /travellers
```

## Project Structure

```bash
src/
  controllers/      # request handlers
  routes/           # API routes
  services/         # business logic
  models/           # database models
  middleware/       # auth, upload, logger and error handling
  validations/      # request validation schemas
  db/               # database connection
  utils/            # helper functions
  constants/        # shared constants
  templates/        # email templates
```

## Database

Проєкт використовує **MongoDB**.  
Основні колекції:

- users
- stories
- categories
- sessions

## Authentication

Авторизація реалізована через сесії.  
Backend створює session tokens, зберігає сесію в базі даних та використовує cookies для приватних запитів.

## File Upload

Зображення історій завантажуються через Multer та зберігаються у Cloudinary.

## API Documentation

API має Swagger-документацію.

## Deployment

Backend задеплоєний на **Render**.  
Database розгорнута в **MongoDB Atlas**.
