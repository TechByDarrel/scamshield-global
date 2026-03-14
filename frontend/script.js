// Grab the form and result box
const form = document.getElementById('verifyForm');
const resultBox = document.getElementById('result');

// Listen for form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // stop page refresh

  // Get the input value
  const inputValue = form.querySelector('input').value.trim();

  if (!inputValue) {
    resultBox.textContent = "Please enter a business name or phone number.";
    resultBox.style.color = "red";
    return;
  }

  // Show loading message
  resultBox.textContent = "Verifying... please wait.";
  resultBox.style.color = "black";

  try {
    // Call backend API (we’ll build this route in Node.js soon)
    const response = await fetch(`http://localhost:5000/verify?query=${encodeURIComponent(inputValue)}`);
    const data = await response.json();

    // Display result
    if (data.status === "verified") {
      resultBox.textContent = `✅ Verified: ${data.message}`;
      resultBox.style.color = "green";
    } else if (data.status === "scam") {
      resultBox.textContent = `⚠️ Scam Alert: ${data.message}`;
      resultBox.style.color = "red";
    } else {
      resultBox.textContent = `❓ Not Found: ${data.message}`;
      resultBox.style.color = "orange";
    }
  } catch (error) {
    resultBox.textContent = "Error connecting to server.";
    resultBox.style.color = "red";
    console.error(error);
  }
}); 
const reportForm = document.getElementById('reportForm');
const reportResult = document.getElementById('reportResult');

reportForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const entity = reportForm.querySelector('input').value.trim();
  const description = reportForm.querySelector('textarea').value.trim();

  if (!entity || !description) {
    reportResult.textContent = "Please fill in all fields.";
    reportResult.style.color = "red";
    return;
  }

  reportResult.textContent = "Submitting report...";
  reportResult.style.color = "black";

  try {
    const response = await fetch('http://localhost:5000/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entity, description })
    });

    const data = await response.json();
    reportResult.textContent = data.message;
    reportResult.style.color = "green";
  } catch (error) {
    reportResult.textContent = "Error submitting report.";
    reportResult.style.color = "red";
    console.error(error);
  }
}); 