import { useState } from 'react'
import { Link } from 'react-router-dom'
import { solarSystemContent, solarSystemQuiz, solarSystemActivities } from '../../data/astronomyContent/solarSystemContent'

const SolarSystemCourse = () => {
  const [activeSection, setActiveSection] = useState('overview')
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState([])
  const [quizScore, setQuizScore] = useState(null)

  const currentSection = solarSystemContent.sections.find(s => s.id === activeSection) || 
    { title: 'Overview', content: solarSystemContent.overview }

  const handleQuizSubmit = () => {
    const score = quizAnswers.reduce((total, answer, index) => {
      return total + (answer === solarSystemQuiz[index].correct ? 1 : 0)
    }, 0)
    setQuizScore(score)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/education" className="text-blue-400 hover:text-blue-300">
                ← Kembali ke Pendidikan
              </Link>
              <h1 className="text-3xl font-bold mt-2">Tata Surya Kita</h1>
              <p className="text-gray-400">Kursus lengkap tentang sistem planet kita</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Progress</div>
              <div className="text-xl font-bold">25%</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 sticky top-8">
              <h3 className="text-lg font-bold mb-4">📚 Materi Pembelajaran</h3>
              
              <button
                onClick={() => setActiveSection('overview')}
                className={`w-full text-left p-3 rounded-lg mb-2 ${activeSection === 'overview' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                🌟 Overview Tata Surya
              </button>

              <div className="mb-4">
                <div className="text-gray-400 text-sm mb-2">🪐 Planet-planet</div>
                <div className="space-y-1">
                  {solarSystemContent.sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left p-2 rounded-lg flex items-center ${activeSection === section.id ? 'bg-gradient-to-r ' + section.color : 'hover:bg-gray-700'}`}
                    >
                      <span className="mr-2">{section.icon}</span>
                      <span>{section.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <button
                  onClick={() => setShowQuiz(true)}
                  className="w-full p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold mb-3"
                >
                  🧠 Ikuti Kuis
                </button>
                <button className="w-full p-3 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600">
                  📥 Download Materi PDF
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {showQuiz ? (
              /* Quiz Interface */
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
                {quizScore === null ? (
                  <>
                    <h2 className="text-2xl font-bold mb-6">🧠 Kuis Tata Surya</h2>
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span>Pertanyaan {currentQuizQuestion + 1} dari {solarSystemQuiz.length}</span>
                        <span>{Math.round(((currentQuizQuestion + 1) / solarSystemQuiz.length) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all"
                          style={{ width: `${((currentQuizQuestion + 1) / solarSystemQuiz.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4">
                        {solarSystemQuiz[currentQuizQuestion].question}
                      </h3>
                      <div className="space-y-3">
                        {solarSystemQuiz[currentQuizQuestion].options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              const newAnswers = [...quizAnswers]
                              newAnswers[currentQuizQuestion] = index
                              setQuizAnswers(newAnswers)
                            }}
                            className={`w-full p-4 text-left rounded-xl ${quizAnswers[currentQuizQuestion] === index ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                          >
                            <div className="flex items-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${quizAnswers[currentQuizQuestion] === index ? 'bg-white/20' : 'bg-gray-600'}`}>
                                {String.fromCharCode(65 + index)}
                              </div>
                              <span>{option}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={() => setCurrentQuizQuestion(Math.max(0, currentQuizQuestion - 1))}
                        className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600"
                      >
                        ← Sebelumnya
                      </button>
                      
                      {currentQuizQuestion < solarSystemQuiz.length - 1 ? (
                        <button
                          onClick={() => setCurrentQuizQuestion(currentQuizQuestion + 1)}
                          disabled={quizAnswers[currentQuizQuestion] === undefined}
                          className={`px-6 py-3 rounded-lg font-semibold ${quizAnswers[currentQuizQuestion] === undefined ? 'bg-gray-800 text-gray-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'}`}
                        >
                          Selanjutnya →
                        </button>
                      ) : (
                        <button
                          onClick={handleQuizSubmit}
                          disabled={quizAnswers[currentQuizQuestion] === undefined}
                          className={`px-6 py-3 rounded-lg font-semibold ${quizAnswers[currentQuizQuestion] === undefined ? 'bg-gray-800 text-gray-500' : 'bg-gradient-to-r from-green-600 to-emerald-600'}`}
                        >
                          Selesai & Lihat Nilai
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  /* Quiz Results */
                  <div className="text-center">
                    <div className="text-6xl mb-4">
                      {quizScore === solarSystemQuiz.length ? '🏆' :
                       quizScore >= solarSystemQuiz.length * 0.7 ? '🎉' :
                       quizScore >= solarSystemQuiz.length * 0.5 ? '👍' : '📚'}
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Hasil Kuis Anda</h2>
                    <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 rounded-2xl mb-8">
                      <div className="text-5xl font-bold mb-2">{quizScore}/{solarSystemQuiz.length}</div>
                      <div className="text-xl">
                        {quizScore === solarSystemQuiz.length ? 'SEMPURNA! Anda ahli Tata Surya!' :
                         quizScore >= solarSystemQuiz.length * 0.7 ? 'HEBAT! Pengetahuan Anda luas!' :
                         quizScore >= solarSystemQuiz.length * 0.5 ? 'BAIK! Terus belajar!' :
                         'JANGAN MENYERAH! Coba lagi!'}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setShowQuiz(false)
                        setQuizScore(null)
                        setCurrentQuizQuestion(0)
                        setQuizAnswers([])
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold"
                    >
                      Kembali ke Materi
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Course Content */
              <div className="space-y-8">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-500/30">
                  <h2 className="text-3xl font-bold mb-4">
                    {currentSection.icon} {currentSection.title}
                  </h2>
                  <p className="text-gray-300 text-lg">
                    {currentSection.content.description}
                  </p>
                </div>

                {/* Key Facts */}
                {currentSection.content.keyFacts && (
                  <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold mb-4">📊 Fakta Kunci</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(currentSection.content.keyFacts).map(([key, value]) => (
                        <div key={key} className="bg-gray-900/50 p-4 rounded-lg">
                          <div className="text-gray-400 text-sm">{key}</div>
                          <div className="font-semibold">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Images */}
                {currentSection.content.images && (
                  <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold mb-4">🖼️ Gambar</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {currentSection.content.images.map((image, index) => (
                        <div key={index} className="rounded-lg overflow-hidden">
                          <img 
                            src={image} 
                            alt={`${currentSection.title} ${index + 1}`}
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features/Interesting Facts */}
                {currentSection.content.features && (
                  <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold mb-4">✨ Fitur Menarik</h3>
                    <ul className="space-y-3">
                      {currentSection.content.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-400 mr-3">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Activities */}
                {activeSection === 'overview' && (
                  <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-2xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold mb-6">🔬 Aktivitas Praktik</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {solarSystemActivities.map((activity, index) => (
                        <div key={index} className="bg-gray-900/50 p-6 rounded-xl">
                          <h4 className="font-bold mb-3">{activity.title}</h4>
                          <div className="mb-4">
                            <div className="text-gray-400 text-sm mb-1">Material:</div>
                            <div className="flex flex-wrap gap-2">
                              {activity.materials.map((mat, i) => (
                                <span key={i} className="px-2 py-1 bg-gray-800 rounded text-xs">
                                  {mat}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="mb-4">
                            <div className="text-gray-400 text-sm mb-1">Langkah-langkah:</div>
                            <ol className="list-decimal list-inside space-y-1">
                              {activity.steps.map((step, i) => (
                                <li key={i} className="text-gray-300">{step}</li>
                              ))}
                            </ol>
                          </div>
                          <div className="text-blue-400 text-sm">
                            💡 {activity.learning}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between">
                  <button className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600">
                    ← Materi Sebelumnya
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:opacity-90 font-semibold">
                    Materi Selanjutnya →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SolarSystemCourse