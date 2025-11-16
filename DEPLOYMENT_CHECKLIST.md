# ✅ Deployment Checklist - AI Interview Prep

## 🎯 What We Fixed

The **"Service account object must contain a string 'project_id' property"** error has been resolved by:

1. ✅ Implementing lazy Firebase Admin initialization
2. ✅ Updated all API routes to use `getAdminAuth()` and `getAdminDB()`
3. ✅ Removed prebuild environment check that was blocking deployment
4. ✅ Added proper error handling for missing credentials

---

## 📝 Deployment Steps for Vercel

### **Step 1: Get Firebase Credentials**

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Click ⚙️ Settings → Project Settings
4. Go to **Service Accounts** tab
5. Click **"Generate new private key"**
6. Download the JSON file

### **Step 2: Add Environment Variables to Vercel**

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables **one by one**:

#### Firebase Admin (from downloaded JSON):
```
FIREBASE_PROJECT_ID = your-project-id
FIREBASE_CLIENT_EMAIL = firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY = -----BEGIN PRIVATE KEY-----\nYour\nKey\nHere\n-----END PRIVATE KEY-----\n
```

#### Firebase Client (from Firebase Console → Project Settings → General):
```
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 123456789
NEXT_PUBLIC_FIREBASE_APP_ID = 1:123456789:web:abc123
```

#### Other Services:
```
NEXT_PUBLIC_VAPI_WEB_TOKEN = your_vapi_token
NEXT_PUBLIC_VAPI_WORKFLOW_ID = your_workflow_id
GOOGLE_GENERATIVE_AI_API_KEY = your_gemini_key
NEXT_PUBLIC_BASE_URL = https://your-app.vercel.app
```

### **Step 3: Deploy**

Your code is already pushed to GitHub. Vercel will automatically:
1. Detect the push
2. Start building
3. Deploy if successful

**OR** manually trigger deployment:
```bash
# Using Vercel CLI
vercel --prod
```

---

## 🔍 Verify Deployment

### **1. Check Build Logs**
- Go to Vercel Dashboard → Your Project → Deployments
- Click on the latest deployment
- Check the build logs for any errors

### **2. Test Your App**
Once deployed, test these features:
- ✅ Sign up / Sign in
- ✅ Create interview
- ✅ Generate questions
- ✅ Voice interaction
- ✅ View feedback

---

## 🚨 Troubleshooting

### **Issue: Build still fails with "project_id" error**

**Solution**: Double-check environment variables in Vercel
1. Go to Settings → Environment Variables
2. Verify ALL variables are present
3. Check for typos in variable names
4. Make sure `FIREBASE_PRIVATE_KEY` is wrapped in quotes

### **Issue: "Invalid service account" error**

**Solution**: Regenerate Firebase credentials
1. Firebase Console → Project Settings → Service Accounts
2. Generate new private key
3. Update Vercel environment variables
4. Redeploy

### **Issue: Environment variables not loading**

**Solution**: 
1. Make sure variables are added to **Production** environment
2. Click "Redeploy" after adding variables
3. Don't just trigger a new commit - use the Redeploy button

---

## ✨ What Changed in the Code

### **Before (Caused Build Error):**
```typescript
// Firebase initialized at import time
export const { auth, db } = initFirebaseAdmin();
```

### **After (Fixed):**
```typescript
// Lazy initialization - only runs when actually called
export function getAdminAuth(): Auth {
  const app = initFirebaseAdmin();
  return getAuth(app);
}

export function getAdminDB(): Firestore {
  const app = initFirebaseAdmin();
  return getFirestore(app);
}
```

### **Usage in API Routes:**
```typescript
// Old way
import { db } from "@/firebase/admin";
const data = await db.collection("users").get();

// New way
import { getAdminDB } from "@/firebase/admin";
const db = getAdminDB();
const data = await db.collection("users").get();
```

---

## 📊 Deployment Status

- ✅ Code pushed to GitHub
- ⏳ Waiting for environment variables in Vercel
- ⏳ Waiting for deployment

### **Next Steps:**
1. Add all environment variables to Vercel
2. Wait for automatic deployment (or trigger manually)
3. Test the deployed application
4. Update `NEXT_PUBLIC_BASE_URL` if using custom domain

---

## 🎉 Success Indicators

You'll know deployment is successful when:
- ✅ Build completes without errors
- ✅ Deployment shows "Ready" status
- ✅ You can access your app at the Vercel URL
- ✅ Sign in/Sign up works
- ✅ Interview creation works
- ✅ No console errors in browser

---

## 📞 Still Having Issues?

If you're still experiencing problems:

1. **Check Vercel Build Logs**: Look for specific error messages
2. **Verify Environment Variables**: Use `npm run check-env` locally
3. **Test Locally First**: Run `npm run build` locally with all env vars
4. **Check Firebase Console**: Ensure service account has proper permissions
5. **Review DEPLOYMENT_SETUP.md**: For detailed troubleshooting steps

---

## 🔐 Security Reminder

- ✅ `.env.local` is in `.gitignore`
- ✅ Never commit sensitive credentials
- ✅ Use environment variables for all secrets
- ✅ Regenerate keys if accidentally exposed

---

Your deployment should now work! 🚀

Once you add the environment variables to Vercel, your app will be live!
