function Entity(options) {
  console.log(options)
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
    console.log("making object", options.type)

    switch (options.type) {
    case "platform":
        console.log("making platfom")
        return new RectangleEntity(options);
        break;
    default:
        break;
    }
}

function CircleEntity(options) {
    color = options.color || 'aqua';
    Entity.call(options);
    this.radius = options.radius;
}
CircleEntity.prototype = new Entity();
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
    Entity.call(options);
    this.halfWidth = options.halfWidth;
    this.halfHeight = options.halfHeight;
}
RectangleEntity.prototype = new Entity();
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
    Entity.call(options);
    this.polys = options.polys;
}
PolygonEntity.prototype = new Entity();
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