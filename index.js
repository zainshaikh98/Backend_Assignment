let express = require('express')
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let {router} = require('./routes/user')
app.use(router)

app.listen(3200,()=>{console.log('server activatd')})