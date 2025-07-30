import { Layout } from './components'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <Layout>
      <Outlet/>
    </Layout>
  )
}

export default App
