import './App.css'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner';

function App() {
  

  return (
    <>
      <Toaster richColors position="top-center" />
      <Outlet />
    </>
  )
}

export default App
