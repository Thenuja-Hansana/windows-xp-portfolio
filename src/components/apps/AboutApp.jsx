export default function AboutApp() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#ECE9D8' }}>
            {/* Toolbar for download */}
            <div style={{ display: 'flex', padding: '6px 10px', background: 'linear-gradient(to bottom, #F5F4EA 0%, #EBE9D7 100%)', borderBottom: '1px solid #c0c0c0', alignItems: 'center' }}>
                <a
                    href="/img/thenuja_cv_hansana.pdf"
                    download="Thenuja_Hansana_CV.pdf"
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        textDecoration: 'none', color: '#000', fontSize: 11,
                        padding: '4px 10px', border: '1px solid #888', borderRadius: 3,
                        background: 'linear-gradient(to bottom, #f0f0f0, #d8d8d8)',
                        boxShadow: '1px 1px 2px rgba(0,0,0,0.1)', cursor: 'pointer',
                        fontFamily: 'Tahoma, Arial, sans-serif'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(to bottom, #dce8f7, #b8d0ef)'}
                    onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(to bottom, #f0f0f0, #d8d8d8)'}
                >
                    <span style={{ fontSize: 16 }}>💾</span>
                    <b>Download CV</b>
                </a>
                <span style={{ fontSize: 11, color: '#555', marginLeft: 12, fontFamily: 'Tahoma' }}>
                    Previewing thenuja_cv_hansana.pdf
                </span>
            </div>

            {/* PDF Viewer */}
            <div style={{ flex: 1, backgroundColor: '#fff', borderTop: '1px solid #fff' }}>
                <iframe
                    src="/img/thenuja_cv_hansana.pdf#toolbar=0"
                    title="Resume PDF"
                    style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                />
            </div>

            <div className="xp-statusbar">
                <div className="xp-statusbar-panel" style={{ minWidth: 180 }}>Resume.pdf</div>
                <div className="xp-statusbar-panel">PDF Document</div>
            </div>
        </div>
    )
}
