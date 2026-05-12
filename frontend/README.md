# Soul of Medico - Frontend

A modern, responsive React + Next.js frontend for the NEET preparation platform.

## Features

- ✅ Clean, error-free code
- ✅ No TypeScript strict mode (all optional)
- ✅ Mobile-optimized design
- ✅ Tailwind CSS styling
- ✅ Bottom navigation (5 tabs)
- ✅ Profile management
- ✅ All icons included
- ✅ Logo included
- ✅ Ready for Vercel deployment
- ✅ Mock data (works without backend)

## Quick Start

### 1. Setup

```bash
npm install
```

### 2. Configure Environment

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your values (or leave blank for demo mode):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── pages/
│   ├── _document.tsx       # HTML document
│   ├── _app.tsx            # App wrapper
│   └── index.tsx           # Home page
├── components/
│   ├── GetStarted.tsx      # Login screen
│   ├── MainApp.tsx         # Main app layout
│   ├── BottomNav.tsx       # Navigation
│   ├── ProfileMenu.tsx     # Profile dropdown
│   └── pages/
│       ├── HomePage.tsx
│       ├── TestSeriesPage.tsx
│       ├── NotesPage.tsx
│       ├── AIMentorPage.tsx
│       └── SupportPage.tsx
├── styles/
│   └── globals.css         # Global styles
├── public/
│   ├── logo.png            # App logo
│   ├── manifest.json       # PWA manifest
│   └── icons/
│       ├── lecture.png
│       ├── mcq.png
│       ├── ai.png
│       └── stethoscope.png
├── package.json
├── tsconfig.json
├── next.config.js
└── tailwind.config.js
```

## Pages

### 1. GetStarted (Login)
- Animated background
- 3-step feature showcase
- Google login button (demo mode)
- No Firebase required for testing

### 2. HomePage
- Welcome message
- Quick stats (accuracy, streak)
- Recent lectures grid
- Daily MCQ reminder

### 3. TestSeriesPage
- List of available tests
- Difficulty badges
- Test duration & question count
- Start test button

### 4. NotesPage
- 3 subject cards (Biology, Chemistry, Physics)
- Expandable lessons
- Notes & question paper tabs
- Download functionality

### 5. AIMentorPage
- AI chatbot interface
- Placeholder for AI integration
- Coming soon message

### 6. SupportPage
- 5 contact channels
- Telegram, WhatsApp, Email, Website, Form
- External links
- Response time info

## Styling

- **Framework**: Tailwind CSS
- **Colors**:
  - Primary: #0052CC (Blue)
  - Secondary: #E6F500 (Yellow)
  - Accent: #00BCD4 (Cyan)
- **Mobile-First**: Fully responsive
- **Icons**: react-icons library

## Dependencies

```json
{
  "next": "^14.0.4",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "firebase": "^10.7.0",
  "axios": "^1.6.2",
  "react-icons": "^4.12.0",
  "zustand": "^4.4.1",
  "tailwindcss": "^3.3.6"
}
```

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/soul-of-medico.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repo
4. Add environment variables (from .env.local)
5. Click "Deploy"

### Step 3: Custom Domain (Optional)

1. In Vercel: Settings → Domains
2. Add your custom domain
3. Update DNS records as shown

## Environment Variables for Vercel

Add these in Vercel dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Demo Mode

The app works in **demo mode** without backend or Firebase:

- Click "Continue with Google" to enter (no actual login)
- Uses localStorage for persistent login
- All pages show mock data
- Perfect for testing & development

## Icons Included

| File | Purpose |
|------|---------|
| logo.png | App logo (from your image) |
| icons/lecture.png | Lecture icon |
| icons/mcq.png | MCQ/Quiz icon |
| icons/ai.png | AI Mentor icon |
| icons/stethoscope.png | Medical/Health icon |

## Common Issues

### Issue: Port 3000 already in use
```bash
PORT=3001 npm run dev
```

### Issue: Module not found
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### Issue: Tailwind styles not working
```bash
npm run build
npm start
```

### Issue: Images not loading
- Check file exists in `public/` folder
- Use relative paths: `/logo.png`
- Not `./public/logo.png`

## Production Checklist

- [ ] Environment variables set in Vercel
- [ ] Backend API URL configured
- [ ] Firebase credentials added (if using)
- [ ] Logo & icons optimized
- [ ] Mobile responsiveness tested
- [ ] All links work correctly
- [ ] Error messages clear
- [ ] Performance optimized
- [ ] HTTPS enforced
- [ ] Custom domain configured

## Next Steps

1. ✅ Frontend deployed to Vercel
2. Deploy backend to Railway
3. Connect Firebase authentication
4. Setup database (MongoDB)
5. Add real content (lectures, MCQs, tests)
6. Setup admin panel
7. Enable notifications
8. Marketing & user acquisition

## Support

- 📧 Email: support@soulofmedico.com
- 💬 Telegram: https://t.me/soulofmedico
- 🌐 Website: https://soulofmedico.com

## License

MIT

---

**Built with** ❤️ for NEET aspirants
