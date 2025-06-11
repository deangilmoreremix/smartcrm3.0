# SmartCRM 3.0

![SmartCRM](https://images.pexels.com/photos/6476582/pexels-photo-6476582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Overview

SmartCRM is an AI-powered Customer Relationship Management platform designed to help sales teams work smarter, not harder. It combines traditional CRM functionality with advanced AI capabilities to automate tasks, provide insights, and help you close more deals in less time.

## Key Features

### Core CRM Functionality

- **Contact Management:** Store, organize, and track all your contacts and leads
- **Deal Pipeline:** Visualize and manage your sales pipeline with drag-and-drop simplicity
- **Task Management:** Create, track, and manage tasks with calendar integration
- **Appointments:** Schedule and manage meetings with calendar integration

### AI-Powered Tools

- **AI Assistant:** Context-aware AI assistant that remembers conversations and takes actions
- **Email Composer:** Generate personalized emails with appropriate tone and content
- **Meeting Summarizer:** Convert meetings to actionable insights and follow-ups
- **Call Script Generator:** Create personalized scripts for effective calls
- **Vision Analyzer:** Extract insights from images, documents and visual content
- **Image Generator:** Create professional images for presentations and materials
- **Function Assistant:** Let AI perform actions in your CRM through natural conversation
- **Speech to Text:** Convert recordings to searchable, actionable text
- **Semantic Search:** Find anything using natural language

### Business Intelligence

- **Sales Insights:** AI-powered analysis of your sales performance
- **Lead Scoring:** Automatically prioritize leads based on likelihood to convert
- **Sales Forecasting:** Predict revenue with AI-powered probability analysis
- **Pipeline Analytics:** Identify bottlenecks and opportunities in your sales process

## Technology Stack

- **Frontend:** React.js, TypeScript, Tailwind CSS
- **State Management:** Zustand
- **Database:** Supabase (PostgreSQL)
- **AI Integration:** OpenAI GPT-4, Google Gemini AI
- **UI Components:** Lucide React icons, Recharts
- **Authentication:** Supabase Auth

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Supabase account
- API keys for OpenAI and/or Google Gemini AI

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/smartcrm.git
   cd smartcrm
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Setting up AI Integration

1. In the app, navigate to Settings
2. Enter your OpenAI API key and/or Google Gemini API key
3. Save the settings to enable AI features

## Project Structure

```
smartcrm/
├── src/                  # Source code
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── store/            # Zustand state management
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── supabase/             # Supabase configuration and migrations
│   ├── functions/        # Edge functions for serverless operations
│   └── migrations/       # Database schema migrations
├── public/               # Static assets
└── ...
```

## Key Functionality

### AI Tools

SmartCRM offers over 20 AI-powered tools to enhance your sales process:

- **Email Analysis:** Extract key insights from customer emails
- **Smart Email Composer:** Generate personalized emails 
- **Meeting Summarizer:** Auto-generate meeting notes and action items
- **Call Script Generator:** Create personalized call scripts
- **Competitor Analysis:** Get strategic insights on competitors
- **Market Trend Analysis:** Identify industry trends and opportunities
- **Customer Persona Generator:** Create detailed customer personas
- **Voice Tone Optimizer:** Perfect your communication tone
- **Visual Content Generator:** Create professional visual content
- **Objection Handler:** Get strategies for handling objections
- **Sales Forecasting:** Generate AI-powered revenue projections
- **Subject Line Optimizer:** Create high-converting email subject lines

### Multi-tenant Architecture

SmartCRM supports multi-tenant operations, allowing:
- Multiple organizations on a single platform
- Custom branding and domain settings per tenant
- Role-based access control within organizations

## Database Schema

The database includes the following key tables:
- `users`: User profiles and authentication
- `tenants`: Organization information for multi-tenant setup
- `user_tenant_roles`: User membership and roles within organizations
- `contacts`: Contact management
- `deals`: Sales pipeline and opportunity tracking
- `business_analyzer`: Business intelligence data
- `content_library`: Content management system
- `voice_profiles`: Voice configuration for audio features
- `image_assets`: Image management
- `ai_generations`: Tracking of AI-generated content

## Edge Functions

SmartCRM leverages Supabase Edge Functions for serverless operations:
- `ai-content-generator`: Creates various AI-powered content
- `ai-reasoning`: Provides detailed AI reasoning for decisions
- `business-analyzer`: Analyzes business data for insights
- `email-analyzer`: Extracts key information from emails
- `function-assistant`: Enables AI to perform CRM actions
- `lead-scoring`: Predicts lead conversion likelihood
- `pipeline-analyzer`: Provides sales pipeline insights
- `vision-analyzer`: Analyzes images and documents

## Contributing

We welcome contributions to SmartCRM! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature-name`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## About

SmartCRM is designed to bring enterprise-level AI capabilities to sales teams of all sizes. By automating routine tasks and providing data-driven insights, SmartCRM helps sales professionals focus on what matters most: building relationships and closing deals.