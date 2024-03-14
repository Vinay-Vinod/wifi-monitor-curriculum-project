export default function myApp() {
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
    
    

    

    

    const user = addUser(test_users[0]).then(response => {
        console.log(response)
    })

    return (
        <h1>MapPage</h1>


        
    )
}