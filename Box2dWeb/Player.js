// function setupPlayer() { //create the player
//     var bodyDef = new b2BodyDef;
//     var fixDef = new b2FixtureDef;
//     bodyDef.type = b2Body.b2_dynamicBody;
//     fixDef.shape = new b2PolygonShape;
//     fixDef.density = .5;
//     fixDef.shape.SetAsBox((10 / SCALE), (10 / SCALE));
//     fixDef.restitution = 0;
//     bodyDef.position.x = 2;
//     bodyDef.position.y = 1;
//     player = world.CreateBody(bodyDef);
//     player.fixture = player.CreateFixture(fixDef);
//     setupSensors = function() {
//         //foot sensor on player
//         // footSensorFixtureDef = new b2FixtureDef;
//         fixDef.shape = new b2PolygonShape;
//         fixDef.density = 0;
//         fixDef.shape.SetAsOrientedBox((5 / SCALE), (1 / SCALE), new b2Vec2(0, .4), 0);
//         fixDef.isSensor = true;
//         player.footSensorFixture = player.CreateFixture(fixDef);
//         player.footSensorFixture.SetUserData(3);
//         player.numFootContacts = 0;

//         //head sensor on player
//         fixDef.shape = new b2PolygonShape;
//         fixDef.density = 0;
//         fixDef.shape.SetAsOrientedBox((9 / SCALE), (1 / SCALE), new b2Vec2(0, -.4), 0);
//         fixDef.isSensor = true;
//         player.headSensorFixture = player.CreateFixture(fixDef);
//         player.headSensorFixture.SetUserData(4);
//         player.numHeadContacts = 0;

//         //left sensor on player
//         fixDef.shape = new b2PolygonShape;
//         fixDef.density = 0;
//         fixDef.shape.SetAsOrientedBox((1 / SCALE), (8 / SCALE), new b2Vec2(-.4, 0), 0);
//         fixDef.isSensor = true;
//         player.leftSensorFixture = player.CreateFixture(fixDef);
//         player.leftSensorFixture.SetUserData(5);
//         player.numLeftContacts = 0;

//         //right sensor on player
//         fixDef.shape = new b2PolygonShape;
//         fixDef.density = 0;
//         fixDef.shape.SetAsOrientedBox((1 / SCALE), (8 / SCALE), new b2Vec2(.4, 0), 0);
//         fixDef.isSensor = true;
//         player.rightSensorFixture = player.CreateFixture(fixDef);
//         player.rightSensorFixture.SetUserData(6);
//         player.numRightContacts = 0;


//         var SensorContactListener = new Box2D.Dynamics.b2ContactListener();
//         SensorContactListener.BeginContact = function(contact) {
//             //check if fixture A was the foot sensor
//             var fixtureUserData = contact.GetFixtureA().GetUserData();
//             if (fixtureUserData == 3) player.numFootContacts++;
//             if (fixtureUserData == 4) player.numHeadContacts++;
//             if (fixtureUserData == 5) player.numLeftContacts++;
//             if (fixtureUserData == 6) player.numRightContacts++;

//             //check if fixture B was the foot sensor
//             fixtureUserData = contact.GetFixtureB().GetUserData();
//             if (fixtureUserData == 3) player.numFootContacts++;
//             if (fixtureUserData == 4) player.numHeadContacts++;
//             if (fixtureUserData == 5) player.numLeftContacts++;
//             if (fixtureUserData == 6) player.numRightContacts++;

//         }

//         SensorContactListener.EndContact = function(contact) {
//             //check if fixture A was the foot sensor
//             var fixtureUserData = contact.GetFixtureA().GetUserData();
//             if (fixtureUserData == 3) player.numFootContacts--;
//             if (fixtureUserData == 4) player.numHeadContacts--;
//             if (fixtureUserData == 5) player.numLeftContacts--;
//             if (fixtureUserData == 6) player.numRightContacts--;
//             //check if fixture B was the foot sensor
//             fixtureUserData = contact.GetFixtureB().GetUserData();
//             if (fixtureUserData == 3) player.numFootContacts--;
//             if (fixtureUserData == 4) player.numHeadContacts--;
//             if (fixtureUserData == 5) player.numLeftContacts--;
//             if (fixtureUserData == 6) player.numRightContacts--;
//         }
//         world.SetContactListener(SensorContactListener)
//     }()

//     player.jump = function(degrees) {
//         // degrees = 90
//         power = 20
//         // console.log("jump", degrees, Math.sin(degrees * (Math.PI / 180)) * power, this.wasHanging)
//         if(player.jumpNextFrame) {
//             // power = 50
//             power = 6
//             degrees = -90
//             player.jumpNextFrame = false;
//             console.log("jumped next frame")
//             player.ApplyImpulse(new b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power, Math.sin(degrees * (Math.PI / 180)) * power), player.GetWorldCenter());

//         }
//         yV = player.GetLinearVelocity().y
//         if (yV < 1 && yV > -1) {
//             console.log("jummmpin")
//             player.fixture.SetRestitution(0.3)
//             player.ApplyImpulse(new b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power, Math.sin(degrees * (Math.PI / 180)) * power), player.GetWorldCenter());
//             setTimeout(function() {
//                 player.fixture.SetRestitution(0)
//             }, 20)
//         }
//     }
//     player.hang = function(){
//         // console.log("hanging", player.numHeadContacts)
//         this.isHanging = true;
//         if(!this.wasHanging){
//             this.wasHanging = true;
//             console.log("wasnothanging")
//             this.ApplyImpulse(new b2Vec2(0, this.GetMass() * world.GetGravity().y * -1), this.GetWorldCenter())
//         } else{

//             this.ApplyForce(new b2Vec2(0, this.GetMass() * world.GetGravity().y * -2), this.GetWorldCenter())
//         }
//         // this.isHanging = true;
//         // vel = this.GetLinearVelocity();
//         // vel.y = 0
//         // this.SetAwake(true);
//         // this.SetLinearVelocity(vel);
//         // console.log(this.fixture.GetDensity())
//         // console.log("grav", world.GetGravity(), this.GetMass(), this.GetMass() * world.GetGravity())
//         // console.log(new b2Vec2(this.GetMass() * world.GetGravity().x, this.GetMass() * world.GetGravity().y), this.GetWorldCenter())
//         // console.log(this.GetMass() * world.GetGravity().y * -.5)
//         // massdata = this.GetMassData();
//         // massdata.mass = 0
//         // this.SetMassData(massdata)
//         // console.log(world.GetGravity())
//         // console.log(this.fixture.GetDensity())
//         // this.jump(-90)
//     }
//     player.move = function(dir){
//         vel = this.GetLinearVelocity();
//         vel.x = 6 * dir
//         this.SetAwake(true);
//         this.SetLinearVelocity(vel);
//     }

// }

// function Player(){
    
// }
// Player.build = function(def){
    
// }