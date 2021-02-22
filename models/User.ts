import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    maxlength: 20,
  },
  snsType: {
    type: String,
    maxlength: 20,
  },
  snsId: {
    type: String,
    maxlength: 200,
  },
  avatarUrl: {
    type: String,
    maxlength: 400,
  },
  rank: {
    type: String,
    maxlength: 100,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
