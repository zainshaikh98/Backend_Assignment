const { param } = require('express/lib/request');
let joi = require('joi');
let { User } = require('../schema/user')


async function user(param) {
    let schema = joi.object({
        id: joi.number().allow(),
        name: joi.string().min(4).allow(),
        img: joi.string().allow(),
        summary: joi.string().allow()
    });

    let valid = await schema.validateAsync(param, { abortEarly: false }).catch((err) => {
        return { error: err }
    });

    if (!valid || (valid && valid.error)) {
        let msg = [];
        for (let i of valid.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: valid.data }
}

async function newUser(param) {
    let check = await user(param).catch((err) => { return { error: err } });
    if (!check || (check && check.error)) {
        return { error: check.error, status: 400 }
    }

    let users = await User.create(param).catch((err) => { return { error: err } });
    if (!users || (users && users.error)) {
        return { error: users.error, status: 500 }
    }
    return {
        data: users
    }
}

async function getUser(id) {
    if (!parseInt(id)) {
        return { error: "plz provide id" }
    }

    let find = await User.findOne({ where: { id: id }, raw: true }).catch((err) => {
        return { error: err }
    });
    if (!find || (find && find.error)) {
        return { error: find.error, status: 404 }
    }
    return { data: find }
}

async function updateUser(param) {
    let check = await user(param).catch((err) => { return { error: err } });
    if (!check || (check && check.error)) {
        return { error: check.error, status: 400 }
    }

    let find = await User.findOne({ where: { id: param.id }, raw: true }).catch((err) => {
        return { error: err }
    });
    if (!find || (find && find.error)) {
        return { error: find.error, status: 404 }
    }

    let updated = await User.update(param, { where: { id: find.id } }).catch((err) => {
        return { error: err }
    });
    if (!updated || (updated && updated.error)) {
        return { error: updated.error, status: 500 }
    }
    return { data: "user updated" }
}

async function deleteUser(id) {
    if (!parseInt(id)) {
        return { error: "invalid id" }
    }

    let find = await User.findOne({ where: { id: id }, raw: true }).catch((err) => {
        return { error: err }
    });
    if (!find || (find && find.error)) {
        return { error: find.error, status: 404 }
    }

    let del = await User.destroy({ where: { id: find.id } }).catch((err) => {
        return { error: err }
    });
    if (!del || (del && del.error)) {
        return { error: del.error, status: 500 }
    }
    return { data: "user deleted" }
}

module.exports = { newUser, getUser, updateUser, deleteUser }