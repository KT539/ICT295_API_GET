import express from 'express';
import activities from "./db/mock-activities.js"; // import the express module
const app = express(); // create an express app instance
const port = 3000; // define the server port

/*app.get('/', (req, res) => { // define a GET route for root URL, with a callback
    res.send('Hello World!'); // response sent by the server to the client
});

app.listen(port, () => { // start server on specified port
    console.log(`Example app listening on port ${port}`); // log a message to confirm the server is running
});*/


app.get('/', (req, res) => { // define a GET route for root URL, with a callback
    res.json(activities); // response sent by the server to the client
});

app.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const activity = activities.find(activity => activity.id === id);
    res.json({activity});
});

app.listen(port, () => { // start server on specified port
    console.log(`Example app listening on port ${port}`); // log a message to confirm the server is running
});

