var debugFixtures = false;

function PlayerEntity(options) {
  // Entity.prototype.init.call(options);
  this.maxVel = 15;
  this.halfWidth = options.halfWidth;
  this.halfHeight = options.halfHeight;

  this.onEntity = false;
  this.origin = {
    x: options.x,
    y: options.y
  };
  this.init(options);
}
PlayerEntity.prototype = new Entity();
PlayerEntity.prototype.constructor = PlayerEntity;

PlayerEntity.prototype.draw = function(ctx) {
  // console.log("this.x", this.x)
  ctx.save();
  ctx.translate(this.x * SCALE, this.y * SCALE);
  ctx.rotate(this.angle);
  ctx.translate(-this.x * SCALE, -this.y * SCALE);
  ctx.fillStyle = this.getColor();
  ctx.fillRect(
    (this.x - this.halfWidth) * SCALE,
    (this.y - this.halfHeight) * SCALE,
    this.halfWidth * 2 * SCALE,
    this.halfHeight * 2 * SCALE
  );
  //   ctx.beginPath();
  //   ctx.arc(
  //     this.x * SCALE,
  //     this.y * SCALE,
  //     this.halfWidth * SCALE,
  //     0,
  //     2 * Math.PI
  //   );
  //   ctx.closePath();
  //   ctx.fill();
  ctx.restore();

  if (debugFixtures) {
    // console.log(player)
    for (f = player.body.GetFixtureList(); f; f = f.m_next) {
      shape = f.GetShape();
      // console.log(shape)
      // console.log(shape.m_vertices)
      var drawScale = SCALE;
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.fillStyle = "White";

      ctx.moveTo(
        player.x + shape.m_vertices[0].x * drawScale,
        player.y + shape.m_vertices[0].y * drawScale
      );
      for (var i = 1; i < shape.m_vertexCount; i++) {
        ctx.lineTo(
          player.x + shape.m_vertices[i].x * drawScale,
          player.y + shape.m_vertices[i].y * drawScale
        );
      }
      ctx.lineTo(
        player.x + shape.m_vertices[0].x * drawScale,
        player.y + shape.m_vertices[0].y * drawScale
      );
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // debugFixtures = false;
  }

  Entity.prototype.draw.call(this, ctx);
};
PlayerEntity.prototype.update = function(state) {
  this.x = state.x;
  this.y = state.y;
  this.center = state.c;
  this.angle = state.a;
};
PlayerEntity.prototype.die = function() {
  console.log("die!", this.body.GetPosition());
  //death anim
  //   playerPiece = {
  //     id: "piece1",
  //     type: "rectangle",
  //     x: this.x,
  //     y: this.y,
  //     halfHeight: 2.5 / SCALE,
  //     halfWidth: 2.5 / SCALE,
  //     color: "blue"
  //   };
  //   playerPiece1Entity = Entity.build(playerPiece);

  //   playerPiece.x += 2.5 / SCALE;
  //   playerPiece.id = "piece2";
  //   playerPiece2Entity = Entity.build(playerPiece);
  //   game.setBodies([playerPiece1Entity, playerPiece2Entity]);
  //   console.log("playerPiece2Entity", playerPiece2Entity);
  this.body.SetAngle(0);
  this.body.SetLinearVelocity(new b2Vec2(0, 0));
  this.body.SetPosition(new b2Vec2(this.origin.x, this.origin.y));
  this.reset();
};
PlayerEntity.prototype.step = function() {
  //   console.log("stepping player");
  this.body.SetAngle(0);

  // movement
  if (this.onEntity == "hazard") {
    this.die();
    return;
  }
  if (rightArrow) this.move(1);
  else if (leftArrow) this.move(-1);
  else game.frictionOn(true);
  // console.log("inertia", this.GetMass())
  // console.log(upArrow, this.isHanging, this.wasHanging, this.numHeadContacts)
  if (
    upArrow &&
    this.numHeadContacts &&
    !this.numLeftContacts &&
    !this.numRightContacts
  )
    this.hang();
  //under a platform
  else {
    this.isHanging = false;
  }
  if (upArrow && this.onEntity == "sidehold") this.hang(); //on sidehold
  if (
    upArrow &&
    spaceBar &&
    (this.numRightContacts || this.numLeftContacts) &&
    !this.numHeadContacts &&
    this.onEntity == "sidehold"
  )
    this.jump(); //jump from sidehold hang
  if ((spaceBar && this.numFootContacts) || this.jumpNextFrame) this.jump();
  // console.log("this.wasHanging",this.wasHanging, this.isHanging)
  if (
    upArrow &&
    spaceBar &&
    !this.isHanging &&
    this.wasHanging &&
    !this.numHeadContacts
  )
    this.jumpNextFrame = true;
  if (!this.numHeadContacts) {
    this.wasHanging = false;
  }

  this.reset();
};
PlayerEntity.prototype.jump = function(power) {
  // degrees = 90
  power = power || 2.2;
  // console.log("jump", degrees, Math.sin(degrees * (Math.PI / 180)) * power, this.wasHanging)
  if (this.jumpNextFrame) {
    this.jumpNextFrame = false;
    // console.log("jumped next frame")
    this.body.ApplyImpulse(new b2Vec2(0, -power), this.body.GetWorldCenter());
  } else {
    yV = this.body.GetLinearVelocity().y;
    if (yV < 1 && yV > -1) {
      // console.log("jummmpin", Math.cos(degrees * (Math.PI / 180)), Math.sin(degrees * (Math.PI / 180)))
      this.body.fixture.SetRestitution(0);
      this.body.ApplyImpulse(new b2Vec2(0, -power), this.body.GetWorldCenter());
      setTimeout(function() {
        player.body.fixture.SetRestitution(0);
      }, 20);
    }
  }
};
PlayerEntity.prototype.reset = function() {
  this.onEntity = false;
};
PlayerEntity.prototype.hang = function() {
  vel = this.body.GetLinearVelocity();
  // console.log("hanging", player.numHeadContacts)
  this.isHanging = true;
  // game.frictionOn(true)
  power = this.body.GetMass() * game.world.GetGravity().y * -1;
  if (
    !this.wasHanging &&
    (this.numHeadContacts || this.onEntity == "sidehold")
  ) {
    this.wasHanging = true;
  }
  this.body.SetLinearVelocity(new b2Vec2(vel.x, 0));
  this.body.ApplyForce(
    new b2Vec2(0, power * (this.numHeadContacts ? 2 : 1)),
    player.body.GetWorldCenter()
  );
};
PlayerEntity.prototype.move = function(dir) {
  vel = this.body.GetLinearVelocity();
  // if(Math.abs(vel.x) < 20 ) vel.x += .8 * dir
  // console.log("diff direction?", (vel.x/dir) < 0)
  game.frictionOn(false);
  //changing direction
  if (vel.x / dir < 0)
    this.body.ApplyForce(new b2Vec2(18 * dir, 0), player.body.GetWorldCenter());
  else if (Math.abs(vel.x) < 12)
    this.body.ApplyForce(new b2Vec2(4 * dir, 0), player.body.GetWorldCenter());
};

function PlayerDeathPartEntity(options) {
  // Entity.prototype.init.call(options);
  this.init(options);
  this.halfWidth = options.halfWidth;
  this.halfHeight = options.halfHeight;
}
PlayerDeathPartEntity.prototype = new Entity();
PlayerDeathPartEntity.prototype.constructor = PlayerDeathPartEntity;

PlayerDeathPartEntity.prototype.draw = function(ctx) {
  ctx.save();
  ctx.translate(this.x * SCALE, this.y * SCALE);
  ctx.rotate(this.angle);
  ctx.translate(-this.x * SCALE, -this.y * SCALE);
  ctx.fillStyle = this.getColor();
  ctx.fillRect(
    (this.x - this.halfWidth) * SCALE,
    (this.y - this.halfHeight) * SCALE,
    this.halfWidth * 2 * SCALE,
    this.halfHeight * 2 * SCALE
  );
  ctx.restore();

  Entity.prototype.draw.call(this, ctx);
};
