import { useState, useEffect } from 'react'

export function useClock() {
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        function tick() {
            const now = new Date()
            const h = now.getHours()
            const m = String(now.getMinutes()).padStart(2, '0')
            const ampm = h >= 12 ? 'PM' : 'AM'
            const h12 = h % 12 || 12
            setTime(`${h12}:${m} ${ampm}`)
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            setDate(`${days[now.getDay()]} ${months[now.getMonth()]} ${now.getDate()}`)
        }
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [])

    return { time, date }
}
