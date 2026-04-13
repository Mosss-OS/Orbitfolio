# Orbitfolio

A modern portfolio landing page with 3D interactive globe, data visualization, and responsive UI built with React, TypeScript, Vite, and Tailwind CSS.

## Documentation

For detailed documentation, visit: [Orbitfolio Docs](https://mosss-os.gitbook.io/orbitfolio)

## Features

- **3D Interactive Globe**: Built with React Three Fiber and Three.js
- **Data Visualization**: Beautiful charts using Recharts
- **Responsive Design**: Fully responsive layout using Tailwind CSS
- **Modern UI Components**: Built with Radix UI primitives
- **TypeScript**: Fully typed codebase
- **Vite**: Fast development and build tooling
- **Framer Motion**: Smooth animations

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Three Fiber / Three.js
- Radix UI
- Recharts
- Framer Motion

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/Mosss-OS/orbitfolio.git
cd orbitfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Configuration

Edit `.env` with your credentials:

| Variable | Purpose | Required |
|----------|---------|----------|
| VITE_ALCHEMY_API_KEY | Alchemy API for on-chain data | Yes |
| VITE_WALLETCONNECT_PROJECT_ID | WalletConnect project ID | Yes |
| VITE_ENS_DOMAIN | ENS domain | No |
| VITE_NETWORK | Network (mainnet/goerli) | No |

Note: SpaceComputer SDK works without credentials via IPFS.

### Running

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## Project Structure

```
src/
├── components/       # React components
│   ├── ui/          # UI components (shadcn-ui)
│   ├── Globe3D.tsx  # 3D globe component
│   ├── HeroSection.tsx
│   └── ...
├── pages/           # Page components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
└── App.tsx          # Main application
```

## Bounty Targets

This project participates in the following bounty programs:
- ENS Namespace Prize
- SpaceComputer Protocol Grants

## Deployment

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

Deploy to any static hosting service (Vercel, Netlify, Cloudflare Pages, etc.)

## License

MIT