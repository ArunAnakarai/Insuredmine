const os = require('os');
const { exec } = require('child_process');

function getCpuLoad() {
  const cpus = os.cpus();
  let idle = 0, total = 0;

  cpus.forEach(cpu => {
    for (const type in cpu.times) {
      total += cpu.times[type];
    }
    idle += cpu.times.idle;
  });

  const idleAvg = idle / cpus.length;
  const totalAvg = total / cpus.length;

  return 1 - idleAvg / totalAvg; // returns value like 0.68
}

setInterval(() => {
  const load = getCpuLoad();
  const percentage = Math.round(load * 100);
  console.log(`CPU Load: ${percentage}%`);

  if (percentage >= 70) {
    console.log('CPU usage exceeded 70%, restarting server...');
    
    // If using PM2
    exec('pm2 restart your-app-name', (err, stdout, stderr) => {
      if (err) {
        console.error('Error restarting:', err.message);
        return;
      }
      console.log('Restarted via PM2:', stdout);
    });
  }
}, 10000); // check every 10s
