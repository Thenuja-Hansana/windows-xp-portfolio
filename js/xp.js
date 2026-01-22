/* ============================================================
   Windows XP Portfolio — Window Manager & Core Logic (xp.js)
   ============================================================ */

(function () {
    'use strict';

    /* ===========================================================
       STATE
    =========================================================== */
    let windowStack = [];       // All open window objects { id, el, tbEl, minimized, maximized, savedBounds }
    let zCounter = 200;
    let selectedIcon = null;
    let startMenuOpen = false;
    let allProgramsOpen = false;
    let contextMenuTarget = null;
    let lastIconClick = {};     // { id, time } for double-click detection

    /* ===========================================================
       BOOT SCREEN
    =========================================================== */

    function initBoot() {
        const boot = document.getElementById('boot-screen');
        if (!boot) return;

        // Generate progress blocks
        const track = boot.querySelector('.boot-progress-track');
        if (track) {
            const blocksEl = track.querySelector('.boot-progress-blocks');
            if (blocksEl) {
                for (let i = 0; i < 8; i++) {
                    const b = document.createElement('div');
                    b.className = 'boot-progress-block';
                    blocksEl.appendChild(b);
                }
            }
        }

        setTimeout(() => {
            boot.classList.add('fade-out');
            setTimeout(() => {
                boot.style.display = 'none';
                showDesktop();
            }, 500);
        }, 3500);
    }

    function showDesktop() {
        const desktop = document.getElementById('desktop');
        if (desktop) desktop.classList.add('visible');
        startClock();
        showWelcomeBalloon();
    }

    /* ===========================================================
       CLOCK
    =========================================================== */

    function startClock() {
        function tick() {
            const now = new Date();
            const h = now.getHours();
            const m = String(now.getMinutes()).padStart(2, '0');
            const ampm = h >= 12 ? 'PM' : 'AM';
            const h12 = h % 12 || 12;
            const timeEl = document.getElementById('clock-time');
            const dateEl = document.getElementById('clock-date');
            if (timeEl) timeEl.textContent = `${h12}:${m} ${ampm}`;
            if (dateEl) {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                dateEl.textContent = `${days[now.getDay()]} ${months[now.getMonth()]} ${now.getDate()}`;
            }
        }
        tick();
        setInterval(tick, 1000);
    }

    /* ===========================================================
       WELCOME BALLOON
    =========================================================== */

    function showWelcomeBalloon() {
        const balloon = document.createElement('div');
        balloon.className = 'tray-balloon';
        balloon.innerHTML = `
      <div style="font-weight:bold;margin-bottom:4px;">🖥️ Welcome!</div>
      <div style="font-size:10px;">Double-click desktop icons to explore my portfolio. Click <strong>Start</strong> to see all options.</div>
    `;
        document.body.appendChild(balloon);
        setTimeout(() => balloon.style.opacity = '0', 4000);
        setTimeout(() => balloon.remove(), 4500);
        balloon.style.transition = 'opacity 0.5s';
    }

    /* ===========================================================
       DESKTOP ICONS — click / double-click
    =========================================================== */

    function initIcons() {
        document.querySelectorAll('.desktop-icon').forEach(icon => {
            const id = icon.dataset.app;

            icon.addEventListener('click', e => {
                e.stopPropagation();
                // Deselect old
                if (selectedIcon && selectedIcon !== icon) selectedIcon.classList.remove('selected');
                icon.classList.toggle('selected');
                selectedIcon = icon.classList.contains('selected') ? icon : null;

                // Double-click via timing
                const now = Date.now();
                if (lastIconClick.id === id && (now - lastIconClick.time) < 500) {
                    lastIconClick = {};
                    openApp(id);
                } else {
                    lastIconClick = { id, time: now };
                }
            });
        });

        // Deselect on desktop click
        document.getElementById('desktop').addEventListener('click', e => {
            if (!e.target.closest('.desktop-icon') && !e.target.closest('#taskbar') && !e.target.closest('#start-menu')) {
                if (selectedIcon) selectedIcon.classList.remove('selected');
                selectedIcon = null;
            }
            closeStartMenu();
            closeContextMenu();
        });
    }

    /* ===========================================================
       OPEN APPLICATION WINDOW
    =========================================================== */

    function openApp(appId) {
        // If window already exists, bring to front / restore
        const existing = windowStack.find(w => w.appId === appId && !w.closed);
        if (existing) {
            if (existing.minimized) restoreWindow(existing);
            bringToFront(existing);
            return;
        }

        const app = APPS[appId];
        if (!app) return;

        const win = createWindow(app);
        win.appId = appId;
        windowStack.push(win);
        document.getElementById('desktop').appendChild(win.el);
        bringToFront(win);

        // Offset windows so they don't perfectly stack
        const idx = windowStack.filter(w => !w.closed).length;
        win.el.style.left = (80 + (idx * 30) % 200) + 'px';
        win.el.style.top = (60 + (idx * 20) % 150) + 'px';

        addTaskbarButton(win);
        win.el.classList.add('opening');
        setTimeout(() => win.el.classList.remove('opening'), 200);

        // Init special apps
        if (appId === 'paint') {
            setTimeout(initPaintCanvas, 100);
        }
    }

    /* ===========================================================
       CREATE WINDOW ELEMENT
    =========================================================== */

    function createWindow(app) {
        const w = app.width || 500;
        const h = app.height || 380;

        const el = document.createElement('div');
        el.className = 'xp-window';
        el.style.width = w + 'px';
        el.style.height = h + 'px';
        el.style.left = '100px';
        el.style.top = '60px';

        el.innerHTML = `
      <div class="xp-titlebar" data-drag="true">
        <div class="xp-titlebar-icon">${app.icon}</div>
        <div class="xp-titlebar-title">${app.title}</div>
        <div class="xp-controls">
          <div class="xp-btn xp-btn-minimize" title="Minimize"></div>
          <div class="xp-btn xp-btn-maximize" title="Maximize"></div>
          <div class="xp-btn xp-btn-close" title="Close"></div>
        </div>
      </div>
      <div class="xp-body">${app.content()}</div>
      <div class="resize-handle resize-n"></div>
      <div class="resize-handle resize-s"></div>
      <div class="resize-handle resize-e"></div>
      <div class="resize-handle resize-w"></div>
      <div class="resize-handle resize-ne"></div>
      <div class="resize-handle resize-nw"></div>
      <div class="resize-handle resize-se"></div>
      <div class="resize-handle resize-sw"></div>
    `;

        const win = { el, appId: app.id, closed: false, minimized: false, maximized: false, savedBounds: null, tbEl: null };

        // Title bar drag
        makeDraggable(el, el.querySelector('.xp-titlebar'));

        // Resize
        makeResizable(el, win);

        // Controls
        el.querySelector('.xp-btn-minimize').addEventListener('click', e => { e.stopPropagation(); minimizeWindow(win); });
        el.querySelector('.xp-btn-maximize').addEventListener('click', e => { e.stopPropagation(); toggleMaximize(win); });
        el.querySelector('.xp-btn-close').addEventListener('click', e => { e.stopPropagation(); closeWindow(win); });

        // Bring to front on click
        el.addEventListener('mousedown', () => bringToFront(win), true);

        // Double-click title to toggle maximize
        el.querySelector('.xp-titlebar').addEventListener('dblclick', () => toggleMaximize(win));

        return win;
    }

    /* ===========================================================
       WINDOW MANAGEMENT
    =========================================================== */

    function bringToFront(win) {
        zCounter++;
        win.el.style.zIndex = zCounter;
        // Set all others inactive
        windowStack.forEach(w => {
            if (!w.closed && !w.minimized) {
                const active = w === win;
                w.el.classList.toggle('inactive', !active);
                if (w.tbEl) w.tbEl.classList.toggle('active', active);
            }
        });
    }

    function minimizeWindow(win) {
        win.minimized = true;
        win.el.classList.add('minimizing');
        setTimeout(() => {
            win.el.style.display = 'none';
            win.el.classList.remove('minimizing');
        }, 150);
        win.el.classList.add('inactive');
        if (win.tbEl) win.tbEl.classList.remove('active');
    }

    function restoreWindow(win) {
        win.minimized = false;
        win.el.style.display = 'flex';
        win.el.classList.add('opening');
        setTimeout(() => win.el.classList.remove('opening'), 200);
        bringToFront(win);
    }

    function toggleMaximize(win) {
        const taskbarH = 40;
        if (win.maximized) {
            // Restore
            const b = win.savedBounds;
            win.el.style.left = b.left;
            win.el.style.top = b.top;
            win.el.style.width = b.width;
            win.el.style.height = b.height;
            win.el.style.borderRadius = '';
            win.maximized = false;
            win.el.querySelector('.xp-btn-maximize')?.setAttribute('title', 'Maximize');
        } else {
            // Save bounds & maximize
            win.savedBounds = {
                left: win.el.style.left,
                top: win.el.style.top,
                width: win.el.style.width,
                height: win.el.style.height,
            };
            win.el.style.left = '0';
            win.el.style.top = '0';
            win.el.style.width = window.innerWidth + 'px';
            win.el.style.height = (window.innerHeight - taskbarH) + 'px';
            win.el.style.borderRadius = '0';
            win.maximized = true;
            win.el.querySelector('.xp-btn-maximize')?.setAttribute('title', 'Restore Down');
        }
    }

    function closeWindow(win) {
        win.closed = true;
        win.el.classList.add('minimizing');
        setTimeout(() => win.el.remove(), 150);
        if (win.tbEl) win.tbEl.remove();
        // Check if we need to activate another window
        const others = windowStack.filter(w => !w.closed && !w.minimized);
        if (others.length > 0) bringToFront(others[others.length - 1]);
    }

    /* ===========================================================
       TASKBAR BUTTONS
    =========================================================== */

    function addTaskbarButton(win) {
        const app = APPS[win.appId] || {};
        const tray = document.getElementById('taskbar-windows');
        const btn = document.createElement('div');
        btn.className = 'taskbar-btn active';
        btn.innerHTML = `<span class="tb-icon">${app.icon || '🪟'}</span><span class="tb-label">${app.title || 'Window'}</span>`;

        btn.addEventListener('click', () => {
            if (win.minimized) {
                restoreWindow(win);
            } else if (document.querySelector('.xp-window:not(.inactive)') === win.el) {
                minimizeWindow(win);
            } else {
                restoreWindow(win);
                bringToFront(win);
            }
        });

        tray.appendChild(btn);
        win.tbEl = btn;
    }

    /* ===========================================================
       DRAG
    =========================================================== */

    function makeDraggable(el, handle) {
        let ox = 0, oy = 0, startX = 0, startY = 0;

        handle.addEventListener('mousedown', e => {
            if (e.target.closest('.xp-controls')) return;
            if (e.target.closest('.xp-btn')) return;
            const win = windowStack.find(w => w.el === el);
            if (win?.maximized) return;
            e.preventDefault();
            startX = e.clientX;
            startY = e.clientY;
            const elRect = el.getBoundingClientRect();
            ox = elRect.left;
            oy = elRect.top;

            function onMove(e) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                let newX = ox + dx;
                let newY = oy + dy;
                // Clamp to screen
                const taskbarH = 40;
                newX = Math.max(-el.offsetWidth + 60, Math.min(newX, window.innerWidth - 60));
                newY = Math.max(0, Math.min(newY, window.innerHeight - taskbarH - 30));
                el.style.left = newX + 'px';
                el.style.top = newY + 'px';
            }

            function onUp() {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
            }

            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
        });
    }

    /* ===========================================================
       RESIZE
    =========================================================== */

    function makeResizable(el, win) {
        el.querySelectorAll('.resize-handle').forEach(handle => {
            handle.addEventListener('mousedown', e => {
                if (win.maximized) return;
                e.preventDefault();
                e.stopPropagation();

                const dir = [...handle.classList].find(c => c.startsWith('resize-') && c !== 'resize-handle').replace('resize-', '');
                const startX = e.clientX;
                const startY = e.clientY;
                const rect = el.getBoundingClientRect();
                const startW = rect.width;
                const startH = rect.height;
                const startLeft = rect.left;
                const startTop = rect.top;
                const minW = 200, minH = 120;

                function onMove(e) {
                    const dx = e.clientX - startX;
                    const dy = e.clientY - startY;
                    if (dir.includes('e')) el.style.width = Math.max(minW, startW + dx) + 'px';
                    if (dir.includes('s')) el.style.height = Math.max(minH, startH + dy) + 'px';
                    if (dir.includes('w')) {
                        const nw = Math.max(minW, startW - dx);
                        el.style.width = nw + 'px';
                        el.style.left = (startLeft + startW - nw) + 'px';
                    }
                    if (dir.includes('n')) {
                        const nh = Math.max(minH, startH - dy);
                        el.style.height = nh + 'px';
                        el.style.top = (startTop + startH - nh) + 'px';
                    }
                }

                function onUp() {
                    document.removeEventListener('mousemove', onMove);
                    document.removeEventListener('mouseup', onUp);
                }

                document.addEventListener('mousemove', onMove);
                document.addEventListener('mouseup', onUp);
            });
        });
    }

    /* ===========================================================
       START MENU
    =========================================================== */

    function initStartMenu() {
        const btn = document.getElementById('start-btn');
        const menu = document.getElementById('start-menu');
        if (!btn || !menu) return;

        btn.addEventListener('click', e => {
            e.stopPropagation();
            toggleStartMenu();
        });

        // All Programs
        const allProgs = menu.querySelector('.sm-all-programs');
        if (allProgs) {
            allProgs.addEventListener('click', e => {
                e.stopPropagation();
                toggleAllPrograms();
            });
        }

        // SM items that open apps
        menu.querySelectorAll('[data-app]').forEach(item => {
            item.addEventListener('click', () => {
                closeStartMenu();
                openApp(item.dataset.app);
            });
        });

        // Log off / Shut down
        const logoff = menu.querySelector('.sm-logoff');
        const shutdown = menu.querySelector('.sm-shutdown');
        if (logoff) logoff.addEventListener('click', () => { closeStartMenu(); showShutdownDialog('logoff'); });
        if (shutdown) shutdown.addEventListener('click', () => { closeStartMenu(); showShutdownDialog('shutdown'); });

        document.addEventListener('click', () => {
            closeStartMenu();
            closeAllPrograms();
        });
    }

    function toggleStartMenu() {
        startMenuOpen = !startMenuOpen;
        const menu = document.getElementById('start-menu');
        if (menu) menu.classList.toggle('open', startMenuOpen);
        if (!startMenuOpen) closeAllPrograms();
    }

    function closeStartMenu() {
        startMenuOpen = false;
        const menu = document.getElementById('start-menu');
        if (menu) menu.classList.remove('open');
        closeAllPrograms();
    }

    function toggleAllPrograms() {
        allProgramsOpen = !allProgramsOpen;
        const panel = document.getElementById('all-programs-panel');
        if (panel) panel.classList.toggle('open', allProgramsOpen);
    }

    function closeAllPrograms() {
        allProgramsOpen = false;
        const panel = document.getElementById('all-programs-panel');
        if (panel) panel.classList.remove('open');
    }

    /* ===========================================================
       CONTEXT MENU
    =========================================================== */

    function initContextMenu() {
        const desktop = document.getElementById('desktop');
        const ctx = document.getElementById('context-menu');
        if (!desktop || !ctx) return;

        desktop.addEventListener('contextmenu', e => {
            if (e.target.closest('.xp-window') || e.target.closest('#taskbar')) return;
            e.preventDefault();
            const x = Math.min(e.clientX, window.innerWidth - 170);
            const y = Math.min(e.clientY, window.innerHeight - ctx.offsetHeight - 10);
            ctx.style.left = x + 'px';
            ctx.style.top = y + 'px';
            ctx.classList.add('open');
        });

        document.addEventListener('click', () => closeContextMenu());
        document.addEventListener('contextmenu', () => closeContextMenu(), true);

        ctx.querySelectorAll('.ctx-item').forEach(item => {
            item.addEventListener('click', e => {
                e.stopPropagation();
                const action = item.dataset.action;
                handleContextAction(action);
                closeContextMenu();
            });
        });
    }

    function closeContextMenu() {
        const ctx = document.getElementById('context-menu');
        if (ctx) ctx.classList.remove('open');
    }

    function handleContextAction(action) {
        if (action === 'refresh') {
            // Blink desktop
            const d = document.getElementById('desktop');
            d.style.opacity = '0.7';
            setTimeout(() => d.style.opacity = '1', 150);
        } else if (action === 'arrange-name') {
            // nothing interactive needed
        } else if (action === 'properties') {
            openApp('mycomputer');
        } else if (action === 'new-folder') {
            // Easter egg
            showBalloon('📁 New folder created! (jk, this is a portfolio 😄)');
        }
    }

    /* ===========================================================
       SHUTDOWN DIALOG
    =========================================================== */

    function showShutdownDialog(mode) {
        const dialog = document.getElementById('shutdown-dialog');
        if (dialog) dialog.classList.add('open');
    }

    function initShutdownDialog() {
        const dialog = document.getElementById('shutdown-dialog');
        if (!dialog) return;

        dialog.querySelector('.sd-btn-cancel')?.addEventListener('click', () => dialog.classList.remove('open'));
        dialog.querySelector('.sd-btn-ok')?.addEventListener('click', () => {
            dialog.classList.remove('open');
            // Shutdown animation
            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed;inset:0;background:#000;z-index:99999;opacity:0;transition:opacity 1s;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;color:#fff;font-family:Arial;';
            overlay.innerHTML = '<div style="font-size:28px">Windows is shutting down...</div><div style="font-size:14px;opacity:0.6;">It is now safe to turn off your computer.</div>';
            document.body.appendChild(overlay);
            setTimeout(() => overlay.style.opacity = '1', 10);
            setTimeout(() => {
                overlay.innerHTML = '<div style="font-size:20px;color:#aaa;">It is now safe to turn off your computer.</div>';
            }, 2000);
        });

        dialog.querySelector('.sd-btn-restart')?.addEventListener('click', () => {
            dialog.classList.remove('open');
            // Restart = reload
            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed;inset:0;background:#000;z-index:99999;opacity:0;transition:opacity 1s;';
            document.body.appendChild(overlay);
            setTimeout(() => overlay.style.opacity = '1', 10);
            setTimeout(() => location.reload(), 1200);
        });
    }

    /* ===========================================================
       BALLOON HELPER
    =========================================================== */

    function showBalloon(msg) {
        const balloon = document.createElement('div');
        balloon.className = 'tray-balloon';
        balloon.textContent = msg;
        document.body.appendChild(balloon);
        setTimeout(() => { balloon.style.opacity = '0'; balloon.style.transition = 'opacity 0.5s'; }, 3000);
        setTimeout(() => balloon.remove(), 3600);
    }

    /* ===========================================================
       QUICK LAUNCH
    =========================================================== */

    function initQuickLaunch() {
        document.querySelectorAll('.ql-icon[data-app]').forEach(el => {
            el.addEventListener('click', () => openApp(el.dataset.app));
        });

        // Show Desktop button
        const showDesktopBtn = document.querySelector('.ql-icon[data-action="show-desktop"]');
        if (showDesktopBtn) {
            showDesktopBtn.addEventListener('click', () => {
                const visible = windowStack.filter(w => !w.closed && !w.minimized);
                if (visible.length > 0) {
                    visible.forEach(w => minimizeWindow(w));
                } else {
                    windowStack.filter(w => !w.closed && w.minimized).forEach(w => restoreWindow(w));
                }
            });
        }
    }

    /* ===========================================================
       TRAY ICONS
    =========================================================== */

    function initTray() {
        const vol = document.querySelector('.tray-volume');
        if (vol) {
            vol.addEventListener('click', () => showBalloon('🔊 Volume: 65% — Mute not implemented (this is a portfolio 😄)'));
        }
        const net = document.querySelector('.tray-network');
        if (net) {
            net.addEventListener('click', () => showBalloon('🌐 Connected to: Portfolio Network\nSpeed: ∞ Mbps'));
        }
        const sec = document.querySelector('.tray-security');
        if (sec) {
            sec.addEventListener('click', () => showBalloon('🛡️ Windows Security Center: All good!'));
        }
    }

    /* ===========================================================
       INIT
    =========================================================== */

    document.addEventListener('DOMContentLoaded', () => {
        initBoot();
        initIcons();
        initStartMenu();
        initContextMenu();
        initShutdownDialog();
        initQuickLaunch();
        initTray();
    });

    // Expose globally
    window.openApp = openApp;
    window.showBalloon = showBalloon;

})();
