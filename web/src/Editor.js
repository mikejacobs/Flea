Editor = function(game, canvas) {
  this.game = game;
  this.crosshair = new Crosshair(this, canvas);
  this.activeBlock = "platform";
  $("#block-type li a").on("click", $.proxy(this.handleControl, this));
};
Editor.prototype.handleControl = function(e) {
  console.log("this.activeBlock", this.activeBlock);
  var control = $(e.target);
  this.activeBlock = control.attr("id");
  $("#block-type li a").removeClass("active");
  control.addClass("active");
  console.log("this.activeBlock", this.activeBlock);
  return false;
};
Editor.prototype.draw = function(x1, x2, y1, y2) {
  var blockx = (x1 * tileSize) / SCALE + tileSize / 2 / SCALE;
  var blocky = (y1 * tileSize) / SCALE + tileSize / 2 / SCALE;
  var blockid = x1 + "_" + y1;
  console.log("this.activeBlock", this.activeBlock);
  if (shiftButton) {
    if (world[blockid]) world[blockid].toDelete = true;
  } else {
    block = {
      id: blockid,
      type: this.activeBlock,
      color: $("#block-color").val(),
      x: blockx,
      y: blocky,
      halfWidth: tileSize / 2 / SCALE,
      halfHeight: tileSize / 2 / SCALE
    };
    world[block.id] = Entity.build(block);
    game.setBodies([world[block.id]]);
  }
};
Crosshair = function(editor, canvas) {
  this.editor = editor;
  this.tile = tileSize;
  this.canvas = canvas;
  this.ctx = this.canvas.get(0).getContext("2d");
  this.ctx.strokeStyle = "#ff00ff";

  console.log("tile size: ", this.tile);
  this.x1 = 0;
  this.y1 = 0;
  this.x2 = this.x1 + this.tile;
  this.y2 = this.y1 + this.tile;
  this.halfWidth = this.tile;
  this.halfHeight = this.tile;
  // tile = 0; x = 1/6
  // tile = 1; x = 3/6
  // tile = 2; x = 5/6
  // tile = 3; x = 7/6
  this.dirx = 0;
  this.diry = 0;

  this.shiftX = this.tile / 2;
  this.shiftY = this.tile / 2;
  this.dragging = false;
  // this.x = 1 * this.tile
  // this.y = 1 * this.tile

  this.mode = "pen";

  this.setListeners();
};

Crosshair.prototype.update = function(x1, y1, x2, y2) {
  this.prevxtile = this.x2;
  this.prevytile = this.y2;
  // this.x1 = x1
  // this.y1 = y1
  // this.x2 = x2
  // this.y2 = y2
  // if(this.dragging){
  //     this.dirx = (this.x1 - this.x2) / Math.abs(this.x1 - this.x2) || 0
  //     this.diry = (this.y1 - this.y2) / Math.abs(this.y1 - this.y2) || 0
  // }
};
Crosshair.prototype.setListeners = function() {
  this.canvas.on({
    mousedown: $.proxy(this.mousedown, this),
    mouseup: $.proxy(this.mouseup, this),
    mousemove: $.proxy(this.move, this),
    mouseout: $.proxy(this.hide, this)
  });
};
Crosshair.prototype.moveCursor = function() {
  var w = canvasWidth;
  var h = canvasHeight;
  this.ctx.clearRect(0, 0, w, h);
  // console.log(0, 0, w, h)
  // console.log(this.x1 * this.tile, this.y1 * this.tile, (this.x1 - this.x2) * -this.tile, (this.y1 - this.y2) * -this.tile)
  // this.ctx.strokeRect(this.x1 * this.tile, this.y1 * this.tile, this.tile, this.tile)
  this.ctx.save();
  // this.ctx.translate(this.x1 * SCALE, this.y1 * SCALE);
  // this.ctx.rotate(0);
  // this.ctx.translate(-(this.x1), -(this.y1));
  // this.ctx.fillStyle = this.getColor();
  // this.ctx.strokeRect((this.tileToPx(this.x1) - this.halfWidth), (this.tileToPx(this.y1) - this.halfHeight), (this.halfWidth * 2), (this.halfHeight * 2) );
  this.ctx.strokeRect(
    this.x1 * tileSize,
    this.y1 * tileSize,
    (this.x2 - this.x1) * tileSize,
    (this.y2 - this.y1) * tileSize
  );
  // console.log((this.x1 - this.halfWidth), (this.y1 - this.halfHeight), tileSize, tileSize);
  this.ctx.restore();
};

Crosshair.prototype.mousedown = function(e) {
  console.log("down");
  this.dragging = true;
  // console.log(tileToBox(this.pxToTile(e.offsetX)));
};

Crosshair.prototype.mouseup = function() {
  this.dragging = false;
  this.editor.draw(this.x1, this.x2, this.y1, this.y2);
};

Crosshair.prototype.move = function(e) {
  this.x1 = this.pxToTile(e.offsetX);
  this.y1 = this.pxToTile(e.offsetY);
  // if(this.prevytile != this.ytile && this.prevxtile != this.xtile) this.update()

  if (!this.dragging) {
    this.x2 = this.x1 + 1;
    this.y2 = this.y1 + 1;
    this.moveCursor();
  } else if (this.dragging && this.mode == "box") {
    this.dirx = (this.x1 - this.x2) / Math.abs(this.x1 - this.x2) || 0;
    this.diry = (this.y1 - this.y2) / Math.abs(this.y1 - this.y2) || 0;
  } else if (this.dragging && this.mode == "pen") {
    this.editor.draw(this.x1, this.x2, this.y1, this.y2);
  }

  this.prevxtile = this.x2;
  this.prevytile = this.y2;
};

Crosshair.prototype.hide = function() {
  this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
};

Crosshair.prototype.pxToTile = function(value) {
  return Math.round((value + this.shiftX - tileSize) / tileSize);
  // return Math.round(value/SCALE)
};
Crosshair.prototype.tileToPx = function(value) {
  return value * this.tile;
};
