# 🎯 AI Interview Prep

<div align="center">
  <img src="https://img.shields.io/badge/-Next.JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=black" alt="next.js" />
  <img src="https://img.shields.io/badge/-Vapi-white?style=for-the-badge&color=5dfeca" alt="vapi" />
  <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  <img src="https://img.shields.io/badge/-Firebase-black?style=for-the-badge&logoColor=white&logo=firebase&color=DD2C00" alt="firebase" />
  <img src="https://img.shields.io/badge/-TypeScript-blue?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
</div>

<div align="center">
  <h3>🚀 AI-Powered Interview Preparation Platform</h3>
  <p>Practice job interviews with AI voice agents and get instant feedback to improve your performance</p>
</div>

## 📋 Table of Contents

1. [🤖 Introduction](#introduction)
2. [⚙️ Tech Stack](#tech-stack)
3. [🔋 Features](#features)
4. [🚀 Quick Start](#quick-start)
5. [🛠️ Environment Variables](#environment-variables)
6. [📱 Usage](#usage)
7. [🤝 Contributing](#contributing)

## 🤖 Introduction

AI Interview Prep is a cutting-edge platform that revolutionizes job interview preparation through AI-powered voice interactions. Built with modern web technologies, this application provides users with realistic interview experiences, personalized questions, and detailed feedback to help them excel in their job interviews.

### Key Highlights:
- **AI-Powered Voice Interviews**: Real-time conversations with Vapi AI
- **Personalized Question Generation**: Custom questions based on role and tech stack
- **Instant Feedback**: Detailed analysis and improvement suggestions
- **Modern Tech Stack**: Next.js 15, Firebase, TypeScript, and Tailwind CSS

## 📁 Project Structure Overview

```
AI_Mock_Interviews/
├── 📂 app/                    # Next.js App Router
│   ├── (auth)/               # Authentication routes
│   │   ├── sign-in/         # Login page
│   │   ├── sign-up/         # Registration page
│   │   └── layout.tsx       # Auth layout wrapper
│   ├── (root)/              # Main application routes
│   │   ├── interview/       # Interview functionality
│   │   │   ├── [id]/       # Dynamic interview pages
│   │   │   │   ├── page.tsx     # Interview session
│   │   │   │   └── feedback/    # Feedback results
│   │   │   └── page.tsx    # Create interview form
│   │   ├── layout.tsx      # Main app layout
│   │   └── page.tsx        # Dashboard/Home page
│   ├── api/                # API routes
│   │   ├── interviews/     # Interview data endpoints
│   │   └── vapi/          # AI voice integration
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── 📂 components/            # Reusable React components
│   ├── Agent.tsx           # Voice interview component
│   ├── AuthForm.tsx        # Authentication forms
│   ├── InterviewCard.tsx   # Interview display cards
│   ├── InterviewForm.tsx   # Interview creation form
│   └── ui/                 # UI components (buttons, forms, etc.)
├── 📂 constants/            # Application constants
│   └── index.ts           # App constants & configurations
├── 📂 firebase/            # Firebase configuration
│   ├── admin.ts           # Firebase Admin SDK
│   └── client.ts          # Firebase Client SDK
├── 📂 lib/                 # Utility functions & actions
│   ├── actions/           # Server actions
│   │   ├── auth.action.ts    # Authentication logic
│   │   └── general.action.ts # Interview & feedback logic
│   ├── utils.ts           # Utility functions
│   └── vapi.sdk.ts        # Vapi AI SDK integration
├── 📂 public/              # Static assets
│   ├── images/            # Images & icons
│   └── covers/            # Interview cover images
├── 📂 types/               # TypeScript type definitions
│   └── index.d.ts         # Global type definitions
├── 📄 .env.local           # Environment variables
├── 📄 package.json         # Dependencies & scripts
├── 📄 tailwind.config.ts   # Tailwind CSS configuration
└── 📄 README.md            # Project documentation
```

## 🎯 Application Flow & Architecture

### 1. **Authentication Flow**
```
User Registration/Login → Firebase Auth → User Dashboard
```

### 2. **Interview Creation Flow**
```
Dashboard → Create Interview Form → AI Question Generation → Question Preview → Voice Interview
```

### 3. **Interview Session Flow**
```
Start Interview → Vapi AI Voice Agent → Real-time Conversation → Transcript Recording → End Interview
```

### 4. **Feedback Generation Flow**
```
Interview Completion → Transcript Analysis → Google Gemini AI → Detailed Feedback → Results Display
```

## 🏗️ Core Components Architecture

### **Frontend Components**
- **InterviewForm**: Collects interview parameters (role, level, tech stack)
- **Agent**: Manages voice interview sessions with Vapi AI
- **InterviewCard**: Displays interview summaries and actions
- **AuthForm**: Handles user authentication (sign-in/sign-up)

### **Backend Services**
- **Firebase Admin**: Server-side database operations
- **Firebase Client**: Client-side authentication & real-time updates
- **Vapi AI Integration**: Voice conversation management
- **Google Gemini AI**: Question generation & feedback analysis

### **API Routes**
- `/api/vapi/generate`: Generates interview questions using AI
- `/api/interviews`: Manages interview data operations
- Server Actions: Handle authentication and data mutations

## 🔄 Data Flow

1. **User Authentication**: Firebase handles secure user registration/login
2. **Interview Creation**: Form data → AI question generation → Firestore storage
3. **Voice Interview**: Vapi AI manages real-time voice conversations
4. **Feedback Generation**: Transcript analysis → AI-powered evaluation → Results storage
5. **Data Persistence**: All data stored in Firestore with proper indexing

## 🛠️ Technology Integration

- **Next.js 15**: Full-stack React framework with App Router
- **Firebase**: Authentication, Firestore database, and hosting
- **Vapi AI**: Voice conversation and speech-to-text processing
- **Google Gemini**: AI-powered question generation and feedback analysis
- **Tailwind CSS**: Utility-first styling with custom design system
- **TypeScript**: Type-safe development across the entire stack
- **AI Voice Interviews**: Conduct realistic interviews with AI voice agents
- **Personalized Questions**: Generate custom questions based on role, level, and tech stack
- **Instant Feedback**: Get detailed analysis and improvement suggestions
- **Modern UI/UX**: Clean, responsive design for optimal user experience
- **Secure Authentication**: Firebase-powered user management

## ⚙️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components

### Backend & Services
- **Firebase** - Authentication and database
- **Vapi AI** - Voice AI integration
- **Google Gemini** - AI question generation and feedback
- **Zod** - Schema validation

### Development Tools
- **ESLint** - Code linting
- **React Hook Form** - Form management
- **Sonner** - Toast notifications

## 🔋 Features

### 🔐 Authentication System
- Secure email/password authentication via Firebase
- Protected routes and user session management
- Personalized user dashboard

### 🎯 Interview Generation
- **Custom Question Generation**: AI-powered questions based on:
  - Job role and experience level
  - Technology stack requirements
  - Interview type (Technical/Behavioral/Mixed)
  - Customizable question count (3-10 questions)

### 🎤 AI Voice Interviews
- Real-time voice interaction with AI agents
- Natural conversation flow
- Live transcription and recording
- Professional interview simulation

### 📊 Detailed Feedback System
- **Comprehensive Analysis** across 5 key areas:
  - Communication Skills
  - Technical Knowledge
  - Problem-Solving Abilities
  - Cultural & Role Fit
  - Confidence & Clarity
- Personalized improvement suggestions
- Strengths and weaknesses breakdown
- Overall performance scoring (0-100)

### 💻 User Experience
- **Responsive Design**: Works seamlessly on all devices
- **Modern UI**: Clean, professional interface
- **Interview History**: Track and review past interviews
- **Tech Stack Visualization**: Dynamic technology icons
- **Real-time Updates**: Live interview status and feedback

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aj-17m/AI_Interviews_Prep.git
   cd AI_Interviews_Prep
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables) section)

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🛠️ Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Vapi AI Configuration
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_vapi_workflow_id

# Google Gemini AI
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key

# Application URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin Configuration
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="your_private_key"
```

### Getting API Keys

1. **Firebase**: Create a project at [Firebase Console](https://console.firebase.google.com/)
2. **Vapi AI**: Sign up at [Vapi.ai](https://vapi.ai/) for voice AI services
3. **Google Gemini**: Get API key from [Google AI Studio](https://makersuite.google.com/)

## 📱 Usage

### Creating an Interview

1. **Sign up/Login** to your account
2. **Navigate to "Create Interview"**
3. **Fill out the form**:
   - Job Role (e.g., "Frontend Developer")
   - Experience Level (Junior/Mid-Level/Senior/Lead)
   - Interview Type (Technical/Behavioral/Mixed)
   - Tech Stack (comma-separated)
   - Number of Questions (3-10)
4. **Click "Generate Questions"** to create your personalized interview

### Taking an Interview

1. **Review generated questions** on the results page
2. **Click "Start Voice Interview"** to begin
3. **Speak naturally** with the AI interviewer
4. **Answer questions** as you would in a real interview
5. **Complete the session** to receive feedback

### Viewing Feedback

- **Detailed scoring** across 5 key areas
- **Personalized suggestions** for improvement
- **Strengths and weaknesses** breakdown
- **Overall performance** rating

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Tailwind CSS for styling
- Write meaningful commit messages

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/aj-17m">aj-17m</a></p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
