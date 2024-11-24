import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  priority: string;
  completed: boolean;
  user: mongoose.Schema.Types.ObjectId;
  date: Date; // Add the date field to the interface
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String },
    completed: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true }, // Add the date field to the schema
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
