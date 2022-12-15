const express = require('express');
//const sequelize = require('sequelize');
const routes = require('./routes');
//Imported sequelize connection
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3006;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

//Synced sequelize models to the database, then turned on the server
sequelize.sync({force: true}).then(() => {
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
