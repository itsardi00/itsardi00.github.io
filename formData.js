// Create a function to convert the form data to a downloadable file
function downloadFormData(data, filename) {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
  
    document.body.appendChild(a);
    a.click();
  
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  // Function to handle form submission
  function handleFormSubmit(event) {
    event.preventDefault(); // Prevent form submission from reloading the page
  
    const form = document.getElementById('dataForm');
    const formData = new FormData(form);
  
    // Convert the form data to a JSON object
    const jsonData = JSON.stringify(Object.fromEntries(formData), null, 2);
  
    // Download the form data as a file
    downloadFormData(jsonData, 'form_data.json');
  }
  
  // Add an event listener to the form submit button
  const submitButton = document.querySelector('input[type="submit"]');
  submitButton.addEventListener('click', handleFormSubmit);
  