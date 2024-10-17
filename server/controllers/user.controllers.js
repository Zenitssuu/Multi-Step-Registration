import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import { uploadToCloudinary } from "../util/cloudinary.js";
import jwt from "jsonwebtoken";

export const singUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.file);

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res.status(200).json({ message: "user already exists" });
    }

    const hashPassowrd = await bcrypt.hash(password, 10);

    req.body.password = hashPassowrd;

    const newUser = new User(req.body);

    if (req.file) {
      const image = req.file;
      const base64Image = Buffer.from(image?.buffer).toString("base64");
      const dataUri = `data:${image.mimetype};base64,${base64Image}`;
      const uploadResp = await uploadToCloudinary(dataUri);
      newUser.profilePicture = uploadResp.url;
    }

    await newUser.save();

    // console.log("created successfully");

    return res
      .status(201)
      .json({ user: newUser, message: "created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
    //not sending actual message becasuse it can have vulnerable data
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);

    const user = await User.findOne({ email });
    // console.log(user);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const isPassowrdCorrect = await bcrypt.compare(password, user.password);
    // console.log(isPassowrdCorrect);

    if (!isPassowrdCorrect) {
      res.status(401).json({ message: "Incorrect Passowrd" });
    }
    const name = user.name;
    const userId = user._id;
    const token = jwt.sign(
      { email, name, userId },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );

    return res.status(200).json({ token: token, message: "login successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const getUser = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });

    if (!currentUser) {
      return res.status(404).json({ message: "user not found" });
    }
    // console.log(currentUser);

    return res.status(200).json({ user: currentUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const updateUser = async (req, res) => {
  try {
    // console.log(req.body);

    const { name, address, phoneNumber, password } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) {
      user.name = name;
    }
    if (password) {
      const hashPassowrd = await bcrypt.hash(password, 10);
      user.password = hashPassowrd;
    }
    if (address) {
      user.address = address;
    }
    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }

    if (req.file) {
      const image = req.file;
      const base64Image = Buffer.from(image?.buffer).toString("base64");
      const dataUri = `data:${image.mimetype};base64,${base64Image}`;
      const uploadResp = await uploadToCloudinary(dataUri);
      user.profilePicture = uploadResp.url;
    }

    await user.save();

    return res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while updating user" });
  }
};
