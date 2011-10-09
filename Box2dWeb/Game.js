var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2World = Box2D.Dynamics.b2World,
    b2MassData = Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
    b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
var player = {};
var SCALE = 30;
var NULL_CENTER = {
    x: null,
    y: null
};

function Game(intervalRate, adaptive, width, height, scale) {
    this.intervalRate = parseInt(intervalRate);
    this.adaptive = adaptive;
    this.width = width;
    this.height = height;
    this.scale = scale;

    this.bodiesMap = {};

    this.world = new b2World(
    new b2Vec2(0, 50) //gravity
    , true //allow sleep
    );

    this.fixDef = new b2FixtureDef;
    this.fixDef.density = 1.0;
    this.fixDef.friction = 0.5;
    this.fixDef.restitution = 0.2;
}

// Game.prototype.buildGround = function() {
//   //create ground
//   var bodyDef = new b2BodyDef;
//   bodyDef.type = b2Body.b2_staticBody;
// 
//   // positions the center of the object (not upper left!)
//   bodyDef.position.x = this.width / 2 / this.scale;
//   bodyDef.position.y = this.height / 2 / this.scale;
//   bodyDef.angle = (45*Math.PI) / 180; // radians
//   bodyDef.userData = '__BODY__';
// 
//   this.fixDef.shape = new b2PolygonShape;
// 
//   // half width, half height. eg actual height here is 1 unit
//   this.fixDef.shape.SetAsBox((this.width-(this.width*0.1) / this.scale) / 2, (10/this.scale) / 2);
//   this.registerBody(bodyDef).CreateFixture(this.fixDef);
// }
Game.prototype.update = function() {
    var start = Date.now();
    var stepRate = (this.adaptive) ? (now - this.lastTimestamp) / 1000 : (1 / this.intervalRate);
    this.world.Step(
    stepRate //frame-rate
    , 10 //velocity iterations
    , 10 //position iterations
    );
    this.world.ClearForces();
    return (Date.now() - start);
}

Game.prototype.getState = function() {
    var state = {};
    for (var b = this.world.GetBodyList(); b; b = b.m_next) {
        if (b.IsActive() && typeof b.GetUserData() !== 'undefined' && b.GetUserData() != null) {
            state[b.GetUserData()] = this.getBodySpec(b);
        }
    }
    return state;
}

Game.prototype.getBodySpec = function(b) {
    return {
        x: b.GetPosition().x,
        y: b.GetPosition().y,
        a: b.GetAngle(),
        c: {
            x: b.GetWorldCenter().x,
            y: b.GetWorldCenter().y
        }
    };
}

Game.prototype.setBodies = function(bodyEntities) {
    var bodyDef = new b2BodyDef;

    for (var id in bodyEntities) {
        var entity = bodyEntities[id];

        bodyDef.type = (!entity.dynamic) ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;

        bodyDef.position.x = entity.x;
        bodyDef.position.y = entity.y;
        bodyDef.userData = entity.id;
        bodyDef.angle = entity.angle;
        var body = this.registerBody(bodyDef);

        if (entity.radius) {
            this.fixDef.shape = new b2CircleShape(entity.radius);
            body.CreateFixture(this.fixDef);
        } else if (entity.polys) {
            for (var j = 0; j < entity.polys.length; j++) {
                var points = entity.polys[j];
                var vecs = [];
                for (var i = 0; i < points.length; i++) {
                    var vec = new b2Vec2();
                    vec.Set(points[i].x, points[i].y);
                    vecs[i] = vec;
                }
                this.fixDef.shape = new b2PolygonShape;
                this.fixDef.shape.SetAsArray(vecs, vecs.length);
                body.CreateFixture(this.fixDef);
            }
        } else {
            this.fixDef.shape = new b2PolygonShape;
            this.fixDef.shape.SetAsBox(entity.halfWidth, entity.halfHeight);
            body.fixture = body.CreateFixture(this.fixDef);
            if (entity.id == "player") {
                //setup sensors
                player.body = body;
                console.log("making player")
                this.setupPlayer(player)
            }
        }
    }
    this.ready = true;
}

Game.prototype.registerBody = function(bodyDef) {
    var body = this.world.CreateBody(bodyDef);
    this.bodiesMap[body.GetUserData()] = body;
    return body;
}

Game.prototype.addRevoluteJoint = function(body1Id, body2Id, params) {
    var body1 = this.bodiesMap[body1Id];
    var body2 = this.bodiesMap[body2Id];
    var joint = new b2RevoluteJointDef();
    joint.Initialize(body1, body2, body1.GetWorldCenter());
    if (params && params.motorSpeed) {
        joint.motorSpeed = params.motorSpeed;
        joint.maxMotorTorque = params.maxMotorTorque;
        joint.enableMotor = true;
    }
    this.world.CreateJoint(joint);
}

Game.prototype.applyImpulse = function(bodyId, degrees, power) {
    var body = this.bodiesMap[bodyId];
    body.ApplyImpulse(new b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power, Math.sin(degrees * (Math.PI / 180)) * power), body.GetWorldCenter());
}

Game.prototype.addContactListener = function(callbacks) {
    var listener = new Box2D.Dynamics.b2ContactListener;
    if (callbacks.BeginContact) listener.BeginContact = function(contact) {
        callbacks.BeginContact(contact.GetFixtureA().GetBody().GetUserData(), contact.GetFixtureB().GetBody().GetUserData());
    }
    if (callbacks.EndContact) listener.EndContact = function(contact) {
        callbacks.EndContact(contact.GetFixtureA().GetBody().GetUserData(), contact.GetFixtureB().GetBody().GetUserData());
    }
    if (callbacks.PostSolve) listener.PostSolve = function(contact, impulse) {
        callbacks.PostSolve(contact.GetFixtureA().GetBody().GetUserData(), contact.GetFixtureB().GetBody().GetUserData(), impulse.normalImpulses[0]);
    }
    this.world.SetContactListener(listener);
}

Game.prototype.setupPlayer = function(body) {
    var fixDef = new b2FixtureDef;
    fixDef.shape = new b2PolygonShape;
    fixDef.density = 0;
    fixDef.shape.SetAsOrientedBox((5 / SCALE), (1 / SCALE), new b2Vec2(0, .4), 0);
    fixDef.isSensor = true;
    player.footSensorFixture = player.body.CreateFixture(fixDef);
    player.footSensorFixture.SetUserData(3);
    player.numFootContacts = 0;

    //head sensor on player.body
    fixDef.shape = new b2PolygonShape;
    fixDef.density = 0;
    fixDef.shape.SetAsOrientedBox((9 / SCALE), (1 / SCALE), new b2Vec2(0, -.4), 0);
    fixDef.isSensor = true;
    player.headSensorFixture = player.body.CreateFixture(fixDef);
    player.headSensorFixture.SetUserData(4);
    player.numHeadContacts = 0;

    //left sensor on player.body
    fixDef.shape = new b2PolygonShape;
    fixDef.density = 0;
    fixDef.shape.SetAsOrientedBox((1 / SCALE), (8 / SCALE), new b2Vec2(-.4, 0), 0);
    fixDef.isSensor = true;
    player.leftSensorFixture = player.body.CreateFixture(fixDef);
    player.leftSensorFixture.SetUserData(5);
    player.numLeftContacts = 0;

    //right sensor on player.body
    fixDef.shape = new b2PolygonShape;
    fixDef.density = 0;
    fixDef.shape.SetAsOrientedBox((1 / SCALE), (8 / SCALE), new b2Vec2(.4, 0), 0);
    fixDef.isSensor = true;
    player.rightSensorFixture = player.body.CreateFixture(fixDef);
    player.rightSensorFixture.SetUserData(6);
    player.numRightContacts = 0;


    var SensorContactListener = new Box2D.Dynamics.b2ContactListener();
    SensorContactListener.BeginContact = function(contact) {
        //check if fixture A was the foot sensor
        var fixtureUserData = contact.GetFixtureA().GetUserData();
        if (fixtureUserData == 3) player.numFootContacts++;
        if (fixtureUserData == 4) player.numHeadContacts++;
        if (fixtureUserData == 5) player.numLeftContacts++;
        if (fixtureUserData == 6) player.numRightContacts++;

        //check if fixture B was the foot sensor
        fixtureUserData = contact.GetFixtureB().GetUserData();
        if (fixtureUserData == 3) player.numFootContacts++;
        if (fixtureUserData == 4) player.numHeadContacts++;
        if (fixtureUserData == 5) player.numLeftContacts++;
        if (fixtureUserData == 6) player.numRightContacts++;


    }

    SensorContactListener.EndContact = function(contact) {
        //check if fixture A was the foot sensor
        var fixtureUserData = contact.GetFixtureA().GetUserData();
        if (fixtureUserData == 3) player.numFootContacts--;
        if (fixtureUserData == 4) player.numHeadContacts--;
        if (fixtureUserData == 5) player.numLeftContacts--;
        if (fixtureUserData == 6) player.numRightContacts--;
        //check if fixture B was the foot sensor
        fixtureUserData = contact.GetFixtureB().GetUserData();
        if (fixtureUserData == 3) player.numFootContacts--;
        if (fixtureUserData == 4) player.numHeadContacts--;
        if (fixtureUserData == 5) player.numLeftContacts--;
        if (fixtureUserData == 6) player.numRightContacts--;
    }
    this.world.SetContactListener(SensorContactListener)

    //player fxns
    player.jump = function(degrees) {
        // degrees = 90
        power = 20
        // console.log("jump", degrees, Math.sin(degrees * (Math.PI / 180)) * power, this.wasHanging)
        if (player.jumpNextFrame) {
            // power = 50
            power = 6
            degrees = -90
            player.jumpNextFrame = false;
            // console.log("jumped next frame")
            player.body.ApplyImpulse(new b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power, Math.sin(degrees * (Math.PI / 180)) * power), player.body.GetWorldCenter());
        }
        yV = player.body.GetLinearVelocity().y
        if (yV < 1 && yV > -1) {
            // console.log("jummmpin")
            player.body.fixture.SetRestitution(0.3)
            player.body.ApplyImpulse(new b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power, Math.sin(degrees * (Math.PI / 180)) * power), player.body.GetWorldCenter());
            setTimeout(function() {
                player.body.fixture.SetRestitution(0)
            }, 20)
        }
    }
    player.hang = function() {
        // console.log("hanging", player.numHeadContacts)
        this.isHanging = true;
        if (!this.wasHanging) {
            this.wasHanging = true;
            // console.log("wasnothanging", world)
            player.body.ApplyImpulse(new b2Vec2(0, this.body.GetMass() * game.world.GetGravity().y * -1), player.body.GetWorldCenter())
        } else {
            player.body.ApplyForce(new b2Vec2(0, this.body.GetMass() * game.world.GetGravity().y * -2), player.body.GetWorldCenter())
        }
    }
    player.move = function(dir) {
        vel = player.body.GetLinearVelocity();
        vel.x = 6 * dir
        player.body.SetAwake(true);
        player.body.SetLinearVelocity(vel);
    }
}

Game.prototype.removeBody = function(id) {
    this.world.DestroyBody(this.bodiesMap[id]);
}