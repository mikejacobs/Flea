function SideHoldEntity(options) {
    // Entity.prototype.init.call(options);
    this.init(options)
    this.halfWidth = options.halfWidth;
    this.halfHeight = options.halfHeight;
}
SideHoldEntity.prototype = new Entity;
SideHoldEntity.prototype.constructor = SideHoldEntity;

SideHoldEntity.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.x * SCALE, this.y * SCALE);
    ctx.rotate(this.angle);
    ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);
    ctx.fillStyle = this.getColor();
    ctx.fillRect((this.x - this.halfWidth) * SCALE, (this.y - this.halfHeight) * SCALE, (this.halfWidth * 2) * SCALE, (this.halfHeight * 2) * SCALE);
    ctx.restore();

    Entity.prototype.draw.call(this, ctx);
}

SideHoldEntity.prototype.hit = function(impulse, source) {
    this.isHit = true;
    // if (this.strength) {
    //     this.strength -= impulse;
    //     if (this.strength <= 0) {
    //         this.dead = true
    //     }
    // }
    if(source.type == "player")
        player.hang()

    //console.log(this.id + ", " + impulse + ", " + source.id + ", " + this.strength);
}