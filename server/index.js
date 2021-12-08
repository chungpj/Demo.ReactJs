import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();


// app.use(express.urlencoded({extended: true}));
// app.use(express.json());
app.use(bodyParser.json({ limit: '1mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
app.use(cors());
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next(); 
});
app.use('/posts', postRoutes);


const CONNECTION_URL = 'mongodb+srv://ToDoApp_DB:ac11223344@cluster0.nme8h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

//const cnn = await mongoose.createConnection(CONNECTION_URL).asPromise();
mongoose.connect(CONNECTION_URL)
        .then(() => {app.listen(PORT, () => console.log(`server running on port: ${PORT}`))})
        .catch((error) => console.log(`${error} did not connect`));