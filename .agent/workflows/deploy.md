---
description: How to deploy the AI Resume Analyzer application
---

# Deployment Workflow

This workflow will help you deploy the AI Resume Analyzer using Docker Compose.

// turbo
1. **Prepare Environment Variables**
   Ensure `.env` files exist in `backend/app/.env` and `frontend/.env.local`. 
   *(Note: These have already been created with default values during the update process)*

2. **Fix spaCy Model (if running locally without Docker)**
   ```bash
   python -m spacy download en_core_web_sm
   ```

3. **Build and Start Containers**
   // turbo
   ```bash
   docker-compose up --build -d
   ```

4. **Initialize Database and Job Roles**
   // turbo
   ```bash
   docker exec -it resume_analyzer_backend python -m app.startup
   ```

5. **Access the Application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000](http://localhost:8000)
   - API Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

## Important Notes:
- The backend uses SQLite by default for development. To use PostgreSQL (as configured in `docker-compose.yml`), ensure the `DATABASE_URL` in `backend/app/.env` is set to `postgresql://postgres:postgres@db:5432/resume_analyzer`.
- If you have an OpenAI API Key, add it to `backend/app/.env` to enable advanced AI suggestions.
