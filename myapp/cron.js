const cron = require('node-cron');
const { DBWebServer } = require('./models');

// Function to generate random values
function getRandomValue(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to generate a timestamp string
function getTimestamp() {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

// Simulator function to create new records
async function createSimulatedData() {
  try {
    const variables = [
      { name: 'Temperature', min: 20, max: 30 },
      { name: 'Pressure', min: 1, max: 5 },
      { name: 'Flow', min: 0, max: 100 },
      { name: 'Level', min: 0, max: 10 }
    ];

    for (const variable of variables) {
      await DBWebServer.create({
        name: `${variable.name}_${getTimestamp()}`,
        dataType: 'Real',
        offset: getRandomValue(0, 10).toFixed(1),
        startValue: getRandomValue(variable.min, variable.max).toFixed(1),
        retain: false,
        accessible: true,
        write: true,
        visibleIn: true,
        separate: false
      });
    }
    console.log('Simulated data created at:', new Date());
  } catch (error) {
    console.error('Error creating simulated data:', error);
  }
}

// Schedule the job to run every 2 seconds
cron.schedule('*/2 * * * * *', createSimulatedData);