import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
const Home = lazy(() => import('./pages/home'));
const About = lazy(() => import('./pages/about'));
export default function RoutesBrowser() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about/:id' element={<About />} />
    </Routes>
  )
}