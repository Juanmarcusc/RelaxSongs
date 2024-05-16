import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('') 
  
  const fetchSong = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/song?q=${searchTerm}`);
      setSong(response.data);
    } catch (error) {
      console.error('Error fetching song:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
     <div className="App">
      <h1>Relax Songs</h1>
      <input placeholder="Procurar Música" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
      <button onClick={fetchSong} disabled={loading}>Buscar</button>
      {song && (
        <div>
          <h2>{song.title}</h2>
          <p>Artist: {song.artist}</p>
          <audio controls>
            <source src={song.audioUrl} type="audio/mpeg" />
          </audio>
        </div>
      )}
    </div>

  );
}

export default App;
