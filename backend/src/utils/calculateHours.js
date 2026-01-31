// backend/src/utils/calculateHours.js
const calculateHours = (logs) => {
    let working = 0, idle = 0, breakTime = 0;
    for(let i=1;i<logs.length;i++){
        const diff = (new Date(logs[i].timestamp) - new Date(logs[i-1].timestamp)) / 1000; // seconds
        if(logs[i-1].status === 'WORKING') working += diff;
        else if(logs[i-1].status === 'IDLE') idle += diff;
        else breakTime += diff;
    }
    return {
        working: (working/3600).toFixed(2) + 'h',
        idle: (idle/3600).toFixed(2) + 'h',
        break: (breakTime/3600).toFixed(2) + 'h'
    };
};

module.exports = calculateHours;
