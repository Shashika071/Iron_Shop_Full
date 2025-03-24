import {assignEmployees, getAssignedEmployees} from '../controllers/assignEmployeesController.js';

import express from "express";

const assignRouter = express.Router();

assignRouter.post("/assign", assignEmployees);
assignRouter.post("/assigned", getAssignedEmployees);


export default assignRouter;
