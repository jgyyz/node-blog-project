var express = require('express')
var path = require('path')

var app = express()

// 默认就是views目录，但是这样写的话方便以后可以改
app.set('views', path.join(__dirname, './views/'))  

// 动态获取绝对路径
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))