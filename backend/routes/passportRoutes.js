import dotenv from "dotenv";
dotenv.config();
import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Step 1: Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
console.log("CLIENT_URL =", process.env.CLIENT_URL);

// Step 2: Google callback
// router.get(
//   "/google/callback",
//   passport.authenticate("google", { session: false }),
//   (req, res) => {
//     try {
//       const token = jwt.sign(
//         {
//           id: req.user._id,
//           email: req.user.email,
//           name: req.user.name,
//         },
//         process.env.JWT_SECRET,
//         { expiresIn: "7d" }
//       );

//       res.redirect(
//         `${process.env.CLIENT_URL}/success`
//       );
//     } catch (error) {
//       res.redirect(
//         `${process.env.CLIENT_URL}/login?error=OAuthFailed`
//       );
//     }
//   }
// );
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    try {
      const token = jwt.sign(
        {
          id: req.user._id,
          email: req.user.email,
          name: req.user.name,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
      };

      res.redirect(
        `${process.env.CLIENT_URL}/success?token=${token}&user=${encodeURIComponent(
          JSON.stringify(user),
        )}`,
      );
    } catch (error) {
      res.redirect(`${process.env.CLIENT_URL}/login?error=OAuthFailed`);
    }
  },
);

// Protected test route
router.get("/me", protect, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;
