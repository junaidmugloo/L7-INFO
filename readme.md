# 🎬 Movie Explorer Platform

A full-stack web application to explore Movies, Actors, Directors, and Genres using **React (Vite)** frontend and **FastAPI** backend.

---

## 📘 API Endpoints

| Endpoint           | Method | Description                      |
|--------------------|--------|----------------------------------|
| `/movies/`         | GET    | Get all movies                   |
| `/movies/{id}`     | GET    | Get movie details                |
| `/actors/`         | GET    | List all actors                  |
| `/actors/{id}`     | GET    | Actor details + their movies     |
| `/directors/`      | GET    | List all directors               |
| `/directors/{id}`  | GET    | Director details + their movies  |
| `/genres/`         | GET    | List genres                      |

---

## 🚀 Run Without Docker

### 🔧 Backend (FastAPI)

```bash
git clone <your-repo-url>
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 🌐 Frontend (React with Vite)

```bash
cd frontend
npm install
npm run dev
```

🔑 Visit `http://<your-host>:<port>/admin`  
Use credentials:
- **Username:** `admin`  
- **Password:** `admin`  

You can now manage and add movies, actors, and more!

---

## 🐳 Run with Docker (Recommended)

### 📦 Prerequisites:
- Install [Docker CLI or Docker Desktop](https://www.docker.com/products/docker-desktop)

### ⚙️ Build & Run:

```bash
# Inside the root of the cloned repository
docker-compose up --build
```

### 🔗 Access:
- 🎬 Frontend: [http://localhost:3000](http://localhost:3000)
- ⚙️ Backend API: [http://localhost:3000/api](http://localhost:3000)

---

## 💡 Tech Stack

- **Frontend:** React + Vite + Zustand
- **Backend:** FastAPI + Pydantic + Uvicorn
- **API Docs:** Swagger UI at `/docs`
- **Deployment:** Docker & Nginx

---

## 📄 License

MIT © 2025
