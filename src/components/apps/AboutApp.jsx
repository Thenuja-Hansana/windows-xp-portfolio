import { useState, useEffect, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { asset } from '../../utils/assetPath'

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export default function AboutApp() {
    const [numPages, setNumPages] = useState(null)
    const [containerWidth, setContainerWidth] = useState(0)
    const containerRef = useRef(null)

    // Ensure we use a cache buster so the new CV is always loaded
    const pdfUrl = asset('/img/thenuja_hansana_resume.pdf') + '?v=' + Date.now()

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.clientWidth)
            }
        }
        updateWidth()
        window.addEventListener('resize', updateWidth)
        return () => window.removeEventListener('resize', updateWidth)
    }, [])

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#ECE9D8' }}>
            {/* Toolbar for download */}
            <div style={{ display: 'flex', padding: '6px 10px', background: 'linear-gradient(to bottom, #F5F4EA 0%, #EBE9D7 100%)', borderBottom: '1px solid #c0c0c0', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <a
                    href={pdfUrl}
                    download="Thenuja_Hansana_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
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
                <span style={{ fontSize: 11, color: '#555', fontFamily: 'Tahoma' }}>
                    Previewing thenuja_hansana_resume.pdf
                </span>
            </div>

            {/* True PDF Rendering using react-pdf */}
            <div
                ref={containerRef}
                style={{ flex: 1, backgroundColor: '#525659', borderTop: '1px solid #fff', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}
            >
                <Document
                    file={pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<div style={{ color: 'white', padding: 20, fontFamily: 'Tahoma' }}>Loading Resume...</div>}
                    error={<div style={{ color: 'white', padding: 20, fontFamily: 'Tahoma' }}>Failed to load PDF. Please use the Download button above.</div>}
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <div key={`page_${index + 1}`} style={{ marginBottom: 20, boxShadow: '0 4px 8px rgba(0,0,0,0.5)' }}>
                            <Page
                                pageNumber={index + 1}
                                width={containerWidth > 800 ? 800 : containerWidth - 40}
                                renderTextLayer={true}
                                renderAnnotationLayer={true}
                            />
                        </div>
                    ))}
                </Document>
            </div>

            <div className="xp-statusbar">
                <div className="xp-statusbar-panel" style={{ minWidth: 180 }}>Resume.pdf</div>
                <div className="xp-statusbar-panel">{numPages ? `${numPages} Pages` : 'PDF Document'}</div>
            </div>
        </div>
    )
}
