function SideHoldEntity(options) {
    // Entity.prototype.init.call(options);
    this.backgroundPattern = "images/checkw.png"
    this.halfWidth = options.halfWidth;
    this.halfHeight = options.halfHeight;
    this.init(options)
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

    // for (i = 0; i < (this.halfHeight * 2)* SCALE; i += 3) {
    //     for (j = 0; j < (this.halfWidth * 2)* SCALE; j += 3) {
    //         // console.log(this.y* SCALE, (this.halfHeight * 2)* SCALE, i)
    //         ctx.fillRect((this.x - this.halfWidth) * SCALE + j, (this.y - this.halfHeight) * SCALE + i, 2, 2);
    //     }
    // }
    // var ptrn = ctx.createPattern(img,'repeat');  
    // ctx.fillStyle = ptrn; 

    //draw bg image on top
    if(this.backgroundImage){
        ctx.save();
        ctx.translate(this.x * SCALE, this.y * SCALE);
        ctx.rotate(this.angle);
        ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);
        ctx.fillStyle = ctx.createPattern(this.backgroundImage,'repeat');  
        ctx.fillRect((this.x - this.halfWidth) * SCALE, (this.y - this.halfHeight) * SCALE, (this.halfWidth * 2) * SCALE, (this.halfHeight * 2) * SCALE);
        ctx.restore(); 
    }

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
    if (source.type == "player") {
        // player.hang()
        if (player.numRightContacts || player.numLeftContacts) player.onEntity = "sidehold";
        // console.log("sidehold")
    }

    //console.log(this.id + ", " + impulse + ", " + source.id + ", " + this.strength);
}



function PlatformEntity(options) {
    // Entity.prototype.init.call(options);
    this.init(options)
    this.halfWidth = options.halfWidth;
    this.halfHeight = options.halfHeight;
}
PlatformEntity.prototype = new Entity;
PlatformEntity.prototype.constructor = PlatformEntity;

PlatformEntity.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.x * SCALE, this.y * SCALE);
    ctx.rotate(this.angle);
    ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);
    ctx.fillStyle = this.getColor();
    ctx.fillRect((this.x - this.halfWidth) * SCALE, (this.y - this.halfHeight) * SCALE, (this.halfWidth * 2) * SCALE, (this.halfHeight * 2) * SCALE);
    ctx.restore();

    Entity.prototype.draw.call(this, ctx);
}

function HazardEntity(options) {
    // Entity.prototype.init.call(options);
    this.init(options)
    this.spikeDirection = "top"
    this.halfWidth = options.halfWidth;
    this.halfHeight = options.halfHeight;
}
HazardEntity.prototype = new Entity;
HazardEntity.prototype.constructor = HazardEntity;

HazardEntity.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.x * SCALE, this.y * SCALE);
    ctx.rotate(this.angle);
    ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);
    ctx.fillStyle = this.getColor();
    ctx.fillRect((this.x - this.halfWidth) * SCALE, (this.y - this.halfHeight) * SCALE, (this.halfWidth * 2) * SCALE, (this.halfHeight * 2) * SCALE);
    ctx.restore();
    // console.log("width", this.halfWidth * 2 * SCALE)
    var d = this.spikeDirection
    if (d == "top" || d == "bottom") {
        d = (d == "top") ? 1 : -1;
        offset = (d == -1) ? tileH : 0;
        ctx.save();
        ctx.beginPath();
        // ctx.fillStyle = this.getColor();
        ctx.moveTo((this.x - this.halfWidth) * SCALE, (this.y + this.halfHeight) * SCALE); // start at bottom left
        startX = (this.x - this.halfWidth) * SCALE

        for(var i= 0; i < this.halfWidth * 2 * SCALE; i+=10){
            ctx.lineTo((startX + i), (this.y - this.halfHeight) * SCALE);
            ctx.lineTo((startX + i+5), (this.y + this.halfHeight) * SCALE);
        }
        // ctx.lineTo(this.xtile * tileW + (tileW / 2), this.ytile * tileW + offset);
        // ctx.lineTo(this.xtile * tileW + tileW, this.ytile * tileW + ((tileW / 2) * d) + offset);
        // ctx.lineTo(this.xtile * tileW + tileW, this.ytile * tileW + (tileW * d) + offset);
        ctx.fill();
        ctx.restore();
    // } else if (d == "right" || d == "left") {
    //     d = (d == "left") ? 1 : -1;
    //     offset = (d == -1) ? tileW : 0;
    //     this.context.beginPath();
    //     this.context.moveTo(this.xtile * tileW + (tileW * d) + offset, this.ytile * tileH);
    //     this.context.lineTo(this.xtile * tileW + ((tileW / 2) * d) + offset, this.ytile * tileH);
    //     this.context.lineTo(this.xtile * tileW + offset, this.ytile * tileH + (tileH / 2));
    //     this.context.lineTo(this.xtile * tileH + ((tileH / 2) * d) + offset, this.ytile * tileH + tileH);
    //     this.context.lineTo(this.xtile * tileH + (tileH * d) + offset, this.ytile * tileH + tileH);
    //     this.context.fill();
    }



    Entity.prototype.draw.call(this, ctx);
}
HazardEntity.prototype.hit = function(impulse, source) {
    this.isHit = true;
    if (source.type == "player") {
        if (player.numFootContacts) player.onEntity = this.type;
    }
}

function SpringEntity(options) {
    // Entity.prototype.init.call(options);
    this.backgroundPattern = "images/checkw.png"
    this.halfWidth = options.halfWidth;
    this.halfHeight = options.halfHeight;
    this.init(options)
}
SpringEntity.prototype = new Entity;
SpringEntity.prototype.constructor = SpringEntity;

SpringEntity.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.x * SCALE, this.y * SCALE);
    ctx.rotate(this.angle);
    ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);
    ctx.fillStyle = this.getColor();
    ctx.fillRect((this.x - this.halfWidth) * SCALE, (this.y - this.halfHeight) * SCALE, (this.halfWidth * 2) * SCALE, (this.halfHeight * 2) * SCALE);
    ctx.restore();

    //draw bg image on top
    if(this.backgroundImage){
        ctx.save();
        ctx.translate(this.x * SCALE, this.y * SCALE);
        ctx.rotate(this.angle);
        ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);
        ctx.fillStyle = ctx.createPattern(this.backgroundImage,'repeat');  
        ctx.fillRect((this.x - this.halfWidth) * SCALE, (this.y - this.halfHeight) * SCALE, (this.halfWidth * 2) * SCALE, (this.halfHeight * 2) * SCALE);
        ctx.restore(); 
    }

    Entity.prototype.draw.call(this, ctx);
}

SpringEntity.prototype.hit = function(impulse, source) {
    this.isHit = true;
    // if (this.strength) {
    //     this.strength -= impulse;
    //     if (this.strength <= 0) {
    //         this.dead = true
    //     }
    // }
    if (source.type == "player" && player.numFootContacts) {
        // player.hang()
        
        player.jump(3)
        console.log("boing!!")
    }

    //console.log(this.id + ", " + impulse + ", " + source.id + ", " + this.strength);
}