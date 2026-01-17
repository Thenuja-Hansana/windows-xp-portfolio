import { useState, useEffect, useRef } from 'react'
import { useMusic, TRACKS } from '../../context/MusicContext'

function formatTime(secs) {
    if (!secs || isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
}

// Animated equalizer bars
const BAR_COUNT = 28
const BARS = Array.from({ length: BAR_COUNT }, (_, i) => ({
    height: 15 + Math.random() * 85,
    duration: (0.4 + Math.random() * 0.7).toFixed(2),
    delay: -(i * 0.06).toFixed(2),
}))

export default function MediaPlayerApp() {
    const {
        tracks, currentIndex, playing, volume, muted,
        progress, duration, currentTime,
        playTrack, togglePlay, nextTrack, prevTrack,
        setVolume, toggleMute, seek,
    } = useMusic()

    const [showPlaylist, setShowPlaylist] = useState(() => !window.matchMedia('(max-width: 768px)').matches)
    const seekRef = useRef(false)

    const currentTrack = tracks[currentIndex]

    const handleSeekClick = (e) => {
        const bar = e.currentTarget
        const rect = bar.getBoundingClientRect()
        const ratio = (e.clientX - rect.left) / rect.width
        seek(Math.max(0, Math.min(1, ratio)))
    }

    const volIcon = muted || volume === 0 ? '🔇' : volume < 0.4 ? '🔉' : '🔊'

    return (
        <div className="mp-shell">
            {/* Top info bar */}
            <div className="mp-header">
                <div className="mp-now-playing">
                    <span className="mp-now-label">Now Playing</span>
                    <div className="mp-marquee-wrap">
                        <span className="mp-marquee-text" key={currentIndex}>
                            {currentTrack.title} — {currentTrack.artist}
                        </span>
                    </div>
                </div>
                <button
                    className="mp-playlist-toggle"
                    onClick={() => setShowPlaylist(v => !v)}
                    title="Toggle Playlist"
                >
                    {showPlaylist ? '◀' : '▶'} Playlist
                </button>
            </div>

            <div className="mp-main">
                {/* Left: visualizer + controls */}
                <div className="mp-left-panel">
                    {/* Visualizer */}
                    <div className="mp-visualizer">
                        {BARS.map((bar, i) => (
                            <div
                                key={i}
                                className="mp-bar"
                                style={{
                                    height: `${bar.height}%`,
                                    animationDuration: playing ? `${bar.duration}s` : '0s',
                                    animationDelay: `${bar.delay}s`,
                                    animationPlayState: playing ? 'running' : 'paused',
                                }}
                            />
                        ))}
                    </div>

                    {/* Track info */}
                    <div className="mp-track-info">
                        <div className="mp-track-title">{currentTrack.title}</div>
                        <div className="mp-track-artist">{currentTrack.artist}</div>
                    </div>

                    {/* Seek bar */}
                    <div className="mp-seek-row">
                        <span className="mp-time">{formatTime(currentTime)}</span>
                        <div className="mp-seek-bar" onClick={handleSeekClick}>
                            <div className="mp-seek-fill" style={{ width: `${progress * 100}%` }} />
                            <div className="mp-seek-thumb" style={{ left: `${progress * 100}%` }} />
                        </div>
                        <span className="mp-time">{formatTime(duration)}</span>
                    </div>

                    {/* Controls */}
                    <div className="mp-controls-row">
                        <button className="mp-ctrl-btn" title="Previous" onClick={prevTrack}>⏮</button>
                        <button className="mp-ctrl-btn mp-play-btn" title="Play/Pause" onClick={togglePlay}>
                            {playing ? '⏸' : '▶'}
                        </button>
                        <button className="mp-ctrl-btn" title="Next" onClick={nextTrack}>⏭</button>

                        <div className="mp-vol-row">
                            <button className="mp-mute-btn" onClick={toggleMute} title="Mute">
                                {volIcon}
                            </button>
                            <input
                                type="range"
                                className="mp-vol-slider"
                                min="0" max="100"
                                value={muted ? 0 : Math.round(volume * 100)}
                                onChange={e => setVolume(e.target.value / 100)}
                            />
                        </div>
                    </div>
                </div>

                {/* Right: playlist */}
                {showPlaylist && (
                    <div className="mp-playlist">
                        <div className="mp-playlist-header">🎵 Playlist</div>
                        {tracks.map((track, i) => (
                            <div
                                key={track.id}
                                className={`mp-playlist-item${i === currentIndex ? ' active' : ''}`}
                                onClick={() => {
                                    playTrack(i)
                                    if (i !== currentIndex) {
                                        setTimeout(() => { }, 50)
                                    }
                                }}
                            >
                                <span className="mp-pl-num">{i === currentIndex && playing ? '▶' : (i + 1)}</span>
                                <div className="mp-pl-info">
                                    <div className="mp-pl-title">{track.title}</div>
                                    <div className="mp-pl-artist">{track.artist}</div>
                                </div>
                                {i === currentIndex && (
                                    <div className="mp-pl-bars">
                                        {[0, 1, 2].map(b => (
                                            <div key={b} className="mp-pl-bar" style={{
                                                animationPlayState: playing ? 'running' : 'paused',
                                                animationDelay: `${b * 0.15}s`
                                            }} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
