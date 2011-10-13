var drawFixtures = false;

function PlayerEntity(options) {
    // Entity.prototype.init.call(options);
    this.init(options)
    this.maxVel = 15
    this.halfWidth = options.halfWidth;
    this.halfHeight = options.halfHeight;
}
PlayerEntity.prototype = new Entity;
PlayerEntity.prototype.constructor = PlayerEntity;

PlayerEntity.prototype.draw = function(ctx) {
    // console.log("this.x", this.x)
    ctx.save();
    ctx.translate(this.x * SCALE, this.y * SCALE);
    ctx.rotate(this.angle);
    ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);
    ctx.fillStyle = this.getColor();
    ctx.fillRect((this.x - this.halfWidth) * SCALE, (this.y - this.halfHeight) * SCALE, (this.halfWidth * 2) * SCALE, (this.halfHeight * 2) * SCALE);
    ctx.restore();

    if (drawFixtures) {
        // console.log(player)
        for (f = player.body.GetFixtureList(); f; f = f.m_next) {
            shape = f.GetShape();
            // console.log(shape)
            // console.log(shape.m_vertices)

            var drawScale = SCALE;
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.fillStyle = "White";

            ctx.moveTo(player.x + (shape.m_vertices[0].x * drawScale), player.y + (shape.m_vertices[0].y * drawScale));
            for (var i = 1; i < shape.m_vertexCount; i++) {
                ctx.lineTo(player.x + (shape.m_vertices[i].x * drawScale), player.y + (shape.m_vertices[i].y * drawScale));
            }
            ctx.lineTo(player.x + (shape.m_vertices[0].x * drawScale), player.y + (shape.m_vertices[0].y * drawScale));
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        // drawFixtures = false;
    }
    this.onPlatform = false;
    Entity.prototype.draw.call(this, ctx);

}
PlayerEntity.prototype.update = function(state) {
    this.x = state.x;
    this.y = state.y;
    this.center = state.c;
    this.angle = state.a;
}
PlayerEntity.prototype.step = function() {
    // console.log("stepping player")
    this.body.SetAngle(0);
    // movement
    if (rightArrow) this.move(1)
    if (leftArrow) this.move(-1)
    // console.log("inertia", player.GetMass())
    // console.log(player.numHeadContacts)
    if (upArrow && this.numHeadContacts && !this.numLeftContacts && !this.numRightContacts) this.hang()
    else {
        this.isHanging = false;
    }
    if (spaceBar && this.numFootContacts || this.jumpNextFrame) this.jump(90)
    // console.log("player.wasHanging",player.wasHanging, player.isHanging)
    if (upArrow && spaceBar && !this.isHanging && this.wasHanging && !this.numHeadContacts) this.jumpNextFrame = true;
    if (!this.numHeadContacts) {
        this.wasHanging = false;
    }
}
PlayerEntity.prototype.jump = function(degrees) {
    // degrees = 90
    power = 2.5
    // console.log("jump", degrees, Math.sin(degrees * (Math.PI / 180)) * power, this.wasHanging)
    if (this.jumpNextFrame) {
        // power = 50
        power = 2.5
        degrees = -90
        this.jumpNextFrame = false;
        // console.log("jumped next frame")
        this.body.ApplyImpulse(new b2Vec2(0, -power), this.body.GetWorldCenter());
    } else {
        yV = this.body.GetLinearVelocity().y
        if (yV < 1 && yV > -1) {
            // console.log("jummmpin", Math.cos(degrees * (Math.PI / 180)), Math.sin(degrees * (Math.PI / 180)))
            this.body.fixture.SetRestitution(0)
            this.body.ApplyImpulse(new b2Vec2(0, -power), this.body.GetWorldCenter());
            setTimeout(function() {
                player.body.fixture.SetRestitution(0)
            }, 20)
        }
    }
}
PlayerEntity.prototype.hang = function() {
    // console.log("hanging", player.numHeadContacts)
    this.isHanging = true;
    power = this.body.GetMass() * game.world.GetGravity().y * -1
    if (!this.wasHanging && this.numHeadContacts) {
        this.wasHanging = true;
        // console.log("wasnothanging", this.body.GetMass())
        this.body.ApplyImpulse(new b2Vec2(0, power * .15), player.body.GetWorldCenter())
    } else {
        // game.world.ClearForces()
        // console.log("is hanging", this.body.GetMass(), game.world.GetGravity().y, this.body.GetMass() * game.world.GetGravity().y * -5)
        this.body.ApplyForce(new b2Vec2(0, power * 1), player.body.GetWorldCenter())
    }
}
PlayerEntity.prototype.move = function(dir) {
    vel = this.body.GetLinearVelocity();
    // if(Math.abs(vel.x) < 20 ) vel.x += .8 * dir
    // console.log("diff direction?", (vel.x/dir) < 0)
    game.frictionOn(false)
    if((vel.x/dir) < 0) this.body.ApplyForce(new b2Vec2(18 * dir, 0), player.body.GetWorldCenter())
    else if(Math.abs(vel.x) < 12) this.body.ApplyForce(new b2Vec2(4 * dir, 0), player.body.GetWorldCenter())
    // same -10 -1 
    // same 10 1 abs 10 * 1 1
    // diff -10 1 abs 10 * -1 
    // diff 10 -1
    // this.body.SetLinearVelocity(vel);
}