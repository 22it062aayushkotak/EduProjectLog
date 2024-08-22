import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
 
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Project_collection", projectSchema);
