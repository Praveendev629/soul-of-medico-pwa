# Soul of Medico - Deployment Guide

Complete step-by-step guide to deploy Soul of Medico to production.

## Prerequisites

1. GitHub account
2. MongoDB Atlas account (free tier available)
3. Firebase project (Firebase Console)
4. Vercel account (free tier)
5. Railway account (for backend) or Heroku

## Step 1: Database Setup (MongoDB Atlas)

### 1.1 Create MongoDB Atlas Account
- Visit https://www.mongodb.com/cloud/atlas
- Sign up for free account
- Create an organization

### 1.2 Create Cluster
1. Click "Create a Deployment"
2. Choose "Serverless" (free option)
3. Select your preferred region (choose closest to your users)
4. Click "Create"

### 1.3 Add Database User
1. Go to "Security" > "Database Access"
2. Click "Add New Database User"
3. Create username and password
4. Select "Autogenerate Secure Password"
5. Click "Create User"
6. Copy the password (you won't see it again)

### 1.4 Whitelist IP
1. Go to "Security" > "Network Access"
2. Click "Add IP Address"
3. Select "Allow access from anywhere" (0.0.0.0/0) for development
4. For production, add specific IPs only
5. Click "Confirm"

### 1.5 Get Connection String
1. Click "Connect" on your cluster
2. Choose "Drivers"
3. Copy connection string
4. Replace `<password>` with your password
5. Save for later (e.g., `mongodb+srv://user:pass@cluster.mongodb.net/soulofmedico`)

## Step 2: Firebase Setup

### 2.1 Create Firebase Project
1. Go to https://console.firebase.google.com
2. Click "Create Project"
3. Name it "soul-of-medico"
4. Enable Google Analytics (optional)
5. Click "Create Project"

### 2.2 Create Web App
1. In Firebase console, click the Web icon
2. Register app as "soul-of-medico-web"
3. Copy the config object
4. Save for frontend .env

### 2.3 Enable Authentication
1. Go to "Authentication" in left menu
2. Click "Get Started"
3. Enable "Google" provider
4. Add your domain to authorized domains

### 2.4 Setup Service Account (for backend)
1. Go to "Project Settings" (gear icon)
2. Click "Service Accounts" tab
3. Click "Generate New Private Key"
4. Save the JSON file
5. Extract `private_key` and `client_email`

## Step 3: Backend Deployment (Railway)

### 3.1 Prepare Code
1. Push code to GitHub:
```bash
cd soul-of-medico
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/soul-of-medico.git
git push -u origin main
```

### 3.2 Deploy to Railway
1. Go to https://railway.app
2. Login with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your soul-of-medico repo
6. Select "backend" folder as root directory

### 3.3 Add Environment Variables
In Railway dashboard, add variables:
```
MONGODB_URI=your_mongodb_connection_string
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
JWT_SECRET=generate_a_random_string_here
NODE_ENV=production
PORT=5000
```

### 3.4 Add MongoDB Plugin
1. In Railway project, click "Create New Service"
2. Add "MongoDB" plugin
3. Railway will auto-fill MONGODB_URI

### 3.5 Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Copy the deployment URL (e.g., https://yourapp.railway.app)
4. Save as `NEXT_PUBLIC_API_URL`

## Step 4: Frontend Deployment (Vercel)

### 4.1 Prepare Environment
Create `frontend/.env.production`:
```
NEXT_PUBLIC_API_URL=https://yourapp.railway.app
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4.2 Deploy to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import GitHub repository
4. Select "frontend" as root directory
5. Add environment variables from above
6. Click "Deploy"

### 4.3 Configure Custom Domain (Optional)
1. In Vercel project settings
2. Add your custom domain
3. Update DNS records as per Vercel instructions

## Step 5: Post-Deployment Setup

### 5.1 Seed Initial Data
Create sample lectures, MCQs, tests via admin API:
```bash
curl -X POST https://yourapp.railway.app/api/admin/mcq \
  -H "X-Admin-Key: your_admin_key" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is photosynthesis?",
    "subject": "Biology",
    "options": ["Process A", "Process B", "Process C", "Process D"],
    "correctAnswer": 0,
    "explanation": "Explanation here"
  }'
```

### 5.2 Verify Deployments
- Frontend: https://yourapp.vercel.app
- Backend: https://yourapp.railway.app/health
- Should return `{"status": "Server is running"}`

### 5.3 Test Authentication
1. Visit your frontend URL
2. Click "Continue with Google"
3. Should redirect and save user

## Step 6: Monitoring & Maintenance

### 6.1 Setup Error Tracking (Optional)
Add Sentry for error tracking:
```bash
npm install @sentry/nextjs
```

### 6.2 Monitor Database
- Log into MongoDB Atlas regularly
- Check storage usage
- Monitor query performance

### 6.3 Update Secrets
Regularly rotate JWT_SECRET and other keys in Railway dashboard.

## Troubleshooting

### CORS Errors
In backend server.ts, update CORS:
```javascript
app.use(cors({
  origin: 'https://yourapp.vercel.app',
  credentials: true
}))
```

### Database Connection Failed
- Check MongoDB IP whitelist
- Verify connection string
- Check credentials in Railway

### Firebase Auth Not Working
- Verify API keys in .env
- Check authorized domains in Firebase Console
- Clear browser cookies and try again

### Frontend Shows "API Unreachable"
- Check NEXT_PUBLIC_API_URL is correct
- Verify backend is running: `https://yourapp.railway.app/health`
- Check CORS settings in backend

## Production Checklist

- [ ] MongoDB backup enabled
- [ ] Firebase auth domains configured
- [ ] Environment variables set in all services
- [ ] HTTPS enforced
- [ ] Error tracking setup (Sentry)
- [ ] Monitoring alerts configured
- [ ] Database indexes created
- [ ] Admin API secured with strong key
- [ ] Rate limiting configured
- [ ] User data privacy policy in place

## Cost Estimation (Monthly)

- MongoDB Atlas: Free tier (512 MB storage)
- Firebase: Free tier (includes authentication)
- Vercel: Free tier ($20/month for hobby projects)
- Railway: Free tier ($5/month minimum)
- **Total: $0-25/month**

## Next Steps

1. Invite team members
2. Setup CI/CD pipelines
3. Configure automated backups
4. Setup monitoring and alerts
5. Create content (lectures, MCQs, tests)
6. Marketing and user acquisition

---

For support, contact: support@soulofmedico.com
