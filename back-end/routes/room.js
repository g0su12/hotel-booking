import express from "express";
import formidable from "express-formidable";
// middleware
import {roomOwner, requireSignIn} from "../middlewares";
// controllers
import {
  getImage,
  createRoom,
  updateRoom,
  removeRoom,
  roomApprove,
  sellerRooms,
  getAllRooms,
  getListRooms,
  getDetailRoom,
} from "../controllers/room";

const roomRouter = express.Router();

roomRouter.post("/search-results", getListRooms);
roomRouter.get("/rooms/:roomId", getDetailRoom);
roomRouter.get("/rooms/image/:roomId", getImage);
roomRouter.get("/admin/rooms", requireSignIn, getAllRooms);
roomRouter.get("/rooms/seller/:sellerId", requireSignIn, sellerRooms);
roomRouter.put("/rooms/approve-room/:roomId", requireSignIn, roomApprove);
roomRouter.post("/rooms/add-room", requireSignIn, formidable(), createRoom);
roomRouter.delete("/rooms/delete-room/:roomId", requireSignIn, roomOwner, removeRoom);
roomRouter.put("/rooms/update-room/:roomId", requireSignIn, roomOwner, formidable(), updateRoom);

export default roomRouter;
