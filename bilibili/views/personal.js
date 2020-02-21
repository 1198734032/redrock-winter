
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


//输入框
let oinput = document.getElementById("inputIntro");
oinput.addEventListener("mouseover", function () {
    oinput.style.backgroundColor = "white";
    oinput.style.opacity = "0.4";
    oinput.style.border = "1px solid gray"
})
oinput.addEventListener("mouseout", function () {
    oinput.style.background = " transparent";
    oinput.style.border = "none"
})
oinput.addEventListener("click", function () {
    oinput.style.opacity = "1";
})

//会动的藍杠
let timer = null;
function move(id, target) {
    clearInterval(timer);

    let oid = document.getElementById(id);
     timer = setInterval(function () {
        let loc = oid.offsetLeft;
        speed = -(loc - target) / 8;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (loc == target) {
            clearInterval(timer);
        } else {
            oid.style.left = loc + speed + "px";
        }
    }, 20)
}

let oban = document.getElementsByClassName("ban");
for (let i = 0; i < oban.length; i++) {
    oban[i].index = i;
    oban[i].local = oban[i].offsetLeft;
    oban[i].addEventListener("mouseover", function () {
         move("point", oban[i].local);
    })
}


