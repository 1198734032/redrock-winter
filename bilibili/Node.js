//这主要是用来注册登录的服务

let fs = require('fs')
let express = require('express')
let session = require('express-session')
let app = express()

app.engine('html', require('express-art-template'));

//开放文件
app.use('/resource/', express.static('./resource/'))
app.use('/views/', express.static('./views/'))

// 配置session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))


app.get('/', function (req, res) {
    // if(req.session.user)
    res.render('B1.html')
})



//密码登录
app.post('/passwordLogin', function (req, res) {
    let str = ''
    req.on('data', chunk => {
        str += chunk
    })
    req.on('end', () => {
        let person = JSON.parse(str)

        fs.readFile('./views/person.json', function (err, data) {
            if (err) {
                return res.status(500).send()
            }
            let result = JSON.parse(data).personInformation

            for (key in result) {
                if (result[key].phone == person.phone && result[key].psw == person.psw) {
                    req.session.user = result[key].name
                    req.session.code = 1
                    return res.status(200).send(req.session)
                }
            }
            res.status(200).send((JSON.parse('{"code":0}')))
        })
    })

})




//短信登陆
// app.post('/noteLogin', function (req, res) {
//     console.log(req.body)
//     res.send('Node')
// })



//判断用户名是否重复
app.post('/testName', function (req, res) {
    let str = ''
    req.on('data', chunk => {
        str += chunk
    })

    req.on('end', () => {
        fs.readFile('./views/person.json', function (err, data) {
            if (err) {
                return res.status(500).send(JSON.parse('{"code":-1}'))
            }

            let result = JSON.parse(data).personInformation

            for (key in result) {
                if (result[key].name === str) {
                    return res.status(200).send(JSON.parse('{"code":0}'))
                } else {
                    return res.status(200).send(JSON.parse('{"code":1}'))
                }
            }
        })
    })
})


//判断电话是否注册
app.post('/testTel', function (req, res) {
    let str = ''
    req.on('data', chunk => {
        str += chunk
    })

    req.on('end', () => {
        fs.readFile('./views/person.json', function (err, data) {
            if (err) {
                return res.status(500).send(JSON.parse('{"code":-1}'))
            }

            let result = JSON.parse(data).personInformation

            for (key in result) {
                if (result[key].phone == str) {
                    return res.status(200).send(JSON.parse('{"code":0}'))
                } else {
                    return res.status(200).send(JSON.parse('{"code":1}'))
                }
            }
        })
    })
})



//注册
app.post('/register', function (req, res) {
    let str = '';
    //监听缓冲区中的数据，不断从缓冲区中获取数据
    req.on("data", chunk => {
        str += chunk;
    })

    req.on("end", () => {
        //转化为对象
        let newPerson = JSON.parse(str)
        //添加用户信息
        fs.readFile('./views/person.json', function (err, data) {
            if (err) {
                return res.status(500).send((JSON.parse('{"code":0}')))
            }

            let result = JSON.parse(data).personInformation

            //获取该为第几个成员
            let num = Object.keys(result).length + 1
            let addperson = "person" + num
            result[addperson] = newPerson

            //添加成员
            fs.writeFile('./views/person.json', JSON.stringify({ personInformation: result }), function (err, data) {
                if (err) {
                    return res.status(500).send(JSON.parse('{"code":0}'))
                }
                return res.status(200).send(JSON.parse('{"code":1}'))
            })
        })
    })
})


app.listen(3000, function () {
    console.log('running...')
})