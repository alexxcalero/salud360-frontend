import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div>
        <h1 className='text-emerald-600'>
          Proyecto React.js (o .ts XD) + TailwindCSS + Shadcn configurado!!! Cortesía de Fabián(U) 
        </h1>
     </div>
     <img src="https://universitario.pe/media/images/banners/PORTDA_WEB.jpg" alt="" />
    </>
  )
}

export default App
