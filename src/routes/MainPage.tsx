import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play} from "lucide-react"
import Navbar from "../components/ui/navbar"

function StaticNoise() {
  const [noise, setNoise] = useState<Array<{ id: number; x: number; y: number; opacity: number }>>([])

  useEffect(() => {
    const generateNoise = () => {
      const newNoise = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: Math.random() * 0.15,
      }))
      setNoise(newNoise)
    }

    generateNoise()
    const interval = setInterval(generateNoise, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {noise.map((dot) => (
        <div
          key={dot.id}
          className="absolute w-0.5 h-0.5 bg-white rounded-full"
          style={{
            left: dot.x,
            top: dot.y,
            opacity: dot.opacity*1.5,
          }}
        />
      ))}
    </div>
  )
}

function MovieThumbnail() {
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 1 }}
      className="relative w-full mb-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-transparent via-gray-500/10 to-transparent" />
        
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
            Lebih Dari Sekedar Umur
          </h3>
          <p className="text-gray-300 text-sm font-light">
            A cinematic journey through time and space
          </p>
        </div>

        <motion.div
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{
            scale: isHovered ? 1.1 : 1,
            opacity: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            className="group relative bg-white/20 hover:bg-white/30 border-2 border-white/50 hover:border-white/70
                       rounded-full w-20 h-20 sm:w-24 sm:h-24 transition-all duration-300
                       backdrop-blur-md shadow-2xl hover:shadow-3xl
                       hover:scale-105 active:scale-95"
          >
            <Play 
              size={isHovered ? 32 : 28} 
              className="text-white fill-white ml-1 transition-all duration-300" 
            />
            
            <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse" />
            <div className="absolute inset-0 rounded-full border border-white/20 scale-125 animate-ping" />
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"
        />
      </div>

      <div className="absolute -inset-2 border border-gray-600/20 rounded-2xl pointer-events-none" />
      <div className="absolute -inset-4 border border-gray-700/10 rounded-3xl pointer-events-none" />
    </motion.div>
  )
}

function MovieSynopsis() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="max-w-3xl mx-auto mb-16 text-center"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">
        Synopsis
      </h2>
      
      <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mb-8" />
      
      <p className="text-lg text-gray-300 leading-relaxed font-light mb-6">
        Empat sahabat — Dheovan, Raphael, Aryo dan Evaldo — merasa mereka sudah dewasa. Mereka sudah memasuki tahun terakhir kuliah, mulai bicara tentang karier, kebebasan finansial, dan bagaimana mereka bukan "anak-anak" lagi. Namun, dalam satu hari, mereka menghadapi tiga kejadian yang membuat mereka sadar bahwa menjadi dewasa bukan hanya soal usia, tapi tentang pilihan yang sulit.

      </p>
    </motion.div>
  )
}

function QuoteSection() {
  return (    
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      className="max-w-4xl mx-auto text-center"
    >
      <blockquote className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-md 
                             border border-gray-700/30 rounded-2xl p-8 sm:p-12 shadow-2xl">
        <div className="absolute -top-4 -left-4 text-6xl text-gray-600/30 font-serif">"</div>
        <div className="absolute -bottom-8 -right-4 text-6xl text-gray-600/30 font-serif rotate-180">"</div>
        
        <p className="text-xl sm:text-2xl text-gray-200 font-light italic leading-relaxed mb-6">
          "Jadi dewasa itu bukan tentang tahu segalanya, tapi tentang tetap jalan—meskipun dunia nggak kasih jawaban yang pasti." 
        </p>
        
        <footer className="text-gray-400 font-medium tracking-wide">
          <div className="w-16 h-0.5 bg-gray-500/50 mx-auto mb-4" />
          <cite className="not-italic">Us</cite>
        </footer>
      </blockquote>
    </motion.div>
  )
}

export default function MainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <StaticNoise />
      <Navbar />
      
      <main className="relative z-10 pt-24 pb-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="mb-16" />
          <MovieThumbnail />
          <MovieSynopsis />
          <QuoteSection />
        </div>
      </main>
    </div>
  )
}