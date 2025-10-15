import { Outlet } from '@tanstack/react-router'
import { CotacaoProvider } from './features/cotacao/context/CotacaoContext'

export function App() {
  return (
    <CotacaoProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Sistema de cotação de seguros
            </h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
      </div>
    </CotacaoProvider>
  )
}
