var os = require('os');

module.exports = {};

const getCPUUsage = (callback) => {

    var stats1 = getCpuValues();
    var startIdle = stats1.idle;
    var startTotal = stats1.total;

    setTimeout(() => {
        var stats2 = getCpuValues();
        var endIdle = stats2.idle;
        var endTotal = stats2.total;

        var idle = endIdle - startIdle;
        var total = endTotal - startTotal;
        var perc = idle / total;

        callback((1 - perc));

    }, 500);
}

let getCpuValues = () => {
    var cpus = os.cpus();

    var user = 0;
    var nice = 0;
    var sys = 0;
    var idle = 0;
    var irq = 0;
    var total = 0;

    for (var cpu in cpus) {
        if (!cpus.hasOwnProperty(cpu)) continue;
        user += cpus[cpu].times.user;
        nice += cpus[cpu].times.nice;
        sys += cpus[cpu].times.sys;
        irq += cpus[cpu].times.irq;
        idle += cpus[cpu].times.idle;
    }

    var total = user + nice + sys + idle + irq;

    return {
        'idle': idle,
        'total': total
    };
}

module.exports.getCPUUsage = getCPUUsage;