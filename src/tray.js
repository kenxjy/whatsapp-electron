const { Tray, Menu, MenuItem } = require('electron');
const path = require('path');

function createTrayIconFor(window, app) {
  const tray = new Tray(path.join(__dirname, '../assets/512x512.png'));

  const showWindowMenuItem = new MenuItem({
    label: 'Show Window', click: () => {
      if (window.isVisible()) {
        window.focus();
      } else {
        window.show();
      }
    }
  });

  const quitAppMenuItem = new MenuItem({
    label: 'Quit', click: () => {
      window.destroy();
      app.quit();
    }
  });

  const contextMenu = Menu.buildFromTemplate([
    showWindowMenuItem,
    { type: 'separator' },
    { type: 'separator' },
    quitAppMenuItem
  ]);

  tray.setContextMenu(contextMenu);

  return tray
}

module.exports = { createTrayIconFor };