import { useCallback, useState } from 'react'
import { useWindowManager } from '../context/WindowContext'

export default function ContextMenu({ x, y, onClose, onBalloon, onOpenApp }) {
    const stop = (e) => e.stopPropagation()

    const handleRefresh = () => {
        const d = document.getElementById('desktop')
        if (d) { d.style.opacity = '0.7'; setTimeout(() => d.style.opacity = '1', 150) }
        onClose()
    }

    return (
        <div
            id="context-menu"
            className="open"
            style={{ left: x, top: y }}
            onClick={stop}
        >
            <div className="ctx-item" onClick={() => { onClose() }}>Arrange Icons By ▶</div>
            <div className="ctx-separator" />
            <div className="ctx-item" onClick={handleRefresh}>Refresh</div>
            <div className="ctx-separator" />
            <div className="ctx-item" onClick={() => { onBalloon('📁 New folder (this is a portfolio 😄)'); onClose() }}>New ▶</div>
            <div className="ctx-separator" />
            <div className="ctx-item" onClick={() => { onOpenApp('mycomputer'); onClose() }}>Properties</div>
        </div>
    )
}
