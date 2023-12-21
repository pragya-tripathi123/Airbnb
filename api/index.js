const cors = require("cors");
const express = require("express");
const { mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "kldjsadkjflkasjdflkjasdlkf";
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const Place = require("./models/Place");
const BookingModel = require("./models/Booking.js");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// Connect to Mongo Db

async function main() {
  // console.log(`Couln't connect:`)
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to mongodb");
  } catch (err) {
    console.log(`Couldn't conn mn,ect: ${err}`);
  }
}
// SHY5kiLwFsoj7x9N
main();

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData)
    })
  })
}

app.get("/test", (req, res) => {
  res.json("test ok");
});

//  API for register new users

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    console.log({ name, email, password });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

// api for Login Page

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email: email.toLowerCase() });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(userDoc);
          }
        );
        // res.json(userDoc)
      } else {
        res.status(401).json("pass failed");
      }
    } else {
      res.status(404).json("User Not Found");
    }
  } catch {}
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

// ......................logout functionality.................//

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

// .................uploading pictures..............//

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  console.log(link);
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json("uploads/" + newName);
});

const photoMiddleware = multer({ dest: "uploads" });
app.post("/upload", photoMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
    console.log(req.files);
  }
  res.json(uploadedFiles);
});

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    try {
      const placeDoc = await Place.create({
        owner: userDoc.id,
        title,
        address,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        photos,
      });
      console.log("success");
      res.json(placeDoc);
    } catch (e) {
      res.status(422).json(err);
    }
  });
});

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { id } = userData;
      res.json(await Place.find({ owner: id }));
    });
  }
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  console.log("jii");
  res.json(await Place.findById(id));
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

app.get("/places", async (req, res) => {
  res.json(await Place.find());
});

app.post("/bookings",async (req, res) => {
  const userData = await getUserDataFromReq(req)
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;
   BookingModel.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user:userData.id
  }).then((doc)=>{
    res.json(doc)
  }).catch((err)=>{
    throw err;
  })
});



app.get('/bookings',async(req,res)=>{
    const userData = await getUserDataFromReq(req)
  res.json(await BookingModel.find({user:userData.id}).populate('place'))
})
app.listen(4000);
