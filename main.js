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
var total_distance = 0;
ctx.fillStyle = "black";
ctx.font = "20px Arial";
ctx.fillText("Minimum total edge weight: " + Math.round(total_distance), 5, 25);

var diagnostic = 0;

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
    return Math.sqrt((obj2.posX - obj1.posX)**2 + (obj2.posY - obj1.posY)**2);
}

function drawLine(obj1, obj2) {
    // Draws a line from obj1 to obj2
    ctx.beginPath();
    ctx.moveTo(obj1.posX, obj1.posY);
    ctx.lineTo(obj2.posX, obj2.posY);
    ctx.stroke();

    var midpoint = [(obj1.posX + obj2.posX) / 2, (obj1.posY + obj2.posY) / 2];
    var line_distance = distanceBetween(obj1, obj2);
    total_distance += line_distance;
    
    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    ctx.fillText(Math.round(line_distance), midpoint[0], midpoint[1]);
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
    var not_included_nodes = [];
    for (var i = 0; i < nodes.length; i++) {
        not_included_nodes.push(nodes[i])
    }
    not_included_nodes.splice(0, 1);
    var next_edge = [0, 0];
    edges = [];

    while (not_included_nodes.length > 0) {
        var minimum_distance = 1*10**10;
        for (var i = 0; i < included_nodes.length; i++) {
            for (var j = 0; j < not_included_nodes.length; j++) {
                var new_distance = distanceBetween(included_nodes[i], not_included_nodes[j]);
                if (new_distance < minimum_distance) {
                    minimum_distance = new_distance;
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

function post_click_actions() {
    drawNodes();
    if (nodes.length > 1) {
        prim();
        drawRoute();
    }

    ctx.font = "20px Arial";
    ctx.fillText("Minimum total edge weight: " + Math.round(total_distance), 5, 25);
    
    if (diagnostic) diagnosticText();
}

function printMousePos(event) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'black';

    var posX = event.pageX;
    var posY = event.pageY;

    total_distance = 0;

    for (var i = 0; i < nodes.length; i++) {
        if (posX > nodes[i].posX - 10 && posX < nodes[i].posX + 10 &&
            posY > nodes[i].posY - 10 && posY < nodes[i].posY + 10) {
            nodes.splice(i, 1);
            post_click_actions();
            return;
        }
    }

    nodes.push(new Node(posX, posY));
    post_click_actions();
};
    

   


