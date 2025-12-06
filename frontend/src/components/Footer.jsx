import React from 'react'
export default function Footer(){
  return (
    <footer className="w-full border-t py-6 mt-8 bg-white/30">
      <div className="container mx-auto px-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SWRR • Neilsoft Ltd. • Built with ❤️ & clean-tech focus
      </div>
    </footer>
  )
}
