import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Rocket, Search, User } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Tata Surya', path: '/solar-system' },
    { name: 'Technology', path: '/Technology'},
    { name: 'Misi NASA', path: '/missions' },
    { name: 'Galeri', path: '/gallery' },
    { name: 'Edukasi', path: '/education' },
    { name: 'Observasi', path: '/observation' },
    { name: 'chatbhot', path: '/chatbot'},
  ]

  return (
<header className="sticky top-0 z-50 bg-glass-dark border-b border-space-blue/30">
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between h-20">
      {/* Logo - YANG DIUBAH */}
      <Link to="/" className="flex items-center space-x-3 group">
        {/* GANTI INI: dari Rocket icon ke logo.svg */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <img 
            src="/logo.svg" 
            alt="SpaceEdu.ID Logo"
            className="w-16 h-16 object-contain" /* Sesuaikan ukuran */
            style={{
                width: '100%',    /* Pakai persentase */
                height: '100%',
                minWidth: '80px',
                minHeight: '80px'
              }}
          />
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-gradient">SpaceEduls.ID</h1>
          <p className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Edukasi Antariksa Indonesia
          </p>
        </div>
      </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-space-blue/20 transition-all duration-300 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button className="p-2 rounded-lg hover:bg-gray-850 transition hidden sm:block">
              <Search className="w-5 h-5 text-gray-400" />
            </button>
            
            {/* User/Login */}
            <button className="p-2 rounded-lg hover:bg-gray-850 transition hidden sm:block">
              <User className="w-5 h-5 text-gray-400" />
            </button>
            
            {/* CTA Button */}
            {/* <Link 
              to="/education" 
              className="btn btn-primary hidden md:inline-flex items-center space-x-2"
            >
              <Rocket className="w-4 h-4" />
              <span>Mulai Belajar</span>
            </Link> */}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-850 transition"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-800 py-4 animate-in">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-space-blue/20 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-800 mt-4">
                <div className="flex space-x-4">
                  <button className="flex-1 btn btn-secondary">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </button>
                  <button className="flex-1 btn btn-primary">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header