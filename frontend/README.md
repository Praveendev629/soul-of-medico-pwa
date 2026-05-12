# Soul of Medico - Production Frontend

Complete, fully functional NEET preparation platform frontend with real API integration.

## Features

✅ **Real Firebase Authentication**
- Google Sign-In
- Persistent login
- User profiles

✅ **Real Data Integration**
- Axios API client for backend
- Error handling & loading states
- Real-time data fetching

✅ **Complete UI**
- 6 fully functional pages
- Professional design
- Responsive layout
- Animations & transitions

✅ **State Management**
- Zustand for auth & performance
- Persistent storage
- Real-time updates

## Pages

1. **GetStarted** - Firebase Google authentication
2. **HomePage** - Dashboard with performance metrics
3. **TestSeriesPage** - Full test functionality
4. **NotesPage** - Study materials by subject
5. **AIMentorPage** - AI chatbot (coming soon)
6. **SupportPage** - Contact channels

## Tech Stack

- Next.js 14
- React 18
- Firebase Auth
- Axios (API calls)
- Zustand (State)
- Tailwind CSS

## Installation

```bash
npm install
```

## Environment Setup

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_id
```

## Development

```bash
npm run dev
# Open http://localhost:3000
```

## Production Build

```bash
npm run build
npm start
```

## Deployment to Vercel

### Step 1: Setup Root Directory

Make sure to set Root Directory to: `./` (current folder)

### Step 2: Build & Deploy

Vercel will auto-build and deploy. No issues with path doubling.

### Step 3: Set Environment Variables

In Vercel Dashboard:
- Settings → Environment Variables
- Add all `.env.local` variables

## API Integration

All API calls are in `lib/api.ts`:

```typescript
// Get lectures
await getLectures()
await getLectureById(id)

// MCQs
await getDailyMCQ()
await submitMCQAnswers(userId, answers)

// Tests
await getTestSeries()
await submitTest(userId, testData)

// Performance
await getPerformanceDashboard(userId)
```

## Firebase Setup

1. Create project at https://firebase.google.com
2. Enable Google authentication
3. Add web app
4. Copy config to `.env.local`

## Backend Integration

This frontend expects a backend API at `NEXT_PUBLIC_API_URL`:

### Required Endpoints

**Auth**
- POST `/api/auth/save-user` - Save user
- GET `/api/auth/user/:uid` - Get user

**Lectures**
- GET `/api/lectures` - All lectures
- GET `/api/lectures/:id` - Single lecture

**MCQs**
- GET `/api/mcq/daily` - Daily MCQs
- POST `/api/mcq/submit` - Submit answers

**Tests**
- GET `/api/tests` - All tests
- POST `/api/tests/submit` - Submit test

**Performance**
- GET `/api/performance/:userId` - Dashboard stats
- GET `/api/performance/weak-topics/:userId` - Weak topics

## Troubleshooting

**Port 3000 in use:**
```bash
PORT=3001 npm run dev
```

**Build errors:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**API not connecting:**
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure backend is running
- Check browser console for errors

## Project Structure

```
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx
├── components/
│   ├── GetStarted.tsx
│   ├── MainApp.tsx
│   ├── BottomNav.tsx
│   ├── ProfileMenu.tsx
│   └── pages/
├── lib/
│   ├── firebase.ts
│   ├── store.ts
│   └── api.ts
├── styles/
│   └── globals.css
├── public/
│   ├── logo.png
│   └── manifest.json
└── package.json
```

## Next Steps

1. Setup Firebase project
2. Create backend API
3. Deploy frontend to Vercel
4. Deploy backend to Railway/Heroku
5. Connect APIs
6. Add real content

## Support

For issues, check:
- Console errors (F12)
- Build logs on Vercel
- Firebase console

---

**Version**: 1.0.0 (Production)
**Status**: Ready to Deploy
