import User from "../models/User.mjs";
import bcrypt from "bcryptjs";

// GET all users
export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// CREATE new user (admin only)
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already in use" });

    // ✅ No need to hash password manually
    const user = new User({ name, email, password, role });
    await user.save(); // This will trigger the userSchema.pre("save") hook

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// UPDATE role or name
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.role = req.body.role || user.role;
    await user.save();

    res.json({ message: "User updated", user });
  } catch (err) {
    console.log(err);
  }
};

// DELETE user
export const deleteUser = async (req, res) => {
  try {
    console.log(req.user);
    if (req.user.id === req.params.id) {
      return res.status(400).json({ message: "You cannot delete yourself" });
    }

    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    console.log(err);
  }
};
