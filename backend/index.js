const express = require("express");
const cors = require("cors");
const sequelize = require('./config/dbConnect');
const Department = require("./models/Department.model");
const User = require("./models/User.model");
const Slot = require("./models/Slot.model");
const Appointment = require("./models/Appointments.model");
const app = express();
app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is Runnnnnnnnnnnnnnnnnnnnnnnnnnning......")
})


app.get('/departments', async (req, res) => {
    try {
        const departments = await Department.findAll();
        return res.status(201).send({ error: false, items: departments })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: true, message: error })
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(201).send({ error: false, items: users })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: true, message: error })
    }
})

app.get('/slots', async (req, res) => {
    try {
        const slots = await Slot.findAll();
        return res.status(201).send({ error: false, items: slots })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: true, message: error })
    }
})


app.get('/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        return res.status(201).send({ error: false, items: appointments })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: true, message: error })
    }
})

app.listen(8200, async () => {
    await sequelize.authenticate();
    console.log("Connected to DB")
    console.log("server is running on port 8200")
})