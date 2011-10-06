var player;
$(function() {

    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function( /* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var world;
    var b2Vec2 = Box2D.Common.Math.b2Vec2,
        b2BodyDef = Box2D.Dynamics.b2BodyDef,
        b2Body = Box2D.Dynamics.b2Body,
        b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
        b2Fixture = Box2D.Dynamics.b2Fixture,
        b2World = Box2D.Dynamics.b2World,
        b2MassData = Box2D.Collision.Shapes.b2MassData,
        b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
        b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
        b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    var moveState = 0;
    var commandButton = false,
        shiftButton = false,
        spaceBar = false,
        rightArrow = false,
        leftArrow = false,
        upArrow = false;
    var numFootContacts = 0;

    world = new b2World(
    new b2Vec2(0, 50) //gravity
    , true //allow sleep
    );

    var SCALE = 30;

    var fixDef = new b2FixtureDef;
    fixDef.density = 1.0;
    fixDef.friction = 0.5;
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
    fixDef.shape.SetAsBox((600 / SCALE) / 2, (10 / SCALE) / 2);
    world.CreateBody(bodyDef).CreateFixture(fixDef);

    //create the player
    bodyDef.type = b2Body.b2_dynamicBody;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(.3, .3);
    fixDef.restitution = 0;
    bodyDef.position.x = 2;
    bodyDef.position.y = 1;
    // fixDef.density = 10;
    // bodyDef.restitution = 0;
    // bodyDef.restitution = 0;
    player = world.CreateBody(bodyDef);
    player.fixture = player.CreateFixture(fixDef);

    //foot sensor on player
    // footSensorFixtureDef = new b2FixtureDef;
    fixDef.shape = new b2PolygonShape;
    fixDef.density = 1;
    fixDef.shape.SetAsOrientedBox(0.1, 0.1, new b2Vec2(0, .3), 0);
    fixDef.isSensor = true;
    player.footSensorFixture = player.CreateFixture(fixDef);
    player.footSensorFixture.SetUserData(3);
    player.numFootContacts = 0;



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
            // case 38:
            //     upArrow = !upArrow;
            //     break;
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
            // case 38:
            //     upArrow = !upArrow;
            //     break;
        default:
            break;
        }
    }
    // downmap = {
    //     "16": function() {
    //         shiftButton = true;
    //     },
    //     "91": function() {
    //         commandButton = true;
    //     },
    //     "32": function() {
    //         spaceBar = true;
    //         jump();
    //     },
    //     "39": function() {
    //         rightArrow = true;
    //         moveState = 1;
    //     },
    //     "37": function() {
    //         leftArrow = true;
    //         moveState = -1;
    //     },
    //     "38": function() {
    //         upArrow = true;
    //     }
    // };
    // upmap = {
    //     "16": function() {
    //         shiftButton = false;
    //     },
    //     "91": function() {
    //         commandButton = false;
    //     },
    //     "32": function() {
    //         spaceBar = false;
    //     },
    //     "39": function() {
    //         rightArrow = false;
    //         moveState = 0;
    //     },
    //     "37": function() {
    //         leftArrow = false;
    //         moveState = 0;
    //     },
    //     "38": function() {
    //         upArrow = false;
    //     }
    // };
    // function route(e) {
    //     // e.stop()
    //     // console.log(e.keyCode)
    //     var fxn = (e.type == "keydown") ? downmap[e.keyCode + ""] : upmap[e.keyCode + ""]
    //     if (fxn) {
    //         fxn();
    //     }
    // }

    function jump() {
        degrees = 90
        power = 35
        // console.log(player.fixture.GetRestitution())
        yV = player.GetLinearVelocity().y
        if (yV < 1 && yV > -1) {
            player.fixture.SetRestitution(0.3)
            player.ApplyImpulse(new b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power, Math.sin(degrees * (Math.PI / 180)) * power), player.GetWorldCenter());
            setTimeout(function() {
                player.fixture.SetRestitution(0)
            }, 20)
        }
    }

    var FootSensorContactListener = new Box2D.Dynamics.b2ContactListener();
    FootSensorContactListener.BeginContact = function(contact) {
        //check if fixture A was the foot sensor
        var fixtureUserData = contact.GetFixtureA().GetUserData();
        if (fixtureUserData == 3) numFootContacts++;
        //check if fixture B was the foot sensor
        fixtureUserData = contact.GetFixtureB().GetUserData();
        if (fixtureUserData == 3) numFootContacts++;
    }

    FootSensorContactListener.EndContact = function(contact) {
        //check if fixture A was the foot sensor
        var fixtureUserData = contact.GetFixtureA().GetUserData();
        if (fixtureUserData == 3) numFootContacts--;
        //check if fixture B was the foot sensor
        fixtureUserData = contact.GetFixtureB().GetUserData();
        if (fixtureUserData == 3) numFootContacts--;
    }
    world.SetContactListener(FootSensorContactListener)
// var movingPower = 2
// function moveRight() {
//     degrees = 0
//     // player.fixture.SetRestitution(0.3)
//     // player.ApplyImpulse(new Box2D.Common.Math.b2Vec2(Math.cos(degrees * (Math.PI / 180)) * movingPower, Math.sin(degrees * (Math.PI / 180)) * movingPower), player.GetWorldCenter());
//     player.SetLinearVelocity({
//         x: 10,
//         y: player.GetLinearVelocity().y
//     })
//     console.log("linearVX", player.GetLinearVelocity().x)
//     // setTimeout(function() {
//     //     player.fixture.SetRestitution(0)
//     // }, 20)
// }
// function moveLeft() {
//     degrees = 180
//     // player.fixture.SetRestitution(0.3)
//     // player.ApplyImpulse(new Box2D.Common.Math.b2Vec2(Math.cos(degrees * (Math.PI / 180)) * movingPower, Math.sin(degrees * (Math.PI / 180)) * movingPower), player.GetWorldCenter());
//     player.SetLinearVelocity({
//         x: -10,
//         y: player.GetLinearVelocity().y
//     })
//     // setTimeout(function() {
//     //     player.fixture.SetRestitution(0)
//     // }, 20)
// }

function update() {
    world.Step(
    1 / 60, //frame-rate
    10, //velocity iterations
    10 //position iterations
    );
    world.DrawDebugData();
    world.ClearForces();

    // movement
    vel = player.GetLinearVelocity();
    desiredVel = 0;
    // console.log(moveState)
    // switch (moveState) {
    // case -1:
    //     desiredVel = -5//Math.max(vel.x - 0.1, -5);
    //     break;
    // case 1:
    //     desiredVel = 5//Math.min(vel.x + 0.1, 5);
    //     break;
    // default:
    //     break;
    // }
// console.log("Can I jump here?", numFootContacts);

    if (rightArrow) desiredVel = 6 //Math.min(vel.x + 1, 6)
    if (leftArrow) desiredVel = -6 //Math.max(vel.x - 1, -6)
    // console.log("desiredVel", desiredVel/*, moveState, vel.x, rightArrow, leftArrow*/)
    if (desiredVel) {
        velChange = desiredVel - vel.x;
        impulse = player.GetMass() * velChange; //disregard time factor
        player.ApplyImpulse(new b2Vec2(impulse, 0), player.GetWorldCenter());
    }
    if (spaceBar && numFootContacts) jump()

    requestAnimFrame(update);
} // update()
requestAnimFrame(update);



})