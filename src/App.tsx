import './index.css';
import HomePage from './pages/HomePage';
import StjernerPage from './pages/StjernerPage';
import WikiPage from './pages/WikiPage';

const normalizePath = (pathname: string) => pathname.replace(/\/$/, '') || '/';

export default function App() {
  const pathname = normalizePath(window.location.pathname);

  if (pathname.startsWith('/wiki/stjerner')) {
    return <StjernerPage />;
  }

  if (pathname.startsWith('/wiki')) {
    return <WikiPage />;
  }

  return <HomePage />;
}
