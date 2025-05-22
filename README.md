# Office Dashboard PWA

A Progressive Web App (PWA) for office management and administration.

## Features

- 🔐 Secure authentication with Firebase
- 📱 Progressive Web App support
- 🎨 Modern UI with Bootstrap
- 📊 Dashboard analytics
- 🔄 Real-time updates
- 📱 Responsive design
- 🔌 Offline support

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd office-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Firebase configuration:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## PWA Features

- Installable on supported devices
- Offline functionality
- App-like experience
- Push notifications support
- Background sync

## Technologies Used

- Next.js
- React
- Firebase
- Bootstrap
- Service Workers
- PWA

## License

This project is licensed under the MIT License - see the LICENSE file for details. 