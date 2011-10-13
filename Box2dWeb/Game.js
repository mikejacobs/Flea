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
    this.fixDef.friction = 0.8;
    this.fixDef.restitution = 0;
}
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
    // if(once)
    //     console.log("body list", this.world.GetBodyList())
    // else
    //     once = false;
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
        // if(entity.type == "player") console.log("entity.x", entity.x, entity.dynamic)
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
                // player.body.fixture.density = .2
                // console.log("making player in game.js")
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

Game.prototype.setupPlayer = function(entity) {
    var fixDef = new b2FixtureDef;
    fixDef.shape = new b2PolygonShape;
    fixDef.density = 0;
    fixDef.shape.SetAsOrientedBox(entity.halfWidth/2, entity.halfHeight/2, new b2Vec2(0, .2), 0);
    fixDef.isSensor = true;
    player.footSensorFixture = player.body.CreateFixture(fixDef);
    player.footSensorFixture.SetUserData(3);
    player.numFootContacts = 0;

    //head sensor on player.body
    fixDef.shape = new b2PolygonShape;
    fixDef.density = 0;
    fixDef.shape.SetAsOrientedBox(entity.halfWidth/2, entity.halfHeight/2, new b2Vec2(0, -.2), 0);
    fixDef.isSensor = true;
    player.headSensorFixture = player.body.CreateFixture(fixDef);
    player.headSensorFixture.SetUserData(4);
    player.numHeadContacts = 0;

    //left sensor on player.body
    fixDef.shape = new b2PolygonShape;
    fixDef.density = 0;
    fixDef.shape.SetAsOrientedBox(entity.halfWidth/2, entity.halfHeight/2, new b2Vec2(-.2, 0), 0);
    fixDef.isSensor = true;
    player.leftSensorFixture = player.body.CreateFixture(fixDef);
    player.leftSensorFixture.SetUserData(5);
    player.numLeftContacts = 0;

    //right sensor on player.body
    fixDef.shape = new b2PolygonShape;
    fixDef.density = 0;
    fixDef.shape.SetAsOrientedBox(entity.halfWidth/2, entity.halfHeight/2, new b2Vec2(.2, 0), 0);
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
    SensorContactListener.PostSolve = function(contact, impulse){
        impulse = impulse.normalImpulses[0]
        // if(impulse < 0.1) return;
        entityA = world[contact.GetFixtureA().GetBody().GetUserData()]
        entityB = world[contact.GetFixtureB().GetBody().GetUserData()]
        entityA.hit(impulse, entityB);
        entityB.hit(impulse, entityA);
    }
    this.world.SetContactListener(SensorContactListener)
}

Game.prototype.removeBody = function(id) {
    this.world.DestroyBody(this.bodiesMap[id]);
}
Game.prototype.frictionOn = function(on){
    console.log(game.fixDef.friction, game)
    var friction = (on)?.7:0;
    for (b = game.world.GetBodyList(); b; b = b.m_next) {
        // console.log(b.fixture)
        if(b.fixture) b.fixture.SetFriction(friction);
    }
}