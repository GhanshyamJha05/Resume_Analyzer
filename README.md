# 🚀 AI Resume Analyzer

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/FastAPI-0.100.0-05998b?style=for-the-badge&logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/OpenAI-GPT--4-412991?style=for-the-badge&logo=openai" alt="OpenAI" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</div>

<p align="center">
  <b>A state-of-the-art AI-powered platform for resume analysis, ATS scoring, and semantic job matching</b>
</p>

---

##  Premium Design & UX

Our platform is engineered with a focus on **visual excellence** and **intuitive user experience**:
- **Glassmorphic UI**: Sleek, modern interface with subtle backdrop blurs and gradients.
- **Dynamic Animations**: Smooth transitions powered by Framer Motion.
- **Interactive Dashboards**: Real-time data visualization with Recharts.
- **Responsive Design**: Flawless experience across desktop, tablet, and mobile.

## Core Features

###  AI-Powered Analysis
- **Intelligent ATS Scoring**: Advanced algorithm evaluates resume structure and content against industry standards.
- **NLP Skill Extraction**: Automatically identifies technical and soft skills using spaCy and modern transformers.
- **AI Career Coaching**: Receive tailored improvement suggestions powered by OpenAI GPT-4.
- **Bullet Point Optimizer**: Refines weak descriptions using the STAR method for maximum impact.

###  Semantic Job Matching
- **Vector Embeddings**: Uses `all-MiniLM-L6-v2` for deep semantic understanding of your experience.
- **Percentage Match Scoring**: Get a quantified compatibility score for various tech roles.
- **Skill Gap Detection**: Highlights exactly what you need to learn to land your dream job.

###  Comprehensive Dashboard
- **Analysis History**: Securely tracks all your resume versions and improvements.
- **Visual Analytics**: Interactive charts showing your career growth and score trends.
- **Instant Previews**: Quick-look summaries of your most recent analysis.

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 14, Tailwind CSS, Framer Motion, Recharts, Lucide Icons |
| **Backend** | FastAPI, SQLAlchemy ORM, Pydantic |
| **Database** | PostgreSQL |
| **AI / ML** | OpenAI GPT API, Sentence Transformers (NLP), spaCy |
| **DevOps** | Docker, Docker Compose, GitHub Actions |

##  Project Structure

```bash
root/
├── backend/
│   └── app/
│       ├── auth/             # JWT & OAuth logic
│       ├── routes/           # API Endpoints (Analysis, Jobs, Auth)
│       ├── services/         # Business logic (LLM, Parser, Job Matching)
│       ├── models.py         # SQLAlchemy schemas
│       └── main.py           # Entry point
├── frontend/
│   ├── components/           # History, UploadBox, Stats, CircularProgress
│   ├── pages/                # Upload, Dashboard, Stats, Analysis
│   ├── styles/               # Glassmorphism & Global CSS
│   └── utils/                # API integration
├── docker-compose.yml        # Multi-container setup
└── requirements.txt          # Backend dependencies
```

##  Rapid Setup

### 1. Backend Configuration
```bash
cd backend
# Create and activate virtualenv
python -m venv venv
source venv/bin/activate  # Or venv\Scripts\activate on Windows

# Install dependencies
pip install -r ../requirements.txt
python -m spacy download en_core_web_sm

# Configure .env
cp .env.example .env # Add your DATABASE_URL and OPENAI_API_KEY
```

### 2. Frontend Configuration
```bash
cd frontend
npm install
npm run dev
```

### 3. Docker (Recommend for Development)
```bash
docker-compose up --build
```

##  Future Roadmap

- [ ] **Multi-format Support**: Integrated support for LaTeX and raw text resumes.
- [ ] **Direct Job Applications**: One-click apply through LinkedIn and Indeed integrations.
- [ ] **Mock Interviewer**: AI-driven voice/text interview practice based on resume gaps.
- [ ] **Enterprise Mode**: Team-based candidate screening for recruiters.

##  Contributing

We welcome contributions! Please fork the repository and submit a Pull Request. For major changes, please open an issue first.

## 📄 License

This project is licensed under the MIT License. Developed by Ghanshyam Jha.
