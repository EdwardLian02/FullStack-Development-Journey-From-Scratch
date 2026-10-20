import { BrowserRouter, Routes, Route } from 'react-router';
import Playlists from './components/Playlists';
import { Navbar } from './components/Nav';
import { MusicPlayer } from './components/MusicPlayer';
import { AllSongs } from './components/AllSongs';
import { MusicProvider } from './hooks/MusicContext';

function App() {
  return (
    <BrowserRouter>
      <MusicProvider>
        <div className="app">
          <Navbar />
          <main className="app-main">
            <div className="player-section">
              <MusicPlayer />
            </div>
            <div className="content-section">
              <Routes>
                <Route path='/' element={<AllSongs />} />
                <Route path='/playlists' element={<Playlists />} />
              </Routes>
            </div>
          </main>
        </div>
      </MusicProvider>
    </BrowserRouter>
  )
}

export default App;