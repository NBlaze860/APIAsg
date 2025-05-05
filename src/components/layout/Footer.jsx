import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-white border-t border-neutral-200 py-6">
      <div className="container-narrow mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-primary-600">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="12" fill="currentColor"/>
                <path d="M7 8.5L11.5 13L17 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 12.5L11.5 17L17 11.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <p className="text-sm text-neutral-600">
              &copy; {currentYear} NoteFlow. All rights reserved.
            </p>
          </div>
          
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-sm text-neutral-600 hover:text-primary-600 transition">
              Home
            </Link>
            <Link to="/notes/new" className="text-sm text-neutral-600 hover:text-primary-600 transition">
              Create Note
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer