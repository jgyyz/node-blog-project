var express = require('express')
var path = require('path')
// 使用路由器（一定要添加路径标识）
var router = require('./router')
var bodyParser = require('body-parser')

var app = express()

app.engine('html', require('express-art-template'))
// 默认就是views目录，但是这样写的话方便以后可以改
app.set('views', path.join(__dirname, './views/')) 

/**
 * 配置解析请求表单POST的插件bodyParser
 */
// 一定要在路由器之前挂载
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 将路由器挂载到app上
app.use(router)
// 动态获取绝对路径
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))
 

app.listen(5000, () => {
    console.log('running...')
})