import { useEffect, useState } from "react";
import { useMusic } from "../hooks/MusicContext";
import PlaylistItem from "./PlayListItem";

function Playlists() {


    const [newPlaylistName, setNewPlaylistName] = useState("");
   
    const [currentSearchingPlaylist, setCurrentSearchingPlaylist] = useState(null);



    const {
        playlists,
        createPlaylist,
       
    } = useMusic()





    function handleCreatePlaylist() {
        if (!newPlaylistName.trim()) return;
        createPlaylist(newPlaylistName);
        setNewPlaylistName("");
        console.log(playlists);
    }





    return (
        <div className="playlists">
            <h2>Playlists</h2>

            {/* Create New Playlist */}
            <div className="create-playlist">
                <h3>Create New Playlist</h3>
                <div className="playlist-form">
                    <input
                        type="text"
                        placeholder="Playlist name..."
                        className="playlist-input"
                        value={newPlaylistName}
                        onChange={e => setNewPlaylistName(e.target.value)}
                    />
                    <button className="create-btn" onClick={handleCreatePlaylist}>
                        Create
                    </button>
                </div>
            </div>

            {/* Playlists List */}
            <div className="playlists-list">

                {
                    playlists.map((playlist) => (
                     <PlaylistItem playlist={playlist} />
                    ))
                }

            </div>
        </div>
    );
};


export default Playlists