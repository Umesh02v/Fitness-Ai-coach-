# FitMind — AI-Powered Health & Fitness Platform

A full-stack health coaching app built with **Java Spring Boot**, **React**, **MySQL**, and **AI (Gemini/Claude)**.

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Recharts |
| Backend | Java 21 + Spring Boot 3 |
| Security | Spring Security + JWT |
| AI | Google Gemini API (or Anthropic Claude) |
| Database | MySQL 8 + Spring Data JPA |
| DevOps | Docker + Docker Compose |

## Project Structure
```
fitmind/
├── backend/               # Spring Boot app
│   ├── src/main/java/com/fitmind/
│   │   ├── entity/        # JPA entities (User, Workout, HealthMetric, AiChatMessage)
│   │   ├── repository/    # Spring Data JPA repositories
│   │   ├── service/       # Business logic + AI coach service
│   │   ├── controller/    # REST API endpoints
│   │   ├── security/      # JWT filter + utility
│   │   ├── config/        # Security config, CORS
│   │   └── dto/           # Request/response objects
│   └── src/main/resources/
│       ├── application.yml    # All config (DB, JWT, AI keys)
│       └── schema.sql         # MySQL schema reference
├── frontend/              # React app
│   └── src/
│       ├── pages/         # Dashboard, Workouts, Metrics, AI Coach, Auth
│       ├── components/    # Layout (sidebar nav)
│       ├── services/      # Axios API client
│       └── context/       # AuthContext (JWT storage)
├── docker-compose.yml     # MySQL + Backend containers
└── README.md
```

## Quick Start

### Prerequisites
- Java 21, Maven 3.9+
- Node.js 18+, npm
- MySQL 8 (or use Docker)
- A Gemini API key (free at aistudio.google.com)

### 1. Start MySQL
```bash
docker-compose up mysql -d
```

### 2. Configure Backend
Edit `backend/src/main/resources/application.yml`:
```yaml
spring.datasource.password: your_mysql_password
ai.gemini.api-key: YOUR_GEMINI_API_KEY
```

### 3. Run Backend
```bash
cd backend
mvn spring-boot:run
# API runs on http://localhost:8080
```

### 4. Run Frontend
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

## API Endpoints
| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login, get JWT |
| GET/POST | /api/workouts | Get/log workouts |
| DELETE | /api/workouts/{id} | Delete workout |
| GET/POST | /api/metrics | Get/save health metrics |
| POST | /api/ai/chat | Chat with AI coach |
| GET | /api/ai/history | Get chat history |

## Features
- JWT authentication with secure token storage
- Workout logging (type, duration, calories, intensity)
- Daily health metrics (weight, HR, sleep, water, steps, mood)
- Interactive charts (weight trend, sleep trend)
- AI Coach chat powered by Gemini or Claude, with full user context
- Persistent conversation history in MySQL

## Switching AI Provider
In `application.yml`, change `ai.provider: gemini` to `ai.provider: anthropic` and set your Anthropic API key.
