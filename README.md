# Playto - Community Feed Platform

A modern, gamified community discussion platform with threaded comments, anonymous mode, and real-time leaderboards.

## Features

- Create and share posts
- Threaded comments with nested replies (up to 50 levels)
- Bottom-sheet post detail view with full comment tree
- Like system with karma tracking
- 24-hour leaderboard (cached)
- Anonymous mode for logged-in users
- Profile page with editable bio and user stats
- Infinite scroll feeds
- Dark/Light mode with textured dark background
- Fully responsive design

## Tech Stack

Backend:
- Django 4.2+
- Django REST Framework
- PostgreSQL 15
- Redis

Frontend:
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Lucide Icons
- React Query

## Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)

## Quick Start with Docker

```bash
# Start all services
docker-compose up --build

# Frontend: http://localhost:5173
# Backend API: http://localhost:8000/api
# Admin Panel: http://localhost:8000/admin
```

## Local Development Setup

Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 127.0.0.1:8000
```

Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev -- --host 127.0.0.1 --port 5173
```

## Environment Variables

Backend (.env)
```
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://playto_user:playto_password@localhost:5432/playto_db
REDIS_URL=redis://localhost:6379/0
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

Frontend (.env)
```
VITE_API_URL=http://localhost:8000/api
```

## Authentication

- JWT-based authentication.
- Login/register pages are blocked for logged-in users.
- Profile page is protected.
- Invalid tokens are cleared automatically on 401.

## API Highlights

- `GET /api/posts/` (public, cached)
- `POST /api/posts/` (auth required)
- `POST /api/posts/{id}/like/`
- `POST /api/comments/` (auth required)
- `POST /api/comments/{id}/like/`
- `GET /api/leaderboard/` (public, cached)
- `GET /api/auth/me/`
- `PATCH /api/auth/me/` (bio + profile updates)

## UI/UX Highlights

- Tactile, booking-flow inspired layout
- Light and dark mode (dark mode includes a subtle noise texture)
- Bottom-sheet post detail drawer
- Infinite scroll on posts
- Profile page with bio editing and posts list

## Running Tests

Backend Tests
```bash
cd backend
pytest
pytest --cov=apps
```

Frontend Tests
```bash
cd frontend
npm test
npm test -- --coverage
```

## Project Structure

Playto/
├── backend/
│   ├── apps/
│   │   ├── users/
│   │   ├── posts/
│   │   ├── comments/
│   │   └── karma/
│   ├── config/
│   ├── logs/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── services/
│   └── package.json
├── docker-compose.yml
└── README.md

## Performance Optimizations

- N+1 query prevention using select_related() and prefetch_related()
- Database indexing on frequently queried fields
- Redis caching for leaderboard and posts
- Atomic transactions for like operations
- React Query for data caching and state management
- Infinite scroll for posts

## Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'feat: add nested comment tree component')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## License

MIT License
