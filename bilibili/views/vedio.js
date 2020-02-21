//隐藏的下拉框
function overr(id, targid) {
    let v1 = document.getElementById(id);
    let v2 = document.getElementById(targid);
    v1.onmouseover = function () {
        v2.style.display = "block";
        v2.onmouseover = function () {
            v2.style.display = "block";
        }
    }
    v1.onmouseout = function () {
        v2.style.display = "none";
        v2.onmouseout = function () {
            v2.style.display = "none";
        }
    }
}
let aa = new overr("cartoon", "hiden");
let bb = new overr("zhuzhan", "hiden3");


//将评论渲染到页面的函数
function creatpl(text) {
    let odiv = document.getElementById('other-pl')
    let oD = document.createElement('div')
    oD.className = 'other'
    let ohead = document.createElement('div')
    ohead.className = 'other-head'
    let oword = document.createElement('div')
    oword.className = 'other-word'
    oword.innerHTML = text
    oD.appendChild(ohead)
    oD.appendChild(oword)
    odiv.appendChild(oD)
}


//将介绍标签渲染到页面的函数
function intro(text) {
    let odiv = document.getElementById('this-intro')
    let ointro = document.createElement('div')
    ointro.className = 'intro'
    ointro.innerHTML = text
    odiv.appendChild(ointro)
}

//弹幕列表
function DanmuList(text){
    let oul=document.getElementById("danmus")
    let oli=document.createElement('li')
    oli.innerHTML=text
    oul.appendChild(oli)
}

//弹幕飞过函数
function danmu(text) {

    let area = document.getElementById('showDanmu')
    let ospan = document.createElement('span')
    ospan.innerHTML = text
    ospan.style.fontSize = 18 + 'px'
    ospan.style.position = 'absolute'
    ospan.style.color = "white"
    area.appendChild(ospan)

    let posi = ospan.offsetWidth
    ospan.style.right = -(posi) + 'px'

    //随机高度
    ospan.style.top = parseInt(Math.random() * 190) + 10 + 'px'
    //随机速度
    let speed = parseInt(Math.random() * 5) + 3
    console.log(speed)

    //定时器弹幕运动
    let timer = setInterval(function () {
        if (ospan.offsetLeft <= 3) {
            ospan.style.left = ospan.offsetLeft - speed + 'px'
            if (ospan.offsetLeft <= -(posi)) {
                clearInterval(timer)
                ospan.style.display = 'none'
            }
        }
        else {

            ospan.style.right = 638 - ospan.offsetLeft - ospan.offsetWidth + speed + 'px'
        }
    }, 30)

}


//获取视频页信息并渲染到页面
(function () {
    let xhr = new XMLHttpRequest()

    xhr.open('get', '/getvedio', true)

    xhr.send()

    xhr.onreadystatechange = () => {

        if (xhr.readyState === 4) {

            if (xhr.status === 200) {
                let result = JSON.parse(xhr.responseText)

                document.getElementById('title').innerHTML = result.title
                document.getElementById('writer-name').innerHTML = result.writer
                document.getElementById('zan').innerHTML = result.dianzan
                document.getElementById('coin').innerHTML = result.coin
                document.getElementById('storage').innerHTML = result.storage
                document.getElementById('num-pinglun').innerHTML = result.otherpl.length
                //视频地址加载
                let newsrc = document.getElementById('vadio')
                newsrc.src = result.vedio
                newsrc.load()
                //视频介绍加载
                let thisIntro = result.thisIntro
                for (let i = 0; i < thisIntro.length; i++) {
                    intro(thisIntro[i])
                }


                //评论渲染
                let pl = result.otherpl
                for (let i = pl.length - 1; i >= 0; i--) {
                    creatpl(pl[i])
                }

                //弹幕列表渲染
                let dm=result.danmu
                for(let i=dm.length-1;i>=0;i--){
                    DanmuList(dm[i])
                }

            }
        }
    }
})()


//发表评论并修改评论数量并渲染到页面
let mypl = document.getElementById("write-text")
let subpl = document.getElementById("sub-pl")
subpl.addEventListener('click', function () {
    if (!mypl.value) {
        return mypl.placeholder = '请输入内容后再提交'
    }

    let xhr = new XMLHttpRequest()

    xhr.open('post', '/mypl', true)

    xhr.send(mypl.value)

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {

            if (xhr.status === 200) {
                let result = JSON.parse(xhr.responseText)

                //修改页面评论数
                document.getElementById('num-pinglun').innerHTML = result.length

                //渲染到页面
                creatpl(mypl.value)

                mypl.value = ""

            }
        }
    }
})


//发送弹幕
let myDanmu = document.getElementById('write-danmu')
let sendDanmu = document.getElementById("send-danmu")
sendDanmu.addEventListener('click', function () {
    if (myDanmu.value) {
        //将发送的弹幕传送储存并渲染到页面
       let xhr = new XMLHttpRequest()

        xhr.open('get', '/sendDanmu?value='+myDanmu.value, true)

        xhr.send()

        xhr.onreadystatechange = () => {

            if (xhr.readyState === 4) {

                if (xhr.status === 200) {
                    danmu(myDanmu.value)
                    DanmuList(myDanmu.value)
                    myDanmu.value =""                 
                }
            }
        }
    } else {
        myDanmu.placeholder= "请输入"
    }
})


