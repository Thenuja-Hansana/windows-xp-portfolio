import { useState, useCallback, useRef, useEffect } from 'react'
import { useWindowManager } from '../context/WindowContext'
import { APPS_CONFIG } from '../data/appsConfig'
import { useMusic } from '../context/MusicContext'
import XPWindow from './XPWindow'
import Taskbar from './Taskbar'
import ContextMenu from './ContextMenu'
import ShutdownDialog from './ShutdownDialog'
import { asset } from '../utils/assetPath'

// ─── Desktop icon definitions — using windows-xp-desktop images ──────────────
const DESKTOP_ICONS = [
    { appId: 'mycomputer', label: 'My Computer', icon: asset('/img/My computer.ico') },
    { appId: 'about', label: 'Resume', icon: asset('/img/Resume.ico') },
    { appId: 'projects', label: 'My Projects', icon: asset('/img/Projects.ico') },
    { appId: 'skills', label: 'Skills', icon: asset('/img/skills.ico') },
    { appId: 'contact', label: 'Contact', icon: asset('/img/Social.ico') },
    { appId: 'mediaplayer', label: 'Media Player', icon: asset('/img/music-player.png') },
    { appId: 'paint', label: 'Paint', icon: asset('/img/Paint.ico') },
    { appId: 'recycle', label: 'Recycle Bin', icon: asset('/img/Recycle Bin.ico') },
]

// ─── Desktop component ───────────────────────────────────────────────────────
export default function Desktop({ visible }) {
    const { windows, openApp, closeWindow, minimizeWindow, restoreWindow } = useWindowManager()
    const { togglePlay, playing } = useMusic()
    const [selectedIcon, setSelectedIcon] = useState(null)
    const [ctx, setCtx] = useState(null)
    const [balloon, setBalloon] = useState(null)
    const [showShutdown, setShowShutdown] = useState(false)
    const lastClick = useRef({})
    const soundPlayedRef = useRef(false)

    // Play XP startup sound the first time the desktop becomes visible
    useEffect(() => {
        if (visible && !soundPlayedRef.current) {
            soundPlayedRef.current = true
            try {
                const audio = new Audio(asset('/music/start-sound.mpeg'))
                audio.volume = 0.8
                audio.play().catch(() => { })
            } catch (e) { }
        }
    }, [visible])

    // Wrap closeWindow to stop music when Media Player is closed
    const handleCloseWindow = useCallback((id) => {
        const win = windows.find(w => w.id === id)
        closeWindow(id)
        if (win?.appId === 'mediaplayer' && playing) {
            togglePlay()
        }
    }, [windows, closeWindow, playing, togglePlay])

    const isTouchDevice = () => window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window

    const handleIconClick = useCallback((e, appId) => {
        e.stopPropagation()
        setSelectedIcon(appId)
        setCtx(null)
        // Single-click opens app on mobile/touch; double-click required on desktop
        if (isTouchDevice()) {
            openApp(appId)
        } else {
            const now = Date.now()
            if (lastClick.current.id === appId && (now - lastClick.current.time) < 500) {
                lastClick.current = {}
                openApp(appId)
            } else {
                lastClick.current = { id: appId, time: now }
            }
        }
    }, [openApp])

    const handleDesktopClick = useCallback(() => {
        setSelectedIcon(null)
        setCtx(null)
    }, [])

    const handleContextMenu = useCallback((e) => {
        e.preventDefault()
        if (e.target.closest('.xp-window') || e.target.closest('#taskbar')) return
        const x = Math.min(e.clientX, window.innerWidth - 170)
        const y = Math.min(e.clientY, window.innerHeight - 180)
        setCtx({ x, y })
    }, [])

    const showBalloon = useCallback((msg) => {
        setBalloon(msg)
        setTimeout(() => setBalloon(null), 3500)
    }, [])

    const handleShowDesktop = useCallback(() => {
        const vis = windows.filter(w => !w.closed && !w.minimized)
        if (vis.length > 0) {
            vis.forEach(w => minimizeWindow(w.id))
        } else {
            windows.filter(w => !w.closed && w.minimized).forEach(w => restoreWindow(w.id))
        }
    }, [windows, minimizeWindow, restoreWindow])

    const handleRestart = useCallback(() => {
        setShowShutdown(false)
        const overlay = document.createElement('div')
        overlay.style.cssText = 'position:fixed;inset:0;background:#000;z-index:99999;opacity:0;transition:opacity 1s;'
        document.body.appendChild(overlay)
        setTimeout(() => overlay.style.opacity = '1', 10)
        setTimeout(() => location.reload(), 1200)
    }, [])

    return (
        <div
            id="desktop"
            className={visible ? 'visible' : ''}
            style={{ backgroundImage: `url(${asset('/img/wallpaper.jpg')})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
            onClick={handleDesktopClick}
            onContextMenu={handleContextMenu}
        >
            {/* Desktop icons */}
            <div id="desktop-icons">
                {DESKTOP_ICONS.map(({ appId, label, icon }) => (
                    <div
                        key={appId}
                        className={`desktop-icon${selectedIcon === appId ? ' selected' : ''}`}
                        onClick={e => handleIconClick(e, appId)}
                    >
                        <div className="icon-img">
                            <img
                                src={icon}
                                alt={label}
                                style={{ width: 48, height: 48, objectFit: 'contain', imageRendering: 'auto' }}
                                draggable={false}
                            />
                        </div>
                        <div className="icon-label">{label}</div>
                    </div>
                ))}
            </div>

            {/* All open windows — pass the music-aware close handler */}
            {windows.filter(w => !w.closed).map(win => (
                <XPWindow key={win.id} win={win} onClose={handleCloseWindow} />
            ))}

            {/* Taskbar */}
            <Taskbar
                onShowDesktop={handleShowDesktop}
                onBalloon={showBalloon}
                onShutdown={() => setShowShutdown(true)}
            />

            {/* Context menu */}
            {ctx && (
                <ContextMenu
                    x={ctx.x} y={ctx.y}
                    onClose={() => setCtx(null)}
                    onBalloon={showBalloon}
                    onOpenApp={openApp}
                />
            )}

            {/* Shutdown dialog */}
            {showShutdown && (
                <ShutdownDialog
                    onClose={() => setShowShutdown(false)}
                    onRestart={handleRestart}
                />
            )}

            {/* Tray balloon */}
            {balloon && (
                <div className="tray-balloon">
                    <div style={{ fontWeight: 'bold', marginBottom: 4 }}>ℹ️ Notification</div>
                    <div style={{ fontSize: 10 }}>{balloon}</div>
                </div>
            )}
        </div>
    )
}
