const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = { 'pwd': 0, '__v': 0 }
// Chat.remove({},function(e,d){}) //清空所有消息
// 删除指定条件的数据
// User.remove({ user: "para" }, function (err, doc) {
//     if (!err) {
//         console.log(doc);
//     } else {
//         console.log(err);
//     }
// })

// 更新数据
// User.update({ 'user': 'para' }, {
//     '$set': {
//         money: '8k'
//     }
// }, function (err, doc) {
//     if (!err) {
//         console.log(doc);
//     } else {
//         console.log(err);
//     }
// })

Router.get('/list', function (req, res) {
    const { type } = req.query
    if (!type) {
        User.find(function (err, doc) {
            if (!err) {
                return res.json({ code: 0, data: doc })
            }
        })
    } else {
        User.find({ type }, function (err, doc) {
            if (!err) {
                return res.json({ code: 0, data: doc })
            }
        })
    }
})
Router.get('/getmsglist', function (req, res) {
    const userid = req.cookies.userid
    User.find(function (e, userdoc) {
        let users = {} //所有用户id的姓名头像信息
        userdoc.forEach(v => {
            users[v._id] = { name: v.user, avatar: v.avatar }
        })
        Chat.find({
            '$or': [{ from: userid }, { to: userid }]
        },
            function (err, doc) {
                if (!err) {
                    return res.json({ code: 0, msgs: doc, users: users })
                }
            }
        )
    })
})
Router.post('/readmsg', function (req, res) {
    const userid = req.cookies.userid
    if (!userid) {
        return json.dumps({ code: 1 })
    }
    const { from } = req.body
    Chat.update({ from, to: userid },
        { '$set': { read: true } },
        { 'multi': true },
        function (err, doc) {
            console.log(doc);
            if (!err) {
                return res.json({ code: 0, num: doc.nModified })
            }
            return res.json({ code: 1, msg: '修改失败' })
        })
})
Router.post('/update', function (req, res) {
    const userid = req.cookies.userid
    if (!userid) {
        return json.dumps({ code: 1 })
    }
    const body = req.body
    User.findByIdAndUpdate(userid, body, function (err, doc) {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({ code: 0, data })
    })
})
Router.post('/login', function (req, res) {
    const { user, pwd } = req.body
    User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, function (err, doc) {
        if (!doc) {
            return res.json({ code: 1, msg: '用户名或者密码错误' })
        }
        res.cookie('userid', doc._id)
        return res.json({ code: 0, data: doc })
    })
})
Router.post('/register', function (req, res) {
    const { user, pwd, type } = req.body
    console.log(req.body)
    User.findOne({ user }, function (err, doc) {
        if (doc) {
            return res.json({ code: 1, msg: '用户名重复' })
        }

        const userModel = new User({ user, type, pwd: md5Pwd(pwd) })
        // 根据模板和参数保存一条数据
        userModel.save(function (e, d) {
            if (e) {
                return res.json({ code: 1, msg: '后端出错了' })
            }
            console.log(d)
            const { user, type, _id } = d
            res.cookie('userid', _id)
            return res.json({ code: 0, data: { user, type, _id } })
        })
    })
})
Router.get('/info', function (req, res) {
    const { userid } = req.cookies
    if (!userid) {
        return res.json({ code: 1, msg: "请先登录" })//未登录
    }
    User.findOne({ _id: userid }, _filter, function (err, doc) {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' })
        }
        if (doc) {
            return res.json({ code: 0, data: doc })
        }
    })
    // 用户有没有cookie

})

function md5Pwd(pwd) {
    const salt = 'parasol_3957x8yza6!@#IUHJh~~'
    return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router