document.addEventListener("click", printMousePos);

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var width = canvas.width;
var height = canvas.height;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, width, height);

var nodes = [];

class Node {
    constructor(x, y) {
        this.posX = x;
        this.posY = y;

        console.log("created new node");
    }

    draw() {
        console.log("Drawing " + this.posX + " " + this.posY)
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, 10, 0, 2*Math.PI);
        ctx.fill();
    }
}

function drawNodes() {
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].draw();
    }    
}

function distanceBetween(obj1, obj2) {
    // returns distance between two nodes
    return Math.sqrt((obj2.posX - obj1.posX)**2 + (obj2.posY - obj1.posY)**2);
}

function printMousePos(event) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText("clientX: " + event.clientX, 5, 50);
    ctx.fillText("clientY: " + event.clientY, 5, 100);

    var posX = event.pageX;
    var posY = event.pageY;

    console.log ("||| " + posX + " " + posY + " |||");

    for (var i = 0; i < nodes.length; i++) {
        if (posX > nodes[i].posX - 10 && posX < nodes[i].posX + 10 &&
            posY > nodes[i].posY - 10 && posY < nodes[i].posY + 10) {
            nodes.splice(i, 1);
            drawNodes();
            ctx.fillText("nodes: " + (nodes.length), 5, 150);
            return;
        }
    }

    nodes.push(new Node(posX, posY));
    drawNodes();

    ctx.fillText("nodes: " + (nodes.length), 5, 150);
    ctx.fillText("Distance: " + distanceBetween(nodes[0], nodes[1]), 5, 200);

};
    

   


