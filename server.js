const express = require('express');
const cors = require('cors');


const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const databaseConnect = require('./config/database');
const authRouter = require('./routes/authRoute');
const messengerRoute = require('./routes/messengerRoute');
const file = require("./routes/file")

dotenv.config({
    path : 'config/config.env'
})

app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
    origin : '*',
    methods : ['GET','POST' , 'PUT']
}));

require("./socket/socket")

app.use('/v1/api/file/', file)
app.use('/v1/api/auth/',authRouter);
app.use('/v1/api/chat/',messengerRoute);

app.get('/',(req,res)=>{
    res.send('ok');
})

databaseConnect();

const PORT = process.env.PORT || 5000 


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})