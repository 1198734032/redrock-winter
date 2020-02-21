
//轮播图
function lunbo(div, littledotClass, picClass, activepicname, activedot) {
    let items = document.getElementsByClassName(picClass);
    let points = document.getElementsByClassName(littledotClass);
    let odiv = document.getElementById(div);
    let index = 0;
    let time = 0;

    let classnameClear = function () {
        for (let i = 0; i < items.length; i++) {
            items[i].className = picClass;
            points[i].className = littledotClass;
        }
    }
    let goto = function () {
        classnameClear();
        items[index].className = activepicname;
        points[index].className = activedot;
    }
    let gonext = function () {
        if (index < points.length - 1) {
            index++;
        } else {
            index = 0;
        }
        goto();
    }

    for (let i = 0; i < items.length; i++) {
        points[i].addEventListener('click', function () {
            let data = this.getAttribute('data-index');
            index = data;
            goto();
        })
    }
    let timer = function () {
        time++;
        if (time == 30) {
            gonext();
            time = 0;
        }
    };
    let t = setInterval(timer, 100);
    odiv.addEventListener('mouseout', function () {
        t = setInterval(timer, 100);
    });
    odiv.addEventListener('mouseover', function () {
        clearInterval(t);
    })
}
let lunbo1 = new lunbo('pics-left', "point", "item", "item active", "point active");
let lunbo2 = new lunbo("lunbo2", "point2", "item2", "item2 active", "point2 active")

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
let bb = new overr("more", "hiden2");
let cc = new overr("game", "hiden3")



//侧边栏
window.onscroll = function () {
    let rightDiv = document.getElementById('most-right');
    let winScroll = document.documentElement.scrollTop;
    //固定与滚动
    let fixed = function () {
        rightDiv.style.top = winScroll - 260 + 'px';
    }
    let move = function () {
        rightDiv.style.top = 0 + 'px';
        rightDiv.style.right = -60 + 'px';
    }
    if (winScroll > 240) {
        fixed();
    } else {
        move();
    }
    //对应区域颜色变化
    let lan = document.getElementsByClassName('lan');
    for (let i = 0; i < lan.length; i++) {
        lan[i].className = 'lan'
    }
    if(winScroll>2645){
        lan[4].className = 'lan active'
    }else if (winScroll > 1960) {
        lan[3].className = 'lan active'
    }else if (winScroll > 1347) {
        lan[2].className = 'lan active'
    } else if (winScroll > 847) {
        lan[1].className = 'lan active'
    } else if (winScroll > 400) {
        lan[0].className = 'lan active'
    }

}


//图片懒加载
function lazyimg() {
    let img = document.getElementsByTagName('img')
    for (let i = 0; i < img.length; i++) {
        if (img[i].getBoundingClientRect().top < window.innerHeight) {
            img[i].src = img[i].dataset.src
        }
    }
}
//懒加载防抖节流

let oldtime = new Date()
function imgg(fn, tima) {
    
    return (function scrollimg() {
        let timmer = setTimeout(function () {
            fn()
        }, tima)
        let nowtime = new Date()
        if (timmer) {
            clearTimeout(timmer)
            timmer = setTimeout(function () {
                fn()
            }, tima)
        }
        if (nowtime - oldtime >= tima) {
            oldtime = nowtime
            setTimeout(function () {
                fn()
            }, tima)
        }
    })()
}

lazyimg()

let scoll = document.addEventListener('scroll', function () {
    imgg(lazyimg, 500)
})



//数据渲染

let xhr = new XMLHttpRequest()
xhr.open('GET', 'http://39.107.142.107:3000/mock/95/bilibili/home/rank', true)
xhr.send()

xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {

            //专栏数据获取
            let zhuanlanDiv = document.getElementById('zhuanlan-item')
            let zhuanlanRes = JSON.parse(xhr.responseText).zhuanlan
            for (i = 0; i < 8; i++) {
                let oitem = document.createElement('div')
                oitem.className = "zhuanlan-oitem"
                //获取图片
                let oimg = document.createElement('img')
                oimg.className = 'zhuanlan-oimg'
                oimg.setAttribute('data-src', zhuanlanRes[i % 2].img)

                //获取文字信息
                let otext = document.createElement('div')
                otext.className = "zhuanlan-otext"
                let otitle = document.createElement('span')
                otitle.innerHTML = zhuanlanRes[i % 2].title
                let owriter = document.createElement('span')
                owriter.innerHTML = zhuanlanRes[i % 2].writer

                otext.appendChild(otitle)
                otext.appendChild(owriter)
                oitem.appendChild(oimg)
                oitem.appendChild(otext)
                zhuanlanDiv.appendChild(oitem)

            }

            //排行榜数据获取
            let res = JSON.parse(xhr.responseText).rank
            let ranklist = document.getElementsByClassName('rank')
            for (let i = 0; i < res.length; i++) {
                let oli = document.createElement('li')
                let ospanNum = document.createElement('span')
                ospanNum.innerHTML = i + 1
                ospanNum.className = 'number'
                let ospanName = document.createElement('span')
                oli.appendChild(ospanNum)
                oli.appendChild(ospanName)
                for (key in res[i]) {
                    ospanName.innerHTML = res[i][key]
                }
                ranklist[0].appendChild(oli)
               
            }


            //排行榜2
            let res2 = JSON.parse(xhr.responseText).rank2
            for (let i = 0; i < res2.length; i++) {        
                let oli = document.createElement('li')
                let ospanNum = document.createElement('span')
                ospanNum.innerHTML = i + 1
                ospanNum.className = 'number'
                let ospanName = document.createElement('span')
                if(i===0){
                    oimg=document.createElement('img')
                    oimg.style.hight=63+'px'
                    oimg.style.width=112+'px'
                    oimg.setAttribute('data-src',res2[0].img)
                    oli.appendChild(oimg)
                }
                oli.appendChild(ospanNum)
                oli.appendChild(ospanName)
                ospanName.innerHTML = res2[i].name
                ranklist[1].appendChild(oli)
            }


            //排行榜3
            let res3 = JSON.parse(xhr.responseText).rank2
            for (let i = 0; i < 9; i++) {        
                let oli = document.createElement('li')
                let ospanNum = document.createElement('span')
                ospanNum.innerHTML = i + 1
                ospanNum.className = 'number'
                let ospanName = document.createElement('span')
                if(i===0){
                    oimg=document.createElement('img')
                    oimg.style.hight=63+'px'
                    oimg.style.width=112+'px'
                    oimg.setAttribute('data-src',res3[0].img)
                    oli.appendChild(oimg)
                }
                oli.appendChild(ospanNum)
                oli.appendChild(ospanName)
                ospanName.innerHTML = res3[i].name
                ranklist[2].appendChild(oli)
            }

            // hover数据获取
            let hoverBox = document.getElementsByClassName('hover-box')
            let hiddenBox = document.getElementsByClassName('hover-div')
            for (let i = 0; i < hoverBox.length; i++) {
                hoverBox[i].addEventListener('mouseover', function () {
                    hiddenBox[i].className = 'hover-div active'
                    let data = JSON.parse(xhr.responseText).hover
                    hiddenBox[i].innerHTML = data
                })
                hoverBox[i].addEventListener('mouseout', function () {
                    hiddenBox[i].className = 'hover-div'
                })
            }

            //漫画数据获取
            let name = document.getElementsByClassName('cartoon-name')
            let passage = document.getElementsByClassName('cartoon-passage')
            let carRes = JSON.parse(xhr.responseText).cartoon

            for (let i = 0; i < name.length; i++) {
                name[i].innerHTML = carRes.name
                passage[i].innerHTML = carRes.passage
            }
            //排行榜4
            let res4 = JSON.parse(xhr.responseText).rank2
            for (let i = 0; i < 8; i++) {        
                let oli = document.createElement('li')
                let ospanNum = document.createElement('span')
                ospanNum.innerHTML = i + 1
                ospanNum.className = 'number'
                let ospanName = document.createElement('span')
                if(i===0){
                    oimg=document.createElement('img')
                    oimg.style.hight=63+'px'
                    oimg.style.width=112+'px'
                    oimg.setAttribute('data-src',res4[0].img)
                    oli.appendChild(oimg)
                }
                oli.appendChild(ospanNum)
                oli.appendChild(ospanName)
                ospanName.innerHTML = res4[i].name
                ranklist[3].appendChild(oli)
            }
            console.log('all done')
        } else {
            alert("请求失败,联网重试")
        }
    }
}





