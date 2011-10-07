var canvas, ctx;
var world;
var SCALE = 30;
var player;
var b2Vec2, b2BodyDef, b2Body, b2FixtureDef, b2Fixture, b2World, b2MassData, b2PolygonShape, b2CircleShape, b2DebugDraw;
var moveState;
var commandButton, shiftButton, spaceBar, rightArrow, leftArrow, upArrow;
var numFootContacts, numHeadContacts;
$(function() {

    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function( /* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    world;
    b2Vec2 = Box2D.Common.Math.b2Vec2, b2BodyDef = Box2D.Dynamics.b2BodyDef, b2Body = Box2D.Dynamics.b2Body, b2FixtureDef = Box2D.Dynamics.b2FixtureDef, b2Fixture = Box2D.Dynamics.b2Fixture, b2World = Box2D.Dynamics.b2World, b2MassData = Box2D.Collision.Shapes.b2MassData, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape, b2CircleShape = Box2D.Collision.Shapes.b2CircleShape, b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    moveState = 0;
    commandButton = false, shiftButton = false, spaceBar = false, rightArrow = false, leftArrow = false, upArrow = false;
    numFootContacts = 0;

    world = new b2World(
    new b2Vec2(0, 50) //gravity
    , true //allow sleep
    );

    var fixDef = new b2FixtureDef;
    fixDef.density = 1.0;
    fixDef.friction = 0.8;
    fixDef.restitution = 0;
    // fixDef.restitution = 0;
    var bodyDef = new b2BodyDef;

    //create ground
    bodyDef.type = b2Body.b2_staticBody;

    // positions the center of the object (not upper left!)
    bodyDef.position.x = canvas.width / 2 / SCALE;
    bodyDef.position.y = canvas.height / SCALE;

    fixDef.shape = new b2PolygonShape;

    // half width, half height. eg actual height here is 1 unit
    fixDef.shape.SetAsBox((canvas.width / SCALE) / 2, (10 / SCALE) / 2);
    world.CreateBody(bodyDef).CreateFixture(fixDef);
    setupPlayer()

    //create platform
    fixDef = new b2FixtureDef;
    fixDef.density = 1.0;
    fixDef.friction = 0.5;
    fixDef.restitution = 0;
    bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_staticBody;
    bodyDef.position.x = 200 / SCALE;
    bodyDef.position.y = 500 / SCALE;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox((200 / SCALE) / 2, (10 / SCALE) / 2);
    world.CreateBody(bodyDef).CreateFixture(fixDef);

    //create platform
    fixDef = new b2FixtureDef;
    fixDef.density = 1.0;
    fixDef.friction = 0.5;
    fixDef.restitution = 0;
    bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_staticBody;
    bodyDef.position.x = 300 / SCALE;
    bodyDef.position.y = 250 / SCALE;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox((200 / SCALE) / 2, (10 / SCALE) / 2);
    world.CreateBody(bodyDef).CreateFixture(fixDef);


    //setup debug draw
    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
    debugDraw.SetDrawScale(SCALE);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);

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

    function update() {
        world.Step(
        1 / 60, //frame-rate
        10, //velocity iterations
        10 //position iterations
        );
        world.DrawDebugData();
        world.ClearForces();
        player.SetAngle(0);
        // movement
        // vel = player.GetLinearVelocity();
        // desiredVel = 0;
        // if (rightArrow) desiredVel = Math.min(vel.x + 1.5, 6)
        // if (leftArrow) desiredVel = Math.max(vel.x - 1.5, -6)
        // console.log("desiredVel", desiredVel, vel.x /*, moveState, vel.x, rightArrow, leftArrow*/ )
        // if (desiredVel) {
        //     velChange = desiredVel - vel.x;
        //     impulse = player.GetMass() * velChange; //disregard time factor
        //     player.ApplyImpulse(new b2Vec2(impulse, 0), player.GetWorldCenter());
        // }

        if (rightArrow) player.move(1)
        if (leftArrow) player.move(-1)
        // console.log("inertia", player.GetMass())
        console.log(player.numHeadContacts)
        if (upArrow && player.numHeadContacts && !player.numLeftContacts && !player.numRightContacts) player.hang()
        else {player.isHanging = false;}
        if (spaceBar && player.numFootContacts || player.jumpNextFrame) player.jump(90)
        // console.log("player.wasHanging",player.wasHanging, player.isHanging)
        if (upArrow && spaceBar && !player.isHanging && player.wasHanging && !player.numHeadContacts) player.jumpNextFrame = true;
        if(!player.numHeadContacts) {player.wasHanging = false;}

        // else if(spaceBar && player.wasHanging && !player.numHeadContacts)
            // player.jump(-90)
        requestAnimFrame(update);
    } // update()
    requestAnimFrame(update);



})