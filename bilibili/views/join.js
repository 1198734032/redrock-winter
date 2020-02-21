//二维码图片
let opic = document.getElementById("pic2");
let img1 = document.getElementById("img1");
let img2 = document.getElementById("img2");
opic.addEventListener("mouseover", function () {
    img1.style.display = "none";
    img2.style.display = "block";
})
opic.addEventListener("mouseout", function () {
    img2.style.display = "none";
    img1.style.display = "block";
})


//登陆方式更改并确定提交路径
let odiv = document.getElementById("one");
let chooseType = odiv.getElementsByTagName("span");
let form = document.getElementById('form')
for (let i = 0; i < chooseType.length; i++) {

    chooseType[i].addEventListener("click", function () {
        changeType(i)
    })
}

function changeType(index) {
    for (let a = 0; a < chooseType.length; a++) {
        chooseType[a].className = "";
    }
    chooseType[index].className = "active-";
    let oinput = document.getElementById("two");
    let changeInput = oinput.getElementsByTagName("div");
    for (let b = 0; b < 2; b++) {
        changeInput[b].style.display = "none";
    }
    changeInput[index].style.display = "block";
}


//下拉菜单
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
let bb = new overr("zhuzhan", "hiden3")


//登录
let btn = document.getElementById('joinin')

btn.addEventListener('click', function () {
    let tel = document.getElementById('Tel')
    let psw = document.getElementById('password')

    let xhr = new XMLHttpRequest()

    xhr.open('post', '/passwordLogin', true)

    xhr.send(`{"phone":"${tel.value}","psw":"${psw.value}"}`)

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {

            if (xhr.status === 200) {

                let result = JSON.parse(xhr.responseText)
                console.log(result)

                if (!result.code) {
                     return   alert("手机号或密码错误")
                }

                alert('登陆成功,点击跳转首页')
                 window.location.replace('/')
            
            }
        }
    }
})