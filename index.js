const { app, BrowserWindow, shell } = require('electron')
const path = require('path');

const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.131 Safari/537.36';

let window;

const isFirstInstance = app.requestSingleInstanceLock();

if (!isFirstInstance) {
  app.quit();
  return;
}

app.on('second-instance', () => {
  if (window) {
    if (window.isMinimized()) { window.restore(); }
    window.focus();
  }
});

function createWindow() {
  window = new BrowserWindow({
    width: 1024,
    height: 768,
    title: 'WhatsApp',
    icon: path.join(__dirname, 'assets/WhatsApp-icon.png'),
    webPreferences: { devTools: false }
  });

  window.setMenuBarVisibility(false);
  window.on('closed', () => window = null);
  window.webContents.on('new-window', (event, url) => {
    shell.openExternal(url);
    event.preventDefault();
  });
  
  window.loadURL('https://web.whatsapp.com/', { userAgent });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => app.quit());
