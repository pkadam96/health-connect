const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const sequelize = require('./config/dbConnect');
const userRoutes = require('./routes/user.routes');
const doctorDetailsRoutes = require('./routes/userDetails.route')
const appointmentRoutes = require('./routes/appointment.routes');
const slotRoutes = require('./routes/slot.routes');
const departmentRoutes = require('./routes/department.route');
require('./models/index')

const app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Server is Running......")
})

app.use('/user', userRoutes);
app.use('/user', doctorDetailsRoutes);
app.use('/appointment', appointmentRoutes);
app.use('/slot', slotRoutes);
app.use('/department', departmentRoutes);

app.listen(8200, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})