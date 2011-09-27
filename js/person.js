//playable character
// var person = new game_obj({type:"person", id:"person", x:0, y:0, w:10, h:20, ps:true})
// var person = function(args){
//     person.obj = new game_obj(args)
// }
// person.prototype = {
//     
// }
// ========
// = maps =
// ========
num_stars = 0;
num_hits = 10;
max_hits = 15;
just_hit = false;

function detectKeys() {    
    moved = false;
    if (spaceBar && !person.jumping && !person.hanging) {
        // console.log("jump?")
        moved = true;
        person.jumping = true;
        person.jumpspeed = person.jumpstart;
    }
    if (rightArrow) {
        // console.log("cx", person.x)
        moved = true;
        person.move(1, 0, 0);
        shiftView(1);
    } else if (leftArrow) {
        moved = true;
        person.move(-1, 0, 0);
        shiftView(-1);
    } if (person.hanging && !upArrow){
        moved = true;
        person.hanging = false;
        // person.wasHanging = true;
        person.fall()
    }
    //} else if (Key.isDown(Key.UP)) {
    		//keyPressed=_root.moveChar(person, 0, -1);
    		//} else if (Key.isDown(Key.DOWN)) {
    		//keyPressed=_root.moveChar(person, 0, 1);
    //do we jump
    // console.log(person.jumping)
    if (person.jumping) {
        // console.log("jump!")
        moved = true;
    	person.jump();
    }
    if(!moved){
        person.fall()
    }
    //walk animation
    // console.log("move", person.move)
    
    person.draw();
}

var person;
var makePerson = function(args){
    person = new game_obj(args);
    person.x = (person.xtile*tileW)+tileW/2;
    person.y = ((person.ytile+1)*tileH)-person.h;
    person.startX = person.x;
    person.startY = person.y;
    person.color = 'rgba(100,10,0,1)';
    person._color = 'rgba(100,10,0,1)';
    person.draw =function(){
        if(just_hit){
            blink_count++
            if(blink_count < 3){
                // log("color", person.color)
                this.color = 'rgba(255,255,255,1)';
            }else{
                // this.color = 'rgba(255,0,255,1)'
                this.color = random_color()

                if(blink_count == 6){ blink_count = 0 }
            }
        }else{
            blink_count = 0;
            // console.log(this._color, "color")
            // this.color = random_color()
            this.color = this._color;

        }
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, tileW, tileH);
    },
    person.getCorners= function(x, y) {
        this.downY = Math.floor((y+this.h-1)/tileH);
        this.upY = Math.floor(y/tileH);
        this.leftX = Math.floor(x/tileW);
        this.rightX = Math.floor((x+this.w-1)/tileW);
        this.upleft = false;
        this.downleft = false;
        this.upright = false; 
        this.downright = false;
        if(inBounds(this.leftX, this.upY)){
        // if(this.upY <= screenSize && this.upY > 0 && this.leftX > 0){
            // if(tiles[this.upY][this.leftX]){
                try
                  {
                      this.upleft = tiles[this.upY][this.leftX];
                  }
                catch(err)
                  {
                      console.log("dir", this.upY, this.downY, this.leftX, this.rightX)
                      
                      console.log(err)
                  }
            }
            // }
        // }
        // if(this.downY >0  && this.downY <= screenSize && this.leftX > 0){
            // if(tiles[this.downY][this.leftX]){
                if(inBounds(this.leftX, this.downY)){
                    try
                      {
                this.downleft = tiles[this.downY][this.leftX];
                  }
                catch(err)
                  {
                      console.log("dir", this.upY, this.downY, this.leftX, this.rightX)
                      
                      console.log(err)
                  }
            }
        // }
        // if(this.upY > 0 && this.rightX <= screenSize && this.rightX > 0){
            // if(tiles[this.upY][this.rightX]){
                if(inBounds(this.rightX, this.upY)){
                    try
                      {
                this.upright = tiles[this.upY][this.rightX];
                  }
                catch(err)
                  {
                      console.log("dir", this.upY, this.downY, this.leftX, this.rightX)
                      
                      console.log(err)
                  }
            }
        // }
        // if(this.downY <= screenSize && this.rightX <= screenSize && this.downY > 0 && this.rightX > 0){
            // if(tiles[this.downY][this.rightX]){
                if(inBounds(this.rightX, this.downY)){
                    try
                      {
                this.downright = tiles[this.downY][this.rightX];
                  }
                catch(err)
                  {
                      console.log("dir", this.upY, this.downY, this.leftX, this.rightX)
                      
                      console.log(err)
                  }
            }
        // }
    }
    /*
    // Get the map tile each corner would be in...
	this.downY = Math.floor( ( y + ( this.centre_height - 1 ) ) / g_tileH );
	this.upY = Math.floor( ( y - ( this.centre_height - 1 ) ) / g_tileH );
	this.leftX = Math.floor( ( x - ( this.centre_width - 1 ) ) / g_tileW );
	this.rightX = Math.floor( ( x + ( this.centre_width - 1 ) ) / g_tileW );

	//window.status = this.downY + ":" + this.upY + "(" + y + " ):" + this.leftX + ":" + this.rightX + "::::";			

	// check what tile they are up against
	this.upleft = game.tiles.tiles[ g_maps[ game.currentMap ][ this.upY ][ this.leftX ] ].walkable;
	this.downleft = game.tiles.tiles[ g_maps[ game.currentMap ][ this.downY ][ this.leftX ] ].walkable;
	this.upright = game.tiles.tiles[ g_maps[ game.currentMap ][ this.upY ][ this.rightX ] ].walkable;
	this.downright = game.tiles.tiles[ g_maps[ game.currentMap ][ this.downY ][ this.rightX ] ].walkable;

	//window.status += this.upleft + ":" + this.downleft + ":" + this.upright + ":" + this.downright;
    
    */
    person.move= function(dirx, diry, jump) {
        // clear person off canvas
        
        // console.log(dirx, diry, jump, this.x, this.y, this.h, this.w, "jkasjhdfa")
        if(this.hanging){
            this.hanging = false
            this.wasHanging = true
        }

        if (Math.abs(jump)==1) {
            speed=this.jumpspeed*jump;
        } else {
            speed=this.speed;
        }


        // console.log("speed",(speed*diry))
        if (diry == -1) {
            // console.log("xy", this.x, this.y)

            if(this.y > (mapHeight+this.h)){
                //off map
                //updateDamage(-1)
                this.y = this.startY;
                this.x = this.startX;
                resetView();
            } else {
                for(var times = 0; times <= speed; times++ ){
                    this.getCorners (this.x, this.y+(times*diry));
                    if (!this.upleft.solid && !this.upright.solid) {
                        this.y += diry;
                        this.ytile = Math.floor((this.y)/tileH);
                    } else {
                        if(upArrow){
                            this.hanging = true;
                            this.jumping =false
                        }
                        this.y = ((this.upleft.ytile*tileH)+this.h) || ((this.upright.ytile*tileH)+this.h)
                        this.ytile = this.upleft.ytile || this.upright.ytile
                        this.jumpspeed = 0;
                        break;
                    }
                } 
                // this.ytile = Math.floor(this.y/tileH);
            }
        }
        if (diry == 1) {
            if(this.y+speed > (mapHeight-this.h-tileH)){
                // this.speed = 0
                this.jumping =false
                this.fall()
                //off map
                //updateDamage(-1)
                this.y = this.startY;
                this.x = this.startX;
                resetView();
                // console.log(this.startX)
                // console.log("offsecreen")
                // clearInterval(drawing)
            }else{
                // console.log("on screen", this.y + speed +this.h*2, screenSize)
                this.getCorners (this.x, this.y-1);
                // console.log(this.upleft.solid, this.upright.solid)
                if (this.upleft.solid || this.upright.solid) {
                    // console.log("top!")
                    if(upArrow){
                        this.hanging = true;
                        this.jumping =false
                    }
                }
                if(!this.hanging){
                    // console.log("onscreen?", this.y+this.h+speed, (screenSize+this.h))
                    for(var times = 0; times <= speed; times++){
                        this.getCorners (this.x, this.y+(times*diry));
                        if (!this.downleft.solid && !this.downright.solid) {
                            this.ytile = Math.floor((this.y)/tileH);
                            this.y += diry;
                            // }
                        } else {
                            // this.y = (this.ytile+1)*tileH-this.h;
                            this.y = ((this.downleft.ytile*tileH)-this.h) || ((this.downright.ytile*tileH)-this.h)
                            this.ytile = this.downleft.ytile-1 || this.downright.ytile-1
                            this.jumping = false;
                            break;
                        }
                    }
                }
            }
        }
        if (dirx == -1) {
            // for(var times = 0; times <= speed; times++){
                this.getCorners (this.x+(this.speed*dirx), this.y);
                if (!this.downleft.solid && !this.upleft.solid) {
                    this.x += this.speed*dirx;
                    this.xtile = Math.floor(this.x/tileW)-1;
                    //check for tile below
                    if(this.wasHanging && !this.jumping && !this.downright.solid && !this.upright.solid){
                        if(upArrow && spaceBar){
                            // console.log("wasHanging", times)
                            this.jumping = true
                            this.jumpspeed = this.jumpstart;
                            this.jump()
                            // jump()
                        }
                        this.wasHanging = false;
                    }else{
                        this.fall();
                    }
                } else {
                    this.x = ((this.downleft.xtile*tileW)+this.w) || ((this.upleft.xtile*tileW)+this.w)
                    this.xtile = this.downleft.xtile-1 || this.upleft.xtile-1
                }
            }

            if (dirx == 1) {
                this.getCorners (this.x+(this.speed*dirx), this.y);
                if (!this.upright.solid && !this.downright.solid) {
                    // console.log("all clear, moving right")
                    this.x += this.speed*dirx;
                    this.xtile = Math.floor(this.x/tileW);
                    //check for tile below
                    if(this.wasHanging && !this.jumping && !this.downleft.solid && !this.upleft.solid){
                        if(upArrow && spaceBar){
                            // console.log("wasHanging", this.jumping)
                            this.jumping = true
                            this.jumpspeed = this.jumpstart;
                            this.jump()
                            // jump()
                        }
                        this.wasHanging = false;
                    }else{
                        this.fall();
                    }

                } else {
                    // console.log("something to my right, snapping to it", this.xtile+1)
                    this.x = ((this.downright.xtile*tileW)-this.w) || ((this.upright.xtile*tileW)-this.w)
                    this.xtile = this.downright.xtile+1 || this.upright.xtile+1
                }
                // }
                // if(this.jumping) this.jump()
            }
            if(this.downright){
                // console.log("this.downright")
                this.downright.collideAction(this, "downright")
            }
            if(this.upright){
                // console.log("this.upright")
                this.upright.collideAction(this, "upright")
            }
            if(this.upleft){
                // console.log("this.upleft")
                this.upleft.collideAction(this, "upleft")
            }
            if(this.downleft){
                // console.log("this.downleft")
                this.downleft.collideAction(this, "downleft")
            }
            return true;
        }
        person.jump= function() {

            this.jumpspeed = this.jumpspeed+this.gravity;
            if (this.jumpspeed < 0) {
                // console.log(-1)
                this.move(0, -1, -1);
            } else if (this.jumpspeed > 0) {
                this.move(0, 1, 1);
                // console.log("1")
            }
            return true;
        }
        person.fall= function() {
            // console.log("falling")
            //not while jumping
            if (!this.jumping && !this.hanging) {
                this.getCorners(this.x, this.y+1);
                //both tile below are empty
                if (!this.downleft && !this.downright) {
                    //falling down
                    this.jumpspeed = 0;
                    this.jumping = true;
                }
                if(this.downright){
                    // console.log("this.downright")
                    this.downright.collideAction(this, "downright")
                }
                if(this.upright){
                    // console.log("this.upright")
                    this.upright.collideAction(this, "upright")
                }
                if(this.upleft){
                    // console.log("this.upleft")
                    this.upleft.collideAction(this, "upleft")
                }
                if(this.downleft){
                    // console.log("this.downleft")
                    this.downleft.collideAction(this, "downleft")
                }
            }
        }

        // person.fall()

    }



function update_damage(change){
 if(!just_hit){
     if(change > 0 && num_hits+change<max_hits){
         num_hits+=change
         $("#hit" + num_hits).show()
     } else if(change < 0 && num_hits + change >= 0){
         $("#hit"+num_hits).hide()
         num_hits+=change
         just_hit = true;
         setTimeout(function(){just_hit = false}, 3000)
     } else if(num_hits + change < 0){
         console.log("DEAD!  :(")
     }
 }
}
var random_color = function(){
    return 'rgba('+ Math.round(Math.random()*255) +', '+ Math.round(Math.random()*255) +', '+ Math.round(Math.random()*255) +', 1)';
}