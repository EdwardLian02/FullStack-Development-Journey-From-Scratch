import { useEffect, useRef, useState } from "react";
import { useMusic } from "../hooks/MusicContext";

function PlaylistItem({playlist}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchList, setSearchList] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchContainerRef = useRef(null);

    const { songs,
        addSongToPlaylist,
        deletePlaylist,
        handleChangeSong,
        currentSong, 
        currentSongIndex,
    } = useMusic();

    function handleAddSongToPlaylist(playlist, song) {
        addSongToPlaylist(playlist, song);
        setIsSearching(false);
        setSearchQuery("");
    }

        function searchSongs() {
            if(!searchQuery && isSearching) {
                return;
            }
            const searchSongList = songs.filter((song) => {
                if (song.title.toLowerCase().includes(searchQuery) ||
                    song.artist.toLowerCase().includes(searchQuery)
                ) {
                    return song;
                }
            })

        setSearchList(searchSongList);
    }

    useEffect(()=>{
        if(!searchQuery.trim()){
            if(isSearching){
                setSearchList(songs);
                return;
            }
            return;
        }

        searchSongs();
    }, [searchQuery, isSearching])

    useEffect(() => {
        if (!isSearching) return;

        function handleClickOutside(e) {
            if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
                setIsSearching(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isSearching])

    return (
        <div className="playlist-item" key={playlist.id}>
            <div className="playlist-header">
                <h3>{playlist.name} </h3>
                <div className="playlist-actions">
                    <button
                        className="delete-playlist-btn"
                        onClick={() => deletePlaylist(playlist)}
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* Add Song Search */}
            <div className="add-song-section">
                <div className="search-container" ref={searchContainerRef}>
                    <input
                        type="text"
                        placeholder="Search songs to add..."
                        className="song-search-input"
                        value={searchQuery}
                        onChange={(e) => {  setSearchQuery(e.target.value) }}
                        onClick={()=> setIsSearching(true)}
                    />

                    {
                        (isSearching) && (<div className="song-dropdown">
                            {searchList.map((song) => (
                                <div className="dropdown-item" key={song.id} onClick={() =>

                                    handleAddSongToPlaylist(playlist, song)
                                }>
                                    <span className="song-title">{song.title} </span>
                                    <span className="song-artist">{song.artist} </span>
                                </div>
                            ))}

                        </div>
                        )
                    }
                </div>
            </div>

            <div className="playlist-songs">
                {
                    playlist.songs.map((song) => (
                        <div className={`playlist-song ${currentSongIndex === songs.findIndex((s) => s.id ===song.id)? 'active': ''}`}
                         key={song.id}
                         onClick={() => {
                            const globelIndex = songs.findIndex((s) => s.id === song.id);
                            handleChangeSong(song, globelIndex)
                         }}
                         >
                            <div className="song-info">
                                <span className="song-title">{song.title} </span>
                                <span className="song-artist">{song.artist} </span>
                            </div>
                            <span className="song-duration">{song.duration} </span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default PlaylistItem;