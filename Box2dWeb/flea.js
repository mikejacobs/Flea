// var canvas, ctx;
// var world;
// var SCALE = 30;
// var player;
// var b2Vec2, b2BodyDef, b2Body, b2FixtureDef, b2Fixture, b2World, b2MassData, b2PolygonShape, b2CircleShape, b2DebugDraw;
// var moveState;
var commandButton, shiftButton, spaceBar, rightArrow, leftArrow, upArrow;
// var numFootContacts, numHeadContacts;
// $(function() {
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function( /* function */ callback, /* DOMElement */ element) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

//     canvas = document.getElementById("canvas");
//     ctx = canvas.getContext("2d");
//     world;
//     b2Vec2 = Box2D.Common.Math.b2Vec2, b2BodyDef = Box2D.Dynamics.b2BodyDef, b2Body = Box2D.Dynamics.b2Body, b2FixtureDef = Box2D.Dynamics.b2FixtureDef, b2Fixture = Box2D.Dynamics.b2Fixture, b2World = Box2D.Dynamics.b2World, b2MassData = Box2D.Collision.Shapes.b2MassData, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape, b2CircleShape = Box2D.Collision.Shapes.b2CircleShape, b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
//     moveState = 0;
//     commandButton = false, shiftButton = false, spaceBar = false, rightArrow = false, leftArrow = false, upArrow = false;
//     numFootContacts = 0;
//     world = new b2World(
//     new b2Vec2(0, 50) //gravity
//     , true //allow sleep
//     );
//     var fixDef = new b2FixtureDef;
//     fixDef.density = 1.0;
//     fixDef.friction = 0.8;
//     fixDef.restitution = 0;
//     // fixDef.restitution = 0;
//     var bodyDef = new b2BodyDef;
//     //create ground
//     bodyDef.type = b2Body.b2_staticBody;
//     // positions the center of the object (not upper left!)
//     bodyDef.position.x = canvas.width / 2 / SCALE;
//     bodyDef.position.y = canvas.height / SCALE;
//     fixDef.shape = new b2PolygonShape;
//     // half width, half height. eg actual height here is 1 unit
//     fixDef.shape.SetAsBox((canvas.width / SCALE) / 2, (10 / SCALE) / 2);
//     world.CreateBody(bodyDef).CreateFixture(fixDef);
//     setupPlayer()
//     //create platform
//     fixDef = new b2FixtureDef;
//     fixDef.density = 1.0;
//     fixDef.friction = 0.5;
//     fixDef.restitution = 0;
//     bodyDef = new b2BodyDef;
//     bodyDef.type = b2Body.b2_staticBody;
//     bodyDef.position.x = 200 / SCALE;
//     bodyDef.position.y = 500 / SCALE;
//     fixDef.shape = new b2PolygonShape;
//     fixDef.shape.SetAsBox((200 / SCALE) / 2, (10 / SCALE) / 2);
//     world.CreateBody(bodyDef).CreateFixture(fixDef);
//     //create platform
//     fixDef = new b2FixtureDef;
//     fixDef.density = 1.0;
//     fixDef.friction = 0.5;
//     fixDef.restitution = 0;
//     bodyDef = new b2BodyDef;
//     bodyDef.type = b2Body.b2_staticBody;
//     bodyDef.position.x = 300 / SCALE;
//     bodyDef.position.y = 250 / SCALE;
//     fixDef.shape = new b2PolygonShape;
//     fixDef.shape.SetAsBox((200 / SCALE) / 2, (10 / SCALE) / 2);
//     world.CreateBody(bodyDef).CreateFixture(fixDef);
//     //setup debug draw
//     var debugDraw = new b2DebugDraw();
//     debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
//     debugDraw.SetDrawScale(SCALE);
//     debugDraw.SetFillAlpha(0.3);
//     debugDraw.SetLineThickness(1.0);
//     debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
//     world.SetDebugDraw(debugDraw);
//     $(window).keydown(routeDown);
//     $(window).keyup(routeUp);
//     function routeDown(e) {
//         // console.log(e.keyCode)
//         switch (e.keyCode) {
//             // case 16:
//             //     shiftButton = !shiftButton;
//             //     break;
//             // case 91:
//             //     commandButton = !commandButton;
//             //     break;
//         case 32:
//             spaceBar = true;
//             // jump()
//             break;
//         case 39:
//             rightArrow = true;
//             moveState = 1;
//             break;
//         case 37:
//             leftArrow = true;
//             moveState = -1;
//             break;
//         case 38:
//             upArrow = true;
//             break;
//         default:
//             break;
//         }
//     }
//     function routeUp(e) {
//         // console.log(e.keyCode)
//         switch (e.keyCode) {
//             // case 16:
//             //     shiftButton = !shiftButton;
//             //     break;
//             // case 91:
//             //     commandButton = !commandButton;
//             //     break;
//         case 32:
//             spaceBar = false;
//             break;
//         case 39:
//             rightArrow = false;
//             moveState = 0;
//             break;
//         case 37:
//             leftArrow = false;
//             moveState = 0;
//             break;
//         case 38:
//             upArrow = false;
//             break;
//         default:
//             break;
//         }
//     }
//     function update() {
//         world.Step(
//         1 / 60, //frame-rate
//         10, //velocity iterations
//         10 //position iterations
//         );
//         world.DrawDebugData();
//         world.ClearForces();
//         player.SetAngle(0);
//         // movement
//         // vel = player.GetLinearVelocity();
//         // desiredVel = 0;
//         // if (rightArrow) desiredVel = Math.min(vel.x + 1.5, 6)
//         // if (leftArrow) desiredVel = Math.max(vel.x - 1.5, -6)
//         // console.log("desiredVel", desiredVel, vel.x /*, moveState, vel.x, rightArrow, leftArrow*/ )
//         // if (desiredVel) {
//         //     velChange = desiredVel - vel.x;
//         //     impulse = player.GetMass() * velChange; //disregard time factor
//         //     player.ApplyImpulse(new b2Vec2(impulse, 0), player.GetWorldCenter());
//         // }
//         if (rightArrow) player.move(1)
//         if (leftArrow) player.move(-1)
//         // console.log("inertia", player.GetMass())
//         console.log(player.numHeadContacts)
//         if (upArrow && player.numHeadContacts && !player.numLeftContacts && !player.numRightContacts) player.hang()
//         else {
//             player.isHanging = false;
//         }
//         if (spaceBar && player.numFootContacts || player.jumpNextFrame) player.jump(90)
//         // console.log("player.wasHanging",player.wasHanging, player.isHanging)
//         if (upArrow && spaceBar && !player.isHanging && player.wasHanging && !player.numHeadContacts) player.jumpNextFrame = true;
//         if (!player.numHeadContacts) {
//             player.wasHanging = false;
//         }
//         // else if(spaceBar && player.wasHanging && !player.numHeadContacts)
//         // player.jump(-90)
//         requestAnimFrame(update);
//     } // update()
//     requestAnimFrame(update);

// })


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
    dynamic:false,
    x: ctx.canvas.width / 2 / SCALE,
    y: ctx.canvas.height / SCALE,
    halfHeight: 0.5,
    halfWidth: ctx.canvas.width / SCALE,
    color: 'yellow'
}, {
    id: "player",
    type: "player",
    dynamic: true,
    color: "blue",
    x: 10,
    y: 7,
    halfHeight: 5/SCALE,
    halfWidth: 5/SCALE,
    strength: 25
}, {
    id: "b1",
    x: 17,
    type: "platform",
    y: 17,
    dynamic:false,
    halfHeight: .5,
    halfWidth: 5,
    strength: 25
    // }, {
    //     id: "b2",
    //     x: 17,
    //     y: ctx.canvas.height / SCALE - 5,
    //     halfHeight: 0.25,
    //     halfWidth: 2,
    //     strength: 30
}];

var running = true;

function init() {
    for (var i = 0; i < initialState.length; i++) {
        // console.log("initial state ud", initialState[i].id)
        world[initialState[i].id] = Entity.build(initialState[i]);
        if(initialState[i].id == "player") player = world[initialState[i].id]
    }
    // console.log("world", world)
    // player = new Player({
    //     id: "player",
    //     type: "player",
    //     dynamic: true,
    //     color: "blue",
    //     x: 17,
    //     y: 20,
    //     halfHeight: .3,
    //     halfWidth: .3,
    //     strength: 25
    // });
    // world["player"] = player;
    game = new Game(60, false, canvasWidth, canvasHeight, SCALE);
    game.setBodies(world);

    // game.addContactListener({
    //     BeginContact: function(idA, idB) {
    //         console.log('b');
    //     },

    //     PostSolve: function(idA, idB, impulse) {
    //         //console.log('p');
    //         if (impulse < 0.1) return;
    //         var entityA = world[idA];
    //         var entityB = world[idB];
    //         entityA.hit(impulse, entityB);
    //         entityB.hit(impulse, entityA);
    //     }
    // });

    // setTimeout(function() {
    //     game.applyImpulse("ball", 70, 35);
    // }, 1000);
    // setTimeout(function() {
    //     init();
    // }, 10000);
}

    $(window).keydown(routeDown);
    $(window).keyup(routeUp);
    function routeDown(e) {
        // console.log(e.keyCode)
        switch (e.keyCode) {
            // case 16:
            //     shiftButton = !shiftButton;
            //     break;
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
            // case 16:
            //     shiftButton = !shiftButton;
            //     break;
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

        player.body.SetAngle(0);
        // movement
        if (rightArrow) player.move(1)
        if (leftArrow) player.move(-1)
        // console.log("inertia", player.GetMass())
        // console.log(player.numHeadContacts)
        if (upArrow && player.numHeadContacts && !player.numLeftContacts && !player.numRightContacts) player.hang()
        else {
            player.isHanging = false;
        }
        if (spaceBar && player.numFootContacts || player.jumpNextFrame) player.jump(90)
        // console.log("player.wasHanging",player.wasHanging, player.isHanging)
        if (upArrow && spaceBar && !player.isHanging && player.wasHanging && !player.numHeadContacts) player.jumpNextFrame = true;
        if (!player.numHeadContacts) {
            player.wasHanging = false;
        }
        requestAnimFrame(loop);

        // else if(spaceBar && player.wasHanging && !player.numHeadContacts)
        // player.jump(-90)
    })();
}, false);