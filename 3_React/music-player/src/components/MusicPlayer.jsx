import { useEffect, useRef } from "react";
import { useMusic } from "../hooks/MusicContext";

export const MusicPlayer = () => {
    const { 
        songs,
        currentSong, 
        currentSongIndex, 
        duration,
        currentTime, 
        isPlay,
        volume, 
        nextSong, 
        prevSong, 
        setIsPlay,
        setDuration, 
        setCurrentTime,
        setVolume, 
        formatTime,
        handleChangeSong, 
        handlePlayMusic,
    } = useMusic();
    const audioRef = useRef(null);

  
    useEffect(() => {
        const audio = audioRef.current

        if (!audio) return;
        
        finishAndReset(audio)

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime)

        }

        const handleEnded = () => {
            nextSong();
        }



        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("canplay", handleLoadedMetadata);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("ended", handleEnded);


        return () => {
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("canplay", handleLoadedMetadata);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("ended", handleEnded);
        }


    }, [currentSong.url, setDuration, setCurrentTime, currentSong]);

    function finishAndReset(audio){
        setCurrentTime(0);
        audio.currentTime = 0;
    }


    const  handleTimeChange=  (e)  => {
        const audio = audioRef.current;
        if(!audio) return;

        const newTime = e.target.value;
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    }


    useEffect(() => {
        const audio = audioRef.current;
        if(isPlay){
            audio.play().catch((err) => console.error(err));
        } else {
            audio.pause();
        }
    },[isPlay, currentSong])


    const  handleVolumnChange = (e) => {
        const audio = audioRef.current;
        if(!audio) return;

        const newVolumn = e.target.value;
        audio.volume= newVolumn
        setVolume(newVolumn);  
    }


    return (
        <div className="music-player">
            <audio preload="metadata" src={currentSong.url} ref={audioRef} crossOrigin="anonymous" />

            <div className="track-info">
                <h3 className="track-title">{currentSong.title} </h3>
                <p className="track-artist">{currentSong.artist} </p>
            </div>

            <div className="progress-container">
                <span className="time">{formatTime(currentTime)} </span>
                <input
                    type="range"
                    min="0"
                    max={duration}
                    step="0.1"
                    value={currentTime}
                    onChange={handleTimeChange}
                    className="progress-bar"
                />
                <span className="time">{formatTime(duration)} </span>
            </div>

            <div className="controls">
                <button className="control-btn" onClick={prevSong}>⏮</button>
                <button className="control-btn play-btn" onClick={handlePlayMusic}>
                    {
                        isPlay? "⏸": "▶"
                    }
                    
                    </button>
                <button className="control-btn" onClick={nextSong}>⏭</button>
            </div>

            <div className="volume-container">
                <span className="volume-icon">🔊</span>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumnChange}
                    className="volume-bar"
                />
            </div>
        </div>
    );
};