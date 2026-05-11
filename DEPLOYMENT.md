# Deployment Guide

## Backend Deployment to Render

### Step 1: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/agriculture-smart-assistant.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend to Render
1. Go to https://dashboard.render.com
2. Click "New Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: agriculture-smart-assistant-api
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
   - **Plan**: Free

5. Add Environment Variables:
   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://your_connection_string
   JWT_SECRET=your_random_secret_key
   ```

6. Click "Create Web Service"

### Step 3: Update Frontend API URL
After backend is deployed, get the Render URL (e.g., `https://agriculture-smart-assistant-api.onrender.com`)

Update `src/services/api.ts`:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-render-url/api';
```

Or set environment variable in Vercel:
```
VITE_API_URL=https://your-render-url/api
```

### Step 4: Redeploy Frontend
```bash
vercel --prod
```

## Quick Local Development Setup

1. Start Backend:
   ```bash
   cd backend
   npm install
   npm start
   ```

2. Start Frontend:
   ```bash
   npm install
   npm run dev
   ```

3. Access:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5001

## Test Credentials

### Farmer Account
- Email: ramesh@example.com
- Password: password123

### Admin Account
- Email: admin@agriculture-smart.in
- Password: admin123
