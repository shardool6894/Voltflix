const express = require('express')
const statRouter = express.Router();
const {stationsTracked,reportedToday,fixedThisWeek} = require('../controllers/stats');
statRouter.get('/tracked', stationsTracked);
statRouter.get('/reported-today', reportedToday);
statRouter.get('/fixed-this-week', fixedThisWeek);
module.exports = { statRouter }