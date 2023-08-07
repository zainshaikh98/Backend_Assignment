let express = require('express')
let app = express();

app.use = (express.json());
app.use = (express.urlencoded({ extended: true }));

let userRouter = require('./routes/user')
app.use("/user",userRouter)

app.listen=(3200,()=>{console.log('server activatd')})