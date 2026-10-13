import { useState } from "react"

const SONGS = [
     {
    id: 1,
    title: "Keep You Away",
    artist: "EchoBR",
    url: "/songs/acoustic-guitar-boop.mp3",
    duration: "4:32",
  },
  {
    id: 2,
    title: "Breaching",
    artist: "EchoBR",
    url: "/songs/Breaching.wav",
    duration: "3:45",
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
    title: "Nothing You Really Want",
    artist: "EchoBR",
    url: "songs/kamhunt-run.mp3",
    duration: "2:58",
  },
  {
    id: 5,
    title: "Nothing You Really Want",
    artist: "EchoBR",
    url: "songs/pianos.mp3",
    duration: "2:58",
  },
  {
    id: 6,
    title: "Nothing You Really Want",
    artist: "EchoBR",
    url: "songs/van-wiese-bass-wiggle.mp3",
    duration: "2:58",
  },
 
]


function useMusic(){
    const [songs, setSongs] = useState(SONGS)
    const [currentSong, setCurrentSong] = useState(SONGS[0]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    function handleChangeSong(newSong, index){

        setCurrentSong(newSong);
        setCurrentSongIndex(index);
    }

    return [songs, handleChangeSong, currentSong, currentSongIndex]
}


export default useMusic;