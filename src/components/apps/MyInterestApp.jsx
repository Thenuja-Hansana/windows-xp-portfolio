import { useState } from 'react'

const INTERESTS = [
    {
        id: 'tech',
        title: 'Web Technology',
        description: 'Obsessed with how the internet works. From HTTP protocols to WebGL shaders — I explore it all.',
        tags: ['React', 'WebGL', 'PWAs', 'Edge Computing', 'Web3'],
        icon: '/img/Computer.ico',
        topics: [
            { title: 'React & Next.js', desc: 'Building blazing-fast SPAs and SSR apps' },
            { title: 'Edge Computing', desc: 'Exploring Cloudflare Workers & Deno Deploy' },
        ]
    },
    {
        id: 'design',
        title: 'UI/UX Design',
        description: 'Beauty and function shouldn\'t be mutually exclusive. I live for that "wow" moment in UI design.',
        tags: ['Figma', 'Motion Design', 'Glassmorphism', 'Design Systems', 'Accessibility'],
        icon: '/img/Paint.ico',
        topics: [
            { title: 'Micro-animations', desc: 'Making interfaces feel alive and responsive' },
            { title: 'Skeuomorphism', desc: 'Retro UI as a design philosophy' },
        ]
    },
    {
        id: 'music',
        title: 'Music',
        description: 'Lo-fi hip-hop, jazz, and electronic music fuel my late-night coding sessions.',
        tags: ['Lo-fi', 'Jazz Fusion', 'Electronic', 'Synthwave', 'Ambient'],
        icon: '/img/music-player.png',
        topics: [
            { title: 'Lo-fi Beats', desc: 'Perfect background for deep focus coding' },
            { title: 'Synthwave', desc: '80s aesthetic in audio form' },
        ]
    },
    {
        id: 'gaming',
        title: 'Retro Gaming',
        description: 'Huge fan of retro aesthetics — hence this Windows XP portfolio! Gaming taught me about UX before I knew what UX was.',
        tags: ['Windows XP', 'Pixel Art', 'Indie Games', 'Speedrunning', 'Emulation'],
        icon: '/img/Projects.ico',
        topics: [
            { title: 'Windows XP', desc: 'The OS that started my love for computers' },
            { title: 'Pixel Art', desc: 'Tiny canvases with huge expressiveness' },
        ]
    }
]

export default function MyInterestApp() {
    const [selected, setSelected] = useState('tech')

    const active = INTERESTS.find(i => i.id === selected)

    return (
        <div style={{
            fontFamily: 'Tahoma, Arial, sans-serif',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: '#ECE9D8',
            padding: 2,
            boxSizing: 'border-box',
        }}>
            {/* Toolbar area */}
            <div style={{
                display: 'flex', alignItems: 'center', padding: '4px',
                borderBottom: '1px solid #ACA899', background: '#ECE9D8'
            }}>
                <div style={{ fontSize: 11, display: 'flex', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <img src="/img/Computer.ico" alt="icon" style={{ width: 16, height: 16 }} />
                        <span>Views</span>
                    </div>
                </div>
            </div>

            {/* Split view */}
            <div style={{ flex: 1, display: 'flex', border: '1px solid #7F9DB9', background: '#fff', margin: '4px' }}>

                {/* Left pane: Tree view */}
                <div style={{
                    width: 180, borderRight: '1px solid #ECE9D8', background: '#fff',
                    padding: '4px', overflowY: 'auto'
                }}>
                    <div style={{ fontSize: 11, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span>[-] My Passions</span>
                    </div>
                    {INTERESTS.map(item => {
                        const isSelected = selected === item.id;
                        return (
                            <div
                                key={item.id}
                                onClick={() => setSelected(item.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 4,
                                    padding: '2px 4px',
                                    paddingLeft: 20,
                                    cursor: 'default',
                                    background: isSelected ? '#316AC5' : 'transparent',
                                    color: isSelected ? '#fff' : '#000',
                                    fontSize: 11,
                                }}
                            >
                                <img src={item.icon} alt={item.title} style={{ width: 16, height: 16, filter: isSelected ? 'brightness(1.2)' : 'none' }} />
                                <span>{item.title}</span>
                            </div>
                        )
                    })}
                </div>

                {/* Right pane: Details view */}
                <div style={{ flex: 1, padding: 12, overflowY: 'auto', background: '#fff' }}>
                    {active && (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #ccc', paddingBottom: 10, marginBottom: 10 }}>
                                <img src={active.icon} alt={active.title} style={{ width: 48, height: 48 }} />
                                <div>
                                    <h2 style={{ fontSize: 18, color: '#000', margin: 0, fontWeight: 'normal' }}>{active.title}</h2>
                                    <div style={{ fontSize: 11, color: '#555', marginTop: 4 }}>Personal Interest / Hobby</div>
                                </div>
                            </div>

                            <div style={{ marginBottom: 16 }}>
                                <div style={{ fontSize: 11, fontWeight: 'bold', color: '#000', marginBottom: 4 }}>Description:</div>
                                <div style={{ fontSize: 11, color: '#000', lineHeight: 1.5 }}>
                                    {active.description}
                                </div>
                            </div>

                            <fieldset style={{ padding: '8px 10px', border: '1px solid #D5D5CF', borderRadius: 3, marginBottom: 16 }}>
                                <legend style={{ fontSize: 11, color: '#1A66C4' }}>Tags & Topics</legend>
                                <div style={{ fontSize: 11, color: '#333', marginBottom: 8 }}>
                                    {active.tags.join(', ')}
                                </div>

                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11, marginTop: 8 }}>
                                    <thead style={{ background: '#ECE9D8', textAlign: 'left' }}>
                                        <tr>
                                            <th style={{ padding: '2px 4px', borderRight: '1px solid #ACA899', borderBottom: '1px solid #ACA899', fontWeight: 'normal' }}>Focus Area</th>
                                            <th style={{ padding: '2px 4px', borderBottom: '1px solid #ACA899', fontWeight: 'normal' }}>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ background: '#fff' }}>
                                        {active.topics.map((t, idx) => (
                                            <tr key={idx}>
                                                <td style={{ padding: '4px', borderRight: '1px solid #eee', borderBottom: '1px solid #eee' }}>{t.title}</td>
                                                <td style={{ padding: '4px', borderBottom: '1px solid #eee' }}>{t.desc}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </fieldset>
                        </div>
                    )}
                </div>
            </div>

            {/* Status bar */}
            <div style={{ borderTop: '1px solid #ACA899', background: '#ECE9D8', padding: '2px 6px', fontSize: 11, display: 'flex', color: '#333' }}>
                <span style={{ borderRight: '1px solid #ACA899', paddingRight: 6, marginRight: 6 }}>1 object(s) selected</span>
                <span>My Computer</span>
            </div>
        </div>
    )
}
