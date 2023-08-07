const express = require("express");

let router = express.Router();
let user = require("../model/user");
const { use } = require("express/lib/application");

router.get('/', async (req, res) => {
    let data = await user.getUser(req.params.id).catch((err) => { return { error: err } });
    if (!data || (data & data.error)) {
        return res.send({ error: data.error });
    }
    return res.send({ data: data })
});

router.post('/user', async (req, res) => {
    let data = await user.newUser(req.body).catch((err) => { return { error: err } })
    if (!data || (data && data.error)) {
        return res.send({ error: data.error })
    }
    return res.send({ data: data })
});

router.put("/:id", async (req, res) => {
    let data = await user.updateUser(req.params.id).catch((err) => { return { error: err } });
    if (!data || (data && data.error)) {
        return res.send({ error: data.error });
    }
    return res.send({ data: data })
});

router.delete("/:id", async (req, res) => {
    let data = await user.deleteUser(req.params.id).catch((err) => { return { error: err } });
    if (!data || (data && data.error)) {
        return res.send({ error: data.error });
    }
    return res.send({ data: data })
})

module.exports = { router }