import { useState, useEffect, useCallback, useRef } from 'react'
import { asset } from '../utils/assetPath'

const FLAG_SM = (
    <svg width="16" height="16" viewBox="0 0 100 96" style={{ flexShrink: 0 }}>
        <path d="M5,5 C10,2 28,8 46,24 C40,32 36,44 38,54 C22,46 6,30 5,5Z" fill="#E8440A" />
        <path d="M98,2 C98,2 60,10 48,26 C54,32 56,44 54,52 C72,40 98,20 98,2Z" fill="#5DBD22" />
        <path d="M4,92 C8,78 20,60 38,56 C40,62 46,72 54,78 C38,86 10,94 4,92Z" fill="#00A3EE" />
        <path d="M98,94 C85,90 68,76 56,76 C52,68 50,58 54,52 C72,58 96,78 98,94Z" fill="#FDB900" />
    </svg>
)

export default function StartMenu({ onClose, onOpenApp, onShutdown }) {
    const [allProgramsOpen, setAllProgramsOpen] = useState(false)
    const menuRef = useRef(null)

    const stop = (e) => e.stopPropagation()

    const open = (id) => { onOpenApp(id); onClose() }

    return (
        <>
            <div id="start-menu" className="open" onClick={stop}>
                {/* Header */}
                <div className="sm-header">
                    <div className="sm-avatar">
                        <img src={asset('/img/user-profile.png')} alt="Thenuja" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                    <div className="sm-username">Thenuja</div>
                </div>

                {/* Body */}
                <div className="sm-body">
                    {/* Left */}
                    <div className="sm-left">
                        <div className="sm-item" onClick={() => open('contact')}>
                            <div className="sm-icon">
                                <svg width="26" height="26" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="24" cy="24" r="20" fill="#E8F0FF" stroke="#4090D0" strokeWidth="2" />
                                    <ellipse cx="24" cy="24" rx="8" ry="20" fill="none" stroke="#4090D0" strokeWidth="1.5" />
                                    <line x1="4" y1="24" x2="44" y2="24" stroke="#4090D0" strokeWidth="1.5" />
                                    <path d="M8,14 C14,18 34,18 40,14" stroke="#4090D0" strokeWidth="1.5" fill="none" />
                                    <path d="M8,34 C14,30 34,30 40,34" stroke="#4090D0" strokeWidth="1.5" fill="none" />
                                </svg>
                            </div>
                            <div className="sm-item-text">
                                <div className="sm-item-name">Internet</div>
                                <div className="sm-item-sub">Internet Explorer</div>
                            </div>
                        </div>

                        <div className="sm-item" onClick={() => open('about')}>
                            <div className="sm-icon">📧</div>
                            <div className="sm-item-text">
                                <div className="sm-item-name">E-mail</div>
                                <div className="sm-item-sub">About Me</div>
                            </div>
                        </div>

                        <div className="sm-divider" />

                        {[
                            { id: 'mediaplayer', icon: '🎵', label: 'Windows Media Player' },
                            { id: 'paint', icon: '🎨', label: 'Paint' },
                            { id: 'skills', icon: '⚙️', label: 'Experience & Resume' },
                            { id: 'projects', icon: '📁', label: 'My Projects' },
                            { id: 'recycle', icon: '🗑️', label: 'Recycle Bin' },
                        ].map(item => (
                            <div key={item.id} className="sm-item" onClick={() => open(item.id)}>
                                <div className="sm-icon">{item.icon}</div>
                                <div className="sm-item-text">
                                    <div className="sm-item-name">{item.label}</div>
                                </div>
                            </div>
                        ))}

                        <div className="sm-divider" />

                        <div
                            className="sm-item"
                            style={{ justifyContent: 'space-between' }}
                            onMouseEnter={() => setAllProgramsOpen(true)}
                            onMouseLeave={() => setAllProgramsOpen(false)}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div className="sm-icon">📋</div>
                                <div className="sm-item-text">
                                    <div className="sm-item-name" style={{ fontWeight: 'bold' }}>All Programs</div>
                                </div>
                            </div>
                            <div style={{ fontSize: 14 }}>▶</div>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="sm-right">
                        {[
                            { id: 'about', icon: '📄', label: 'My Documents' },
                            { id: 'projects', icon: '🖼️', label: 'My Pictures' },
                            { id: 'mediaplayer', icon: '🎵', label: 'My Music' },
                        ].map(item => (
                            <div key={item.id} className="sm-right-item" onClick={() => open(item.id)}>
                                <div className="sm-ricon">{item.icon}</div>
                                {item.label}
                            </div>
                        ))}

                        <div className="sm-right-divider" />

                        {[
                            { id: 'mycomputer', icon: '💻', label: 'My Computer' },
                            { id: 'skills', icon: '🌐', label: 'My Network Places' },
                        ].map(item => (
                            <div key={item.id} className="sm-right-item" onClick={() => open(item.id)}>
                                <div className="sm-ricon">{item.icon}</div>
                                {item.label}
                            </div>
                        ))}

                        <div className="sm-right-divider" />

                        {[
                            { id: 'mycomputer', icon: '🖥️', label: 'Control Panel' },
                            { id: 'about', icon: '🖨️', label: 'Printers & Faxes' },
                        ].map(item => (
                            <div key={item.id} className="sm-right-item" onClick={() => open(item.id)}>
                                <div className="sm-ricon">{item.icon}</div>
                                {item.label}
                            </div>
                        ))}

                        <div className="sm-right-divider" />

                        <div className="sm-right-item" onClick={() => open('about')}>
                            <div className="sm-ricon">❓</div>Help and Support
                        </div>
                        <div className="sm-right-item" onClick={() => open('projects')}>
                            <div className="sm-ricon">🔍</div>Search
                        </div>
                        <div className="sm-right-item" onClick={onClose}>
                            <div className="sm-ricon">▶</div>Run…
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="sm-footer">
                    <div className="sm-footer-btn" onClick={onShutdown}><span>🔓</span> Log Off</div>
                    <div className="sm-footer-btn" onClick={onShutdown}><span>🔴</span> Shut Down</div>
                </div>
            </div>

            {/* All Programs side panel */}
            {allProgramsOpen && (
                <div
                    id="all-programs-panel"
                    className="open"
                    onMouseEnter={() => setAllProgramsOpen(true)}
                    onMouseLeave={() => setAllProgramsOpen(false)}
                    onClick={stop}
                >
                    {[
                        { id: 'about', label: '📄 About Me' },
                        { id: 'projects', label: '📁 My Projects' },
                        { id: 'skills', label: '⚙️ Experience' },
                        { id: 'contact', label: '🌐 Contact / IE' },
                        { id: 'mediaplayer', label: '🎵 Media Player' },
                        { id: 'paint', label: '🎨 Paint' },
                        { id: 'mycomputer', label: '💻 My Computer' },
                        { id: 'recycle', label: '🗑️ Recycle Bin' },
                    ].map(item => (
                        <div key={item.id} className="ap-item" onClick={() => open(item.id)}>
                            {item.label}
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}
