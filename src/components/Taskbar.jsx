import { useState, useCallback, useEffect, useRef } from 'react'
import { useClock } from '../hooks/useClock'
import { useWindowManager } from '../context/WindowContext'
import { useMusic } from '../context/MusicContext'
import { APPS_CONFIG } from '../data/appsConfig'
import StartMenu from './StartMenu'


export default function Taskbar({ onShowDesktop, onBalloon, onShutdown }) {
    const { time, date } = useClock()
    const { windows, openApp, restoreWindow, minimizeWindow, bringToFront } = useWindowManager()
    const { volume, muted, setVolume, toggleMute } = useMusic()
    const [startOpen, setStartOpen] = useState(false)
    const [volOpen, setVolOpen] = useState(false)
    const volRef = useRef(null)

    const openWindows = windows.filter(w => !w.closed)

    const toggleStart = useCallback((e) => {
        e.stopPropagation()
        setStartOpen(v => !v)
        setVolOpen(false)
    }, [])

    const closeStart = useCallback(() => setStartOpen(false), [])

    useEffect(() => {
        const handler = (e) => {
            if (volRef.current && !volRef.current.contains(e.target)) {
                setVolOpen(false)
            }
            setStartOpen(false)
        }
        document.addEventListener('click', handler)
        return () => document.removeEventListener('click', handler)
    }, [])

    const handleTaskbarBtn = useCallback((win) => {
        const isActive = !win.minimized && !win.inactive
        if (win.minimized) {
            restoreWindow(win.id)
        } else if (isActive) {
            minimizeWindow(win.id)
        } else {
            bringToFront(win.id)
        }
    }, [restoreWindow, minimizeWindow, bringToFront])

    const effectiveVolume = muted ? 0 : volume
    const volIcon = effectiveVolume === 0 ? '🔇' : effectiveVolume < 0.4 ? '🔉' : '🔊'
    const volPct = Math.round(effectiveVolume * 100)

    return (
        <>
            {startOpen && (
                <StartMenu
                    onClose={closeStart}
                    onOpenApp={(id) => { closeStart(); openApp(id) }}
                    onShutdown={() => { closeStart(); onShutdown() }}
                />
            )}

            {/* Volume popup */}
            {volOpen && (
                <div className="vol-popup" ref={volRef} onClick={e => e.stopPropagation()}>
                    <div className="vol-popup-label">{volIcon} Volume</div>
                    <div className="vol-pct">{volPct}%</div>
                    <div className="vol-slider-wrap">
                        <input
                            type="range"
                            className="vol-slider"
                            min="0" max="100"
                            value={volPct}
                            onChange={e => setVolume(e.target.value / 100)}
                        />
                    </div>
                    <button className="vol-mute-btn" onClick={toggleMute}>
                        {muted ? '🔇 Unmute' : '🔊 Mute'}
                    </button>
                </div>
            )}

            <div id="taskbar">
                {/* Start button */}
                <button id="start-btn" aria-label="Start" onClick={toggleStart}>
                    <img src="/img/windows-xp-logo.png" alt="XP" style={{ width: 22, height: 22, objectFit: 'contain', flexShrink: 0 }} />
                    <span>start</span>
                </button>

                {/* Quick launch */}
                <div id="quick-launch">
                    <div className="ql-icon" title="Show Desktop" onClick={onShowDesktop}>🖥️</div>
                    <div className="ql-icon" title="Internet Explorer" onClick={() => openApp('contact')}>
                        <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="24" cy="24" r="20" fill="#E8F0FF" stroke="#4090D0" strokeWidth="2" />
                            <ellipse cx="24" cy="24" rx="8" ry="20" fill="none" stroke="#4090D0" strokeWidth="1.5" />
                            <line x1="4" y1="24" x2="44" y2="24" stroke="#4090D0" strokeWidth="1.5" />
                            <path d="M8,14 C14,18 34,18 40,14" stroke="#4090D0" strokeWidth="1.5" fill="none" />
                            <path d="M8,34 C14,30 34,30 40,34" stroke="#4090D0" strokeWidth="1.5" fill="none" />
                        </svg>
                    </div>
                    <div className="ql-icon" title="Media Player" onClick={() => openApp('mediaplayer')}>🎵</div>
                </div>

                {/* Window buttons */}
                <div id="taskbar-windows">
                    {openWindows.map(win => {
                        const cfg = APPS_CONFIG[win.appId] || {}
                        const isActive = !win.minimized && !win.inactive
                        return (
                            <div
                                key={win.id}
                                className={`taskbar-btn${isActive ? ' active' : ''}`}
                                onClick={() => handleTaskbarBtn(win)}
                            >
                                <span className="tb-icon">{cfg.icon}</span>
                                <span className="tb-label">{cfg.title}</span>
                            </div>
                        )
                    })}
                </div>

                {/* System tray */}
                <div id="system-tray">
                    <div className="tray-icon" title="Security" onClick={() => onBalloon('🛡️ Windows Security Center: All good!')}>🛡️</div>
                    <div className="tray-icon" title="Network" onClick={() => onBalloon('🌐 Connected to: Portfolio Network\nSpeed: ∞ Mbps')}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <rect x="2" y="14" width="4" height="8" rx="1" fill="#fff" opacity="0.9" />
                            <rect x="8" y="10" width="4" height="12" rx="1" fill="#fff" opacity="0.9" />
                            <rect x="14" y="6" width="4" height="16" rx="1" fill="#fff" opacity="0.9" />
                            <rect x="20" y="2" width="4" height="20" rx="1" fill="#fff" opacity="0.9" />
                        </svg>
                    </div>
                    <div
                        className="tray-icon"
                        title={`Volume: ${volPct}%`}
                        onClick={(e) => { e.stopPropagation(); setVolOpen(v => !v) }}
                        style={{ fontSize: 16, cursor: 'pointer', userSelect: 'none' }}
                    >
                        {volIcon}
                    </div>
                    <div id="clock">
                        <span id="clock-time">{time}</span>
                        <span id="clock-date">{date}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
