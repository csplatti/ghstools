"use strict";

console.log("hello");

const toolContainer = document.querySelector("#left");

//what is needed for a tool icon
    //tool link
    //image
    //tool title

class Tool {

    constructor(link, image, title) {
        this.link = link;
        this.image = image;
        this.title = title;
    }

    getImage() {
        return this.image;
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

let polarPractice = new Tool("../Tools/polarPractice/polarPractice.html", "./images/ghstools_thumbnail_template(250).jpg", "Polar Practice");
polarPractice.pushTool();