const express=require("express"); 
const mongoose = require('mongoose');
const nconf = require('nconf');
const cors = require('cors');

nconf.argv().env().file('config.json');
process.env.MODE_ENV = nconf.get('NODE_ENV');

const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb://${nconf.get('mongoDb:host')}:${nconf.get('mongoDb:port')}/${nconf.get('mongoDb:database')}`;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully");
});

const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const followedRouter = require('./routes/followed');

app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/followed', followedRouter);

//const db = client.db(nconf.get('mongoDb:database'));
    
app.listen(nconf.get('app:port'), nconf.get('app:host'));