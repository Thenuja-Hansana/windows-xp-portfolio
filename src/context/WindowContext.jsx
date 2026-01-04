import React, { createContext, useContext, useCallback, useRef, useState } from 'react'
import { APPS_CONFIG } from '../data/appsConfig'

const WindowContext = createContext(null)

export function WindowProvider({ children }) {
    const [windows, setWindows] = useState([])
    const zRef = useRef(200)

    const nextZ = () => ++zRef.current

    const openApp = useCallback((appId) => {
        setWindows(prev => {
            const existing = prev.find(w => w.appId === appId && !w.closed)
            if (existing) {
                if (existing.minimized) {
                    return prev.map(w =>
                        w.id === existing.id
                            ? { ...w, minimized: false, zIndex: nextZ(), inactive: false }
                            : { ...w, inactive: true }
                    )
                }
                return prev.map(w =>
                    w.id === existing.id
                        ? { ...w, zIndex: nextZ(), inactive: false }
                        : { ...w, inactive: true }
                )
            }

            const cfg = APPS_CONFIG[appId]
            if (!cfg) return prev

            const count = prev.filter(w => !w.closed).length
            const newWin = {
                id: Date.now() + Math.random(),
                appId,
                closed: false,
                minimized: false,
                maximized: false,
                inactive: false,
                zIndex: nextZ(),
                x: 80 + (count * 30) % 200,
                y: 60 + (count * 20) % 150,
                width: cfg.width || 500,
                height: cfg.height || 380,
                savedBounds: null,
                opening: true,
            }

            return [...prev.map(w => ({ ...w, inactive: true })), newWin]
        })

        // Remove opening class after animation
        setTimeout(() => {
            setWindows(prev =>
                prev.map(w => w.appId === appId && w.opening ? { ...w, opening: false } : w)
            )
        }, 200)
    }, [])

    const closeWindow = useCallback((id) => {
        setWindows(prev => prev.filter(w => w.id !== id))
    }, [])

    const minimizeWindow = useCallback((id) => {
        setWindows(prev =>
            prev.map(w => w.id === id ? { ...w, minimized: true, inactive: true } : w)
        )
    }, [])

    const restoreWindow = useCallback((id) => {
        setWindows(prev =>
            prev.map(w =>
                w.id === id
                    ? { ...w, minimized: false, zIndex: nextZ(), inactive: false }
                    : { ...w, inactive: true }
            )
        )
    }, [])

    const toggleMaximize = useCallback((id, currentBounds) => {
        setWindows(prev =>
            prev.map(w => {
                if (w.id !== id) return w
                if (w.maximized) {
                    const b = w.savedBounds
                    return { ...w, maximized: false, x: b.x, y: b.y, width: b.width, height: b.height, savedBounds: null }
                } else {
                    return {
                        ...w,
                        maximized: true,
                        savedBounds: currentBounds,
                        x: 0, y: 0,
                        width: window.innerWidth,
                        height: window.innerHeight - 40,
                    }
                }
            })
        )
    }, [])

    const bringToFront = useCallback((id) => {
        setWindows(prev =>
            prev.map(w =>
                w.id === id
                    ? { ...w, zIndex: nextZ(), inactive: false }
                    : { ...w, inactive: true }
            )
        )
    }, [])

    const updateBounds = useCallback((id, bounds) => {
        setWindows(prev =>
            prev.map(w => w.id === id ? { ...w, ...bounds } : w)
        )
    }, [])

    const value = { windows, openApp, closeWindow, minimizeWindow, restoreWindow, toggleMaximize, bringToFront, updateBounds }

    return (
        <WindowContext.Provider value={value}>
            {children}
        </WindowContext.Provider>
    )
}

export function useWindowManager() {
    return useContext(WindowContext)
}
