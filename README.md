# Soul of Medico - NEET Preparation Platform

Your NEET Rank Starts Here! A comprehensive NEET preparation platform featuring live lectures, daily MCQs, practice tests, and AI mentoring.

## Features

- **Live Lectures** - Daily YouTube lectures with download support
- **Daily MCQs** - Curated questions to test your knowledge
- **Test Series** - Full-length NEET-style tests with result analysis
- **AI Mentor** - 24/7 personalized guidance powered by AI
- **Performance Dashboard** - Track accuracy, study streak, weak topics
- **PWA Support** - Install as a mobile app on any device
- **Offline Access** - Download lectures and notes for offline viewing
- **Dark Mode** - Easy on the eyes during late-night study sessions

## Tech Stack

**Frontend:**
- Next.js 14 (React)
- Tailwind CSS
- React Icons
- Firebase Auth
- Zustand (State Management)

**Backend:**
- Express.js
- MongoDB
- Firebase Admin SDK
- TypeScript

**Deployment:**
- Vercel (Frontend)
- Railway/Heroku (Backend)

## Project Structure

```
soul-of-medico/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── lib/
│   ├── styles/
│   ├── public/
│   └── package.json
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.ts
│   └── package.json
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Firebase project
- Vercel account (for deployment)

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Fill in environment variables in `.env`

4. Start development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
npm install
```

2. Create `.env.local` file:
```bash
cp .env.example .env.local
```

3. Fill in environment variables

4. Start development server:
```bash
npm run dev
```

5. Open http://localhost:3000

## Deployment

### Deploy Backend to Railway

1. Push code to GitHub
2. Connect Railway to your GitHub repo
3. Create MongoDB plugin in Railway
4. Set environment variables in Railway dashboard
5. Deploy!

### Deploy Frontend to Vercel

1. Connect GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Click Deploy!

[See detailed deployment guide below]

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_url
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
JWT_SECRET=your_secret_key
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=your_backend_url
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
```

## API Endpoints

### Auth
- `POST /api/auth/save-user` - Save user after login
- `GET /api/auth/user/:uid` - Get user details

### Lectures
- `GET /api/lectures` - Get all lectures
- `GET /api/lectures?subject=Biology` - Filter by subject
- `GET /api/lectures/:id` - Get single lecture

### MCQ
- `GET /api/mcq/daily` - Get daily MCQ
- `POST /api/mcq/submit` - Submit MCQ answers
- `GET /api/mcq/history/:userId` - Get MCQ history

### Test Series
- `GET /api/tests` - Get all tests
- `GET /api/tests/:id` - Get test details
- `POST /api/tests/submit` - Submit test
- `GET /api/tests/results/:userId` - Get test results

### Performance
- `GET /api/performance/:userId` - Get dashboard
- `POST /api/performance/streak/:userId` - Update study streak
- `GET /api/performance/weak-topics/:userId` - Get weak topics

## Admin Panel

Create lectures, MCQs, and tests via admin routes:

```
PUT /api/admin/lectures/:id
POST /api/admin/mcq
POST /api/admin/tests
```

Requires `X-Admin-Key` header for authentication.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Support

- Telegram: https://t.me/soulofmedico
- Email: support@soulofmedico.com
- Website: https://soulofmedico.com
