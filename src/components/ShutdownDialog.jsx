const FLAG_SM = (
    <svg width="16" height="16" viewBox="0 0 100 96">
        <path d="M5,5 C10,2 28,8 46,24 C40,32 36,44 38,54 C22,46 6,30 5,5Z" fill="#E8440A" />
        <path d="M98,2 C98,2 60,10 48,26 C54,32 56,44 54,52 C72,40 98,20 98,2Z" fill="#5DBD22" />
        <path d="M4,92 C8,78 20,60 38,56 C40,62 46,72 54,78 C38,86 10,94 4,92Z" fill="#00A3EE" />
        <path d="M98,94 C85,90 68,76 56,76 C52,68 50,58 54,52 C72,58 96,78 98,94Z" fill="#FDB900" />
    </svg>
)

export default function ShutdownDialog({ onClose, onRestart }) {
    return (
        <div id="shutdown-dialog" className="open">
            <div className="sd-box">
                <div className="sd-titlebar">
                    {FLAG_SM}
                    <div className="sd-titlebar-title">Shut Down Windows</div>
                    <div className="xp-btn xp-btn-close" onClick={onClose} />
                </div>
                <div className="sd-body">
                    <div style={{ fontSize: 11, textAlign: 'center', marginBottom: 8 }}>
                        What do you want the computer to do?
                    </div>
                    <div className="sd-options">
                        <div className="sd-option">
                            <div className="sd-option-icon">🌙</div>
                            <div className="sd-option-label">Stand By</div>
                        </div>
                        <div className="sd-option">
                            <div className="sd-option-icon">🔴</div>
                            <div className="sd-option-label">Turn Off</div>
                        </div>
                        <div className="sd-option">
                            <div className="sd-option-icon">🔄</div>
                            <div className="sd-option-label">Restart</div>
                        </div>
                    </div>
                </div>
                <div className="sd-footer">
                    <button className="sd-btn" onClick={onClose}>OK</button>
                    <button className="sd-btn" onClick={onClose}>Cancel</button>
                    <button className="sd-btn" onClick={onRestart}>Restart</button>
                </div>
            </div>
        </div>
    )
}
