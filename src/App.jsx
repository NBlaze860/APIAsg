import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import NotesPage from './pages/NotesPage'
import CreateNotePage from './pages/CreateNotePage'
import EditNotePage from './pages/EditNotePage'
import ViewNotePage from './pages/ViewNotePage'
import NotFoundPage from './pages/NotFoundPage'
import LoadingSpinner from './components/ui/LoadingSpinner'
import { checkApiStatus } from './services/apiService'

function App() {
  const [serverStatus, setServerStatus] = useState('checking')

  useEffect(() => {
    const checkServer = async () => {
      try {
        await checkApiStatus()
        setServerStatus('connected')
      } catch (error) {
        setServerStatus('disconnected')
      }
    }
    
    checkServer()
    const interval = setInterval(checkServer, 10000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container-narrow py-8 animate-fade-in">
        {serverStatus === 'checking' ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <LoadingSpinner size="large" />
            <p className="mt-4 text-neutral-600">Connecting to server...</p>
          </div>
        ) : serverStatus === 'disconnected' ? (
          <div className="p-6 rounded-lg bg-error-50 border border-error-200 text-center">
            <h2 className="text-error-700 mb-2">Server Connection Issue</h2>
            <p className="text-error-600 mb-4">
              We're having trouble connecting to the server. Please ensure the backend is running.
            </p>
            <div className="bg-white p-4 rounded-md border border-error-200 text-sm font-mono text-neutral-800">
              npm run dev:backend
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<NotesPage />} />
            <Route path="/notes/new" element={<CreateNotePage />} />
            <Route path="/notes/:id" element={<ViewNotePage />} />
            <Route path="/notes/:id/edit" element={<EditNotePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </main>
      
      <Footer />
    </div>
  )
}

export default App