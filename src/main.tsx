import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ClerkProvider } from '@clerk/clerk-react'
import 'leaflet/dist/leaflet.css'

const { VITE_CLERK_PUBLISHABLE_KEY } = import.meta.env
const publishableKey = VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={publishableKey}
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      afterSignOutUrl="/"
      appearance={{
        variables: { colorPrimary: '#3b82f6' },
        elements: { formButtonPrimary: 'bg-blue-600 hover:bg-blue-700' },
      }}
    >
    
        <App />

    </ClerkProvider>
  </StrictMode>
)
