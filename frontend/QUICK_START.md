# Quick Start - Soul of Medico Frontend

Get the app running in 2 minutes!

## 1. Install Dependencies
```bash
npm install
```

## 2. Start Dev Server
```bash
npm run dev
```

## 3. Open Browser
```
http://localhost:3000
```

## 4. Login
- Click "Continue with Google"
- Enter as demo user
- Explore the app!

## That's It! 🎉

The app works completely in demo mode with:
- ✅ All 5 pages (Home, Test, Notes, AI, Support)
- ✅ Mock data loaded
- ✅ Local storage persistence
- ✅ No backend needed for testing

## Next: Deploy to Vercel

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Ready to deploy"
git push origin main

# 2. Go to vercel.com
# 3. Import your GitHub repo
# 4. Click Deploy!
```

Your app will be live in 1 minute at https://yourapp.vercel.app

---

## Troubleshooting

**Port 3000 in use?**
```bash
PORT=3001 npm run dev
```

**Styles not showing?**
```bash
npm run build && npm start
```

**Module errors?**
```bash
rm -rf node_modules .next
npm install
```

That's it! You're ready to go! 🚀
