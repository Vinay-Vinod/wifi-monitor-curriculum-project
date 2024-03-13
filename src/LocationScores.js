import { useEffect, useState } from "react";

const LocationScores = () => {
    const [scores, setScores] = useState({});
  
    useEffect(() => {
        // Fetch user submissions and aggregate scores
        fetchUserSubmissions().then(userSubmissions => {
            const aggregatedScores = aggregateScores(userSubmissions);
            setScores(aggregatedScores);
        }).catch(error => {
            console.error("Failed to fetch user submissions:", error);
        });
    }, [scores]); // Empty dependency array means this effect runs once on mount
  
  
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
  
    // Function to aggregate scores
    function aggregateScores(userSubmissions) {
      const scores = {}; // Store location as key and array of ratings as value
      userSubmissions = userSubmissions.results
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
  
    return (
        <div>
            <h2>Location WiFi Scores</h2>
            { <ul>
                {Object.entries(scores).map(([location, score]) => (
                    <li key={location}>{location}: {score.toFixed(2)}</li> // Using toFixed(2) to format the score
                ))}
            </ul> }
        </div>
    );
  };
  
  
  
  export default LocationScores;