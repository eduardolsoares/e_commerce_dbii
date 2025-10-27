import { GetStartedButton, HeaderAuth } from "./component/auth"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            E-commerce
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Em alta</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Carrinho de compras</a>
            <HeaderAuth />
          </nav>
        </div>
      </header>

      <main className="flex-1">
      </main>

      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-600">© {new Date().getFullYear()} E-commerce </div>
      </footer>
    </div>
  )
}
