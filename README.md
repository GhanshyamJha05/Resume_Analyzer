# AI Resume Analyzer & Job Match Engine ✨ (Premium UI)

A modern SaaS-style web application that uses AI to analyze resumes and provide job matching capabilities. Users can upload their resumes to receive ATS scores, skill gap analysis, and AI-powered improvement suggestions.

## 🚀 Features

### Resume Analysis
- **ATS Score Calculation**: Evaluates resume compatibility with Applicant Tracking Systems
- **Skill Extraction**: Uses NLP (spaCy) to identify technical and soft skills
- **Keyword Matching**: Analyzes keyword density relevant to job requirements
- **Experience Analysis**: Parses work experience, education, and projects

### AI-Powered Insights
- **Skill Gap Analysis**: Identifies missing skills compared to target roles
- **Resume Improvement Suggestions**: Provides AI-generated recommendations
- **Bullet Point Optimization**: Rewrites weak bullet points using the STAR method
- **Weakness Detection**: Identifies problematic sections in the resume

### Job Matching
- **Embedding-Based Matching**: Uses sentence transformers for semantic similarity
- **Top Job Matches**: Returns top 3 job role matches with percentage scores
- **Predefined Roles**: Supports Software Engineer, Backend Developer, Frontend Developer, Data Scientist, ML Engineer
- **Customizable Profiles**: Ability to add custom job profiles

### User Dashboard
- **Resume History**: Track all analyzed resumes
- **Improvement Trends**: Visualize resume improvement over time
- **Score Tracking**: Monitor ATS scores and keyword matches
- **Report Generation**: Export detailed analysis reports

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT with secure password hashing
- **NLP**: spaCy for entity extraction
- **Embeddings**: Sentence Transformers for semantic similarity
- **Document Processing**: pdfplumber (PDF) and python-docx (DOCX)

### Frontend
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS with custom components
- **UI Library**: shadcn/ui-inspired components
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Charts**: Recharts for data visualization

### AI/ML Components
- **LLM Integration**: OpenAI GPT API (with fallback implementation)
- **Sentence Transformers**: all-MiniLM-L6-v2 model
- **NLP Processing**: Named Entity Recognition with spaCy

## 📁 Project Structure

```
root/
├── backend/
│   └── app/
│       ├── main.py                 # Application entry point
│       ├── config.py              # Configuration settings
│       ├── database.py            # Database setup
│       ├── models.py              # Database models
│       ├── auth/                  # Authentication module
│       ├── routes/                # API routes
│       ├── services/              # Business logic
│       └── utils/                 # Utility functions
├── frontend/
│   ├── pages/                     # Next.js pages
│   ├── components/                # Reusable components
│   ├── hooks/                     # Custom React hooks
│   ├── styles/                    # Global styles
│   └── utils/                     # Utility functions
├── docker-compose.yml             # Container orchestration
├── requirements.txt               # Python dependencies
└── README.md                     # Project documentation
```

## 🔧 Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 18+
- PostgreSQL
- Docker (optional, for containerization)

### Backend Setup

1. **Install Python dependencies**:
```bash
pip install -r requirements.txt
```

2. **Set up environment variables**:
```bash
# Create .env file in backend/app/
DATABASE_URL=postgresql://user:password@localhost/resume_analyzer
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
OPENAI_API_KEY=your-openai-api-key  # Optional
```

3. **Initialize the database**:
```bash
# Make sure PostgreSQL is running
# Run database migrations (or create tables manually)
```

4. **Download spaCy model**:
```bash
python -m spacy download en_core_web_sm
```

5. **Run the backend**:
```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

1. **Install dependencies**:
```bash
cd frontend
npm install
```

2. **Set environment variables**:
```bash
# Create .env.local in frontend/
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. **Run the development server**:
```bash
npm run dev
```

## 🐳 Docker Deployment

To run the application using Docker:

1. **Build and start containers**:
```bash
docker-compose up --build
```

2. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Database: PostgreSQL on port 5432

## 📊 API Endpoints

### Authentication
- `POST /auth/token` - Login and get JWT token
- `POST /auth/register` - Register new user

### Resume Management
- `POST /resume/upload` - Upload and parse resume
- `GET /resume/history` - Get user's resume upload history

### Resume Analysis
- `POST /analysis/{resume_id}/analyze` - Analyze a resume
- `GET /analysis/{resume_id}/analysis` - Get analysis results

### Job Matching
- `GET /jobs/roles` - Get available job roles
- `POST /jobs/seed-roles` - Initialize predefined job roles
- `GET /jobs/{resume_id}/matches` - Get job matches for a resume

## 🤖 AI/ML Implementation Details

### Resume Parsing
- PDF extraction using pdfplumber
- DOCX extraction using python-docx
- NLP processing with spaCy for entity recognition
- Regex-based extraction for contact information

### Embedding-Based Job Matching
- Sentence transformers for semantic similarity
- Cosine similarity for matching resumes to job descriptions
- Combined scoring algorithm (skill match + content similarity)

### LLM Integration
- OpenAI GPT API for intelligent suggestions
- Fallback implementation for offline capability
- Structured prompt engineering for consistent responses

## 🎨 UI/UX Highlights

### Design Principles
- Clean, modern SaaS aesthetic
- Responsive design for mobile and desktop
- Consistent color scheme and typography
- Intuitive navigation and user flows

### Key Components
- Interactive progress rings for score visualization
- Drag-and-drop resume upload interface
- Tabbed analysis report views
- Skill gap visualization charts
- Before/after comparison for resume improvements

## 🚀 Production Deployment

### Backend Production Setup
- Use a production WSGI server (Gunicorn)
- Configure SSL certificates
- Set up environment-specific configurations
- Implement monitoring and logging

### Frontend Production Build
- Run `npm run build` to create optimized build
- Serve static files through CDN
- Implement caching strategies
- Set up CI/CD pipelines

### Security Considerations
- Secure JWT implementation
- Input validation and sanitization
- File upload security measures
- Rate limiting for API endpoints
- HTTPS enforcement

## 📈 Future Enhancements

- Advanced NLP for more accurate skill extraction
- Multi-language support
- Integration with job boards
- Advanced analytics dashboard
- Team/collaboration features
- Mobile application

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.