import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600">
      <h1 className="text-3xl font-bold underline text-red-600">
        Hello world!
      </h1>
    </div>

  )
}

export default App
