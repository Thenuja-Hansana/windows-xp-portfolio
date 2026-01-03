import { useState, useCallback } from 'react'
import BootScreen from './components/BootScreen'
import LoginScreen from './components/LoginScreen'
import Desktop from './components/Desktop'
import { WindowProvider } from './context/WindowContext'
import { MusicProvider } from './context/MusicContext'

// 3 phases: 'boot' → 'login' → 'desktop'
export default function App() {
    const [phase, setPhase] = useState('boot')

    const handleBootDone = useCallback(() => setPhase('login'), [])
    const handleLogin = useCallback(() => setPhase('desktop'), [])

    return (
        <MusicProvider>
            {phase === 'boot' && <BootScreen onDone={handleBootDone} />}
            {phase === 'login' && <LoginScreen onLogin={handleLogin} />}
            <WindowProvider>
                <Desktop visible={phase === 'desktop'} />
            </WindowProvider>
        </MusicProvider>
    )
}
