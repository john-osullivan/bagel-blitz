import './App.css'
import { Routes, Route } from 'react-router';
import Home from './components/Home';
import GamePlay from './components/GamePlay';
import GameSetup from './components/GameSetup';
import Rules from './components/Rules';
import { GameDataProvider } from './context/gameContext';

function App() {

  //TODO Add a nav wrapper with a button to go home using a simplified version of logo

  return (
    <GameDataProvider>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/setup" element={<GameSetup />} />
        <Route path="/play" element={<GamePlay />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </GameDataProvider>

  )
}

export default App  
