import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
<<<<<<< HEAD

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
=======
import { AppProvider } from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppProvider>
    <App />
    </AppProvider>
>>>>>>> 5933b73 (Made my updates after re-downloading the repo)
  </BrowserRouter>,
)
