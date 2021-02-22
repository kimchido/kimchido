import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  snsType: string;
  snsId: string;
  avatarUrl: string;
  rank: string;
}

const UserSchema: Schema = new mongoose.Schema({
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

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
