import { useEffect, useState } from 'react'

export default function BootScreen({ onDone }) {
    const [fadeOut, setFadeOut] = useState(false)

    useEffect(() => {
        const t1 = setTimeout(() => setFadeOut(true), 4000)
        const t2 = setTimeout(() => onDone(), 4600)
        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
        }
    }, [onDone])

    return (
        <div id="boot-screen" className={fadeOut ? 'fade-out' : ''}>
            {/* Center logo */}
            <div className="boot-logo">
                <img
                    src="/img/windows-xp-logo.png"
                    alt="Windows XP Logo"
                    className="boot-xp-logo-img"
                />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                    <div className="boot-microsoft">
                        Microsoft<sup style={{ fontSize: 10 }}>®</sup>
                    </div>
                    <div className="boot-text-row">
                        <span className="boot-windows">Windows</span>
                        <sup style={{ fontSize: 16, color: '#fff', fontFamily: 'Arial', marginLeft: 2 }}>®</sup>
                        <span className="boot-xp">xp</span>
                    </div>
                    <div style={{ color: '#aaa', fontSize: 13, fontStyle: 'italic', marginTop: 3, fontFamily: 'Arial' }}>
                        Professional
                    </div>
                </div>
            </div>

            {/* Loading profile text */}
            <div className="boot-user-label">
                <div className="boot-user-label-text">Loading profile for Thenuja…</div>
            </div>

            {/* Progress bar */}
            <div className="boot-progress-container">
                <div className="boot-progress-bar">
                    <div className="boot-progress-marquee" />
                </div>
            </div>

            <div className="boot-copyright">Copyright © Microsoft Corporation</div>
            <div className="boot-ms-logo">
                <span style={{ fontStyle: 'normal', fontWeight: 300 }}>Microsoft</span>
            </div>
        </div>
    )
}
