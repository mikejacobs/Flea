var Entity = function() {};

Entity.prototype.init = function(options) {
    this.id = options.id;
    this.type = options.type;
    this.x = options.x;
    this.y = options.y;
    this.angle = options.angle || 0;
    this.center = options.center;
    this.dynamic = options.dynamic;
    this.color = options.color || "red";
    this.isHit = options.false;
    this.strength = options.strength;
    this.dead = options.false;
    console.log("entity init", options.type, options, this.x, this.y)
    return this;
}

Entity.prototype.hit = function(impulse, source) {
    this.isHit = true;
    if (this.strength) {
        this.strength -= impulse;
        if (this.strength <= 0) {
            this.dead = true
        }
    }

    //console.log(this.id + ", " + impulse + ", " + source.id + ", " + this.strength);
}

Entity.prototype.getColor = function() {
    if (this.isHit) {
        return 'black';
    } else {
        return this.color;
    }
}

Entity.prototype.update = function(state) {
    // if(this.type == "player") console.log(state.x)
    this.x = state.x;
    this.y = state.y;
    this.center = state.c;
    this.angle = state.a;
}

Entity.prototype.draw = function(ctx) {
    // ctx.fillStyle = 'black';
    // ctx.beginPath();
    // ctx.arc(this.x * SCALE, this.y * SCALE, 4, 0, Math.PI * 2, true);
    // ctx.closePath();
    // ctx.fill();
    // ctx.fillStyle = 'yellow';
    // ctx.beginPath();
    // ctx.arc(this.center.x * SCALE, this.center.y * SCALE, 2, 0, Math.PI * 2, true);
    // ctx.closePath();
    // ctx.fill();
    // clear
    this.isHit = false;
}

Entity.build = function(options) {
    // if (def.radius) {
    //     return new CircleEntity(def.id, def.x, def.y, def.angle, NULL_CENTER, def.color, def.strength, def.radius);
    // } else if (def.polys) {
    //     return new PolygonEntity(def.id, def.x, def.y, def.angle, NULL_CENTER, def.color, def.strength, def.polys);
    // } else {
    //     return new RectangleEntity(def.id, def.x, def.y, def.angle, NULL_CENTER, def.color, def.strength, def.halfWidth, def.halfHeight);
    // }
    switch (options.type) {
    case "platform":
        options.dynamic = false;
        return new RectangleEntity(options);
        break;
    case "player":
        options.dynamic = true;
        // return new Player(options);
        return new Player(options);
        break;
    default:
        return new RectangleEntity(options);
        break;
    }
}

function CircleEntity(options) {
    color = options.color || 'aqua';
    // Entity.prototype.init.call(options);
    this.init(options)
    this.radius = options.radius;
}

CircleEntity.prototype = new Entity;

CircleEntity.prototype.constructor = CircleEntity;

CircleEntity.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.x * SCALE, this.y * SCALE);
    ctx.rotate(this.angle);
    ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);

    ctx.fillStyle = this.getColor();
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(this.x * SCALE, this.y * SCALE, this.radius * SCALE, 0, Math.PI * 2, true);
    ctx.moveTo(this.x * SCALE, this.y * SCALE);
    ctx.lineTo((this.x) * SCALE, (this.y + this.radius) * SCALE);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();

    Entity.prototype.draw.call(this, ctx);
}

function RectangleEntity(options) {
    // Entity.prototype.init.call(options);
    this.init(options)
    this.halfWidth = options.halfWidth;
    this.halfHeight = options.halfHeight;
}
RectangleEntity.prototype = new Entity;
RectangleEntity.prototype.constructor = RectangleEntity;

RectangleEntity.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.x * SCALE, this.y * SCALE);
    ctx.rotate(this.angle);
    ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);
    ctx.fillStyle = this.getColor();
    ctx.fillRect((this.x - this.halfWidth) * SCALE, (this.y - this.halfHeight) * SCALE, (this.halfWidth * 2) * SCALE, (this.halfHeight * 2) * SCALE);
    ctx.restore();

    Entity.prototype.draw.call(this, ctx);
}

function PolygonEntity(options) {
    // Entity.prototype.init.call(options);
    this.init(options)
    this.polys = options.polys;
}
PolygonEntity.prototype = new Entity;
PolygonEntity.prototype.constructor = PolygonEntity;

PolygonEntity.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.x * SCALE, this.y * SCALE);
    ctx.rotate(this.angle);
    ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);
    ctx.fillStyle = this.getColor();

    for (var i = 0; i < this.polys.length; i++) {
        var points = this.polys[i];
        ctx.beginPath();
        ctx.moveTo((this.x + points[0].x) * SCALE, (this.y + points[0].y) * SCALE);
        for (var j = 1; j < points.length; j++) {
            ctx.lineTo((points[j].x + this.x) * SCALE, (points[j].y + this.y) * SCALE);
        }
        ctx.lineTo((this.x + points[0].x) * SCALE, (this.y + points[0].y) * SCALE);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    ctx.restore();

    Entity.prototype.draw.call(this, ctx);
}


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
    power = 40
    // console.log("jump", degrees, Math.sin(degrees * (Math.PI / 180)) * power, this.wasHanging)
    if (this.jumpNextFrame) {
        // power = 50
        power = 10
        degrees = -90
        this.jumpNextFrame = false;
        // console.log("jumped next frame")
        this.body.ApplyImpulse(new b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power, Math.sin(degrees * (Math.PI / 180)) * power), this.body.GetWorldCenter());
    } else {
        yV = this.body.GetLinearVelocity().y
        if (yV < 1 && yV > -1) {
            console.log("jummmpin")
            this.body.fixture.SetRestitution(0.3)
            this.body.ApplyImpulse(new b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power, Math.sin(degrees * (Math.PI / 180)) * power), this.body.GetWorldCenter());
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
        // console.log("wasnothanging", world)
        this.body.ApplyImpulse(new b2Vec2(0, this.body.GetMass() * game.world.GetGravity().y * -1), player.body.GetWorldCenter())
    } else {
        this.body.ApplyForce(new b2Vec2(0, this.body.GetMass() * game.world.GetGravity().y * -2), player.body.GetWorldCenter())
    }
}
Player.prototype.move = function(dir) {
    vel = this.body.GetLinearVelocity();
    vel.x = 6 * dir
    this.body.SetAwake(true);
    this.body.SetLinearVelocity(vel);
}