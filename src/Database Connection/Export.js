import axios from 'axios';

function Export(test, comment) {
  axios.post('http://localhost:8080/signup', { test, comment })
    .then(() => {
      console.log('Data uploaded successfully');
      // Optionally clear the input values here if they are part of a form or other state
    })
    .catch((error) => {
      console.error('There was an error uploading the data:', error);
    });
}

function ExportGame(test, comment) {
    axios.post('http://localhost:8080/signup', { test, comment })
      .then(() => {
        console.log('Data uploaded successfully');
        // Optionally clear the input values here if they are part of a form or other state
      })
      .catch((error) => {
        console.error('There was an error uploading the data:', error);
      });
  }

  function ExportRound(test, comment) {
    axios.post('http://localhost:8080/signup', { test, comment })
      .then(() => {
        console.log('Data uploaded successfully');
        // Optionally clear the input values here if they are part of a form or other state
      })
      .catch((error) => {
        console.error('There was an error uploading the data:', error);
      });
  }

  function ExportUsers(test, comment) {
    axios.post('http://localhost:8080/signup', { test, comment })
      .then(() => {
        console.log('Data uploaded successfully');
        // Optionally clear the input values here if they are part of a form or other state
      })
      .catch((error) => {
        console.error('There was an error uploading the data:', error);
      });
  }
