import express from "express";
import { db }  from "../db/DB_connection.js";
import {isValidId, isValidStarting_date, isValidDuration} from "../helper.js";
import activities from "../db/mock-activities.js";

//Code made in case of success, we do not treat here the error case (id not existing for example)

const activitiesRouter = express.Router();

// GET method
activitiesRouter().get('/', async (req, res) => {
    try {
        const activities = await db.getAllActivities();
        res.json(activities);
    } catch (error) {
        res.status(500).json({error: error});
    }
});

activitiesRouter().get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (!isValidId(id)) {
            res.status(400).json({ error: `Invalid ID` });
        }
        const activity = await db.getActivityById(id);
        if (activity === undefined) {
            res.status(404).json({ error: `Activity not found` });
        } else {
        res.json(activity);
        }
    } catch (error) {
        res.status(500).json({error: error});
    }
});


// POST method
activitiesRouter.post("/", async (req, res) => {
    try {
        const max_id = activities.length > 0
            ? Math.max(...activities.map(a => a.id)): 0;
        const {name, starting_date, duration} = req.body;
        const id = max_id + 1;
        if (!isValidStarting_date(starting_date)) {
            res.status(400).json({ error: `Invalid starting date` });
        }
        if (isValidDuration(duration)) {
            res.status(400).json({ error: `Invalid duration` });
        }
        const newActivity= await db.createActivity({id, name, starting_date, duration});
        res.json({message: `The activity ${newActivity.name} was added successfully`, activity : newActivity });
    } catch (error) {
        res.status(500).json({error: error});
    }
});


// PUT method
activitiesRouter().put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, starting_date, duration } = req.body;
        const resUpdateActivityNb = await db.updateActivity(id, {name, starting_date, duration});
        if (resUpdateActivityNb === 0) {
            res.status(404).json({ error: `Activity not found` });
        } else {
            const updatedActivity = await db.getActivityById(id);
            res.json({message: `Activity updated`, activity : updatedActivity });
        }
    } catch (error) {
        res.status(500).json({error: error});
    }
});


// DELETE method
activitiesRouter().delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedActivity = await db.deleteActivity(id);
        if (deletedActivity.success) {
            res.json({message: `The activity ${deletedActivity.name} was deleted`});
        } else {
            res.status(404).json({ error: `Activity not found` });
        }
    } catch (error) {
        res.status(500).json({error: error});
    }
});


export default activitiesRouter;