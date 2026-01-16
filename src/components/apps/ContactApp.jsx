import { useState, useRef } from 'react'

// ─────────────────────────────────────────────
// ⚙️  EmailJS Configuration  (optional – fills in automatically via mailto fallback)
// Sign up free at https://www.emailjs.com/ and replace the 3 values below:
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'    // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'    // e.g. 'AbCdEfGhIjKlMnOp'
const MY_EMAIL = 'contact.thenujahansana@gmail.com'
const EMAILJS_CONFIGURED = (
    EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' &&
    EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
    EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY'
)
// ─────────────────────────────────────────────

const LINKS = [
    {
        icon: '🐙',
        label: 'GitHub',
        sub: 'github.com/thenujah',
        href: 'https://github.com/thenujah',
        color: '#24292e',
    },
    {
        icon: '💼',
        label: 'LinkedIn',
        sub: 'linkedin.com/in/thenujahansana',
        href: 'https://www.linkedin.com/in/thenujahansana',
        color: '#0077b5',
    },
    {
        icon: '🐦',
        label: 'Twitter / X',
        sub: 'x.com/thenujahansana',
        href: 'https://twitter.com/thenujahansana',
        color: '#1da1f2',
    },
    {
        icon: '▶️',
        label: 'YouTube',
        sub: 'youtube.com/@thenuja',
        href: 'https://www.youtube.com/@thenuja',
        color: '#ff0000',
    },
    {
        icon: '💬',
        label: 'Discord',
        sub: 'discord.gg/thenuja',
        href: 'https://discord.gg/thenuja',
        color: '#5865f2',
    },
    {
        icon: '📸',
        label: 'Instagram',
        sub: 'instagram.com/thenujahansana',
        href: 'https://instagram.com/thenujahansana',
        color: '#e1306c',
    },
]

export default function ContactApp() {
    const formRef = useRef(null)
    const [form, setForm] = useState({ from_name: '', from_email: '', subject: '', message: '' })
    const [status, setStatus] = useState('idle') // idle | sending | success | error
    const [errorMsg, setErrorMsg] = useState('')

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const sendViaMailto = () => {
        const subject = encodeURIComponent(
            form.subject || `Portfolio Contact from ${form.from_name}`
        )
        const body = encodeURIComponent(
            `From: ${form.from_name} <${form.from_email}>\n\n${form.message}`
        )
        window.open(`mailto:${MY_EMAIL}?subject=${subject}&body=${body}`, '_blank')
    }

    const handleSend = async (e) => {
        e.preventDefault()
        const { from_name, from_email, subject, message } = form

        if (!from_name.trim() || !from_email.trim() || !message.trim()) {
            setErrorMsg('Please fill in all required fields.')
            setStatus('error')
            return
        }

        setStatus('sending')
        setErrorMsg('')

        if (EMAILJS_CONFIGURED) {
            try {
                const emailjs = await import('@emailjs/browser')
                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    {
                        from_name,
                        from_email,
                        subject: subject || `Portfolio Contact from ${from_name}`,
                        message,
                        to_email: MY_EMAIL,
                    },
                    EMAILJS_PUBLIC_KEY
                )
                setStatus('success')
                setForm({ from_name: '', from_email: '', subject: '', message: '' })
            } catch (err) {
                console.error('EmailJS error:', err)
                // Fallback to mailto
                sendViaMailto()
                setStatus('success')
                setForm({ from_name: '', from_email: '', subject: '', message: '' })
            }
        } else {
            // No EmailJS configured — open mailto directly
            sendViaMailto()
            setStatus('success')
            setForm({ from_name: '', from_email: '', subject: '', message: '' })
        }
    }

    const inputStyle = {
        width: '100%',
        padding: '5px 8px',
        border: '1px solid #aaa',
        fontSize: 11,
        fontFamily: 'inherit',
        borderRadius: 2,
        boxSizing: 'border-box',
        outline: 'none',
    }

    const labelStyle = { fontSize: 11, color: '#333', display: 'block', marginBottom: 3, fontWeight: 'bold' }

    return (
        <>
            <div className="ie-content">
                <div style={{ maxWidth: 520, margin: '0 auto' }}>
                    <h2 style={{ color: '#003399', fontSize: 18, marginBottom: 4 }}>📬 Get In Touch</h2>
                    <p style={{ color: '#555', fontSize: 12, marginBottom: 16 }}>
                        Feel free to reach out for collaborations, opportunities, or just to say hi!
                    </p>

                    {/* Social links — responsive grid */}
                    <div className="contact-links-grid">
                        {LINKS.map(link => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    padding: '8px 10px',
                                    background: '#EEF2FF',
                                    border: '1px solid #316AC5',
                                    borderRadius: 4,
                                    textDecoration: 'none',
                                    color: '#003399',
                                    fontSize: 11,
                                    fontWeight: 'bold',
                                    transition: 'background 0.15s, color 0.15s',
                                }}
                                onMouseOver={e => {
                                    e.currentTarget.style.background = link.color
                                    e.currentTarget.style.color = '#fff'
                                    e.currentTarget.style.borderColor = link.color
                                }}
                                onMouseOut={e => {
                                    e.currentTarget.style.background = '#EEF2FF'
                                    e.currentTarget.style.color = '#003399'
                                    e.currentTarget.style.borderColor = '#316AC5'
                                }}
                            >
                                <span style={{ fontSize: 16 }}>{link.icon}</span>
                                <div>
                                    <div>{link.label}</div>
                                    <div style={{ fontWeight: 'normal', fontSize: 9, opacity: 0.75 }}>{link.sub}</div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Contact form */}
                    <div style={{ background: '#fff', border: '1px solid #ccc', borderRadius: 4, padding: 16 }}>
                        <h3 style={{ fontSize: 13, color: '#003399', marginBottom: 12 }}>📝 Send a Message</h3>

                        {status === 'success' && (
                            <div style={{ background: '#e8f5e9', border: '1px solid #4caf50', borderRadius: 4, padding: '10px 14px', marginBottom: 12, fontSize: 12, color: '#2e7d32', fontWeight: 'bold' }}>
                                ✅ Message sent! Your mail client should have opened. I'll get back to you soon.
                            </div>
                        )}
                        {status === 'error' && (
                            <div style={{ background: '#ffebee', border: '1px solid #f44336', borderRadius: 4, padding: '10px 14px', marginBottom: 12, fontSize: 12, color: '#c62828' }}>
                                ❌ {errorMsg}
                            </div>
                        )}

                        <form ref={formRef} onSubmit={handleSend}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

                                {/* Row 1: Name + Email */}
                                <div className="contact-form-row">
                                    <div>
                                        <label style={labelStyle}>Your Name *</label>
                                        <input
                                            type="text"
                                            name="from_name"
                                            value={form.from_name}
                                            onChange={handleChange}
                                            placeholder="John Smith"
                                            required
                                            style={inputStyle}
                                        />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Your Email *</label>
                                        <input
                                            type="email"
                                            name="from_email"
                                            value={form.from_email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            required
                                            style={inputStyle}
                                        />
                                    </div>
                                </div>

                                {/* Row 2: My Email (read-only) */}
                                <div>
                                    <label style={labelStyle}>Sending To</label>
                                    <input
                                        type="text"
                                        value={MY_EMAIL}
                                        readOnly
                                        style={{ ...inputStyle, background: '#f0f4ff', color: '#555', cursor: 'default' }}
                                    />
                                </div>

                                {/* Row 3: Subject */}
                                <div>
                                    <label style={labelStyle}>Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        placeholder="e.g. Collaboration Opportunity"
                                        style={inputStyle}
                                    />
                                </div>

                                {/* Row 4: Message */}
                                <div>
                                    <label style={labelStyle}>Message *</label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        rows="5"
                                        placeholder="Type your message here..."
                                        required
                                        style={{ ...inputStyle, resize: 'vertical' }}
                                    />
                                </div>

                                {/* Send button */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        style={{
                                            background: status === 'sending'
                                                ? 'linear-gradient(to bottom,#888,#666)'
                                                : 'linear-gradient(to bottom,#316AC5,#1A4FA0)',
                                            color: '#fff',
                                            border: '1px solid #0A246A',
                                            padding: '6px 20px',
                                            fontSize: 12,
                                            cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                                            borderRadius: 3,
                                            fontWeight: 'bold',
                                            fontFamily: 'inherit',
                                        }}
                                    >
                                        {status === 'sending' ? '⏳ Opening mail client…' : 'Send Message ✉️'}
                                    </button>
                                    <span style={{ fontSize: 10, color: '#888', marginLeft: 10 }}>
                                        Will open your default mail app pre-filled
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
