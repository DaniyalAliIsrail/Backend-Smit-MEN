import mongoose from "mongoose";
// data base connect
mongoose.connect(`mongodb+srv://testuser:testuser@thaparestapi.bmotxet.mongodb.net/practiceBackend?retryWrites=true&w=majority`);
export default mongoose;