import activities from "./db/mock-activities.js";
import express from "express";
const app = express();
app.use(express.json());
const port = 3000;


app.listen(port, () => { // start server on specified port
    console.log(`Example app listening on port ${port}`); // log a message to confirm the server is running
});


// GET method
app.get('/', (req, res) => { // define a GET route for root URL, with a callback
    res.json(activities); // response sent by the server to the client
});

app.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const activity = activities.find(activity => activity.id === id);
    res.json({activity});
});


// POST method
app.post("/", (req, res) => {
    console.log("dans post")
    const max_id = activities.length > 0
        ? Math.max(...activities.map(a => a.id)): 0;
    console.log("max_id : " + max_id)
    const {name, starting_date, duration} = req.body;
    const id = max_id + 1;
    const newActivity={id, name, starting_date, duration};
    activities.push(newActivity);
    const message = `The activity ${newActivity.name} was created correctly !`;
    res.json({message : message, contact : newActivity});
});


// PUT method
app.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, starting_date, duration } = req.body;
    const index = activities.findIndex(activity => activity.id === id);
    activities[index] = { id, name, starting_date, duration };
    res.json({ message: 'Activity updated', activity: activities[index] });
});


// DELETE method
app.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = activities.findIndex(contact => contact.id === id);
    activities.splice(index, 1);
    res.json({ message: 'Activity deleted' });
});