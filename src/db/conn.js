const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/student-new", {
    // useCreateIndex: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify:false
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    console.log("Not Connected to MongoDB");
});