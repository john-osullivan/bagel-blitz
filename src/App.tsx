import './App.css'
import { Routes, Route } from 'react-router';
import Home from './screens/Home';
import GamePlay from './screens/GamePlay';
import GameSetup from './screens/GameSetup';
import Rules from './screens/Rules';
import { GameDataProvider } from './context/gameContext';
import BagelNav from './components/BagelNav';

function App() {

  //TODO Add a nav wrapper with a button to go home using a simplified version of logo

  return (
    <GameDataProvider>
      <BagelNav />
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
