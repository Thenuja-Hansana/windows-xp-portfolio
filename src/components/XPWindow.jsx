import { useRef, useCallback, useState, useEffect } from 'react'
import { useWindowManager } from '../context/WindowContext'
import { APPS_CONFIG } from '../data/appsConfig'

const RESIZE_DIRS = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']

// Load timing constants (ms)
const ADDR_FILL_DURATION = 1500   // address bar sweep takes 1.5 s
const CONTENT_DELAY = 1700   // content reveals ~200 ms after bar finishes

export default function XPWindow({ win, onClose }) {
    const { closeWindow, minimizeWindow, toggleMaximize, bringToFront, updateBounds } = useWindowManager()
    const handleClose = onClose ? (id) => onClose(id) : closeWindow
    const elRef = useRef(null)

    // addrLoading  = true while the address bar is sweeping (3 s)
    // contentReady = true once content + sidebar should be visible
    const [addrLoading, setAddrLoading] = useState(true)
    const [contentReady, setContentReady] = useState(false)

    useEffect(() => {
        // Reset both whenever the window (re)opens
        setAddrLoading(true)
        setContentReady(false)

        const t1 = setTimeout(() => setAddrLoading(false), ADDR_FILL_DURATION)
        const t2 = setTimeout(() => setContentReady(true), CONTENT_DELAY)
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [win.id])

    const handleMouseDown = useCallback(() => bringToFront(win.id), [bringToFront, win.id])

    // --- DRAG ---
    const onTitleBarMouseDown = useCallback((e) => {
        if (e.target.closest('.xp-controls') || e.target.closest('.xp-btn')) return
        if (win.maximized) return
        e.preventDefault()
        const el = elRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const startX = e.clientX, startY = e.clientY
        const startLeft = rect.left, startTop = rect.top

        function onMove(e) {
            const dx = e.clientX - startX, dy = e.clientY - startY
            let nx = Math.max(-el.offsetWidth + 60, Math.min(startLeft + dx, window.innerWidth - 60))
            let ny = Math.max(0, Math.min(startTop + dy, window.innerHeight - 70))
            el.style.left = nx + 'px'
            el.style.top = ny + 'px'
        }
        function onUp() {
            const r = el.getBoundingClientRect()
            updateBounds(win.id, { x: r.left, y: r.top })
            document.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseup', onUp)
        }
        document.addEventListener('mousemove', onMove)
        document.addEventListener('mouseup', onUp)
    }, [win.id, win.maximized, updateBounds])

    // --- RESIZE ---
    const onResizeMouseDown = useCallback((e, dir) => {
        e.preventDefault()
        e.stopPropagation()
        if (win.maximized) return
        const el = elRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const startX = e.clientX, startY = e.clientY
        const startW = rect.width, startH = rect.height
        const startLeft = rect.left, startTop = rect.top
        const minW = 200, minH = 120

        function onMove(e) {
            const dx = e.clientX - startX, dy = e.clientY - startY
            if (dir.includes('e')) el.style.width = Math.max(minW, startW + dx) + 'px'
            if (dir.includes('s')) el.style.height = Math.max(minH, startH + dy) + 'px'
            if (dir.includes('w')) {
                const nw = Math.max(minW, startW - dx)
                el.style.width = nw + 'px'
                el.style.left = (startLeft + startW - nw) + 'px'
            }
            if (dir.includes('n')) {
                const nh = Math.max(minH, startH - dy)
                el.style.height = nh + 'px'
                el.style.top = (startTop + startH - nh) + 'px'
            }
        }
        function onUp() {
            const r = el.getBoundingClientRect()
            updateBounds(win.id, { x: r.left, y: r.top, width: r.width, height: r.height })
            document.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseup', onUp)
        }
        document.addEventListener('mousemove', onMove)
        document.addEventListener('mouseup', onUp)
    }, [win.id, win.maximized, updateBounds])

    const onTitleDblClick = useCallback(() => {
        const el = elRef.current
        if (!el) return
        const r = el.getBoundingClientRect()
        toggleMaximize(win.id, { x: r.left, y: r.top, width: r.width, height: r.height })
    }, [win.id, toggleMaximize])

    const handleMaximizeClick = useCallback((e) => {
        e.stopPropagation()
        const el = elRef.current
        if (!el) return
        const r = el.getBoundingClientRect()
        toggleMaximize(win.id, { x: r.left, y: r.top, width: r.width, height: r.height })
    }, [win.id, toggleMaximize])

    const cfg = APPS_CONFIG[win.appId] || {}
    const AppComponent = cfg.Component

    if (win.minimized) return null

    const style = {
        left: win.x + 'px',
        top: win.y + 'px',
        width: win.width + 'px',
        height: win.height + 'px',
        zIndex: win.zIndex,
        borderRadius: win.maximized ? 0 : undefined,
    }

    const cls = [
        'xp-window',
        win.inactive ? 'inactive' : 'active-win',
        win.opening ? 'opening' : '',
    ].filter(Boolean).join(' ')

    const menuItems = cfg.menuItems || ['File', 'Edit', 'View', 'Help']

    return (
        <div ref={elRef} className={cls} style={style} onMouseDown={handleMouseDown}>

            {/* ── Title bar ─────────────────────────────────── */}
            <div
                className="xp-titlebar"
                onMouseDown={onTitleBarMouseDown}
                onDoubleClick={onTitleDblClick}
            >
                <div className="xp-titlebar-icon">{cfg.icon}</div>
                <div className="xp-titlebar-title">{cfg.title}</div>
                <div className="xp-controls">
                    <div className="xp-btn xp-btn-minimize" title="Minimize"
                        onClick={e => { e.stopPropagation(); minimizeWindow(win.id) }} />
                    <div className="xp-btn xp-btn-maximize" title="Maximize" onClick={handleMaximizeClick} />
                    <div className="xp-btn xp-btn-close" title="Close"
                        onClick={e => { e.stopPropagation(); handleClose(win.id) }} />
                </div>
            </div>

            {/* ── Menu bar ──────────────────────────────────── */}
            <div className="xp-menubar">
                {menuItems.map(m => <span key={m} className="xp-menu-item">{m}</span>)}
            </div>

            {/* ── Toolbar ───────────────────────────────────── */}
            <div className="xp-toolbar">
                <button className="xp-toolbar-btn xp-toolbar-btn-icon" title="Back">
                    <span className="xp-tb-arrow">◀</span>
                    <span className="xp-tb-label">Back</span>
                    <span className="xp-tb-dropdown">▾</span>
                </button>
                <button className="xp-toolbar-btn xp-toolbar-btn-icon xp-toolbar-btn-disabled" title="Forward">
                    <span className="xp-tb-arrow">▶</span>
                </button>
                <button className="xp-toolbar-btn xp-toolbar-btn-icon xp-toolbar-btn-disabled" title="Up">
                    <span>⬆</span>
                </button>
                <div className="xp-toolbar-sep" />
                <button className="xp-toolbar-btn" title="Search">
                    <span className="xp-tb-icon">🔍</span>
                    <span className="xp-tb-label">Search</span>
                </button>
                <button className="xp-toolbar-btn" title="Folders">
                    <span className="xp-tb-icon">📁</span>
                    <span className="xp-tb-label">Folders</span>
                </button>
                <div className="xp-toolbar-sep" />
                <button className="xp-toolbar-btn xp-toolbar-btn-icon" title="Views">
                    <span className="xp-tb-icon">☰</span>
                    <span className="xp-tb-dropdown">▾</span>
                </button>
            </div>

            {/* ── Address bar ───────────────────────────────── */}
            <div className="xp-addressbar">
                <div className="xp-addressbar-label">Address</div>
                <div className="xp-addressbar-field-wrap">
                    <div className={`xp-addressbar-field ${addrLoading ? 'xp-addr-loading' : 'xp-addr-ready'}`}>
                        {/* Progress bar shown while loading */}
                        {addrLoading && (
                            <div className="xp-addr-progress">
                                <div className="xp-addr-progress-fill" />
                            </div>
                        )}
                        {/* Address text revealed after load */}
                        {!addrLoading && (
                            <div className="xp-addr-reveal">
                                <span className="xp-addr-icon">{cfg.icon}</span>
                                <span className="xp-addr-text">{cfg.address || cfg.title}</span>
                            </div>
                        )}
                    </div>
                </div>
                <button className="xp-addressbar-go" title="Go">
                    <span>▶</span> Go
                </button>
            </div>

            {/* ── App body (holds sidebar + content, slides in after load) ── */}
            <div className={`xp-body xp-body-reveal ${contentReady ? 'xp-body-visible' : ''}`}>
                {AppComponent && <AppComponent contentReady={contentReady} />}
            </div>

            {/* ── Resize handles ────────────────────────────── */}
            {RESIZE_DIRS.map(dir => (
                <div key={dir} className={`resize-handle resize-${dir}`}
                    onMouseDown={e => onResizeMouseDown(e, dir)} />
            ))}
        </div>
    )
}
