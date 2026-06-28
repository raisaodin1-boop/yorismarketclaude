import './styles/yorix-design-system.css'
import './styles/yorix-dark.css'
import './styles/yorix-dashboard.css'
import './styles/yorix-pages-shared.css'
import './styles/yorix-mobile.css'
import './styles/dashboard-mobile.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { createQueryClient } from './lib/queryClient'

const queryClient = createQueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
