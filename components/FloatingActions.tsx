'use client'

import { Phone, MessageCircle } from 'lucide-react'

export default function FloatingActions() {
  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-40 flex flex-col gap-2 md:gap-3">
      {/* Zalo Button */}
      <a
        href="https://zalo.me/0983995596"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 md:w-14 md:h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 group"
        aria-label="Chat qua Zalo"
      >
        <svg className="w-6 h-6 md:w-8 md:h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.145 2 11.242c0 2.832 1.415 5.354 3.623 7.085L4.5 22l3.962-1.857c1.073.448 2.25.699 3.538.699 5.523 0 10-4.145 10-9.242S17.523 2 12 2zm3.5 11.5h-7v-1h7v1zm0-2h-7v-1h7v1zm0-2h-7v-1h7v1z"/>
        </svg>
        <span className="hidden md:block absolute left-full ml-3 bg-blue-500 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat Zalo
        </span>
      </a>

      {/* Phone Button */}
      <a
        href="tel:0983995596"
        className="w-12 h-12 md:w-14 md:h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 group animate-pulse"
        aria-label="Gọi điện"
      >
        <Phone className="w-6 h-6 md:w-7 md:h-7 text-white" />
        <span className="hidden md:block absolute left-full ml-3 bg-green-500 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          0983 99 55 96
        </span>
      </a>

      {/* Messenger Button */}
      <a
        href="https://m.me/otototaydo"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 group"
        aria-label="Chat qua Messenger"
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white" />
        <span className="hidden md:block absolute left-full ml-3 bg-purple-600 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Messenger
        </span>
      </a>
    </div>
  )
}
