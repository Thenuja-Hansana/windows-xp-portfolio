export default function RecycleApp({ contentReady }) {
    return (
        <div className="xp-explorer">


            {/* Content fades in after load */}
            <div className={`xp-content xp-content-reveal ${contentReady ? 'xp-content-visible' : ''}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, color: '#555' }}>
                <div style={{ fontSize: 72, opacity: 0.5 }}>🗑️</div>
                <div style={{ fontSize: 13, fontWeight: 'bold', color: '#333' }}>Recycle Bin is empty.</div>
                <div style={{ fontSize: 11, textAlign: 'center', maxWidth: 200 }}>
                    Nothing to see here!<br />All my bad code has been cleaned up. ✨
                </div>
            </div>
        </div>
    )
}

