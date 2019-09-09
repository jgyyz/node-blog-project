const express = require('express')
// 数据模型
const User = require('./model/user')
// 连接mongodb数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true} )
// 用于加密的包
const md5 = require('blueimp-md5')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('index.html')
})

// 登录
router.get('/login', (req, res) => {
    res.render('login.html')
})

router.post('/login', (req, res) => {

})

// 注册
router.get('/register', (req, res) => {
    res.render('register.html')
})

router.post('/register', (req, res) => {
    const body = req.body
    // 操作数据库，判断邮箱名/昵称是否已存在
    User.findOne({
        $or: [
            { email: body.email },
            { nickname: body.nickname }
        ]
    }, (err, data) => {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: 'Internal error.'
            })
        }
        if (data) {
            return res.status(200).json({
                err_code: 1,
                message: 'Email or nickname already exists.'
            })
        }

        // 对密码进行重复加密
        body.password = md5(md5(body.password))

        new User(body).save((err, user) => {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: 'Internal error.'
                })
            }
        }) 

        res.status(200).json({
            err_code: 0,
            message: 'OK'
        }) 
    })
})

module.exports = router