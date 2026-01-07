import { useState } from 'react'
import { Link } from 'react-router-dom'

const Education = () => {
  const [activeTab, setActiveTab] = useState('courses')
  const [quizScore, setQuizScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  // Sample quiz questions
  const quizQuestions = [
    {
      question: "Planet apa yang paling panas di tata surya?",
      options: ["Merkurius", "Venus", "Mars", "Jupiter"],
      correct: 1,
      explanation: "Venus memiliki suhu permukaan sekitar 462°C karena efek rumah kaca ekstrem dari atmosfer tebal karbon dioksida."
    },
    {
      question: "Berapa banyak planet di tata surya kita?",
      options: ["7", "8", "9", "10"],
      correct: 1,
      explanation: "Ada 8 planet: Merkurius, Venus, Bumi, Mars, Jupiter, Saturnus, Uranus, Neptunus. Pluto diklasifikasikan sebagai planet katai."
    },
    {
      question: "Apa nama satelit alami Bumi?",
      options: ["Titan", "Europa", "Bulan", "Deimos"],
      correct: 2,
      explanation: "Bulan adalah satu-satunya satelit alami Bumi dan yang terbesar kelima di tata surya."
    },
    {
      question: "Planet mana yang memiliki cincin paling mencolok?",
      options: ["Jupiter", "Saturnus", "Uranus", "Neptunus"],
      correct: 1,
      explanation: "Saturnus memiliki sistem cincin yang paling terang dan mudah dilihat dari Bumi."
    },
    {
      question: "Apa misi NASA yang mendaratkan manusia di Bulan?",
      options: ["Gemini", "Mercury", "Apollo", "Artemis"],
      correct: 2,
      explanation: "Program Apollo (1961-1972) berhasil mendaratkan 12 astronot di Bulan dalam 6 misi."
    }
  ]

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState([])

  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate score
      const score = selectedAnswers.reduce((total, answer, index) => {
        return total + (answer === quizQuestions[index].correct ? 1 : 0)
      }, 0)
      setQuizScore(score)
      setShowResults(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResults(false)
    setQuizScore(0)
  }

  // Learning courses
  const courses = [
    {
      id: 1,
      title: 'Dasar-dasar Astronomi',
      description: 'Pelajari konsep dasar astronomi untuk pemula',
      duration: '2 jam',
      level: 'Pemula',
      lessons: 5,
      icon: '🌠',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 2,
      title: 'Tata Surya Kita',
      description: 'Jelajahi planet, bulan, dan benda langit lainnya',
      duration: '3 jam',
      level: 'Pemula',
      lessons: 8,
      icon: '🪐',
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 3,
      title: 'Eksplorasi Mars',
      description: 'Pelajari tentang misi rover dan masa depan Mars',
      duration: '2.5 jam',
      level: 'Menengah',
      lessons: 6,
      icon: '♂️',
      color: 'from-red-600 to-orange-600'
    },
    {
      id: 4,
      title: 'Teleskop & Observasi',
      description: 'Panduan observasi langit malam untuk pemula',
      duration: '1.5 jam',
      level: 'Pemula',
      lessons: 4,
      icon: '🔭',
      color: 'from-green-600 to-emerald-600'
    },
    {
      id: 5,
      title: 'NASA & Eksplorasi',
      description: 'Sejarah dan misi-misi NASA',
      duration: '2 jam',
      level: 'Menengah',
      lessons: 5,
      icon: '🚀',
      color: 'from-yellow-600 to-amber-600'
    },
    {
      id: 6,
      title: 'Alam Semesta & Kosmologi',
      description: 'Big Bang, galaksi, dan struktur alam semesta',
      duration: '4 jam',
      level: 'Lanjutan',
      lessons: 10,
      icon: '🌌',
      color: 'from-indigo-600 to-violet-600'
    }
  ]

  // Learning materials
  const materials = [
    { type: 'PDF', title: 'Panduan Observasi Bulan', size: '2.4 MB', icon: '📄' },
    { type: 'Video', title: 'Tour Tata Surya 3D', duration: '15 min', icon: '🎬' },
    { type: 'Infographic', title: 'Timeline Eksplorasi NASA', size: '5.1 MB', icon: '📊' },
    { type: 'Worksheet', title: 'Kuis Planet untuk Anak', size: '1.2 MB', icon: '📝' },
    { type: 'Poster', title: 'Peta Rasi Bintang', size: '8.3 MB', icon: '🖼️' },
    { type: 'E-book', title: 'Astronomi Dasar', size: '12 MB', icon: '📚' }
  ]

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <div className="text-center pt-8 px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="text-gradient">Edukasi Antariksa</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Materi belajar interaktif untuk semua usia. Dari pemula hingga advance,
          temukan keajaiban alam semesta melalui konten edukatif.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="container mx-auto px-4">
        <div className="bg-gray-900/50 rounded-2xl p-2 border border-gray-800">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'courses', name: 'Kursus', icon: '📚' },
              { id: 'quiz', name: 'Kuis', icon: '🧠' },
              { id: 'materials', name: 'Materi', icon: '📁' },
              { id: 'games', name: 'Game', icon: '🎮' },
              { id: 'for-teachers', name: 'Untuk Guru', icon: '👨‍🏫' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[120px] px-4 py-3 rounded-lg transition flex items-center justify-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'hover:bg-gray-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <>
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition group"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">{course.icon}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                  <p className="text-gray-400 mb-6">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <span className="mr-1">⏱️</span>
                        {course.duration}
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">📖</span>
                        {course.lessons} pelajaran
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      course.level === 'Pemula' ? 'bg-green-900/30 text-green-300' :
                      course.level === 'Menengah' ? 'bg-yellow-900/30 text-yellow-300' :
                      'bg-purple-900/30 text-purple-300'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                  
                  <button className="w-full py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition font-medium">
                    Mulai Belajar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Path */}
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-500/30">
              <h2 className="text-2xl font-bold mb-6">Jalur Pembelajaran</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-lg">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Level Pemula</h3>
                    <p className="text-gray-300">
                      Mulai dengan konsep dasar astronomi, mengenal planet, dan pengenalan observasi.
                      Selesaikan kursus Dasar-dasar Astronomi dan Tata Surya Kita.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-lg">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Level Menengah</h3>
                    <p className="text-gray-300">
                      Pelajari misi NASA, eksplorasi Mars, dan teknik observasi lanjutan.
                      Praktikkan dengan kuis dan materi interaktif.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-600 to-red-600 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Level Lanjutan</h3>
                    <p className="text-gray-300">
                      Eksplorasi kosmologi, astrofisika, dan penelitian terkini.
                      Ikuti kursus Alam Semesta & Kosmologi dan bergabung dengan diskusi komunitas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Quiz Tab */}
      {activeTab === 'quiz' && (
        <div className="container mx-auto px-4">
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
            {!showResults ? (
              <>
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Kuis Antariksa</h2>
                    <p className="text-gray-400">Uji pengetahuan Anda tentang tata surya</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Pertanyaan</div>
                    <div className="text-xl font-bold">
                      {currentQuestion + 1} / {quizQuestions.length}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-8">
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Current Question */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-6">
                    {quizQuestions[currentQuestion].question}
                  </h3>
                  
                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full p-4 text-left rounded-xl transition ${
                          selectedAnswers[currentQuestion] === index
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                            : 'bg-gray-800 hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                            selectedAnswers[currentQuestion] === index
                              ? 'bg-white/20'
                              : 'bg-gray-700'
                          }`}>
                            {String.fromCharCode(65 + index)} {/* A, B, C, D */}
                          </div>
                          <span>{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                    className={`px-6 py-3 rounded-lg ${
                      currentQuestion === 0
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    ← Sebelumnya
                  </button>
                  
                  <button
                    onClick={handleNextQuestion}
                    disabled={selectedAnswers[currentQuestion] === undefined}
                    className={`px-6 py-3 rounded-lg font-medium ${
                      selectedAnswers[currentQuestion] === undefined
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90'
                    }`}
                  >
                    {currentQuestion === quizQuestions.length - 1 ? 'Lihat Hasil' : 'Selanjutnya →'}
                  </button>
                </div>
              </>
            ) : (
              /* Quiz Results */
              <div className="text-center">
                <div className="text-6xl mb-6">
                  {quizScore === quizQuestions.length ? '🏆' :
                   quizScore >= quizQuestions.length * 0.7 ? '🎉' :
                   quizScore >= quizQuestions.length * 0.5 ? '👍' : '📚'}
                </div>
                
                <h2 className="text-3xl font-bold mb-4">Hasil Kuis Anda</h2>
                
                <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-2xl mb-8">
                  <div className="text-5xl font-bold mb-2">{quizScore}/{quizQuestions.length}</div>
                  <div className="text-lg">
                    {quizScore === quizQuestions.length ? 'SEMPURNA! Anda ahli astronomi!' :
                     quizScore >= quizQuestions.length * 0.7 ? 'HAMPIR SEMPURNA! Pengetahuan bagus!' :
                     quizScore >= quizQuestions.length * 0.5 ? 'LUMAYAN! Terus belajar!' :
                     'JANGAN MENYERAH! Coba lagi!'}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Review Jawaban:</h3>
                  <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                      <div key={index} className="bg-gray-800/50 p-4 rounded-xl">
                        <div className="font-bold mb-2">{q.question}</div>
                        <div className="text-sm text-gray-300 mb-2">
                          Jawaban Anda: <span className={selectedAnswers[index] === q.correct ? 'text-green-400' : 'text-red-400'}>
                            {q.options[selectedAnswers[index]]}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400">
                          <span className="font-semibold">Penjelasan:</span> {q.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleRestartQuiz}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:opacity-90 transition"
                  >
                    Coba Kuis Lagi
                  </button>
                  <Link
                    to="/solar-system"
                    className="px-8 py-3 bg-gray-800 rounded-lg font-semibold hover:bg-gray-700 transition"
                  >
                    Pelajari Tata Surya
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Materials Tab */}
{activeTab === 'materials' && (
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {materials.map((material, index) => (
        <div
          key={index}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition group"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="text-4xl">{material.icon}</div>
            <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">
              {material.type}
            </span>
          </div>
          
          <h3 className="text-xl font-bold mb-3">{material.title}</h3>
          
          <div className="text-gray-400 text-sm mb-6">
            {material.size && <span>{material.size}</span>}
            {material.duration && <span>{material.duration}</span>}
          </div>
          
          <button 
            onClick={() => {
              // Simulasi download
              alert(`Mengunduh: ${material.title}\n\nFile akan mulai mengunduh...\n\nCatatan: Ini simulasi. Di versi produksi, file akan benar-benar terdownload.`);
            }}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:opacity-90 transition font-medium"
          >
            Download
          </button>
        </div>
      ))}
    </div>
    
    <div className="mt-12 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-500/30">
      <h3 className="text-2xl font-bold mb-6">📚 Untuk Guru & Sekolah</h3>
      <p className="text-gray-300 mb-6">
        Kami menyediakan materi khusus untuk pendidik yang ingin mengajarkan astronomi di kelas.
        Semua materi gratis dan bisa diunduh untuk keperluan edukasi.
      </p>
      <div className="flex flex-wrap gap-4">
        <button 
          onClick={() => alert('Downloading RPP Astronomi...\n\nFile: RPP_Astronomi_SMA.pdf\nSize: 2.3 MB')}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Download RPP Astronomi
        </button>
        <button 
          onClick={() => alert('Downloading Materi Presentasi...\n\nFile: Presentasi_Tata_Surya.pptx\nSize: 15.2 MB')}
          className="px-6 py-3 bg-gray-800 rounded-lg font-semibold hover:bg-gray-700 transition"
        >
          Materi Presentasi
        </button>
        <button 
          onClick={() => alert('Downloading Worksheet Siswa...\n\nFile: Worksheet_Planet_SD.pdf\nSize: 1.8 MB')}
          className="px-6 py-3 bg-gray-800 rounded-lg font-semibold hover:bg-gray-700 transition"
        >
          Worksheet Siswa
        </button>
      </div>
    </div>
  </div>
)}

      {/* Games Tab */}
{activeTab === 'games' && (
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4">🎮 Game Edukasi Antariksa</h2>
      <p className="text-gray-300 max-w-2xl mx-auto">
        Belajar sambil bermain! Game-game interaktif ini akan membuat Anda
        memahami konsep astronomi dengan cara yang menyenangkan.
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {[
        { 
          title: 'Memory Planet', 
          desc: 'Cocokkan gambar planet', 
          icon: '🎴', 
          color: 'from-blue-600 to-cyan-600',
          play: () => alert('🎮 Memulai Game Memory Planet!\n\nCocokkan gambar planet yang sama!\n\nKlik OK untuk memulai permainan...')
        },
        { 
          title: 'Space Quiz Race', 
          desc: 'Balap jawab pertanyaan', 
          icon: '🏎️', 
          color: 'from-purple-600 to-pink-600',
          play: () => alert('🏎️ Memulai Space Quiz Race!\n\nJawab pertanyaan secepat mungkin!\n\nKlik OK untuk memulai...')
        },
        { 
          title: 'Rocket Builder', 
          desc: 'Buat roket Anda sendiri', 
          icon: '🚀', 
          color: 'from-red-600 to-orange-600',
          play: () => alert('🚀 Memulai Rocket Builder!\n\nPilih bagian roket dan luncurkan!\n\nKlik OK untuk memulai...')
        },
        { 
          title: 'Constellation Puzzle', 
          desc: 'Susun rasi bintang', 
          icon: '✨', 
          color: 'from-green-600 to-emerald-600',
          play: () => alert('✨ Memulai Constellation Puzzle!\n\nSusun bintang menjadi rasi yang benar!\n\nKlik OK untuk memulai...')
        },
      ].map((game, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br ${game.color} rounded-2xl p-6 text-center group hover:transform hover:scale-105 transition-transform`}
        >
          <div className="text-5xl mb-4">{game.icon}</div>
          <h3 className="text-xl font-bold mb-2">{game.title}</h3>
          <p className="text-gray-200/80">{game.desc}</p>
          <button 
            onClick={game.play}
            className="mt-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition"
          >
            Mainkan
          </button>
        </div>
      ))}
    </div>
    
    <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
      <h3 className="text-2xl font-bold mb-6">Game Terpopuler: Space Memory</h3>
      <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center mb-6">
        <div className="text-center">
          <div className="text-8xl mb-4">🎴</div>
          <button 
            onClick={() => {
              alert('🎮 MEMORY GAME - Tata Surya\n\nAturan:\n1. Terdapat 12 kartu (6 pasang planet)\n2. Klik kartu untuk membuka\n3. Cari pasangan planet yang sama\n4. Selesaikan dalam waktu tercepat!\n\nKlik OK untuk mulai bermain!');
              // Simulasi game sederhana
              setTimeout(() => {
                alert('✨ SELAMAT!\n\nAnda menyelesaikan game dalam 45 detik!\n\nSkor: 850 poin\n\nIngin bermain lagi?');
              }, 1500);
            }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Mainkan Game Demo
          </button>
        </div>
      </div>
      <p className="text-gray-300">
        Game memory klasik dengan twist astronomi. Cocokkan gambar planet, satelit,
        dan objek luar angkasa lainnya sambil belajar nama dan karakteristiknya.
        Semakin tinggi level, semakin banyak kartu yang harus diingat!
      </p>
    </div>
  </div>
)}

      {/* For Teachers Tab */}
      {activeTab === 'for-teachers' && (
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-500/30 mb-8">
            <h2 className="text-3xl font-bold mb-6">👨‍🏫 Portal untuk Pendidik</h2>
            <p className="text-gray-300 mb-8">
              Selamat datang di portal khusus untuk guru dan pendidik! Di sini Anda akan menemukan
              semua sumber daya yang diperlukan untuk mengajarkan astronomi dengan efektif dan menarik.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Rencana Pelajaran', desc: 'RPP lengkap untuk SD-SMA', icon: '📋' },
                { title: 'Materi Ajar', desc: 'PPT, worksheet, video', icon: '📚' },
                { title: 'Pedoman Evaluasi', desc: 'Kisi-kisi soal dan rubrik', icon: '📊' },
              ].map((resource, index) => (
                <div key={index} className="bg-black/30 p-6 rounded-xl border border-gray-800">
                  <div className="text-4xl mb-4">{resource.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                  <p className="text-gray-400">{resource.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold mb-6">🏫 Untuk Sekolah</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>Paket materi untuk ekstrakurikuler astronomi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>Panduan observasi langit untuk siswa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>Kontes dan lomba astronomi sekolah</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>Kemitraan dengan observatorium lokal</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold mb-6">📧 Hubungi Kami</h3>
              <p className="text-gray-300 mb-6">
                Ingin menggunakan materi ini di sekolah Anda? Butuh bantuan khusus?
                Hubungi tim edukasi kami.
              </p>
              <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:opacity-90 transition">
                Ajukan Permintaan Materi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 md:p-12 text-center border border-blue-500/30">
          <h2 className="text-3xl font-bold mb-6">Siap Memulai Perjalanan Belajar?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pelajar yang sudah mulai mengeksplorasi keajaiban alam semesta.
            Semua materi gratis dan tersedia untuk semua usia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg hover:opacity-90 transition">
              Daftar Gratis
            </button>
            <button className="px-8 py-4 bg-gray-800 rounded-xl font-semibold text-lg hover:bg-gray-700 transition">
              Lihat Semua Kursus
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Education