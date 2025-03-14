import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
const Home = lazy(() => import('./pages/home'));
const About = lazy(() => import('./pages/about'));
const RoutesBrowser:React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about/:id' element={<About />} />
    </Routes>
  )
}

export default RoutesBrowser;