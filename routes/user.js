const express = require("express");

let router = express.Router();
let user = require("../model/user");
const req = require("express/lib/request");


// route for view by id.
router.get('/user/:id', async (req, res) => {
    let data = await user.getUser(req.params.id).catch((err) => { return { error: err } });
    if (!data || (data & data.error)) {
        return res.send({ error: data.error });
    }
    return res.send({ data: data.data })
});

// route for create.
router.post('/user/add', async (req, res) => {
    let data = await user.newUser(req.body).catch((err) => { return { error: err } })
    if (!data || (data && data.error)) {
        return res.send({ error: data.error })
    }
    return res.send({ data: data.data })
});

// route for update.
router.put("/user/update/:id", async (req, res) => {
    let param = {...req.params,...req.body}
    let data = await user.updateUser(param).catch((err) => { return { error: err } });
    if (!data || (data && data.error)) {
        return res.send({ error: data.error });
    }
    return res.send({ data: data.data })
});

// route for delete.
router.delete("/user/delete/:id", async (req, res) => {
    let data = await user.deleteUser(req.params.id).catch((err) => { return { error: err } });
    if (!data || (data && data.error)) {
        return res.send({ error: data.error });
    }
    return res.send({ data: data.data })
})

module.exports = { router }