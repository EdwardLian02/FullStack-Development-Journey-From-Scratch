import { createContext, useContext, useState } from "react";

export const MusicContext = createContext();
const SONGS = [
  {
    id: 2,
    title: "Breaching",
    artist: "EchoBR",
    url: "/songs/Breaching.wav",
    duration: "3:45",
  },
  {
    id: 1,
    title: "Keep You Away",
    artist: "EchoBR",
    url: "/songs/acoustic-guitar-boop.mp3",
    duration: "4:32",
  },

  {
    id: 3,
    title: "Forgotten Memories",
    artist: "EchoBR",
    url: "/songs/boop.mp3",
    duration: "3:12",
  },
  {
    id: 4,
    title: "Kamhunt RUN",
    artist: "EchoBR",
    url: "songs/kamhunt-run.mp3",
    duration: "2:58",
  },
  {
    id: 5,
    title: "Pianos",
    artist: "EchoBR",
    url: "songs/pianos.mp3",
    duration: "2:58",
  },
  {
    id: 6,
    title: "Van Wiese Bass Wiggle",
    artist: "EchoBR",
    url: "songs/van_wiese-bass-wiggle.mp3",
    duration: "2:58",
  },
]


export const MusicProvider = ({ children }) => {
  const [songs, setSongs] = useState(SONGS)
  const [currentSong, setCurrentSong] = useState(SONGS[0]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [volume, setVolume] = useState(1);

  const [playlists, setPlaylists] = useState([]);

  function handleChangeSong(newSong, index) {
    setCurrentSong(newSong);
    setCurrentSongIndex(index);
  }

  function handlePlayMusic() {
    setIsPlay((prev) => prev = !prev);
  }

  const nextSong = () => {
    setCurrentSongIndex((prev) => {
      const nextIndex = (prev + 1) % songs.length
      setCurrentSong(songs[nextIndex]);
      setIsPlay(true);
      return nextIndex;
    });
  }

  const prevSong = () => {
    setCurrentSongIndex((prev) => {
      const prevIndex = prev === 0 ? songs.length - 1 : prev - 1;
      setCurrentSong(songs[prevIndex]);
      setIsPlay(true);
      return prevIndex;
    });
  }

  // 7 -> current(0) 1/8

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }


  function createPlaylist(newPlaylistName) {
    setPlaylists((prevState) => [...prevState, {
      id: Date.now(),
      name: newPlaylistName.trim(),
      songs: []
    }]);
  }

  function addSongToPlaylist(playlist, song) {
    console.log('add song to playlist')
    setPlaylists((prevPlaylists) => prevPlaylists.map((prevList) => {
      if (prevList.id !== playlist.id) return prevList;

      if (prevList.songs.some((s) => s.id === song.id)) return prevList;

      return {
        ...prevList,
        songs: [...prevList.songs, song]
      };
    }))
  }

  function deletePlaylist(playlist){
    const updatePlaylists = playlists.filter((p) => p.id !== playlist.id);
    setPlaylists(updatePlaylists);
  }

  return <MusicContext.Provider value={{
    songs,
    currentSong,
    currentSongIndex,
    duration,
    currentTime,
    isPlay,
    volume,
    playlists,
    deletePlaylist,
    addSongToPlaylist,
    setPlaylists,
    createPlaylist,
    nextSong,
    prevSong,
    setIsPlay,
    setDuration,
    setCurrentTime,
    setVolume,
    formatTime,
    handleChangeSong,
    handlePlayMusic,
  }}> {children} </MusicContext.Provider>
}


export const useMusic = () => {
  const contextValue = useContext(MusicContext);

  if (!contextValue)
    throw new Error("useMusic must be inside of MusicProvider")

  return contextValue;
}