// preload.js
window.addEventListener('DOMContentLoaded', () => {
    // You can access Node.js APIs here safely
    const os = require('node:os');
    document.getElementById('os-version').textContent = `OS Version: ${os.version()}`;
  });