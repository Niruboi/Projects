const express = require ('express');
const app = express();
const PORT = process.env.PORT | 4000 ; 
require('dotenv').config();

const dbconfig = require('./config/dbconfig');
const usersRoute = require('./routes/userRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');


app.use(express.json());

app.use("", usersRoute);
app.use("", inventoryRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});