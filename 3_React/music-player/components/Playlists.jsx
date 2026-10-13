
 function Playlists () {
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
                    />
                    <button className="create-btn">
                        Create
                    </button>
                </div>
            </div>

            {/* Playlists List */}
            <div className="playlists-list">
                <div className="playlist-item" >
                    <div className="playlist-header">
                        <h3>PlayList Name</h3>
                        <div className="playlist-actions">
                            <button
                                className="delete-playlist-btn"
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* Add Song Search */}
                    <div className="add-song-section">
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search songs to add..."
                                className="song-search-input"
                            />


                            {/* <div className="song-dropdown">
                               <div className="dropdown-item">
                                    <span className="song-title">Song Title</span>
                                    <span className="song-artist">Song artist</span>
                                </div>
                                <div className="dropdown-item">
                                    <span className="song-title">Song Title</span>
                                    <span className="song-artist">Song artist</span>
                                </div>
                                <div className="dropdown-item">
                                    <span className="song-title">Song Title</span>
                                    <span className="song-artist">Song artist</span>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="playlist-songs">
                        <div className="playlist-song">
                            <div className="song-info">
                                <span className="song-title">Song Title</span>
                                <span className="song-artist">Song Artist</span>
                            </div>
                            <span className="song-duration">Song Duration</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Playlists