Crosshair = function(game) {
    this.game = game
    this.tile = tileSize * 30
    console.log("tile size: ", this.tile)
    this.x1 = 1 * this.tile
    this.y1 = 1 * this.tile
    this.x2 = this.x1 + this.tile
    this.y2 = this.y1 + this.tile
    this.halfWidth = this.tile
    this.halfHeight = this.tile
    // tile = 0; x = 1/6
    // tile = 1; x = 3/6
    // tile = 2; x = 5/6
    // tile = 3; x = 7/6
    this.dirx = 0
    this.diry = 0

    this.shiftX = this.tile/2
    this.shiftY = this.tile/2
    this.dragging = false;
    // this.x = 1 * this.tile
    // this.y = 1 * this.tile
    this.canvas = $("#crosshair")
    this.ctx = this.canvas.get(0).getContext("2d")
    this.ctx.strokeStyle = "#ff0000"

    this.canvasWidth = this.canvas.width
    this.canvasHeight = this.canvas.height

    this.mode = "box"

    this.setListeners()
}

Crosshair.prototype.update = function(x1, y1, x2, y2) {
    this.prevxtile = this.x2
    this.prevytile = this.y2
    // this.x1 = x1
    // this.y1 = y1
    // this.x2 = x2
    // this.y2 = y2
    // if(this.dragging){
    //     this.dirx = (this.x1 - this.x2) / Math.abs(this.x1 - this.x2) || 0
    //     this.diry = (this.y1 - this.y2) / Math.abs(this.y1 - this.y2) || 0
    // }
}
Crosshair.prototype.setListeners = function() {
    this.canvas.on({
        mousedown:$.proxy(this.mousedown, this),
        mouseup:$.proxy(this.mouseup, this),
        mousemove:$.proxy(this.move, this),
        mouseout:$.proxy(this.hide, this)
    })
}
Crosshair.prototype.draw = function() {
    var w = this.canvasWidth
    var h = this.canvasHeight
    this.ctx.clearRect(0, 0, 920, 440)
    // console.log(0, 0, w, h)
    // console.log(this.x1 * this.tile, this.y1 * this.tile, (this.x1 - this.x2) * -this.tile, (this.y1 - this.y2) * -this.tile)
    // this.ctx.strokeRect(this.x1 * this.tile, this.y1 * this.tile, this.tile, this.tile)
    this.ctx.save();
    // this.ctx.translate(this.x1 * SCALE, this.y1 * SCALE);
    // this.ctx.rotate(0);
    // this.ctx.translate(-(this.x1), -(this.y1));
    // this.ctx.fillStyle = this.getColor();
    // this.ctx.strokeRect((this.tileToPx(this.x1) - this.halfWidth), (this.tileToPx(this.y1) - this.halfHeight), (this.halfWidth * 2), (this.halfHeight * 2) );
    this.ctx.strokeRect(((this.x1 - this.halfWidth) * SCALE, (this.y1 - this.halfHeight) * SCALE, (this.halfWidth * 2) * SCALE, (this.halfHeight * 2) * SCALE));
    // console.log((this.x1 - this.halfWidth) * SCALE, (this.y1 - this.halfHeight) * SCALE, (this.halfWidth * 2) * SCALE, (this.halfHeight * 2) * SCALE);
    this.ctx.restore();
}

Crosshair.prototype.mousedown = function(e) {
    console.log("down")
    this.dragging = true;
    console.log(tileToBox(this.pxToTile(e.pageX)))
}

Crosshair.prototype.mouseup = function() {
    this.dragging = false;
}

Crosshair.prototype.move = function(e) {
    this.x1 = this.pxToTile(e.pageX)
    this.y1 = this.pxToTile(e.pageY)

    // if(this.prevytile != this.ytile && this.prevxtile != this.xtile) this.update()

    if (!this.dragging || this.mode == "pen") {
        this.x2 = this.x1 + 1
        this.y2 = this.y1 + 1
        this.draw()

    } else if(this.dragging && this.mode == "box"){
        this.dirx = (this.x1 - this.x2) / Math.abs(this.x1 - this.x2) || 0
        this.diry = (this.y1 - this.y2) / Math.abs(this.y1 - this.y2) || 0
    }

    this.prevxtile = this.x2
    this.prevytile = this.y2
}

Crosshair.prototype.hide = function() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
}

Crosshair.prototype.pxToTile = function(value) {
    return Math.round((value + this.shiftX - (this.tile / 2)) / this.tile)
}
Crosshair.prototype.tileToPx = function(value) {
    return value * this.tile
}