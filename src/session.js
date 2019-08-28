const { session } = require('electron');

function clearServiceWorkers() {
  const ses = session.defaultSession;
  ses.flushStorageData();
  ses.clearStorageData({ storages: ['serviceworkers'] });
}

module.exports = { clearServiceWorkers };