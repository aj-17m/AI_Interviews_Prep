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
