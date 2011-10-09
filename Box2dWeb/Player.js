// function Player(options) {
//     // Entity.prototype.init.call(options);
//     options.color = "pink"
//     console.log("init x", options.x)
//     this.init(options);
//     // this.setupSensors();
// }
// console.log("makin person")
// Player.prototype = new Entity();
// console.log("makin person const")

// Player.prototype.constructor = Player;
// console.log("makin person draw")

// Player.prototype.draw = function(ctx) {
//     ctx.save();
//     ctx.translate(this.x * SCALE, this.y * SCALE);
//     ctx.rotate(this.angle);
//     ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);
//     ctx.fillStyle = this.getColor();
//     ctx.fillRect((this.x - this.halfWidth) * SCALE, (this.y - this.halfHeight) * SCALE, (this.halfWidth * 2) * SCALE, (this.halfHeight * 2) * SCALE);
//     ctx.restore();
//     // console.log("daring player", this.x, this.y)
//     Entity.prototype.draw.call(this, ctx);
// }
// console.log("makin person done")

// // function setupPlayer() { //create the player
// //     var bodyDef = new b2BodyDef;
// //     var fixDef = new b2FixtureDef;
// //     bodyDef.type = b2Body.b2_dynamicBody;
// //     fixDef.shape = new b2PolygonShape;
// //     fixDef.density = .5;
// //     fixDef.shape.SetAsBox((10 / SCALE), (10 / SCALE));
// //     fixDef.restitution = 0;
// //     bodyDef.position.x = 2;
// //     bodyDef.position.y = 1;
// //     player = world.CreateBody(bodyDef);
// //     player.fixture = player.CreateFixture(fixDef);
// Player.prototype.setupSensors = function() {
//     // foot sensor on player
//     // footSensorFixtureDef = new b2FixtureDef;
//     var fixDef = new b2FixtureDef;

//     fixDef.shape = new b2PolygonShape;
//     fixDef.density = 0;
//     fixDef.shape.SetAsOrientedBox((5 / SCALE), (1 / SCALE), new b2Vec2(0, .4), 0);
//     fixDef.isSensor = true;
//     this.footSensorFixture = this.CreateFixture(fixDef);
//     this.footSensorFixture.SetUserData(3);
//     this.numFootContacts = 0;

//     //head sensor on player
//     fixDef.shape = new b2PolygonShape;
//     fixDef.density = 0;
//     fixDef.shape.SetAsOrientedBox((9 / SCALE), (1 / SCALE), new b2Vec2(0, -.4), 0);
//     fixDef.isSensor = true;
//     this.headSensorFixture = this.CreateFixture(fixDef);
//     this.headSensorFixture.SetUserData(4);
//     this.numHeadContacts = 0;

//     //left sensor on player
//     fixDef.shape = new b2PolygonShape;
//     fixDef.density = 0;
//     fixDef.shape.SetAsOrientedBox((1 / SCALE), (8 / SCALE), new b2Vec2(-.4, 0), 0);
//     fixDef.isSensor = true;
//     this.leftSensorFixture = this.CreateFixture(fixDef);
//     this.leftSensorFixture.SetUserData(5);
//     this.numLeftContacts = 0;

//     //right sensor on player
//     fixDef.shape = new b2PolygonShape;
//     fixDef.density = 0;
//     fixDef.shape.SetAsOrientedBox((1 / SCALE), (8 / SCALE), new b2Vec2(.4, 0), 0);
//     fixDef.isSensor = true;
//     this.rightSensorFixture = this.CreateFixture(fixDef);
//     this.rightSensorFixture.SetUserData(6);
//     this.numRightContacts = 0;


//     var SensorContactListener = new Box2D.Dynamics.b2ContactListener();
//     SensorContactListener.BeginContact = function(contact) {
//         //check if fixture A was the foot sensor
//         var fixtureUserData = contact.GetFixtureA().GetUserData();
//         if (fixtureUserData == 3) this.numFootContacts++;
//         if (fixtureUserData == 4) this.numHeadContacts++;
//         if (fixtureUserData == 5) this.numLeftContacts++;
//         if (fixtureUserData == 6) this.numRightContacts++;

//         //check if fixture B was the foot sensor
//         fixtureUserData = contact.GetFixtureB().GetUserData();
//         if (fixtureUserData == 3) this.numFootContacts++;
//         if (fixtureUserData == 4) this.numHeadContacts++;
//         if (fixtureUserData == 5) this.numLeftContacts++;
//         if (fixtureUserData == 6) this.numRightContacts++;
//         console.log(this.numRightContacts, this.numFootContacts, this.numHeadContacts, this.numLeftContacts)

//     }

//     SensorContactListener.EndContact = function(contact) {
//         //check if fixture A was the foot sensor
//         var fixtureUserData = contact.GetFixtureA().GetUserData();
//         if (fixtureUserData == 3) this.numFootContacts--;
//         if (fixtureUserData == 4) this.numHeadContacts--;
//         if (fixtureUserData == 5) this.numLeftContacts--;
//         if (fixtureUserData == 6) this.numRightContacts--;
//         //check if fixture B was the foot sensor
//         fixtureUserData = contact.GetFixtureB().GetUserData();
//         if (fixtureUserData == 3) this.numFootContacts--;
//         if (fixtureUserData == 4) this.numHeadContacts--;
//         if (fixtureUserData == 5) this.numLeftContacts--;
//         if (fixtureUserData == 6) this.numRightContacts--;
//     }
//     world.SetContactListener(SensorContactListener)
// }

    // player.jump = function(degrees) {
    //     // degrees = 90
    //     power = 20
    //     // console.log("jump", degrees, Math.sin(degrees * (Math.PI / 180)) * power, this.wasHanging)
    //     if(player.jumpNextFrame) {
    //         // power = 50
    //         power = 6
    //         degrees = -90
    //         player.jumpNextFrame = false;
    //         console.log("jumped next frame")
    //         player.ApplyImpulse(new b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power, Math.sin(degrees * (Math.PI / 180)) * power), player.GetWorldCenter());
    //     }
    //     yV = player.GetLinearVelocity().y
    //     if (yV < 1 && yV > -1) {
    //         console.log("jummmpin")
    //         player.fixture.SetRestitution(0.3)
    //         player.ApplyImpulse(new b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power, Math.sin(degrees * (Math.PI / 180)) * power), player.GetWorldCenter());
    //         setTimeout(function() {
    //             player.fixture.SetRestitution(0)
    //         }, 20)
    //     }
    // }
    // player.hang = function(){
    //     // console.log("hanging", player.numHeadContacts)
    //     this.isHanging = true;
    //     if(!this.wasHanging){
    //         this.wasHanging = true;
    //         console.log("wasnothanging")
    //         this.ApplyImpulse(new b2Vec2(0, this.GetMass() * world.GetGravity().y * -1), this.GetWorldCenter())
    //     } else{
    //         this.ApplyForce(new b2Vec2(0, this.GetMass() * world.GetGravity().y * -2), this.GetWorldCenter())
    //     }
    //     // this.isHanging = true;
    //     // vel = this.GetLinearVelocity();
    //     // vel.y = 0
    //     // this.SetAwake(true);
    //     // this.SetLinearVelocity(vel);
    //     // console.log(this.fixture.GetDensity())
    //     // console.log("grav", world.GetGravity(), this.GetMass(), this.GetMass() * world.GetGravity())
    //     // console.log(new b2Vec2(this.GetMass() * world.GetGravity().x, this.GetMass() * world.GetGravity().y), this.GetWorldCenter())
    //     // console.log(this.GetMass() * world.GetGravity().y * -.5)
    //     // massdata = this.GetMassData();
    //     // massdata.mass = 0
    //     // this.SetMassData(massdata)
    //     // console.log(world.GetGravity())
    //     // console.log(this.fixture.GetDensity())
    //     // this.jump(-90)
    // }
    // player.move = function(dir){
    //     vel = this.GetLinearVelocity();
    //     vel.x = 6 * dir
    //     this.SetAwake(true);
    //     this.SetLinearVelocity(vel);
    // }
