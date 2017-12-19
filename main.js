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

var diagnostic = 1;

class Node {
    constructor(x, y) {
        this.posX = x;
        this.posY = y;
    }

    draw() {
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

function drawLine(obj1, obj2) {
    // Draws a line from obj1 to obj2
    ctx.beginPath();
    ctx.moveTo(obj1.posX, obj1.posY);
    ctx.lineTo(obj2.posX, obj2.posY);
    ctx.stroke();

    var midpoint = [(obj1.posX + obj2.posX) / 2, (obj1.posY + obj2.posY) / 2];
    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    ctx.fillText(Math.floor(distanceBetween(obj1, obj2)), midpoint[0], midpoint[1]);
    ctx.textAlign = "left";
}

function diagnosticText() {
    ctx.font = '30px Arial';
    ctx.fillText("clientX: " + event.clientX, 5, 50);
    ctx.fillText("clientY: " + event.clientY, 5, 100);
    ctx.fillText("nodes: " + (nodes.length), 5, 150);

}

function prim() {
    var included_nodes = [nodes[0]]
    var not_included_nodes = nodes.slice();
    not_included_nodes.splice(0, 1);
    var minimum_distance = distanceBetween(nodes[0], nodes[1]);
    var next_edge = [0, 0];
    edges = [];

    for (var x = not_included_nodes.length; x > 0; x--) {

        for (var i = 0; i < included_nodes.length; i++) {
            for (var j = 0; j < not_included_nodes.length; j++) {
                if (distanceBetween(included_nodes[i], not_included_nodes[j]) < minimum_distance) {
                    next_edge = [i, j];
                }
            }
        }

        edges.push([included_nodes[next_edge[0]], not_included_nodes[next_edge[1]]]);
        included_nodes.push(not_included_nodes[next_edge[1]]);
        not_included_nodes.splice(next_edge[1], 1);
    }
}

function drawRoute() {
    for (var i = 0; i < edges.length; i++) {
        drawLine(edges[i][0], edges[i][1]);
    }
}

function printMousePos(event) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'black';

    var posX = event.pageX;
    var posY = event.pageY;

    for (var i = 0; i < nodes.length; i++) {
        if (posX > nodes[i].posX - 10 && posX < nodes[i].posX + 10 &&
            posY > nodes[i].posY - 10 && posY < nodes[i].posY + 10) {
            nodes.splice(i, 1);
            drawNodes();
            if (nodes.length > 1) {
                prim();
                drawRoute();
            }
            if (diagnostic) diagnosticText();
            return;
        }
    }

    nodes.push(new Node(posX, posY));
    drawNodes();
    if (nodes.length > 1) {
        prim();
        drawRoute();
    }
    
    if (diagnostic) diagnosticText();
};
    

   


