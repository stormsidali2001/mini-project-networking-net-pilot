import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/globals.css';
import Home from './pages';
import Playground from './pages/playground';
import Navbar from './components/Navbar';
import styles from './styles/App.module.css'


export default function App() {
  return (
    <div className={styles.container}>
      <Router>
        <Navbar/>
        <Routes>
          <Route  path="/" element={<Home/>} />
        </Routes>
        <Routes>
          <Route path="/playground" element={<Playground/>} />
        </Routes>
      </Router>
    </div>
  );
}
