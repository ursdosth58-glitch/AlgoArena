import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "react-hot-toast";
import "./styles/theme.css";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster

      position="top-right"

      reverseOrder={false}

      toastOptions={{

        duration: 3000,

        style: {

          background: "var(--bg-card)",

          color: "var(--text-primary)",

          border: "1px solid var(--border-color)",

          borderRadius: "12px",

          padding: "14px 18px",

          boxShadow: "var(--shadow-card)",
        },

        success: {

          style: {

            borderLeft: "4px solid #22c55e",
          },
        },

        error: {

          style: {

            borderLeft: "4px solid #ef4444",
          },
        },

      }}
    />
  </StrictMode>,
)
