import { useState } from 'react'

// ─── Main LoginScreen ─────────────────────────────────────────────────────────
export default function LoginScreen({ onLogin }) {
    const [clicked, setClicked] = useState(false)
    const [fadeOut, setFadeOut] = useState(false)

    const handleProfile = () => {
        if (clicked) return
        setClicked(true)
        setTimeout(() => setFadeOut(true), 2600)
        setTimeout(() => onLogin(), 3200)
    }

    return (
        <div id="login-screen" className={fadeOut ? 'fade-out' : ''}>

            {/* ── TOP BAR ── */}
            <div className="ls-top-bar">
                <div className="ls-top-logo-row">
                    <img src="/img/windows-xp-logo.png" alt="Windows XP" className="ls-top-xp-img" />
                    <span className="ls-top-windows">Windows</span>
                    <span className="ls-top-xp">XP</span>
                </div>
            </div>

            {/* ── MAIN AREA ── */}
            <div className="ls-main">
                {/* LEFT PANEL */}
                <div className="ls-left">
                    <div className="ls-left-logo">
                        <img src="/img/windows-xp-logo.png" alt="Windows XP Logo" className="ls-left-xp-img" />
                        <div className="ls-left-brand">
                            <span className="ls-brand-name">Thenuja</span>
                            <span className="ls-brand-xp">xp</span>
                        </div>
                        <div className="ls-brand-role">Full-Stack Developer</div>
                    </div>
                    <div className="ls-begin-text">
                        To begin, click on Thenuja to log in
                    </div>
                </div>

                {/* VERTICAL DIVIDER */}
                <div className="ls-divider" />

                {/* RIGHT PANEL */}
                <div className="ls-right">
                    {clicked ? (
                        <div className="ls-welcome-tile">
                            <div className="ls-welcome-avatar">
                                <img src="/img/user-profile.png" alt="Thenuja" className="ls-welcome-avatar-img" />
                            </div>
                            <div className="ls-welcome-name">Welcome, Thenuja</div>
                            <div className="ls-welcome-sub">Loading your personal settings…</div>
                        </div>
                    ) : (
                        <div className="ls-user-tile" onClick={handleProfile}>
                            <div className="ls-avatar">
                                <img src="/img/user-profile.png" alt="Thenuja" className="ls-avatar-img" />
                            </div>
                            <div className="ls-tile-info">
                                <div className="ls-tile-name">Thenuja</div>
                                <div className="ls-tile-role">Full-Stack Developer</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── BOTTOM BAR ── */}
            <div className="ls-bottom-bar">
                <div className="ls-bottom-left">
                    {/* Green asterisk restart button */}
                    <button className="ls-restart-btn">
                        <span className="ls-restart-icon">✳</span>
                        Restart Thenuja XP
                    </button>
                </div>
                <div className="ls-bottom-right">
                    <div className="ls-bottom-text">After you log on, the system's yours to explore.</div>
                    <div className="ls-bottom-text">Every detail has been designed with a purpose.</div>
                </div>
            </div>
        </div>
    )
}
