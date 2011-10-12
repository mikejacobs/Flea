function Player(options) {
    // Entity.prototype.init.call(options);
    this.init(options)
    this.halfWidth = options.halfWidth;
    this.halfHeight = options.halfHeight;
}
Player.prototype = new Entity;
Player.prototype.constructor = Player;

Player.prototype.draw = function(ctx) {
    // console.log("this.x", this.x)
    ctx.save();
    ctx.translate(this.x * SCALE, this.y * SCALE);
    ctx.rotate(this.angle);
    ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);
    ctx.fillStyle = this.getColor();
    ctx.fillRect((this.x - this.halfWidth) * SCALE, (this.y - this.halfHeight) * SCALE, (this.halfWidth * 2) * SCALE, (this.halfHeight * 2) * SCALE);
    ctx.restore();

    Entity.prototype.draw.call(this, ctx);
}
Player.prototype.update = function(state) {
    this.x = state.x;
    this.y = state.y;
    this.center = state.c;
    this.angle = state.a;
}
Player.prototype.step = function(){
    console.log("stepping player")
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
Player.prototype.jump = function(degrees) {
    // degrees = 90
    power = 10
    // console.log("jump", degrees, Math.sin(degrees * (Math.PI / 180)) * power, this.wasHanging)
    if (this.jumpNextFrame) {
        // power = 50
        power = 10
        degrees = -90
        this.jumpNextFrame = false;
        // console.log("jumped next frame")
        this.body.ApplyImpulse(new b2Vec2(0,  -power), this.body.GetWorldCenter());
    } else {
        yV = this.body.GetLinearVelocity().y
        if (yV < 1 && yV > -1) {
            console.log("jummmpin", Math.cos(degrees * (Math.PI / 180)), Math.sin(degrees * (Math.PI / 180)))
            this.body.fixture.SetRestitution(0.3)
            this.body.ApplyImpulse(new b2Vec2(0, -power), this.body.GetWorldCenter());
            setTimeout(function() {
                player.body.fixture.SetRestitution(0)
            }, 20)
        }
    }
}
Player.prototype.hang = function() {
    // console.log("hanging", player.numHeadContacts)
    this.isHanging = true;
    if (!this.wasHanging) {
        this.wasHanging = true;
        console.log("wasnothanging", this.body.GetMass())
        this.body.ApplyImpulse(new b2Vec2(0, this.body.GetMass() * game.world.GetGravity().y * -.5), player.body.GetWorldCenter())
    } else {
        // console.log("is hanging", this.body.GetMass(), game.world.GetGravity().y, this.body.GetMass() * game.world.GetGravity().y )
        this.body.ApplyForce(new b2Vec2(0, this.body.GetMass() * game.world.GetGravity().y * -1), player.body.GetWorldCenter())
    }
}
Player.prototype.move = function(dir) {
    vel = this.body.GetLinearVelocity();
    vel.x = 6 * dir
    this.body.SetAwake(true);
    this.body.SetLinearVelocity(vel);
}