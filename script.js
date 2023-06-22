// Create a function to convert the data to a downloadable file
function downloadData(data, filename) {
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

// Function to log the data and initiate the download
function logAndDownloadData() {
  // Create an object to store the logged data
  const loggedData = {};

  // Log the browser information
  loggedData.browserInfo = {
    userAgent: navigator.userAgent,
    appName: navigator.appName,
    appVersion: navigator.appVersion,
    platform: navigator.platform,
    vendor: navigator.vendor
  };

  // Log the device information
  loggedData.deviceInfo = {
    deviceType: /Mobile|Tablet|iPad|iPhone|Android/.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
    deviceModel: navigator.userAgent
  };

  // Log the geolocation
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      loggedData.geolocation = {
        latitude: latitude,
        longitude: longitude
      };

      // Get the IP address using a third-party API
      fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(ipData => {
          const ipAddress = ipData.ip;
          loggedData.ipAddress = ipAddress;
          console.log('IP Address:', ipAddress);

          // Get the battery level
          const batteryPromise = navigator.getBattery ? navigator.getBattery() : Promise.resolve({ level: 'N/A' });
          batteryPromise
            .then(batteryData => {
              const batteryLevel = batteryData.level;
              loggedData.batteryLevel = batteryLevel;
              console.log('Battery Level:', batteryLevel);

              // Convert the logged data to a string
              const jsonData = JSON.stringify(loggedData, null, 2);

              // Download the data as a file
              downloadData(jsonData, 'logged_data.json');
            })
            .catch(error => {
              console.log('Failed to retrieve battery level:', error);
            });
        })
        .catch(error => {
          console.log('Failed to retrieve IP Address:', error);
        });
    },
    error => {
      console.log('Geolocation error:', error);
    }
  );
}

// Add an event listener to the download button
const downloadButton = document.getElementById('downloadButton');
downloadButton.addEventListener('click', logAndDownloadData);
