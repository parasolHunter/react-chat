const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const path = require('path')
const app = express()
// work with express
const server = require('http').Server(app)

const io = require('socket.io')(server)

io.on('connection', function (socket) {
	socket.on('sendmsg', function (data) {
		console.log(data);

		const { from, to, content } = data
		const chatid = [from, to].sort().join('_') //a_aaa
		const create_time = new Date().getTime()
		Chat.create({ chatid, from, to, content, create_time }, function (err, doc) {
			io.emit('recvmsg', Object.assign({}, doc._doc))
		})
	})
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
app.use(function (req, res, next) {
	if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
		return next()
	}
	return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))
server.listen(9093, function () {
	console.log('Node app start at port 9093')
})