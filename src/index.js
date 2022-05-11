import './less/index.less'
// ideas :
// events : 
// * [ ] `wheel`
// * [ ] `load`
// * [ ] `focus`
// * [X] `drag / drop` > drag imgs to bus header = pops up alert that says img location
const header = document.querySelector(".main-navigation")
const navLinks = document.querySelectorAll("nav a");
const headerImg = document.querySelector(".intro img");

// keydown
document.addEventListener("keydown", (evt) => {
    if(evt.key === "r"){
        header.style.backgroundColor = "#FFB49C";
    }
    if(evt.key === "b"){
        header.style.backgroundColor = "#9CE9FF";
    }
    if(evt.key === "w"){
        header.style.backgroundColor = "#FFFFFF";
    }
    if(evt.key === "g"){
        header.style.backgroundColor = "#9CFFAB";
    }
    if(evt.key === "p"){
        header.style.backgroundColor = "#DA9CFF";
    }
})

// click
navLinks.forEach(link => {
    link.addEventListener("click", (evt) => {
        // console.log(evt.target.value="something")
        alert(`there is no page for "${evt.target.textContent}" at this time`)

    })
})

// mouseover
// mouseleave
const contentImgs = document.querySelectorAll(".img-content img");
header.style.zIndex = "2";
function imgZoom(img) {
    img.addEventListener("mouseover", () => {
        img.style.transform = "scale(1.1)"
        img.style.transition = "transform .6s"
    })

    img.addEventListener("mouseleave", () => {
        img.style.transform = "";
        img.style.transition = "transform .6s"
    })
}
contentImgs.forEach(img => {
    imgZoom(img);
});
const destImg = document.querySelector(".content-destination img")
imgZoom(destImg);

//dblclick
headerImg.addEventListener("dblclick", () => {
    headerImg.style.transform = "scale(1.1)";
    headerImg.style.transition = "3s";

    setTimeout(() => {
        headerImg.style.transform = "";
        headerImg.style.transition = "3s";
    }, 3000)
})

// scroll => changes "Fun Bus" Title based off position
const logoTitle = document.querySelector(".logo-heading");
const colors = ["black", "red", "orange", "yellow", "green", "blue", "purple"]
let lastPosition = 0;
let trythis = "0";
let help = trythis[0]
document.addEventListener("scroll", () => {
    lastPosition = (window.scrollY/140).toFixed(2);
    logoTitle.style.color = colors[help];
    trythis = lastPosition.toString();
    help = trythis[0]
})

// copy
const introTitle = document.querySelector(".intro h2")
document.addEventListener("copy", () => {
    let randNum = Math.floor(Math.random() * 7)
    console.log(randNum)
    introTitle.style.color = colors[randNum];
})

// wheel
// Using a wheel event so that a part of a webpage shrinks,
// is not fun as a user, I do not recommend in long term development.
const destin = document.querySelectorAll(".destination");
let scale = 1;
destin.forEach(destination => {
    destination.addEventListener("wheel", evt => {
        evt.preventDefault();

        scale = scale + evt.deltaY * -0.01; 

        //scale Math.max (.9, scale)
        // .9 => can shrink a little bit
        // 1 being the max it can shrink = auto 1, so it can't shrink
        // scale Math.min = (Math.max, 1.2)
        // 1.2 min it can increase...
        scale = Math.min(Math.max(1, scale), 1.2);

        destination.style.transform = `scale(${scale})`;
    })
})

// resize 
// when resize the background of the page will change colors, and then stop.
const pastelColors = ["#d9c0d3", "#a9a1fc", "#a2bcf7", "#b4f1a7", "#bd80fb", "#fd8fb6", "#e0f3f0", "#f18bcb", "#fae2bd"]
const bodyContent = document.querySelector("*")
window.addEventListener("resize", () => {
    let randomColorNum = Math.floor(Math.random() * 9)
    bodyContent.style.color = pastelColors[randomColorNum];

    setTimeout(() => {
        bodyContent.style.color = "";
    }, 1000)
})

//drag n drop
const desNames = document.querySelectorAll(".destination h4")
desNames.forEach(des => {
    des.classList.add("drag")
    des.setAttribute("draggable", "true");
})

const signUp = document.querySelectorAll(".btn")
signUp.forEach(btn => {
    btn.classList.add("dropzone");
})

let dragged;

document.addEventListener("dragstart", (evt) => {
    dragged = evt.target;
    evt.target.style.opacity = .5;
}, false)

document.addEventListener("dragend", (evt) => {
    evt.target.style.opacity = "";
}, false)

document.addEventListener("dragover", (evt) => {
    evt.preventDefault();
}, false)

let classes;

document.addEventListener("dragenter", (evt) => {
    classes = evt.target.className
    if(classes.includes("dropzone")) {
        evt.target.style.backgroundColor = "purple";
    }
})

document.addEventListener("dragleave", (evt) => {
    classes = evt.target.className
    if(classes.includes("dropzone")){
        evt.target.style.backgroundColor = "";
    }
})

document.addEventListener("drop", (evt) => {
    evt.preventDefault();

    classes = evt.target.className
    if(classes.includes("dropzone")){
        evt.target.style.background = "";
        dragged.style.color = "purple";
    }
})
