# Playto

<p align="center">
  <a href="https://github.com/Arbab-ofc/Playto">
    <img src="https://readme-typing-svg.demolab.com?font=Playfair+Display&size=30&duration=3000&pause=600&color=1F1E1C&center=true&vCenter=true&width=680&lines=Playto+-+Community+Feed;Threaded+Replies+%7C+Anonymous+Mode;24h+Leaderboard+%7C+Karma+Points" alt="Playto animated header" />
  </a>
</p>

<p align="center">
  A modern, gamified community discussion platform with threaded comments, anonymous mode, public profiles, and real-time leaderboards.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React_18-0B1F3A?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Build-Vite-1F1E1C?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Style-Tailwind-0B1F3A?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Backend-Django-1F1E1C?logo=django&logoColor=white" alt="Django" />
  <img src="https://img.shields.io/badge/API-DRF-0B1F3A?logo=python&logoColor=white" alt="DRF" />
  <img src="https://img.shields.io/badge/DB-PostgreSQL-1F1E1C?logo=postgresql&logoColor=white" alt="Postgres" />
  <img src="https://img.shields.io/badge/Cache-Redis-0B1F3A?logo=redis&logoColor=white" alt="Redis" />
</p>

---

## Table of Contents

- Overview
- Features
- Tech Stack
- Project Structure
- API Endpoints
- Setup
  - Clone
  - Environment Variables
  - Run with Docker
  - Run Locally
- Scripts
- Performance Notes
- Contact

---

## Overview

Playto is a tactile, modern community feed built around short posts, nested replies, and momentum-driven karma. It includes a bottom-sheet post detail drawer, anonymous mode, public profiles, and a 24-hour leaderboard.

---

## Features

- Post feed with infinite scroll and quick snapshots
- Threaded comments with nested replies (up to 50 levels)
- Bottom-sheet post detail view with full comment tree
- Like system with karma tracking
- 24-hour leaderboard (cached)
- Anonymous mode for logged-in users
- Public profiles with posts list and stats
- Profile page with editable bio and personal stats
- Light and dark mode with textured dark background
- Fully responsive layout

---

## Tech Stack

Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Lucide Icons
- React Query

Backend
- Django 4.2+
- Django REST Framework
- PostgreSQL 15
- Redis
- JWT Auth (SimpleJWT)

---

## Project Structure

```
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
```

---

## API Endpoints

Auth
- `POST /api/auth/register/` - Register a new user
- `POST /api/auth/login/` - Login and receive JWT tokens
- `POST /api/auth/logout/` - Logout (client clears tokens)
- `GET /api/auth/me/` - Current user profile
- `PATCH /api/auth/me/` - Update profile (bio, name)
- `GET /api/auth/users/<id>/` - Public user detail by id
- `GET /api/auth/users/by-username/<username>/` - Public user detail by username
- `GET /api/auth/users/search/?q=` - Username search for mentions
- `POST /api/auth/token/refresh/` - Refresh access token

Posts
- `GET /api/posts/` - List posts (paginated, cached)
- `POST /api/posts/` - Create a post
- `GET /api/posts/<id>/` - Post detail
- `PATCH /api/posts/<id>/` - Update a post (owner)
- `DELETE /api/posts/<id>/` - Delete a post (owner)
- `POST /api/posts/<id>/like/` - Toggle like on a post

Comments
- `POST /api/comments/` - Create a comment or reply
- `POST /api/comments/<id>/like/` - Toggle like on a comment

Karma
- `GET /api/leaderboard/` - 24-hour leaderboard

---

## Setup

### Clone

```bash
git clone https://github.com/Arbab-ofc/Playto.git
cd Playto
```

### Environment Variables

Backend `.env`
```
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://playto_user:playto_password@localhost:5432/playto_db
REDIS_URL=redis://localhost:6379/0
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

Frontend `.env`
```
VITE_API_URL=http://localhost:8000/api
```

### Run with Docker

```bash
docker-compose up --build
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api
- Admin: http://localhost:8000/admin

### Run Locally

Backend
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

Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev -- --host 127.0.0.1 --port 5173
```

---

## Scripts

Backend
```bash
cd backend
pytest
pytest --cov=apps
```

Frontend
```bash
cd frontend
npm test
npm test -- --coverage
```

---

## Performance Notes

- N+1 query prevention with `select_related()` and `prefetch_related()`
- Redis caching for posts list (30s) and leaderboard (60s)
- Atomic transactions for like operations
- React Query caching and pagination

---

## Contact

<p align="left">
  <a href="https://github.com/Arbab-ofc">
    <img src="https://img.shields.io/badge/GitHub-Arbab--ofc-1F1E1C?logo=github&logoColor=white" alt="GitHub badge" />
  </a>
  <a href="mailto:arbabprvt@gmail.com">
    <img src="https://img.shields.io/badge/Email-arbabprvt%40gmail.com-0B1F3A?logo=gmail&logoColor=white" alt="Email badge" />
  </a>
  <a href="https://www.linkedin.com/in/arbab-ofc/">
    <img src="https://img.shields.io/badge/LinkedIn-arbab--ofc-1F1E1C?logo=linkedin&logoColor=white" alt="LinkedIn badge" />
  </a>
</p>
