const { BrowserWindow, shell } = require('electron');
const path = require('path');

const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.131 Safari/537.36';

function loadWhatsApp() {
  const window = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: path.join(__dirname, '../assets/512x512.png'),
    webPreferences: { 
      // devTools: false,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  window.setMenuBarVisibility(false);

  window.on('close', (event) => { 
    event.preventDefault();
    window.hide();
  });

  window.webContents.on('new-window', (event, url) => {
    shell.openExternal(url);
    event.preventDefault();
  });

  window.loadURL('https://web.whatsapp.com/', { userAgent });

  return window;
}

module.exports = { loadWhatsApp };
