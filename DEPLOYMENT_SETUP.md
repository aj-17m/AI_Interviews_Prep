# 🔥 Firebase Setup & Deployment Fix Guide

## 🚨 Error: "Service account object must contain a string 'project_id' property"

This error means Firebase Admin SDK can't find your credentials. Follow these steps:

---

## 📋 **Step 1: Get Firebase Service Account Credentials**

### **1. Go to Firebase Console**
1. Visit [Firebase Console](https://console.firebase.google.com)
2. Select your project (or create a new one)

### **2. Generate Service Account Key**
1. Click the **⚙️ Settings** icon (top left)
2. Select **Project settings**
3. Go to **Service accounts** tab
4. Click **Generate new private key**
5. Click **Generate key** (downloads a JSON file)

### **3. Open the Downloaded JSON File**
The file looks like this:
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "xxxxx",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYour\nKey\nHere\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com",
  "client_id": "xxxxx",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "xxxxx"
}
```

---

## 📝 **Step 2: Update Your `.env.local` File**

Copy these values from the JSON file:

```env
# Firebase Admin SDK (from service account JSON)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nKey\nHere\n-----END PRIVATE KEY-----\n"

# Firebase Client SDK (from Firebase Console → Project Settings → General)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:xxxxxxxxxxxxx

# Other required variables
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_token
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_workflow_id
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### **⚠️ Important Notes:**

1. **Private Key Format**: Keep the entire private key including:
   - `-----BEGIN PRIVATE KEY-----`
   - All the key content
   - `-----END PRIVATE KEY-----`
   - The `\n` characters (they represent newlines)

2. **Wrap in Quotes**: Always wrap the private key in double quotes

3. **Example**:
```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

---

## 🔧 **Step 3: For Vercel Deployment**

### **Method 1: Add Variables in Vercel Dashboard**

1. Go to your project on [Vercel](https://vercel.com)
2. Click **Settings** → **Environment Variables**
3. Add each variable **one by one**:

```
Name: FIREBASE_PROJECT_ID
Value: your-project-id
```

```
Name: FIREBASE_CLIENT_EMAIL
Value: firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
```

```
Name: FIREBASE_PRIVATE_KEY
Value: -----BEGIN PRIVATE KEY-----\nYour\nKey\nHere\n-----END PRIVATE KEY-----\n
```

### **Method 2: Use Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link your project
vercel link

# Add environment variables
vercel env add FIREBASE_PROJECT_ID
# Paste your project ID when prompted

vercel env add FIREBASE_CLIENT_EMAIL
# Paste your client email when prompted

vercel env add FIREBASE_PRIVATE_KEY
# Paste your private key when prompted
```

---

## 🧪 **Step 4: Test Locally**

```bash
# 1. Clear Next.js cache
rm -rf .next

# 2. Test build
npm run build

# 3. If successful, test locally
npm start

# 4. Visit http://localhost:3000
```

---

## 🚀 **Step 5: Deploy**

### **For Vercel:**
```bash
# Commit changes
git add .
git commit -m "Fix Firebase admin configuration"
git push origin main

# Vercel will auto-deploy
```

### **For Manual Deploy:**
```bash
vercel --prod
```

---

## 🔍 **Troubleshooting**

### **Issue 1: Still Getting "project_id" Error**

**Solution**: Check if variables are set correctly

```bash
# In your terminal (local)
echo $FIREBASE_PROJECT_ID

# Should output your project ID
# If empty, your .env.local is not loaded
```

### **Issue 2: Private Key Format Error**

**Solution**: Ensure proper escaping

```env
# ❌ WRONG - Missing quotes
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...

# ✅ CORRECT - With quotes
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### **Issue 3: Build Works Locally But Fails on Vercel**

**Solution**: 
1. Double-check all environment variables in Vercel dashboard
2. Make sure you added them to **Production** environment
3. Redeploy after adding variables

### **Issue 4: "Invalid service account" Error**

**Solution**: Regenerate service account key
1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate new private key"
3. Update your environment variables with new credentials

---

## ✅ **Verification Checklist**

Before deploying, verify:

- [ ] Downloaded Firebase service account JSON
- [ ] Copied `project_id` to `FIREBASE_PROJECT_ID`
- [ ] Copied `client_email` to `FIREBASE_CLIENT_EMAIL`
- [ ] Copied entire `private_key` to `FIREBASE_PRIVATE_KEY` (with quotes)
- [ ] Added all Firebase client config variables (NEXT_PUBLIC_*)
- [ ] Added Vapi and Gemini API keys
- [ ] Local build succeeds (`npm run build`)
- [ ] All environment variables added to Vercel/deployment platform
- [ ] Redeployed after adding variables

---

## 📞 **Still Having Issues?**

Check these common mistakes:

1. **Missing quotes around private key**
2. **Incomplete private key** (missing BEGIN or END markers)
3. **Wrong project ID** (doesn't match Firebase project)
4. **Variables not set in deployment platform**
5. **Using development variables in production**

---

## 🎯 **Quick Fix Command**

Run this to verify your environment variables are loaded:

```bash
node -e "console.log('Project ID:', process.env.FIREBASE_PROJECT_ID); console.log('Client Email:', process.env.FIREBASE_CLIENT_EMAIL); console.log('Private Key exists:', !!process.env.FIREBASE_PRIVATE_KEY)"
```

If any show `undefined`, your `.env.local` is not configured correctly.

---

## 🔐 **Security Note**

**NEVER commit your `.env.local` file to Git!**

Make sure `.env.local` is in your `.gitignore`:

```bash
# Check if .env.local is ignored
git check-ignore .env.local

# Should output: .env.local
```

If not, add it:
```bash
echo ".env.local" >> .gitignore
git add .gitignore
git commit -m "Add .env.local to gitignore"
```

---

Your deployment should now work! 🚀
