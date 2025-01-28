/**********************************
  1) SETUP & MODEL DEFINITION
**********************************/
// Simple linear model with 3 inputs (miles, diet, flights).
const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [3] }));

// Compile the model
model.compile({
  optimizer: tf.train.sgd(0.001),
  loss: 'meanSquaredError'
});

// Fake training data (for demonstration)
const trainingInputs = tf.tensor2d([
  [10, 1, 0],
  [50, 2, 1],
  [2,  3, 0],
  [100,0, 2],
  [20, 1, 1]
], [5, 3]);

const trainingLabels = tf.tensor2d([
  [3],
  [8],
  [5],
  [15],
  [7]
], [5, 1]);

// Train model asynchronously
async function trainModel() {
  await model.fit(trainingInputs, trainingLabels, {
    epochs: 50,
    shuffle: true
  });
  console.log('Model training complete.');
}
trainModel();

/**********************************
  2) DOM ELEMENTS
**********************************/
const milesInput        = document.getElementById('miles');
const dietInput         = document.getElementById('diet');
const flightsInput      = document.getElementById('flights');
const calculateBtn      = document.getElementById('calculateBtn');
const resultDiv         = document.getElementById('result');
const suggestionsDiv    = document.getElementById('suggestions');
const benchmarkDiv      = document.getElementById('benchmarkComparison');

/**********************************
  3) GLOBAL VARIABLES & BENCHMARK
**********************************/
// Example benchmark: let's say 8 (units) is an "average" daily footprint
// (completely fictional—replace with a real data point if you want)
const AVERAGE_FOOTPRINT = 8; 

// We'll track the user's current footprint for charting
let currentFootprint = 0;

// Initialize Chart.js object (empty data for now)
let footprintChart;
function initChart() {
  const ctx = document.getElementById('footprintChart').getContext('2d');
  footprintChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Your Footprint', 'Average Footprint'],
      datasets: [{
        label: 'Carbon Usage (units)',
        data: [0, AVERAGE_FOOTPRINT], // Start with 0 for "Your Footprint"
        backgroundColor: ['#4caf50', '#f1c40f']
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
initChart();

/**********************************
  4) CALCULATION & PREDICTION
**********************************/
calculateBtn.addEventListener('click', async () => {
  const miles   = parseFloat(milesInput.value)   || 0;
  const diet    = parseFloat(dietInput.value)    || 0;
  const flights = parseFloat(flightsInput.value) || 0;

  // Convert to tensor
  const inputTensor = tf.tensor2d([[miles, diet, flights]]);

  // Predict
  const prediction  = model.predict(inputTensor);
  const predictedValue = (await prediction.data())[0].toFixed(2);
  currentFootprint = parseFloat(predictedValue);

  // Update UI
  resultDiv.textContent = `${predictedValue} (units)`;
  provideSuggestions(miles, diet, flights);
  compareToBenchmark(currentFootprint, AVERAGE_FOOTPRINT);
  updateChart(currentFootprint);

  // Cleanup
  inputTensor.dispose();
  prediction.dispose();
});

/**********************************
  5) HELPER FUNCTIONS
**********************************/
// A) Provide suggestions
function provideSuggestions(miles, diet, flights) {
  const tips = [];
  if (miles > 30) {
    tips.push('Consider carpooling, public transit, or an EV for commuting.');
  }
  if (diet > 1) {
    tips.push('Try reducing meat-based meals; incorporate more plant-based options.');
  }
  if (flights > 0) {
    tips.push('Plan travel strategically or offset flight emissions.');
  }

  if (tips.length === 0) {
    suggestionsDiv.textContent = 'Great job! You’re keeping your carbon footprint fairly low.';
  } else {
    suggestionsDiv.innerHTML = 'Suggestions:<br>- ' + tips.join('<br>- ');
  }
}

// B) Compare with Benchmark
function compareToBenchmark(userVal, avgVal) {
  const diff = userVal - avgVal;
  if (diff > 0) {
    benchmarkDiv.textContent = 
      `You are about ${diff.toFixed(2)} units above the average. 
       Consider taking additional steps to reduce your footprint.`;
  } else if (diff < 0) {
    benchmarkDiv.textContent = 
      `You are about ${Math.abs(diff).toFixed(2)} units below the average. Keep up the good work!`;
  } else {
    benchmarkDiv.textContent = 
      `You’re exactly on the average footprint! A good place to start improving further.`;
  }
}

// C) Update Chart
function updateChart(userVal) {
  // footprintChart.data.datasets[0].data = [userVal, AVERAGE_FOOTPRINT];
  footprintChart.data.datasets[0].data[0] = userVal;
  footprintChart.data.datasets[0].data[1] = AVERAGE_FOOTPRINT;
  footprintChart.update();
}
