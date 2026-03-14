import cron from "node-cron";
import moment from "moment-timezone";
import Attendance from "../models/Attendance.js";
import User from "../models/User.js";

cron.schedule(
  "54 19 * * *",
  async () => {
    try {
      console.log("⏰ Cron running at 4: PM Karachi time");

      const startOfDay = moment.tz("Asia/Karachi").startOf("day").toDate();
      const endOfDay = moment.tz("Asia/Karachi").endOf("day").toDate();

      const teachers = await User.find({ role: "teacher" }).select("_id");

      for (const teacher of teachers) {
        const existingAttendance = await Attendance.findOne({
          userId: teacher._id,
          date: { $gte: startOfDay, $lte: endOfDay },
        });

        if (
          existingAttendance &&
          ["present", "leave"].includes(existingAttendance.status)
        ) {
          continue;
        }

        if (existingAttendance && existingAttendance.status === "absent") {
          continue;
        }

        await Attendance.create({
          userId: teacher._id,
          date: startOfDay,
          status: "absent",
        });
      }

      console.log(
        "✅ Teachers' absent attendance marked correctly (no duplicates)",
      );
    } catch (error) {
      console.error("❌ Cron error:", error);
    }
  },
  {
    timezone: "Asia/Karachi",
  },
);
