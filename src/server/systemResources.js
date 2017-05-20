const os = require('os');
var cpu = {"cpu": os.loadavg()[0]}; // method returns an array containing the 1, 5, and 15 minute load averages.
var memory = {"memory": os.totalmem()};

function getSystemResources() {
    cpu.cpu = os.loadavg()[0];
    memory.memory = os.totalmem();
    console.log(cpu, memory);
    setTimeout(getSystemResources, 0.15 * 1000);
}





