/* ============================================================
   Windows XP Portfolio — App Content (apps.js)
   ============================================================ */

const APPS = {
  about: {
    id: 'about',
    title: 'About Me — Notepad',
    icon: '📄',
    width: 560,
    height: 420,
    content: () => `
      <div class="xp-menubar">
        <span class="xp-menu-item">File</span>
        <span class="xp-menu-item">Edit</span>
        <span class="xp-menu-item">Format</span>
        <span class="xp-menu-item">View</span>
        <span class="xp-menu-item">Help</span>
      </div>
      <div style="display:flex;flex:1;overflow:hidden;">
        <div class="about-container">
          <div class="about-header">
            <div class="about-avatar">👨‍💻</div>
            <div class="about-info">
              <h2>Your Name</h2>
              <div class="role">Full-Stack Developer &amp; Designer</div>
              <div class="contact-links">
                <a class="contact-link" href="https://github.com" target="_blank">🐙 GitHub</a>
                <a class="contact-link" href="https://linkedin.com" target="_blank">💼 LinkedIn</a>
                <a class="contact-link" href="mailto:you@email.com">✉️ Email</a>
                <a class="contact-link" href="https://twitter.com" target="_blank">🐦 Twitter</a>
              </div>
            </div>
          </div>

          <div class="about-section">
            <h3>👋 Hello, World!</h3>
            <p>Welcome to my portfolio — served in true retro style. I'm a passionate developer who loves building elegant solutions to complex problems. With a knack for clean code and pixel-perfect interfaces, I bring ideas to life across the full stack.</p>
          </div>

          <div class="about-section">
            <h3>🎯 What I Do</h3>
            <p>I specialize in modern web development, creating responsive and performant applications. From crafting intuitive user interfaces to designing scalable backend systems, I enjoy every layer of the stack.</p>
          </div>

          <div class="about-section">
            <h3>🌍 Background</h3>
            <p>Based in [Your City], I've worked with startups and established companies to deliver high-quality digital products. I'm always eager to learn new technologies and tackle challenging problems.</p>
          </div>

          <div class="about-section">
            <h3>🎮 Fun Fact</h3>
            <p>This portfolio is built to run like Windows XP — because sometimes the best way to show your skills is to build something nobody expects. Nostalgia + code = 🚀</p>
          </div>
        </div>
      </div>
      <div class="xp-statusbar">
        <div class="xp-statusbar-panel" style="min-width:180px;">Ln 1, Col 1</div>
        <div class="xp-statusbar-panel">100%</div>
        <div class="xp-statusbar-panel">Windows (CRLF)</div>
        <div class="xp-statusbar-panel">UTF-8</div>
      </div>
    `
  },

  projects: {
    id: 'projects',
    title: 'My Projects — Windows Explorer',
    icon: '📁',
    width: 680,
    height: 480,
    content: () => `
      <div class="xp-menubar">
        <span class="xp-menu-item">File</span>
        <span class="xp-menu-item">Edit</span>
        <span class="xp-menu-item">View</span>
        <span class="xp-menu-item">Favorites</span>
        <span class="xp-menu-item">Tools</span>
        <span class="xp-menu-item">Help</span>
      </div>
      <div style="display:flex;align-items:center;gap:4px;background:#ECE9D8;border-bottom:1px solid #c0c0c0;padding:3px 6px;flex-shrink:0;">
        <button style="font-size:18px;background:none;border:none;cursor:pointer;padding:2px 4px;" title="Back">◀</button>
        <button style="font-size:18px;background:none;border:none;cursor:pointer;padding:2px 4px;opacity:0.4;" title="Forward">▶</button>
        <button style="font-size:16px;background:none;border:none;cursor:pointer;padding:2px 4px;" title="Up">🔼</button>
        <div style="flex:1;display:flex;align-items:center;gap:4px;margin-left:6px;">
          <span style="font-size:11px;color:#333;">Address:</span>
          <input readonly value="C:\\Users\\Portfolio\\My Projects" style="flex:1;height:22px;border:1px solid #7f9db9;padding:0 4px;font-size:11px;font-family:var(--xp-font);background:#fff;" />
        </div>
      </div>
      <div class="xp-explorer">
        <div class="xp-sidebar">
          <div class="sidebar-section">
            <div class="sidebar-header">📁 File and Folder Tasks</div>
            <div class="sidebar-link">📄 Make a new folder</div>
            <div class="sidebar-link">🌐 Publish folder to web</div>
            <div class="sidebar-link">📧 Share this folder</div>
          </div>
          <div class="sidebar-section">
            <div class="sidebar-header">🔗 Other Places</div>
            <div class="sidebar-link">🏠 My Documents</div>
            <div class="sidebar-link">💻 My Computer</div>
            <div class="sidebar-link">🌐 Network Places</div>
          </div>
          <div class="sidebar-section">
            <div class="sidebar-header">ℹ️ Details</div>
            <div style="padding:4px 8px;font-size:10px;color:#333;">
              My Projects<br/>
              <span style="color:#555;">7 objects</span>
            </div>
          </div>
        </div>
        <div class="xp-content">
          <div class="projects-grid">
            ${[
              { icon: '🌐', name: 'Portfolio Website', desc: 'A Windows XP style interactive portfolio website built with pure HTML, CSS & JS.', tech: ['HTML', 'CSS', 'JavaScript'] },
              { icon: '🤖', name: 'AI Chat App', desc: 'Real-time chat application powered by machine learning for smart responses.', tech: ['React', 'Node.js', 'OpenAI', 'Socket.io'] },
              { icon: '🛒', name: 'E-Commerce Platform', desc: 'Full-featured online store with cart, payments and admin dashboard.', tech: ['Next.js', 'MongoDB', 'Stripe', 'Tailwind'] },
              { icon: '📊', name: 'Data Dashboard', desc: 'Interactive analytics dashboard with real-time data visualization.', tech: ['Vue.js', 'D3.js', 'Python', 'FastAPI'] },
              { icon: '📱', name: 'Mobile Task App', desc: 'Cross-platform productivity app with sync and offline support.', tech: ['React Native', 'Firebase', 'Redux'] },
              { icon: '🎮', name: 'Browser Game', desc: 'An arcade-style browser game with leaderboards and multiplayer mode.', tech: ['Canvas API', 'WebSockets', 'Node.js'] },
              { icon: '🔐', name: 'Auth System', desc: 'OAuth-based authentication microservice with JWT and 2FA support.', tech: ['Express', 'JWT', 'Redis', 'PostgreSQL'] },
            ].map(p => `
              <div class="project-card" onclick="openProjectLink('${p.name}')">
                <div class="proj-icon">${p.icon}</div>
                <div class="proj-name">${p.name}</div>
                <div class="proj-desc">${p.desc}</div>
                <div class="proj-tech">${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="xp-statusbar">
        <div class="xp-statusbar-panel" style="flex:1;">7 objects</div>
      </div>
    `
  },

  skills: {
    id: 'skills',
    title: 'Skills & Technologies',
    icon: '⚙️',
    width: 500,
    height: 430,
    content: () => `
      <div class="xp-menubar">
        <span class="xp-menu-item">View</span>
        <span class="xp-menu-item">Help</span>
      </div>
      <div class="skills-container">
        <div class="skills-category">
          <h3>💻 Frontend</h3>
          ${[
            ['HTML / CSS', 95], ['JavaScript (ES6+)', 92], ['React.js', 88],
            ['Vue.js', 75], ['TypeScript', 82],
          ].map(([n,v]) => skillBar(n, v)).join('')}
        </div>
        <div class="skills-category">
          <h3>🛠️ Backend</h3>
          ${[
            ['Node.js', 88], ['Python', 80], ['Express.js', 85],
            ['PostgreSQL', 75], ['MongoDB', 78],
          ].map(([n,v]) => skillBar(n, v)).join('')}
        </div>
        <div class="skills-category">
          <h3>☁️ Tools & DevOps</h3>
          ${[
            ['Git / GitHub', 90], ['Docker', 70], ['AWS', 65], ['Linux', 75],
          ].map(([n,v]) => skillBar(n, v)).join('')}
        </div>
        <div class="skills-category">
          <h3>🎨 Design</h3>
          ${[
            ['Figma', 80], ['UI / UX Design', 78], ['CSS Animations', 85],
          ].map(([n,v]) => skillBar(n, v)).join('')}
        </div>
      </div>
    `
  },

  contact: {
    id: 'contact',
    title: 'Contact Me — Internet Explorer',
    icon: '🌐',
    width: 560,
    height: 440,
    content: () => `
      <div class="xp-menubar">
        <span class="xp-menu-item">File</span>
        <span class="xp-menu-item">Edit</span>
        <span class="xp-menu-item">View</span>
        <span class="xp-menu-item">Favorites</span>
        <span class="xp-menu-item">Tools</span>
        <span class="xp-menu-item">Help</span>
      </div>
      <div class="ie-toolbar">
        <div class="ie-address-bar">
          <span class="ie-address-label">Address:</span>
          <input class="ie-address-input" value="mailto:you@youremail.com" readonly/>
          <button class="ie-go-btn">Go</button>
        </div>
      </div>
      <div class="ie-content">
        <div style="max-width:480px;margin:0 auto;">
          <h2 style="color:#003399;font-size:18px;margin-bottom:4px;">📬 Get In Touch</h2>
          <p style="color:#555;font-size:12px;margin-bottom:16px;">Feel free to reach out for collaborations, opportunities, or just to say hi!</p>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:20px;">
            ${[
              ['🐙 GitHub', 'github.com/yourusername', 'https://github.com'],
              ['💼 LinkedIn', 'linkedin.com/in/yourprofile', 'https://linkedin.com'],
              ['🐦 Twitter', '@yourhandle', 'https://twitter.com'],
              ['✉️ Email', 'you@youremail.com', 'mailto:you@youremail.com'],
            ].map(([icon, label, href]) => `
              <a href="${href}" target="_blank" style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:#EEF2FF;border:1px solid #316AC5;border-radius:4px;text-decoration:none;color:#003399;font-size:12px;font-weight:bold;transition:background 0.1s;" onmouseover="this.style.background='#316AC5';this.style.color='#fff';" onmouseout="this.style.background='#EEF2FF';this.style.color='#003399';">
                <span style="font-size:20px;">${icon.split(' ')[0]}</span>
                <div>
                  <div>${icon.split(' ').slice(1).join(' ')}</div>
                  <div style="font-weight:normal;font-size:10px;opacity:0.8;">${label}</div>
                </div>
              </a>
            `).join('')}
          </div>

          <div style="background:#fff;border:1px solid #ccc;border-radius:4px;padding:16px;">
            <h3 style="font-size:13px;color:#003399;margin-bottom:12px;">📝 Send a Message</h3>
            <div style="display:flex;flex-direction:column;gap:8px;">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                <div>
                  <label style="font-size:11px;color:#333;display:block;margin-bottom:2px;">Name</label>
                  <input type="text" placeholder="Your Name" style="width:100%;padding:4px 8px;border:1px solid #aaa;font-size:11px;font-family:var(--xp-font);" />
                </div>
                <div>
                  <label style="font-size:11px;color:#333;display:block;margin-bottom:2px;">Email</label>
                  <input type="email" placeholder="your@email.com" style="width:100%;padding:4px 8px;border:1px solid #aaa;font-size:11px;font-family:var(--xp-font);" />
                </div>
              </div>
              <div>
                <label style="font-size:11px;color:#333;display:block;margin-bottom:2px;">Message</label>
                <textarea rows="4" placeholder="Type your message here..." style="width:100%;padding:4px 8px;border:1px solid #aaa;font-size:11px;font-family:var(--xp-font);resize:vertical;"></textarea>
              </div>
              <div>
                <button onclick="sendContactForm(this)" style="background:linear-gradient(to bottom,#316AC5,#1A4FA0);color:#fff;border:1px solid #0A246A;padding:5px 16px;font-size:11px;font-family:var(--xp-font);cursor:pointer;border-radius:3px;font-weight:bold;">
                  Send Message ✉️
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },

  mediaplayer: {
    id: 'mediaplayer',
    title: 'Windows Media Player',
    icon: '🎵',
    width: 420,
    height: 360,
    content: () => `
      <div class="mp-body">
        <div class="mp-visualizer" id="mp-viz-${Date.now()}">
          ${Array.from({length: 24}, (_, i) => {
            const h = 20 + Math.random() * 80;
            const delay = (i * 0.05).toFixed(2);
            return `<div class="mp-bar" style="height:${h}%;animation-duration:${0.5 + Math.random() * 0.8}s;animation-delay:-${delay}s;"></div>`;
          }).join('')}
        </div>
        <div class="mp-info">
          <div class="mp-track">🎵 Now Playing: Programming Vibes — Lo-Fi Mix</div>
          <div style="font-size:10px;color:#87CEFA;margin-top:2px;">Album: Code & Chill Vol. 1 • 2024</div>
        </div>
        <div class="mp-controls-row">
          <button class="mp-ctrl-btn" title="Previous">⏮</button>
          <button class="mp-ctrl-btn" title="Play/Pause" onclick="this.textContent=this.textContent==='⏸'?'▶':'⏸'">⏸</button>
          <button class="mp-ctrl-btn" title="Stop">⏹</button>
          <button class="mp-ctrl-btn" title="Next">⏭</button>
          <div class="mp-progress">
            <div class="mp-progress-fill"></div>
          </div>
          <span style="font-size:10px;color:#fff;margin-left:4px;">🔊</span>
        </div>
      </div>
    `
  },

  recycle: {
    id: 'recycle',
    title: 'Recycle Bin',
    icon: '🗑️',
    width: 400,
    height: 300,
    content: () => `
      <div class="xp-menubar">
        <span class="xp-menu-item">File</span>
        <span class="xp-menu-item">Edit</span>
        <span class="xp-menu-item">View</span>
        <span class="xp-menu-item">Help</span>
      </div>
      <div class="xp-explorer">
        <div class="xp-sidebar">
          <div class="sidebar-section">
            <div class="sidebar-header">🗑️ Recycle Bin Tasks</div>
            <div class="sidebar-link">🗑️ Empty the Recycle Bin</div>
            <div class="sidebar-link">↩️ Restore all items</div>
          </div>
          <div class="sidebar-section">
            <div class="sidebar-header">🔗 Other Places</div>
            <div class="sidebar-link">🖥️ Desktop</div>
            <div class="sidebar-link">💻 My Computer</div>
          </div>
        </div>
        <div class="xp-content" style="display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;color:#555;">
          <div style="font-size:72px;opacity:0.5;">🗑️</div>
          <div style="font-size:13px;font-weight:bold;color:#333;">Recycle Bin is empty.</div>
          <div style="font-size:11px;text-align:center;max-width:200px;">
            Nothing to see here!<br/>All my bad code has been cleaned up. ✨
          </div>
        </div>
      </div>
      <div class="xp-statusbar">
        <div class="xp-statusbar-panel" style="flex:1;">0 objects</div>
      </div>
    `
  },

  mycomputer: {
    id: 'mycomputer',
    title: 'My Computer',
    icon: '💻',
    width: 580,
    height: 400,
    content: () => `
      <div class="xp-menubar">
        <span class="xp-menu-item">File</span>
        <span class="xp-menu-item">Edit</span>
        <span class="xp-menu-item">View</span>
        <span class="xp-menu-item">Tools</span>
        <span class="xp-menu-item">Help</span>
      </div>
      <div class="xp-explorer">
        <div class="xp-sidebar">
          <div class="sidebar-section">
            <div class="sidebar-header">💻 System Tasks</div>
            <div class="sidebar-link">ℹ️ View system information</div>
            <div class="sidebar-link">➕ Add or remove programs</div>
            <div class="sidebar-link">🖥️ Change a setting</div>
          </div>
          <div class="sidebar-section">
            <div class="sidebar-header">🔗 Other Places</div>
            <div class="sidebar-link">🌐 My Network Places</div>
            <div class="sidebar-link">📁 My Documents</div>
            <div class="sidebar-link">🖥️ Shared Documents</div>
          </div>
        </div>
        <div class="xp-content">
          <div style="font-size:11px;font-weight:bold;color:#003399;margin-bottom:8px;padding-bottom:4px;border-bottom:1px solid #ccc;">Files Stored on This Computer</div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px;">
            ${[['📁','Shared Documents'],['📁','Your Name\'s Documents']].map(([i,n])=>`
              <div style="display:flex;align-items:center;gap:6px;padding:8px;border:1px solid #ccc;background:#fff;cursor:pointer;border-radius:2px;" onmouseover="this.style.borderColor='#316AC5'" onmouseout="this.style.borderColor='#ccc'">
                <span style="font-size:24px;">${i}</span>
                <span style="font-size:11px;">${n}</span>
              </div>
            `).join('')}
          </div>
          <div style="font-size:11px;font-weight:bold;color:#003399;margin-bottom:8px;padding-bottom:4px;border-bottom:1px solid #ccc;">Hard Disk Drives</div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px;">
            ${[['💿','Local Disk (C:)']].map(([i,n])=>`
              <div style="display:flex;flex-direction:column;gap:4px;padding:8px;border:1px solid #ccc;background:#fff;cursor:pointer;border-radius:2px;" onmouseover="this.style.borderColor='#316AC5'" onmouseout="this.style.borderColor='#ccc'">
                <div style="display:flex;align-items:center;gap:6px;">
                  <span style="font-size:28px;">${i}</span>
                  <span style="font-size:11px;">${n}</span>
                </div>
                <div style="background:#E0E0E0;height:8px;border-radius:2px;overflow:hidden;border:1px solid #aaa;">
                  <div style="background:linear-gradient(to right,#2255AA,#4488CC);width:62%;height:100%;"></div>
                </div>
                <div style="font-size:10px;color:#555;">59.8 GB free of 160 GB</div>
              </div>
            `).join('')}
          </div>
          <div style="font-size:11px;font-weight:bold;color:#003399;margin-bottom:8px;padding-bottom:4px;border-bottom:1px solid #ccc;">Devices with Removable Storage</div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
            ${[['💿','DVD-RW Drive (D:)'],['💾','Removable Disk (E:)']].map(([i,n])=>`
              <div style="display:flex;align-items:center;gap:6px;padding:8px;border:1px solid #ccc;background:#fff;cursor:pointer;border-radius:2px;" onmouseover="this.style.borderColor='#316AC5'" onmouseout="this.style.borderColor='#ccc'">
                <span style="font-size:24px;">${i}</span>
                <span style="font-size:11px;">${n}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="xp-statusbar">
        <div class="xp-statusbar-panel" style="flex:1;">4 objects</div>
      </div>
    `
  },

  paint: {
    id: 'paint',
    title: 'untitled — Paint',
    icon: '🎨',
    width: 620,
    height: 480,
    content: () => `
      <div class="xp-menubar">
        <span class="xp-menu-item">File</span>
        <span class="xp-menu-item">Edit</span>
        <span class="xp-menu-item">View</span>
        <span class="xp-menu-item">Image</span>
        <span class="xp-menu-item">Colors</span>
        <span class="xp-menu-item">Help</span>
      </div>
      <div style="display:flex;flex:1;overflow:hidden;background:#808080;">
        <!-- Toolbox -->
        <div style="width:54px;background:#ECE9D8;border-right:2px solid #a0a0a0;display:flex;flex-direction:column;align-items:center;padding:4px 2px;gap:2px;flex-shrink:0;">
          ${['✏️','🖌️','🪣','📐','⬜','⭕','➖','✒️','🔍','🗑️'].map((t,i) => `
            <div style="width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:14px;cursor:pointer;border:1px solid transparent;border-radius:2px;${i===0?'background:#fff;border-color:#316AC5;':''}" title="${t}" onmouseover="this.style.background='#D0D0D0'" onmouseout="this.style.background='${i===0?'#fff':'transparent'}';">
              ${t}
            </div>
          `).join('')}
        </div>
        <!-- Canvas area -->
        <div style="flex:1;overflow:auto;display:flex;align-items:flex-start;justify-content:flex-start;padding:8px;">
          <canvas id="paint-canvas" width="480" height="360" style="background:#fff;cursor:crosshair;box-shadow:2px 2px 4px rgba(0,0,0,0.3);"></canvas>
        </div>
      </div>
      <!-- Color palette -->
      <div style="display:flex;align-items:center;gap:2px;background:#ECE9D8;border-top:2px solid #a0a0a0;padding:4px 8px;flex-shrink:0;">
        <div style="display:flex;gap:1px;flex-wrap:wrap;max-width:240px;">
          ${['#000000','#808080','#800000','#808000','#008000','#008080','#000080','#800080',
             '#808040','#004040','#0080FF','#004080','#8000FF','#804000','#FF0000','#FF8000',
             '#FFFF00','#80FF00','#00FF00','#00FF80','#00FFFF','#0080FF','#8080FF','#FF00FF',
             '#FF0080','#FF8080','#FFD090','#FFFF80','#80FF80','#80FFFF','#ffC0FF','#ffffff'
          ].map(c => `<div style="width:16px;height:16px;background:${c};border:1px solid #888;cursor:pointer;" onclick="setPaintColor('${c}')" title="${c}"></div>`).join('')}
        </div>
        <div style="margin-left:8px;display:flex;flex-direction:column;gap:2px;">
          <div id="paint-fg" style="width:24px;height:20px;background:#000;border:2px solid #fff;box-shadow:1px 1px 0 #000;"></div>
          <div id="paint-bg" style="width:24px;height:20px;background:#fff;border:2px solid #fff;box-shadow:1px 1px 0 #000;margin-top:-8px;margin-left:6px;"></div>
        </div>
        <div style="margin-left:12px;font-size:10px;color:#333;">
          <div id="paint-coords">Cursor: 0, 0</div>
        </div>
      </div>
    `
  }
};

function skillBar(name, value) {
  return `
    <div class="skill-item">
      <div class="skill-name">${name}</div>
      <div class="skill-bar-bg">
        <div class="skill-bar-fill" style="width:${value}%"></div>
      </div>
      <div class="skill-pct">${value}%</div>
    </div>
  `;
}

function openProjectLink(name) {
  // Could open a sub-window or browser link
  console.log('Opening project:', name);
}

function sendContactForm(btn) {
  const form = btn.closest('.xp-content') || btn.closest('.ie-content');
  const original = btn.textContent;
  btn.textContent = '✅ Sent!';
  btn.style.background = 'linear-gradient(to bottom,#3C8C23,#2A6A18)';
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
  }, 2500);
}

function setPaintColor(color) {
  document.getElementById('paint-fg').style.background = color;
}

// Init paint canvas after it's in the DOM
function initPaintCanvas() {
  const canvas = document.getElementById('paint-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let drawing = false;
  let color = '#000';
  let px = 0, py = 0;

  const rect = () => canvas.getBoundingClientRect();

  canvas.addEventListener('mousedown', e => {
    drawing = true;
    const r = rect();
    px = e.clientX - r.left;
    py = e.clientY - r.top;
    ctx.beginPath();
    ctx.arc(px, py, 2, 0, Math.PI * 2);
    ctx.fillStyle = document.getElementById('paint-fg')?.style.background || '#000';
    ctx.fill();
  });

  canvas.addEventListener('mousemove', e => {
    const r = rect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const coordEl = document.getElementById('paint-coords');
    if (coordEl) coordEl.textContent = `Cursor: ${Math.round(x)}, ${Math.round(y)}`;
    if (!drawing) return;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(x, y);
    ctx.strokeStyle = document.getElementById('paint-fg')?.style.background || '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
    px = x; py = y;
  });

  canvas.addEventListener('mouseup', () => drawing = false);
  canvas.addEventListener('mouseleave', () => drawing = false);
}
