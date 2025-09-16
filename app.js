import activitiesRouter from "./routes/activities.js";
import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/activities', activitiesRouter);

app.use(({ res }) => {
res.status(404).json(`Couldn't find the resource you were looking for. Please try another URL.`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});