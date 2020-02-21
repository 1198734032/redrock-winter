
/*这主要是视频详情页的服务*/

let express = require('express')
let fs = require('fs')
let app = express()

app.engine('html', require('express-art-template'));

//开放资源
app.use('/resource/', express.static('./resource/'))
app.use('/views/', express.static('./views/'))

//首页（视屏详情页）
app.get('/', function (req, res) {
    res.render('vedio.html')
})


//获取视频页面信息
app.get('/getvedio', function (req, res) {

    fs.readFile('./views/vedio.json', function (err, data) {
        if (err) {
            res.end('something wrong...')
        }
        let result = JSON.parse(data).mv1
        res.send(result)
    })
})



//弹幕
app.get('/sendDanmu', function (req, res) {

    //将我发送的弹幕写入文件
    var danmu = req.query.value
    fs.readFile('./views/vedio.json', function (err, data) {
        if (err) {
            return res.status(500).end("something wrong...")
        }
        let result = JSON.parse(data).mv1
        result.danmu.unshift(danmu)
        fs.writeFile('./views/vedio.json', JSON.stringify({ mv1: result }), function (err, data) {
            if (err) {
                return res.status(500).end('something wrong...')
            }
        })
    })
    res.status(200).end()
})



//提交我的评论
app.post('/mypl', function (req, res) {
    let str = '';
    //监听缓冲区中的数据，不断从缓冲区中获取数据
    req.on("data", chunk => {
        str += chunk;
    })

    //监听数据是否获取完成
    //将我的评论写入文件
    req.on("end", () => {
        fs.readFile('./views/vedio.json', function (err, data) {
            if (err) {
               return res.status(500).end('something wrong...')
            }
            let result = JSON.parse(data).mv1

            result.otherpl.unshift(str)

            fs.writeFile('./views/vedio.json', JSON.stringify({ mv1: result }), function (err, data) {
                if (err) {
                    res.end('something wrong...')
                }
            })
            res.status(200).send(result.otherpl)
        })
    })

})


app.listen(3000, function () {
    console.log('running...')
})