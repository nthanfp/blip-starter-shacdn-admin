import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppToaster } from '@/components/ui/toaster.tsx'
import { ThemeProvider } from '@/lib/theme-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="blip-erp-theme">
      <App />
      <AppToaster />
    </ThemeProvider>
  </StrictMode>,
)
