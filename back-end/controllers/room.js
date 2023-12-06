import fs from "fs";
import Hotel from "../models/room";
import {isOverlapWithExistingRanges, toLowerCaseNonAccentVietnamese} from "../common/util";

export const createRoom = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;

    let room = new Hotel(fields);
    room.postedBy = req.user._id;
    // handle image
    if (files.image) {
      room.image.data = fs.readFileSync(files.image.path);
      room.image.contentType = files.image.type;
    }

    room.save((err, result) => {
      if (err) {
        res.status(400).send("Vui lòng nhập đầy đủ thông tin!");
      }
      res.json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

export const getAllRooms = async (req, res) => {
  let all = await Hotel.find()
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  res.json(all);
}

export const roomApprove = async (req, res) => {
  await Hotel.findByIdAndUpdate(req.params.roomId, {
    $set: {status: true},
  });
  return res.send({success: true});
}

export const getImage = async (req, res) => {
  let room = await Hotel.findById(req.params.roomId).exec();
  if (room && room.image && room.image.data !== null) {
    res.set("Content-Type", room.image.contentType);
    return res.send(room.image.data);
  }
};

export const sellerRooms = async (req, res) => {
  let all = await Hotel.find({postedBy: req.user._id})
    .select("-image.data")
    .populate("postedBy")
    .exec();
  res.send(all);
};

export const removeRoom = async (req, res) => {
  await Hotel.findByIdAndDelete(req.params.roomId)
    .select("-image.data")
    .exec();
  res.send("success");
};

export const getDetailRoom = async (req, res) => {
  let room = await Hotel.findById(req.params.roomId)
    .select("-image.data")
    .exec();
  res.json(room);
};

export const updateRoom = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;
    let data = {...fields};

    if (files.image) {
      let image = {};
      image.data = fs.readFileSync(files.image.path);
      image.contentType = files.image.type;
      data.image = image;
    }
    let updated = await Hotel.findByIdAndUpdate(req.params.roomId, data, {
      new: true,
    }).select("-image.data");
    await Hotel.findByIdAndUpdate(req.params.roomId, {
      $set: {status: false},
    });
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Cập nhật thông tin thất bại, vui lòng nhập lại");
  }
};

export const getListRooms = async (req, res) => {
  const {place, date, bed} = req.body;
  const fromDate = date.split(",");

  let result = await Hotel.find({
    bed, status: true
  })
    .populate("orderIds")
    .select("-image.data")
    .exec();

  res.json(result.filter(room =>
    !isOverlapWithExistingRanges(fromDate[0], fromDate[1], room.orderIds) &&
    toLowerCaseNonAccentVietnamese(room.location).includes(toLowerCaseNonAccentVietnamese(place))));
};






