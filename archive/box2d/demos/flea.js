var world;
var ctx;
var canvasWidth;
var canvasHeight;
var canvasTop;
var canvasLeft;
var player;

function drawWorld(world, context) {
    for (var j = world.m_jointList; j; j = j.m_next) {
        drawJoint(j, context);
    }
    for (var b = world.m_bodyList; b; b = b.m_next) {
        for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
            drawShape(s, context);
        }
    }
}

function drawJoint(joint, context) {
    var b1 = joint.m_body1;
    var b2 = joint.m_body2;
    var x1 = b1.m_position;
    var x2 = b2.m_position;
    var p1 = joint.GetAnchor1();
    var p2 = joint.GetAnchor2();
    context.strokeStyle = '#00eeee';
    context.beginPath();
    switch (joint.m_type) {
    case b2Joint.e_distanceJoint:
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        break;

    case b2Joint.e_pulleyJoint:
        // TODO
        break;

    default:
        if (b1 == world.m_groundBody) {
            context.moveTo(p1.x, p1.y);
            context.lineTo(x2.x, x2.y);
        } else if (b2 == world.m_groundBody) {
            context.moveTo(p1.x, p1.y);
            context.lineTo(x1.x, x1.y);
        } else {
            context.moveTo(x1.x, x1.y);
            context.lineTo(p1.x, p1.y);
            context.lineTo(x2.x, x2.y);
            context.lineTo(p2.x, p2.y);
        }
        break;
    }
    context.stroke();
}

function drawShape(shape, context) {
    context.strokeStyle = '#ffffff';
    if (shape.density == 1.0) {
        context.fillStyle = "red";
    } else {
        context.fillStyle = "black";
    }
    context.beginPath();
    switch (shape.m_type) {
    case b2Shape.e_circleShape:
        {
            var circle = shape;
            var pos = circle.m_position;
            var r = circle.m_radius;
            var segments = 16.0;
            var theta = 0.0;
            var dtheta = 2.0 * Math.PI / segments;

            // draw circle
            context.moveTo(pos.x + r, pos.y);
            for (var i = 0; i < segments; i++) {
                var d = new b2Vec2(r * Math.cos(theta), r * Math.sin(theta));
                var v = b2Math.AddVV(pos, d);
                context.lineTo(v.x, v.y);
                theta += dtheta;
            }
            context.lineTo(pos.x + r, pos.y);

            // draw radius
            context.moveTo(pos.x, pos.y);
            var ax = circle.m_R.col1;
            var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
            context.lineTo(pos2.x, pos2.y);
        }
        break;
    case b2Shape.e_polyShape:
        {
            var poly = shape;
            var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
            context.moveTo(tV.x, tV.y);
            for (var i = 0; i < poly.m_vertexCount; i++) {
                var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
                context.lineTo(v.x, v.y);
            }
            context.lineTo(tV.x, tV.y);
        }
        break;
    }
    context.fill();
    context.stroke();
}

function createWorld() {
    var worldAABB = new b2AABB();
    worldAABB.minVertex.Set(-1000, -1000);
    worldAABB.maxVertex.Set(1000, 1000);
    var gravity = new b2Vec2(0, 300);
    var doSleep = true;
    world = new b2World(worldAABB, gravity, doSleep);
    createGround(world);
    return world;
}

function createGround(world) {
    var groundSd = new b2BoxDef();
    groundSd.extents.Set(400, 30);
    groundSd.restitution = 0.0;
    var groundBd = new b2BodyDef();
    groundBd.AddShape(groundSd);
    groundBd.position.Set(400, 470);
    return world.CreateBody(groundBd);
}

function createBall(world, x, y) {
    var ballSd = new b2CircleDef();
    ballSd.density = 1.0;
    ballSd.radius = 20;
    ballSd.restitution = 0.5;
    ballSd.friction = 0.5;
    var ballBd = new b2BodyDef();
    ballBd.AddShape(ballSd);
    ballBd.position.Set(x, y);
    return world.CreateBody(ballBd);
}

function createHelloWorld() {
    createBox(world, 50, 420, 10, 10, false);
    player = createPlayer(world, 10, 10);
}

function createBox(world, x, y, width, height, fixed) {
    if (typeof(fixed) == 'undefined') fixed = true;
    var boxSd = new b2BoxDef();
    if (!fixed) boxSd.density = 1.0;
    boxSd.restitution = 0.0;
    boxSd.friction = 1.0;
    boxSd.extents.Set(width, height);
    var boxBd = new b2BodyDef();
    boxBd.AddShape(boxSd);
    boxBd.position.Set(x, y);
    return world.CreateBody(boxBd);
}

function createPlayer(world, x, y) {
    bodyDef = new b2BodyDef();
    // bodyDef.position.x = (x) / physScale;
    // bodyDef.position.y = (y) / physScale;
    bodyDef.position.Set(x, y);
    boxDef = new b2BoxDef();
    boxDef.extents.Set(10, 10);
    // boxSd.extents.Set(10, 10);
    boxDef.density = 1.0; //Because the density is at higher then 0 it moves.
    boxDef.friction = 0.3;
    boxDef.restitution = 0.2;
    // bodyDef.userData = new PlayerBox();
    bodyDef.userData.name = "Player";
    // bodyDef.userData.width = physScale * 2 * GetRealWH(width);
    // bodyDef.userData.height = physScale * 2 * GetRealWH(height);
    // body = world.CreateBody(bodyDef);
    // body.SetBullet(true); //Tells flash to treat it like a bullet (Continuous collision detection.)
    bodyDef.AddShape(boxDef);
    // bodyDef.SetMassFromShapes();
    // bodyDef.userData.body = body; //This is the only way I know that u can get a specific body from the World.
    //If you have a better idea, tell me!
    addChild(bodyDef.userData);
    return world.CreateBody(bodyDef);
}

function step(cnt) {
    var stepping = false;
    var timeStep = 1.0 / 60;
    var iteration = 1;
    world.Step(timeStep, iteration);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawWorld(world, ctx);
    setTimeout('step(' + (cnt || 0) + ')', 10);
}

// main entry point
Event.observe(window, 'load', function() {
    world = createWorld();
    ctx = $('canvas').getContext('2d');
    var canvasElm = $('canvas');
    canvasWidth = parseInt(canvasElm.width);
    canvasHeight = parseInt(canvasElm.height);
    canvasTop = parseInt(canvasElm.style.top);
    canvasLeft = parseInt(canvasElm.style.left);

    createHelloWorld();

    // Event.observe('canvas', 'click', function(e) {
    //     if (Math.random() > 0.5) {
    //         //createBox(world, Event.pointerX(e), Event.pointerY(e), 10, 10, false);
    //         createBox(world, e.clientX, e.clientY, 10, 10, false);
    //     } else {
    //         createBall(world, Event.pointerX(e), Event.pointerY(e));
    //     }
    // });
    jQuery(window).keydown(route);
	jQuery(window).keyup(route);
    step();
});

downmap = {
	"16": function(){shiftButton = true;},
	"91": function(){commandButton = true;},
	"32": function(){
		spaceBar = true;
		// var TheChild = getChildByName("Player");//Getts a child named Box
		// var Body = TheChild.body;//Get the var body from the child.
		console.log(player)
		player.body = ApplyImpulse(new b2Vec2(0.0, -3.0), player.body.GetCenterPosition());

	},
	"39": function(){rightArrow = true;},
	"37": function(){leftArrow = true;},
	"38": function(){upArrow = true;}
};	
upmap = {
	"16": function(){shiftButton = false;},
	"91": function(){commandButton = false;},
	"32": function(){spaceBar = false;},
	"39": function(){rightArrow = false;},
	"37": function(){leftArrow = false;},
	"38": function(){upArrow = false;}
};

function route(e){
    // e.stop()
    // console.log(e.keyCode)
	var fxn = (e.type == "keydown") ? downmap[e.keyCode+""] : upmap[e.keyCode+""]
	if(fxn) {fxn();}
}