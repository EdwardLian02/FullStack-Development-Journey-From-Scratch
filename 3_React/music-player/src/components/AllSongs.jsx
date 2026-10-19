import { useContext } from "react";
import { MusicContext } from "../hooks/MusicContext";

export const AllSongs = () => {

    const {
        songs,
        handleChangeSong,
        currentSong,
        currentSongIndex
     } = useContext(MusicContext);

    return (
        <div className="all-songs">
            <h2>All Songs {songs.length} </h2>
            <div className="songs-grid">
               {
                songs.map((song, key) => (
                     <div key={key} className={`song-card ${song.id === currentSong.id? 'active': ''} `} onClick={() =>handleChangeSong(song, key)}>
                        <div className="song-i nfo">
                            <h3 className="song-title">{song.title} </h3>
                            <p className="song-artist">{song.artist} </p>
                            <span className="song-duration"> {song.duration}</span>
                        </div>
                        <div className="play-button">
                            {
                                key === currentSongIndex? "♪" : "▶"
                            }
                        </div>
                </div>
                ))
               }
               
              
            </div>
        </div>
    );
};