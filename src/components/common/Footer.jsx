import { Link } from 'react-router-dom'
import { Github, Twitter, Mail, ExternalLink } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Eksplorasi': [
      { name: 'Tata Surya 3D', path: '/solar-system' },
      { name: 'Misi NASA Live', path: '/missions' },
      { name: 'Galeri Foto', path: '/gallery' },
      { name: 'Observasi Langit', path: '/observation' },
    ],
    'Edukasi': [
      { name: 'Kursus Dasar', path: '/education/basic' },
      { name: 'Kuis Interaktif', path: '/education/quiz' },
      { name: 'Materi Download', path: '/education/materials' },
      { name: 'Untuk Guru', path: '/education/teachers' },
    ],
    'Sumber': [
      { name: 'NASA API Docs', url: 'https://api.nasa.gov' },
      { name: 'Open Data NASA', url: 'https://data.nasa.gov' },
      { name: 'JPL NASA', url: 'https://www.jpl.nasa.gov' },
      { name: 'Space Images', url: 'https://images.nasa.gov' },
    ],
  }

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, url: '#', label: 'GitHub' },
    { icon: <Twitter className="w-5 h-5" />, url: '#', label: 'Twitter' },
    { icon: <Mail className="w-5 h-5" />, url: '#', label: 'Email' },
  ]

  return (
    <footer className="mt-auto border-t border-gray-800">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-xl"><img src="/logo.svg" alt="" /></span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gradient">SpaceEduls.ID</h2>
                <p className="text-gray-400">Edukasi Antariksa Indonesia</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Platform edukasi non-komersial yang bertujuan meningkatkan literasi sains 
              antariksa di Indonesia melalui konten interaktif dan data real-time dari NASA.
              Mari kita tingkatkan pengetahuan astronomi untuk menyalamatkan tempat tinggal biru kecil ini bersama DulsInspirations
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold text-lg mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    {link.path ? (
                      <Link 
                        to={link.path} 
                        className="text-gray-400 hover:text-white transition flex items-center"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition flex items-center"
                      >
                        {link.name}
                        <ExternalLink className="ml-2 w-3 h-3" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              © {currentYear} DulsInspirations. All data from NASA Open APIs.
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Disclaimer
              </a>
              <div className="text-gray-500">
                Made with ❤️ for Indonesia
              </div>
            </div>
          </div>
        </div>

        {/* NASA Attribution */}
        <div className="py-4 text-center text-gray-500 text-sm border-t border-gray-800 mt-4">
          <p>
            This product uses the NASA API but is not endorsed or certified by NASA.
            NASA data and imagery are used in accordance with their 
            <a 
              href="https://www.nasa.gov/nasa-data" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 ml-1"
            >
              data policy
            </a>.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer