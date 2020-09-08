import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import FileController from "./app/controllers/FileController";
import AppointmentController from "./app/controllers/AppointmentController";
import ScheduleController from "./app/controllers/ScheduleController";
import NotificationController from "./app/controllers/NotificationController";
import OrderController from "./app/controllers/OrderController";
import StockController from "./app/controllers/StockController";
import ClientController from "./app/controllers/ClientController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);

routes.put("/users", UserController.update);

routes.get("/appointments", AppointmentController.index);
routes.post("/appointments", AppointmentController.store);
routes.delete("/appointments/:id", AppointmentController.delete);

routes.get("/orders", OrderController.index);
routes.post("/orders", OrderController.store);

routes.get("/stock", StockController.index);
routes.post("/stock", StockController.store);

routes.get("/clients", ClientController.index);
routes.post("/clients", ClientController.store);

routes.get("/schedule", ScheduleController.index);

routes.get("/notifications", NotificationController.index);
routes.put("/notifications/:id", NotificationController.update);

routes.post("/files", upload.single("file"), FileController.store);

export default routes;
