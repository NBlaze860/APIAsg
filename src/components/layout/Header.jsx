import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiPlus } from 'react-icons/fi'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    closeMenu()
  }, [location.pathname])

  return (
    <header 
      className={`sticky top-0 z-10 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-white bg-opacity-95 backdrop-blur-sm'
      }`}
    >
      <div className="container-narrow mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-semibold text-primary-600 hover:text-primary-700 transition"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="12" fill="currentColor"/>
              <path d="M7 8.5L11.5 13L17 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 12.5L11.5 17L17 11.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            NoteFlow
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `font-medium transition hover:text-primary-600 ${isActive ? 'text-primary-600' : 'text-neutral-600'}`
              }
              end
            >
              All Notes
            </NavLink>
            <Link 
              to="/notes/new" 
              className="btn-primary flex items-center gap-2"
            >
              <FiPlus className="text-lg" />
              Create Note
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 focus:outline-none" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 animate-slide-up">
          <nav className="container-narrow py-4 px-4">
            <ul className="flex flex-col gap-4">
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `block p-2 font-medium rounded-lg transition ${
                      isActive 
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    }`
                  }
                  end
                >
                  All Notes
                </NavLink>
              </li>
              <li>
                <Link 
                  to="/notes/new" 
                  className="block p-2 font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition flex items-center gap-2"
                >
                  <FiPlus className="text-lg" />
                  Create Note
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header