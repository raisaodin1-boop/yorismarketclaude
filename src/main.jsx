import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
+ import ( HelmetProvider ) ; 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
+   <HelmetProvider>
      <App />
+   </HelmetProvider>
  </React.StrictMode>
)
