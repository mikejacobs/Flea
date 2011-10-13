var commandButton, shiftButton, spaceBar, rightArrow, leftArrow, upArrow;
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function( /* function */ callback, /* DOMElement */ element) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

var world = {};
var bodiesState = null;
var game = null;
var once = true;
function update(animStart) {
    game.update();
    bodiesState = game.getState();

    // var graveyard = [];
    for (var id in bodiesState) {
        var entity = world[id];
        // console.log("entity update", entity.type, entity.x)
        //     if (entity && world[id].dead) {
        //         game.removeBody(id);
        //         graveyard.push(id);
        //     } else 
        if (entity) {
            entity.update(bodiesState[id]);
        }
    }

    // for (var i = 0; i < graveyard.length; i++) {
    //     delete world[graveyard[i]];
    // }
}

var ctx = document.getElementById("canvas").getContext("2d");
var canvasWidth = ctx.canvas.width;
var canvasHeight = ctx.canvas.height;

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (var id in world) {
        var entity = world[id];
        entity.draw(ctx);
    }
}

var initialState = [{
    id: "ground",
    type: "platform",
    x: ctx.canvas.width / 2 / SCALE,
    y: ctx.canvas.height / SCALE,
    halfHeight: 5/SCALE,
    halfWidth: ctx.canvas.width / SCALE,
    color: 'yellow'
}, {
    id: "player",
    type: "player",
    color: "blue",
    x: 1,
    y: 7,
    halfHeight: 5 / SCALE,
    halfWidth: 5 / SCALE,
    strength: 25
}, {
    id: "b1",
    x: 5,
    type: "platform",
    y: 17,
    halfHeight: 5/SCALE,
    halfWidth: 100/SCALE,
}, {
    id: "sh1",
    x: 10,
    type: "sidehold",
    y: 17,
    halfHeight: 100/SCALE,
    halfWidth: 5/SCALE,
    color:"green"
}, {
    id: "rightWall",
    type: "platform",
    x: ctx.canvas.width/ SCALE + 5/SCALE,
    y: 0,
    halfHeight: ctx.canvas.width / SCALE,
    halfWidth: 5 / SCALE,
    color: 'white'
}, {
    id: "leftWall",
    type: "platform",
    x: -5/SCALE,
    y: 0,
    halfHeight: ctx.canvas.width / SCALE,
    halfWidth: 5 / SCALE,
    color: 'white'
}];

var running = true;

function init() {
    for (var i = 0; i < initialState.length; i++) {
        // console.log("initial state ud", initialState[i].id)
        world[initialState[i].id] = Entity.build(initialState[i]);
        if(initialState[i].id == "player") player = world[initialState[i].id]
    }
    game = new Game(60, false, canvasWidth, canvasHeight, SCALE);
    game.setBodies(world);

}

    $(window).keydown(routeDown);
    $(window).keyup(routeUp);
    function routeDown(e) {
        // console.log(e.keyCode)
        switch (e.keyCode) {
            case 16:
                shiftButton = true;
                break;
            // case 91:
            //     commandButton = !commandButton;
            //     break;
        case 32:
            spaceBar = true;
            // jump()
            break;
        case 39:
            rightArrow = true;
            moveState = 1;
            break;
        case 37:
            leftArrow = true;
            moveState = -1;
            break;
        case 38:
            upArrow = true;
            break;
        default:
            break;
        }
    }
    function routeUp(e) {
        // console.log(e.keyCode)
        switch (e.keyCode) {
            case 16:
                shiftButton = false;
                break;
            // case 91:
            //     commandButton = !commandButton;
            //     break;
        case 32:
            spaceBar = false;
            break;
        case 39:
            rightArrow = false;
            moveState = 0;
            break;
        case 37:
            leftArrow = false;
            moveState = 0;
            break;
        case 38:
            upArrow = false;
            break;
        default:
            break;
        }
    }
var looppp = 0
document.addEventListener("DOMContentLoaded", function() {
    init();

    (function loop(animStart) {
        update(animStart);
        draw();
        // console.log(player.body.GetLinearVelocity().x)
        player.body.SetAngle(0);
        // movement
        if (rightArrow) player.move(1)
        if (leftArrow) player.move(-1)
        // console.log("inertia", player.GetMass())
        // console.log(upArrow, player.isHanging, player.wasHanging, player.numHeadContacts)
        if (upArrow && player.numHeadContacts && !player.numLeftContacts && !player.numRightContacts) player.hang()
        else {
            player.isHanging = false;
        }
        if (upArrow && (player.numRightContacts || player.numLeftContacts) && player.isHanging) player.hang()
        if (spaceBar && (player.numRightContacts || player.numLeftContacts) && !player.numHeadContacts ) player.jump(90)
        if (spaceBar && player.numFootContacts || player.jumpNextFrame) player.jump(90)
        // console.log("player.wasHanging",player.wasHanging, player.isHanging)
        if (upArrow && spaceBar && !player.isHanging && player.wasHanging && !player.numHeadContacts) player.jumpNextFrame = true;
        if (!player.numHeadContacts) {
            player.wasHanging = false;
        }
        if(!shiftButton)
            requestAnimFrame(loop);

        // else if(spaceBar && player.wasHanging && !player.numHeadContacts)
        // player.jump(-90)
    })();
}, false);