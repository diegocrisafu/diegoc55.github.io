// script.js

// Step 1: Define our model
// For simplicity, let's treat it like a linear regression with 3 inputs:
//   - x1: miles driven
//   - x2: daily meat meals
//   - x3: monthly flights
// We'll produce a single output: "estimated carbon usage" (in hypothetical units).

// y = w1*x1 + w2*x2 + w3*x3 + b
const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [3] }));

// Compile model
model.compile({
  optimizer: tf.train.sgd(0.001), // simple gradient descent
  loss: 'meanSquaredError'
});

// Predefined (fake) training data
// Let's assume some arbitrary numbers for demonstration
const trainingInputs = tf.tensor2d([
  [10, 1, 0], // 10 miles, 1 meal, 0 flights
  [50, 2, 1],
  [2,  3, 0],
  [100,0, 2],
  [20, 1, 1],
], [5, 3]);

// Estimated outputs (totally made up!)
const trainingLabels = tf.tensor2d([
  [3],
  [8],
  [5],
  [15],
  [7]
], [5, 1]);

// (Optional) Asynchronously train the model to make it a bit more “ML-like”
async function trainModel() {
  // Train the model
  const epochs = 50;
  await model.fit(trainingInputs, trainingLabels, {
    epochs,
    shuffle: true
  });
  console.log(`Training complete after ${epochs} epochs.`);
}

trainModel();

// Step 2: Hook up UI
const calculateBtn = document.getElementById('calculateBtn');
const milesInput = document.getElementById('miles');
const dietInput = document.getElementById('diet');
const flightsInput = document.getElementById('flights');
const resultDiv = document.getElementById('result');
const suggestionsDiv = document.getElementById('suggestions');

calculateBtn.addEventListener('click', async () => {
  const miles = parseFloat(milesInput.value) || 0;
  const diet = parseFloat(dietInput.value) || 0;
  const flights = parseFloat(flightsInput.value) || 0;

  // Convert to a 2D tensor: [ [miles, diet, flights] ]
  const inputTensor = tf.tensor2d([[miles, diet, flights]]);

  // Predict
  const prediction = model.predict(inputTensor);
  const predictedValue = (await prediction.data())[0].toFixed(2);

  resultDiv.textContent = predictedValue + " (units)";

  // Provide suggestions (very basic logic)
  const suggestions = [];
  if (miles > 30) {
    suggestions.push("Consider carpooling, public transit, or an EV for commuting.");
  }
  if (diet > 1) {
    suggestions.push("Try reducing meat-based meals; incorporate more plant-based options.");
  }
  if (flights > 0) {
    suggestions.push("Plan travel strategically or offset flight emissions.");
  }

  if (suggestions.length === 0) {
    suggestionsDiv.textContent = "You're doing great on minimizing your daily carbon footprint. Keep it up!";
  } else {
    suggestionsDiv.innerHTML = "Suggestions:<br>- " + suggestions.join("<br>- ");
  }

  inputTensor.dispose();
  prediction.dispose();
});
