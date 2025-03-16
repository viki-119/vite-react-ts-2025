import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/home'));
const About = lazy(() => import('./pages/about'));
// const MicroAppContainer = lazy(() => import('./pages/micro-app'));

const RoutesBrowser: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/:id" element={<About />} />
        {/* 微应用容器 */}
        <Route path="/vite-vue3-ts-2025/*" element={<div id="subapp-container"></div>} />
      </Routes>
    </Suspense>
  );
};

export default RoutesBrowser;
