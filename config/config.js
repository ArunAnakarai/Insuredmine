const mongoose = require('mongoose');

// Connecting to MongoDB Database
mongoose.connect("mongodb://localhost:27017/insuredmine", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Database successfully connected!');
})
.catch((error) => {
    console.log('Could not connect to database: ' + error);
});
