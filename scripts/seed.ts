import mongoose from "mongoose";
import { User } from "../src/app/models/user.ts"; // sesuaikan path import
import { NotificationModel } from "../src/app/models/Notification.ts";
import { DeviceModel } from "../src/app/models/Device.ts";
import { AccessLogModel } from "../src/app/models/AccessLog.ts";
// import { UserRole } from "../src/app/types/role.enum.ts";
import dbConnect from "../src/lib/mongodb.js";

async function seed() {
  try {
    await dbConnect();
    console.log("Connected to MongoDB");

    // Clear collections
    await User.deleteMany({});
    await NotificationModel.deleteMany({});
    await DeviceModel.deleteMany({});
    await AccessLogModel.deleteMany({});

    // Seed Users
    const users = [
      {
        email: "alice@example.com",
        password: "hashedpassword1",
        name: "Alice",
        phone_number: 1234567890,
        fingerprint_id: 101,
        role: "admin",
        is_active: true,
      },
      {
        email: "bob@example.com",
        password: "hashedpassword2",
        name: "Bob",
        phone_number: 2345678901,
        fingerprint_id: 102,
        role: "user",
        is_active: true,
      },
      {
        email: "carol@example.com",
        password: "hashedpassword3",
        name: "Carol",
        phone_number: 3456789012,
        fingerprint_id: 103,
        role: "user",
        is_active: false,
      },
      {
        email: "dave@example.com",
        password: "hashedpassword4",
        name: "Dave",
        phone_number: 4567890123,
        fingerprint_id: 104,
        role: "user",
        is_active: true,
      },
      {
        email: "eve@example.com",
        password: "hashedpassword5",
        name: "Eve",
        phone_number: 5678901234,
        fingerprint_id: 105,
        role: "user",
        is_active: true,
      },
    ];

    const createdUsers = await User.insertMany(users);

    // Seed Notifications
    const notifications = [
      {
        user_id: createdUsers[0]._id,
        message: "Welcome Alice!",
        type: "info",
        read: false,
      },
      {
        user_id: createdUsers[1]._id,
        message: "Your account will expire soon.",
        type: "warning",
        read: false,
      },
      {
        user_id: createdUsers[2]._id,
        message: "Failed login attempt detected.",
        type: "error",
        read: true,
      },
      {
        user_id: createdUsers[3]._id,
        message: "Password changed successfully.",
        type: "info",
        read: false,
      },
      {
        user_id: createdUsers[4]._id,
        message: "New feature released!",
        type: "info",
        read: true,
      },
    ];

    await NotificationModel.insertMany(notifications);

    // Seed Devices
    const devices = [
      {
        device_id: "device001",
        location: "Main Gate",
        status: "kosong",
        mode: "access",
        last_seen: new Date(),
      },
      {
        device_id: "device002",
        location: "Back Door",
        status: "terisi",
        mode: "register",
        last_seen: new Date(),
      },
      {
        device_id: "device003",
        location: "Office",
        status: "nonaktif",
        mode: "access",
        last_seen: new Date(),
      },
      {
        device_id: "device004",
        location: "Warehouse",
        status: "kosong",
        mode: "access",
        last_seen: new Date(),
      },
      {
        device_id: "device005",
        location: "Lobby",
        status: "terisi",
        mode: "register",
        last_seen: new Date(),
      },
      {
        device_id: "device006",
        location: "Lobby",
        status: "kosong",
        mode: "register",
        last_seen: new Date(),
      },
      {
        device_id: "device007",
        location: "Office",
        status: "terisi",
        mode: "register",
        last_seen: new Date(),
      },
      {
        device_id: "device008",
        location: "Office",
        status: "nonaktif",
        mode: "register",
        last_seen: new Date(),
      },
    ];

    const createdDevices = await DeviceModel.insertMany(devices);

    // Seed AccessLogs
    const accessLogs = [
      {
        user_id: createdUsers[0]._id,
        fingerprint_id: 101,
        device_id: createdDevices[0]._id,
        access_time: new Date(),
        status: "success",
        remarks: "Entry granted",
      },
      {
        user_id: createdUsers[1]._id,
        fingerprint_id: 102,
        device_id: createdDevices[0]._id,
        access_time: new Date(),
        status: "failed",
        remarks: "Fingerprint not recognized",
      },
      {
        user_id: createdUsers[2]._id,
        fingerprint_id: 103,
        device_id: createdDevices[2]._id,
        access_time: new Date(),
        status: "success",
      },
      {
        user_id: createdUsers[3]._id,
        fingerprint_id: 104,
        device_id: createdDevices[0]._id,
        access_time: new Date(),
        status: "failed",
        remarks: "Access denied",
      },
      {
        user_id: createdUsers[4]._id,
        fingerprint_id: 105,
        device_id: createdDevices[2]._id,
        access_time: new Date(),
        status: "success",
        remarks: "Entry granted",
      },
    ];

    await AccessLogModel.insertMany(accessLogs);

    console.log("Seeding complete!");
    User.find({})
    NotificationModel.find({})
    DeviceModel.find({})
    AccessLogModel.find({})
    
    console.log("Registered Mongoose models:", mongoose.modelNames());
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}


seed();
