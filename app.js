import activities from "./db/mock-activities.js";
import express from "express";
const app = express();
app.use(express.json());
const port = 3000;
import {db} from "./db/DB_connection.js"


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


// GET method
app.get('/', async (req, res) => {
    const activities = await db.getAllActivities();
    res.json(activities);
});

app.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const activity = await db.getActivityById(id);
    res.json({activity});
});


// POST method
app.post("/", async (req, res) => {
    console.log("dans post")
    const max_id = activities.length > 0
        ? Math.max(...activities.map(a => a.id)): 0;
    const {name, starting_date, duration} = req.body;
    const id = max_id + 1;
    const newActivity= await db.createActivity({id, name, starting_date, duration});
    res.json({message : `The activity ${newActivity.name} was created correctly !`, activity : newActivity});
});


// PUT method
app.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, starting_date, duration } = req.body;
    const updatedActivity = await db.updateActivity(id, {name, starting_date, duration });
    res.json({ message: 'Activity updated', activity: updatedActivity });
});


// DELETE method
app.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const deletedActivity = await db.deleteActivity(id);
    res.json({ message: 'Activity deleted', activity: deletedActivity });
});