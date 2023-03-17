// import mongoose 
import mongoose from "mongoose";
 
const LogAvtivity = mongoose.Schema({
    user_id:{
        type: String,
        required: true
    },
    ip:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
 
export default mongoose.model('log_activities', LogAvtivity);