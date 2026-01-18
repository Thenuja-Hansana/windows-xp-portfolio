import { useWindowManager } from '../../context/WindowContext'

export default function MyComputerApp({ contentReady }) {
    const { openApp } = useWindowManager()
    const isMobile = () => window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window
    const openOnClick = (appId) => isMobile() && openApp(appId)
    const openOnDblClick = (appId) => !isMobile() && openApp(appId)
    return (
        <div className="xp-explorer">


            {/* Content fades in after content is ready */}
            <div className={`xp-content xp-content-reveal ${contentReady ? 'xp-content-visible' : ''}`}>
                <Section title="Files Stored on This Computer">
                    <DriveItem icon={<img src="/img/Projects.ico" alt="folder" style={{ width: 28, height: 28, display: 'block' }} />} label="About me" onClick={() => openOnClick('aboutme')} onDoubleClick={() => openOnDblClick('aboutme')} />
                    <DriveItem icon={<img src="/img/Projects.ico" alt="folder" style={{ width: 28, height: 28, display: 'block' }} />} label="Experience" onClick={() => openOnClick('myinterest')} onDoubleClick={() => openOnDblClick('myinterest')} />
                </Section>
                <Section title="Hard Disk Drives">
                    <DriveItemFull icon="💿" label="Local Disk (C:)" pct={62} free="59.8 GB" total="160 GB" />
                </Section>
                <Section title="Devices with Removable Storage">
                    <DriveItem icon="💿" label="DVD-RW Drive (D:)" />
                    <DriveItem icon="💾" label="Removable Disk (E:)" />
                </Section>
            </div>
        </div>
    )
}


function Section({ title, children }) {
    return (
        <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 'bold', color: '#003399', marginBottom: 8, paddingBottom: 4, borderBottom: '1px solid #ccc' }}>{title}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>{children}</div>
        </div>
    )
}

function DriveItem({ icon, label, onClick, onDoubleClick }) {
    return (
        <div
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: 8, border: '1px solid #ccc', background: '#fff', cursor: 'pointer', borderRadius: 2 }}
            onMouseOver={e => e.currentTarget.style.borderColor = '#316AC5'}
            onMouseOut={e => e.currentTarget.style.borderColor = '#ccc'}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
        >
            <span style={{ fontSize: 24 }}>{icon}</span>
            <span style={{ fontSize: 11 }}>{label}</span>
        </div>
    )
}

function DriveItemFull({ icon, label, pct, free, total }) {
    return (
        <div
            style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 8, border: '1px solid #ccc', background: '#fff', cursor: 'pointer', borderRadius: 2 }}
            onMouseOver={e => e.currentTarget.style.borderColor = '#316AC5'}
            onMouseOut={e => e.currentTarget.style.borderColor = '#ccc'}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 28 }}>{icon}</span>
                <span style={{ fontSize: 11 }}>{label}</span>
            </div>
            <div style={{ background: '#E0E0E0', height: 8, borderRadius: 2, overflow: 'hidden', border: '1px solid #aaa' }}>
                <div style={{ background: 'linear-gradient(to right,#2255AA,#4488CC)', width: `${pct}%`, height: '100%' }} />
            </div>
            <div style={{ fontSize: 10, color: '#555' }}>{free} free of {total}</div>
        </div>
    )
}
