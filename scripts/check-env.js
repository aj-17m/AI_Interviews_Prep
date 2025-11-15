#!/usr/bin/env node

/**
 * Environment Variables Checker
 * Run this script to verify all required environment variables are set
 */

const requiredEnvVars = {
  // Firebase Admin (Server-side)
  'FIREBASE_PROJECT_ID': 'Firebase project ID',
  'FIREBASE_CLIENT_EMAIL': 'Firebase service account email',
  'FIREBASE_PRIVATE_KEY': 'Firebase private key',
  
  // Firebase Client (Client-side)
  'NEXT_PUBLIC_FIREBASE_API_KEY': 'Firebase API key',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN': 'Firebase auth domain',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID': 'Firebase project ID (client)',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET': 'Firebase storage bucket',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID': 'Firebase messaging sender ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID': 'Firebase app ID',
  
  // Vapi AI
  'NEXT_PUBLIC_VAPI_WEB_TOKEN': 'Vapi web token',
  'NEXT_PUBLIC_VAPI_WORKFLOW_ID': 'Vapi workflow ID',
  
  // Google Gemini
  'GOOGLE_GENERATIVE_AI_API_KEY': 'Google Gemini API key',
  
  // Application
  'NEXT_PUBLIC_BASE_URL': 'Application base URL',
};

console.log('🔍 Checking Environment Variables...\n');

let missingVars = [];
let presentVars = [];

Object.entries(requiredEnvVars).forEach(([key, description]) => {
  const value = process.env[key];
  
  if (!value) {
    missingVars.push({ key, description });
    console.log(`❌ ${key} - MISSING`);
  } else {
    presentVars.push(key);
    // Show partial value for security
    const displayValue = key.includes('KEY') || key.includes('TOKEN') 
      ? `${value.substring(0, 10)}...` 
      : value.length > 30 
        ? `${value.substring(0, 30)}...`
        : value;
    console.log(`✅ ${key} - ${displayValue}`);
  }
});

console.log('\n' + '='.repeat(60));
console.log(`\n📊 Summary:`);
console.log(`   ✅ Present: ${presentVars.length}/${Object.keys(requiredEnvVars).length}`);
console.log(`   ❌ Missing: ${missingVars.length}/${Object.keys(requiredEnvVars).length}`);

if (missingVars.length > 0) {
  console.log('\n⚠️  Missing Variables:\n');
  missingVars.forEach(({ key, description }) => {
    console.log(`   • ${key}`);
    console.log(`     Description: ${description}\n`);
  });
  
  console.log('📝 Action Required:');
  console.log('   1. Add missing variables to your .env.local file');
  console.log('   2. Refer to DEPLOYMENT_SETUP.md for detailed instructions');
  console.log('   3. Run this script again to verify\n');
  
  process.exit(1);
} else {
  console.log('\n✨ All environment variables are set!');
  console.log('   You can now run: npm run build\n');
  
  process.exit(0);
}
