import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react'
import { asset } from '../utils/assetPath'

export const TRACKS = [
    {
        id: 0,
        title: 'Just The Two Of Us',
        artist: 'Dollcis',
        src: asset('/music/just-the-two-of-us.mp3'),
    },
    {
        id: 1,
        title: 'Smooth Operator',
        artist: 'Sade',
        src: asset('/music/smooth-operator.mp3'),
    },
    {
        id: 2,
        title: 'Borderline',
        artist: 'Tame Impala',
        src: asset('/music/borderline.mp3'),
    },
]

const MusicContext = createContext(null)

export function MusicProvider({ children }) {
    const audioRef = useRef(new Audio())
    const [currentIndex, setCurrentIndex] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [volume, setVolumeState] = useState(0.65)
    const [muted, setMuted] = useState(false)
    const [progress, setProgress] = useState(0)   // 0–1
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    // Keep audio volume in sync
    useEffect(() => {
        audioRef.current.volume = muted ? 0 : volume
    }, [volume, muted])

    // Load track when index changes — use canplaythrough to avoid race conditions
    useEffect(() => {
        const audio = audioRef.current
        const track = TRACKS[currentIndex]
        const wasPlaying = playing

        // Reset progress on track change
        setProgress(0)
        setCurrentTime(0)
        setDuration(0)

        audio.pause()
        audio.src = track.src
        audio.currentTime = 0
        audio.load()

        if (wasPlaying) {
            const playWhenReady = () => {
                audio.play().catch(() => { })
                audio.removeEventListener('canplay', playWhenReady)
            }
            audio.addEventListener('canplay', playWhenReady)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex])

    // Attach audio event listeners once
    useEffect(() => {
        const audio = audioRef.current

        const onTimeUpdate = () => {
            setCurrentTime(audio.currentTime)
            setProgress(audio.duration ? audio.currentTime / audio.duration : 0)
        }
        const onDurationChange = () => setDuration(audio.duration || 0)
        const onEnded = () => {
            setCurrentIndex(i => (i + 1) % TRACKS.length)
            setPlaying(true)
        }
        const onPlay = () => setPlaying(true)
        const onPause = () => setPlaying(false)

        audio.addEventListener('timeupdate', onTimeUpdate)
        audio.addEventListener('durationchange', onDurationChange)
        audio.addEventListener('ended', onEnded)
        audio.addEventListener('play', onPlay)
        audio.addEventListener('pause', onPause)

        return () => {
            audio.removeEventListener('timeupdate', onTimeUpdate)
            audio.removeEventListener('durationchange', onDurationChange)
            audio.removeEventListener('ended', onEnded)
            audio.removeEventListener('play', onPlay)
            audio.removeEventListener('pause', onPause)
        }
    }, [])

    const playTrack = useCallback((index) => {
        const audio = audioRef.current
        if (index === currentIndex) {
            if (audio.paused) {
                audio.play().catch(() => { })
            } else {
                audio.pause()
            }
        } else {
            // Set index — the useEffect above will handle loading + playing
            setPlaying(true) // mark as playing so useEffect auto-plays
            setCurrentIndex(index)
        }
    }, [currentIndex])

    const togglePlay = useCallback(() => {
        const audio = audioRef.current
        if (audio.paused) {
            if (!audio.src || audio.src === window.location.href) {
                audio.src = TRACKS[currentIndex].src
                audio.load()
            }
            audio.play().catch(() => { })
        } else {
            audio.pause()
        }
    }, [currentIndex])

    const nextTrack = useCallback(() => {
        setPlaying(true)
        setCurrentIndex(i => (i + 1) % TRACKS.length)
    }, [])

    const prevTrack = useCallback(() => {
        const audio = audioRef.current
        if (audio.currentTime > 3) {
            audio.currentTime = 0
        } else {
            setPlaying(true)
            setCurrentIndex(i => (i - 1 + TRACKS.length) % TRACKS.length)
        }
    }, [])

    const setVolume = useCallback((v) => {
        setVolumeState(Math.max(0, Math.min(1, v)))
        setMuted(false)
    }, [])

    const toggleMute = useCallback(() => setMuted(m => !m), [])

    const seek = useCallback((ratio) => {
        const audio = audioRef.current
        if (audio.duration) {
            audio.currentTime = ratio * audio.duration
        }
    }, [])

    const value = {
        tracks: TRACKS,
        currentIndex,
        playing,
        volume,
        muted,
        progress,
        duration,
        currentTime,
        audioRef,
        playTrack,
        togglePlay,
        nextTrack,
        prevTrack,
        setVolume,
        toggleMute,
        seek,
    }

    return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
}

export function useMusic() {
    return useContext(MusicContext)
}
