# FitMind — AI-Powered Health & Fitness Platform

FitMind is a full-stack health and fitness platform that combines **AI-powered coaching**, workout tracking, health metrics, and progress visualization in one application.

The project is built with **Java Spring Boot**, **React**, **MySQL**, and AI services such as **Google Gemini** or **Anthropic Claude**. It provides secure authentication, personalized fitness conversations, workout management, health tracking, and data-driven progress insights.

## ✨ Features

- 🔐 **Secure Authentication** — User registration and login using Spring Security and JWT.
- 🏋️ **Workout Management** — Record workout type, duration, calories, and intensity.
- ❤️ **Health Metrics Tracking** — Monitor weight, heart rate, sleep, water intake, steps, and mood.
- 🤖 **AI Fitness Coach** — Chat with an AI coach using Gemini or Claude with user-specific context.
- 💬 **Conversation History** — Store and retrieve AI coaching conversations from MySQL.
- 📊 **Progress Dashboard** — Visualize health and fitness trends using interactive charts.
- 🗄️ **Persistent Database** — Store users, workouts, health metrics, and AI conversations using MySQL.
- 🐳 **Docker Support** — Run the MySQL database and backend using Docker Compose.
- 🔄 **REST API** — Frontend and backend communicate through Spring Boot REST endpoints.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Recharts |
| Backend | Java 21, Spring Boot 3 |
| Security | Spring Security, JWT |
| AI | Google Gemini API / Anthropic Claude |
| Database | MySQL 8, Spring Data JPA |
| API | REST API |
| Build Tool | Maven |
| DevOps | Docker, Docker Compose |

## 📂 Project Structure

```text
fitmind/
├── backend/
│   ├── src/main/java/com/fitmind/
│   │   ├── entity/        # JPA entities
│   │   ├── repository/    # Spring Data JPA repositories
│   │   ├── service/       # Business logic and AI coach service
│   │   ├── controller/    # REST API controllers
│   │   ├── security/      # JWT authentication and security
│   │   ├── config/        # Application and CORS configuration
│   │   └── dto/           # Request and response DTOs
│   └── src/main/resources/
│       ├── application.yml
│       └── schema.sql
│
├── frontend/
│   └── src/
│       ├── pages/         # Dashboard, workouts, metrics, AI coach, auth
│       ├── components/    # Reusable UI components
│       ├── services/      # Axios API client
│       └── context/       # Authentication context
│
├── docker-compose.yml     # Docker configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

- Java 21
- Maven 3.9+
- Node.js 18+
- npm
- MySQL 8 or Docker
- Gemini API key or Anthropic API key

### 1. Clone the Repository

```bash
git clone https://github.com/Umesh02v/Fitness-Ai-coach-.git
cd Fitness-Ai-coach-/fitmind
```

### 2. Start MySQL with Docker

```bash
docker-compose up mysql -d
```

### 3. Configure the Backend

Open:

```text
backend/src/main/resources/application.yml
```

Configure your database credentials and AI provider/API key.

Example:

```yaml
spring.datasource.password: your_mysql_password
ai.gemini.api-key: YOUR_GEMINI_API_KEY
```

**Do not commit real API keys or passwords to GitHub.**

### 4. Run the Backend

```bash
cd backend
mvn spring-boot:run
```

The backend runs at:

```text
http://localhost:8080
```

### 5. Run the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate user and receive JWT |
| GET/POST | `/api/workouts` | Retrieve or log workouts |
| DELETE | `/api/workouts/{id}` | Delete a workout |
| GET/POST | `/api/metrics` | Retrieve or save health metrics |
| POST | `/api/ai/chat` | Send a message to the AI coach |
| GET | `/api/ai/history` | Retrieve AI chat history |

## 🤖 AI Coach

The AI coach uses the user's available fitness and health context to provide more relevant conversations around fitness goals, workouts, and general health tracking.

Supported providers:

- **Google Gemini**
- **Anthropic Claude**

To switch providers, update the AI configuration in `application.yml`.

## 🔒 Security

FitMind uses:

- Spring Security
- JWT-based authentication
- Protected REST endpoints
- CORS configuration
- Environment/configuration-based API credentials

Keep database passwords, JWT secrets, and AI API keys outside the source code whenever possible.

## 📊 Dashboard

The frontend provides an interactive dashboard for viewing fitness information and progress, including:

- Weight trends
- Sleep trends
- Workout history
- Daily health metrics
- AI coaching conversations

## 🧩 Architecture

```text
┌──────────────────────┐
│      React UI        │
│  Dashboard / Coach   │
└──────────┬───────────┘
           │ REST API
           ▼
┌──────────────────────┐
│   Spring Boot API    │
│ Controllers / JWT    │
└───────┬────────┬─────┘
        │        │
        ▼        ▼
┌────────────┐  ┌─────────────────┐
│   MySQL    │  │   AI Provider   │
│   JPA      │  │ Gemini / Claude │
└────────────┘  └─────────────────┘
```

## 🎯 Project Goals

FitMind is designed to demonstrate how modern full-stack technologies can be combined to build an intelligent fitness application.

Key learning areas include:

- Full-stack application development
- REST API design
- Spring Boot and Spring Data JPA
- JWT authentication
- React frontend development
- MySQL database integration
- AI API integration
- Docker-based development
- Health and fitness data visualization

## 🔮 Future Enhancements

- Personalized workout plan generation
- Exercise recommendations based on fitness history
- Nutrition and meal recommendations
- Wearable device integration
- Real-time fitness activity tracking
- AI-generated progress reports
- Mobile application support
- Advanced analytics and goal tracking

## 👨‍💻 Author

**Umesh V**

Electronics and Instrumentation Engineering Student  
Interested in **Full-Stack Development, Java, AI, IoT, and Automation**.

---

⭐ If you find this project useful, consider giving the repository a star.
