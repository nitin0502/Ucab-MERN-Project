import mongoose from "mongoose";
const tokenTimerSchema = new mongoose.Schema({
    token : {
        type: String,
        required: true,
        unique: true,
    },
    createdAt : {
        type: Date,
        default: Date.now,
        expires: 86400,
    }
});
<<<<<<< HEAD
export default mongoose.model("tokenTimer", tokenTimerSchema);
=======
export default mongoose.model("tokenTimer", tokenTimerSchema);
>>>>>>> 672d86404baef4bcce82b8878a298326127c4539
