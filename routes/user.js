const express = require("express");

let router = express.Router();
let user = require("../model/user");

router.get('/user/:id', async (req, res) => {
    let data = await user.getUser(req.params.id).catch((err) => { return { error: err } });
    if (!data || (data & data.error)) {
        return res.send({ error: data.error });
    }
    return res.send({ data: data.data })
});

router.post('/user/add', async (req, res) => {
    let data = await user.newUser(req.body).catch((err) => { return { error: err } })
    if (!data || (data && data.error)) {
        return res.send({ error: data.error })
    }
    return res.send({ data: data.data })
});

router.put("/user/update/:id", async (req, res) => {
    let param = {...req.params,...req.body}
    let data = await user.updateUser(param).catch((err) => { return { error: err } });
    if (!data || (data && data.error)) {
        return res.send({ error: data.error });
    }
    return res.send({ data: data.data })
});

router.delete("/user/delete/:id", async (req, res) => {
    let data = await user.deleteUser(req.params.id).catch((err) => { return { error: err } });
    if (!data || (data && data.error)) {
        return res.send({ error: data.error });
    }
    return res.send({ data: data.data })
})

module.exports = { router }