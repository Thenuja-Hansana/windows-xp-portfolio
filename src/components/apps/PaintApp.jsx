import { useRef, useEffect, useState, useCallback } from 'react'

const COLORS = ['#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
    '#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FF00', '#00FF80', '#00FFFF', '#0080FF',
    '#8080FF', '#FF00FF', '#FF0080', '#FF8080', '#FFD090', '#FFFF80', '#80FF80', '#80FFFF',
    '#ffC0FF', '#ffffff', '#993300', '#336699', '#003366', '#669900', '#FF6600', '#FFCC00']

const TOOLS = ['✏️', '🖌️', '🪣', '📐', '⬜', '⭕', '➖', '✒️', '🔍', '🗑️']

export default function PaintApp() {
    const canvasRef = useRef(null)
    const [fgColor, setFgColor] = useState('#000000')
    const [coords, setCoords] = useState({ x: 0, y: 0 })
    const drawing = useRef(false)
    const lastPos = useRef({ x: 0, y: 0 })
    const [activeTool, setActiveTool] = useState(0)

    const getPos = useCallback((e) => {
        const rect = canvasRef.current.getBoundingClientRect()
        return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }, [])

    const onMouseDown = useCallback((e) => {
        drawing.current = true
        const pos = getPos(e)
        lastPos.current = pos
        const ctx = canvasRef.current.getContext('2d')
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 1, 0, Math.PI * 2)
        ctx.fillStyle = fgColor
        ctx.fill()
    }, [fgColor, getPos])

    const onMouseMove = useCallback((e) => {
        const pos = getPos(e)
        setCoords(pos)
        if (!drawing.current) return
        const ctx = canvasRef.current.getContext('2d')
        ctx.beginPath()
        ctx.moveTo(lastPos.current.x, lastPos.current.y)
        ctx.lineTo(pos.x, pos.y)
        ctx.strokeStyle = fgColor
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.stroke()
        lastPos.current = pos
    }, [fgColor, getPos])

    const onMouseUp = useCallback(() => { drawing.current = false }, [])

    return (
        <>
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden', background: '#808080' }}>
                {/* Toolbox */}
                <div style={{ width: 54, background: '#ECE9D8', borderRight: '2px solid #a0a0a0', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4px 2px', gap: 2, flexShrink: 0 }}>
                    {TOOLS.map((t, i) => (
                        <div
                            key={t}
                            onClick={() => setActiveTool(i)}
                            style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, cursor: 'pointer', border: '1px solid transparent', borderRadius: 2, background: i === activeTool ? '#fff' : 'transparent', borderColor: i === activeTool ? '#316AC5' : 'transparent' }}
                            title={t}
                        >
                            {t}
                        </div>
                    ))}
                </div>
                {/* Canvas */}
                <div style={{ flex: 1, overflow: 'auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', padding: 8 }}>
                    <canvas
                        ref={canvasRef}
                        width={480}
                        height={360}
                        style={{ background: '#fff', cursor: 'crosshair', boxShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
                        onMouseDown={onMouseDown}
                        onMouseMove={onMouseMove}
                        onMouseUp={onMouseUp}
                        onMouseLeave={onMouseUp}
                    />
                </div>
            </div>
            {/* Color palette */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, background: '#ECE9D8', borderTop: '2px solid #a0a0a0', padding: '4px 8px', flexShrink: 0 }}>
                <div style={{ display: 'flex', gap: 1, flexWrap: 'wrap', maxWidth: 280 }}>
                    {COLORS.map(c => (
                        <div
                            key={c}
                            style={{ width: 16, height: 16, background: c, border: '1px solid #888', cursor: 'pointer', outline: c === fgColor ? '2px solid #000' : 'none' }}
                            onClick={() => setFgColor(c)}
                            title={c}
                        />
                    ))}
                </div>
                <div style={{ marginLeft: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div style={{ width: 24, height: 20, background: fgColor, border: '2px solid #fff', boxShadow: '1px 1px 0 #000' }} />
                    <div style={{ width: 24, height: 20, background: '#fff', border: '2px solid #fff', boxShadow: '1px 1px 0 #000', marginTop: -8, marginLeft: 6 }} />
                </div>
                <div style={{ marginLeft: 12, fontSize: 10, color: '#333' }}>
                    Cursor: {Math.round(coords.x)}, {Math.round(coords.y)}
                </div>
            </div>
        </>
    )
}
