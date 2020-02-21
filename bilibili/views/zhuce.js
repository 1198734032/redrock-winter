//import { response } from "express";

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



//注册

//用户名测试，是否重复
let name = document.getElementById('name')
let res1;
name.addEventListener('blur', function () {

    let xhr = new XMLHttpRequest()

    xhr.open('post', '/testName', true)

    xhr.send(name.value)

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {

            if (xhr.status === 200) {
                let ospan = document.getElementById('testName')

                let result = JSON.parse(xhr.responseText)

                if (result.code == 1) {
                    ospan.innerHTML = '✔'
                    res1 = 1
                } else if (result.code == 0) {
                    ospan.innerHTML = '该名已被注册'
                    res1 = 0
                } else if (result.code == -1) {
                    ospan.innerHTML = '服务器忙'
                }

            }
        }
    }
})

//密码测试长度是否达标
let psw = document.getElementById('password')
let res2;
psw.addEventListener('blur', function () {
    
    let ospan = document.getElementById('testPsw')
    if (psw.value.length >= 6) {
        ospan.innerHTML = '✔'
        res2 = 1
    } else {
        ospan.innerHTML = '✘'
        re2 = 0
    }
})

//测试电话是否已被注册
let tel = document.getElementById("tel")
let res3;
tel.addEventListener('blur', function () {
    let xhr = new XMLHttpRequest()

    xhr.open('post', '/testTel', true)

    xhr.send(tel.value)

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {

            if (xhr.status === 200) {
                let ospan = document.getElementById('testTel')

                let result = JSON.parse(xhr.responseText)

                if (result.code == 1) {
                    ospan.innerHTML = '✔'
                    res3 = 1
                } else if (result.code == 0) {
                    ospan.innerHTML = '已被注册'
                    res3 = 0
                } else if (result.code == -1) {
                    ospan.innerHTML = '服务器忙'
                }

            }
        }
    }
})


//点击注册
let btn = document.getElementById('sub')
btn.addEventListener('click', function () {
    if (res1 && res2 && res3) {

        let xhr = new XMLHttpRequest()

        xhr.open('post', '/register', true)
        
        xhr.send(`{"name":"${name.value}","psw":"${psw.value}","phone":${tel.value}}`)

        xhr.onreadystatechange = () => {

            if (xhr.readyState === 4) {

                if (xhr.status === 200) {
                    let result=JSON.parse(xhr.responseText)
                    if(result.code){
                        alert("注册成功请返回登录")
                        res1=0
                    }else{
                        alert("服务器忙")
                    }
                }
            }
        }
    }else alert('请检查信息')
})




// let form=document.getElementById('form')
// form.on('submit',function(e){

//     // e.preventDefault()
//     // let formData=$(this).serialize()

//     // $.ajax({
//     //     url:'/register',
//     //     type:'post',
//     //     data:formData,
//     //     dataType:'json',
//     //     success:function(data){

//     //     }
//     // })
// })