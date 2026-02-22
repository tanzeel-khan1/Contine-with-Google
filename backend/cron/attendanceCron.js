import cron from "node-cron";
import moment from "moment-timezone";
import Attendance from "../models/Attendance.js";
import User from "../models/User.js";

cron.schedule(
    "03 16 * * *",
  async () => {
    try {
    console.log("⏰ Cron running at 4: PM Karachi time");

      // Start & end of day in Karachi timezone
      const startOfDay = moment.tz("Asia/Karachi").startOf("day").toDate();
      const endOfDay = moment.tz("Asia/Karachi").endOf("day").toDate();

      // ✅ Fetch all teachers
      const teachers = await User.find({ role: "teacher" }).select("_id");

      for (const teacher of teachers) {
        // Check if attendance already exists for today
        const existingAttendance = await Attendance.findOne({
          userId: teacher._id,
          date: { $gte: startOfDay, $lte: endOfDay },
        });

        // Agar present ya leave hai to skip
        if (existingAttendance && ["present", "leave"].includes(existingAttendance.status)) {
          continue;
        }

        // Agar already absent mark hai to skip
        if (existingAttendance && existingAttendance.status === "absent") {
          continue;
        }

        // Agar attendance nahi hai, to absent mark karo
        await Attendance.create({
          userId: teacher._id,
          date: startOfDay,
          status: "absent",
        });
      }

      console.log("✅ Teachers' absent attendance marked correctly (no duplicates)");
    } catch (error) {
      console.error("❌ Cron error:", error);
    }
  },
  {
    timezone: "Asia/Karachi", 
  }
);