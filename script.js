"use strict";

console.log("hello");

const toolContainer = document.querySelector("#left");

let classes = [];
let subjects = [];

//what is needed for a tool icon
    //tool link
    //image
    //tool title

class Tool {

    constructor(link, image, title, subject, course) {
        this.subject = subject;
        this.course = course;
        this.link = link;
        this.image = image;
        this.title = title;
    }

    getImage() {
        return this.image;
    }

    getSubject() {
        return this.subject;
    }

    getCourse() {
        return this.course;
    }

    pushTool() {
        let newToolA = document.createElement("a");
        newToolA.href = this.link;
        newToolA.classList.add("tool_home_icon_container");

        let newToolDiv = document.createElement("div");
        newToolDiv.classList.add("tool_home_icon");
        newToolDiv.style.background = `url('${this.image}'`;

        newToolA.appendChild(newToolDiv);

        toolContainer.appendChild(newToolA);
    }

}

let polarPractice = new Tool("./Tools/polarPractice/polarPractice.html", "./images/ghstools_thumbnail_template(250).jpg", "Polar Practice", "math", ["analysis", "iac", "precalc"]);
polarPractice.pushTool();