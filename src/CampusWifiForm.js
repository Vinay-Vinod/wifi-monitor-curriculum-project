import React, { useState, useEffect} from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

// Define the component.
const CampusWifiForm = () => {
  // State hooks for managing the selected location and WiFi status.
  const [location, setLocation] = useState('');
  const [wifiStatus, setWifiStatus] = useState('');
  const users = []

  // Handler for changes to the location select input.
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  // Handler for changes to the WiFi status select input.
  const handleWifiStatusChange = (event) => {
    setWifiStatus(event.target.value);
  };

  // Handler for form submission, logs the selected location and WiFi status.
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior.

    console.log(`Location: ${location}, WiFi Status: ${wifiStatus}`);
    users.push({'location': location, rating: wifiStatus})

    const userSubmission = {
      location: location,
      rating: wifiStatus === 'Stable' ? 5 : 1, // Example: Convert 'Stable' to a high rating and 'Unstable' to a low rating
    };

    try {

      const response = await addUser(userSubmission);
      
      // Log the response to see if it works
      console.log("addUser response:", response);

      // You might want to clear the form or give user feedback here

    } catch (error) {
      // Log any errors that occur during the process
      console.error("Error adding user submission:", error);
    }


    const addURL = "https://localhost:2024/add-user"

    const test_users = [
        {
            location: 'Dwinelle',
            rating: 3,
        },
        {
            location: 'Wheeler',
            rating: 5,
        },
        {
            location: 'Moffitt',
            rating: 1,
        }
    ];


    async function addUser(user) {
        const response = await fetch("http://localhost:2024/add-user", {
            method: "POST",
            headers: {
                //"Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                //"mode" : "no-cors"
            },
            

            body: JSON.stringify(user)
        })

        .then(response => {
            if (!response.ok) {
                throw Error(`ERROR: cannot add user. User location: ${user.location}`);
            }
            return response.json();
        })
        
        return response
    };

    async function fetchUserSubmissions() {
        const response = await fetch("http://localhost:2024/get-users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => {
            if (!response.ok) {
                throw Error("ERROR: cannot fetch user submissions.");
            }
            return response.json();
        })
        
        return response;
    };


    async function deleteUser(id) {
        const response = await fetch(`http://localhost:2024/delete-user/?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => {
            if (!response.ok) {
                throw Error(`ERROR: cannot delete user with ID: ${id}`);
            }
            return response.json();
        })
        
        return response;
    }

    function aggregateScores(userSubmissions) {
        const scores = {}; // Store location as key and array of ratings as value
        userSubmissions.forEach(submission => {
            if (!scores[submission.location]) {
                scores[submission.location] = [];
            }
            scores[submission.location].push(submission.rating);
        });
    
        const aggregateScores = {};
        Object.keys(scores).forEach(location => {
            const ratings = scores[location];
            const averageRating = ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
            aggregateScores[location] = averageRating;
        });
    
        return aggregateScores;
    }

    

  };

  

  // Render the form with two dropdowns for location and WiFi status, and a submit button.
  return (
    <form onSubmit={handleSubmit}>
      {/* Location selection dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="location-select-label">Where are you located?</InputLabel>
        <Select
          labelId="location-select-label"
          id="location-select"
          value={location}
          label="Where are you located?"
          onChange={handleLocationChange}
        >
          <MenuItem value="ASUC Student Union">ASUC Student Union</MenuItem>
          <MenuItem value="East Asian Library">East Asian Library</MenuItem>
          <MenuItem value="Moffitt Library">Moffitt Library</MenuItem>
          <MenuItem value="Dwinelle">Dwinelle</MenuItem>
        </Select>
      </FormControl>

      {/* WiFi status selection dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="wifi-status-select-label">How is the campus WIFI at your current location?</InputLabel>
        <Select
          labelId="wifi-status-select-label"
          id="wifi-status-select"
          value={wifiStatus}
          label="How is the campus WIFI at your current location?"
          onChange={handleWifiStatusChange}
        >
          <MenuItem value="Stable">Stable</MenuItem>
          <MenuItem value="Unstable">Unstable</MenuItem>
        </Select>
      </FormControl>

      {/* Submit button */}
      <Button variant="contained" type="submit" style={{ marginTop: '20px' }}>
        SUBMIT FEEDBACK
      </Button>

      
      
    </form>
  );
};


export default CampusWifiForm;