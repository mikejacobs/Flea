// =============
// = active =
// =============
var game_obj = function(args){
    //replace defaults
    for(arg in args) this[arg] = args[arg];

    (this.moves) ? tiles.push(this) : statics.push(this);
    this.context = (this.moves) ? scn : stc;
    // return this;
}
game_obj.prototype = {
    id:"",
    type:"",
    group:"",
    x:0,
    y:0,
    w:0,
    h:0,
    xtile:0,
    ytile:0,
    bounds:null,
    collisions:null,
    context: null,
    color:'rgba(0,0,0,1)',
    solid:true,
    display: true,
    downY:0,
    upY:0,
    leftX:0,
    rightX:0,
    upleft:false,
    downleft:false,
    upright:false,
    downright:false,
    jumping:false,
    jumpstart:-10,
    jumpspeed:0,
    gravity:1,
    speed:3,
    draw:function(){
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x*tileW, this.y*tileH, tileW, tileH);
    },
    getCorners: function() {},
    move:function() {},
    jump:function() {},
    fall:function() {}
}
var tile = function(args){
    this.obj = new game_obj(args)
}
tile.prototype = {
    draw: function(){this.obj.draw();}
}
var person;
var makePerson = function(args){
person = new game_obj(args);
person.x = (person.xtile*tileW)+tileW/2;
person.y = ((person.ytile+1)*tileH)-person.h;
person.startX = person.x;
person.startY = person.y;
person.color = 'rgba(100,10,0,1)';
person.draw =function(){
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, tileW, tileH);
},
person.getCorners= function(x, y, dirx, diry) {

    // console.log("getCorners", "x", x, "y", y, "this.h", this.h, "this.w", this.w, "this.x", this.x, "this.y", this.y)
    // console.log("leftX", Math.floor((x-this.w)/tileW), x, this.w, tileW)
    this.downY = Math.floor((y+this.h-1)/tileH);
    this.upY = Math.floor(y/tileH);
    this.leftX = Math.floor(x/tileW);
    this.rightX = Math.floor((x+this.w-1)/tileW);
    // console.log("moving to", this.downY, this.upY, this.leftX, this.rightX)
    //check if they are walls
    // console.log("tiles", this.upY, this.leftX, tiles[this.upY][this.leftX])
    this.upleft = false;
    this.downleft = false;
    this.upright = false; 
    this.downright = false;
    // 
    // dir = dirx || diry;
    // start = (dirx) ? 
    // 
    // if(diry==1)
    //     diff = this.tileY-this.downY
    // else if(diry==-1)
    //     diff = this.tileY-this.upY
    // else if(dirx==1)
    //     diff = this.tileX-this.rightX
    // else if(dirx==-1)
    //     diff = this.tileX-this.leftX

    for(var t = this.tileY; t <= diff+(this.tileY); x+=dir){
        this.checkTiles([this])
    }
        // if(this.upY > 0 && this.leftX > 0){
        //     // console.log("upleft:", tiles[this.upY][this.leftX])
        //     if(tiles[this.upY][this.leftX]){
        //         console.log("upleftsolid:", tiles[this.upY][this.leftX])
        //         this.upleft = tiles[this.upY][this.leftX];
        //     }
        // }
        // if(this.downY <= screenSize && this.leftX > 0){
        //     // console.log("downleft:", tiles[this.downY][this.leftX])
        //     if(tiles[this.downY][this.leftX]){
        //         console.log("downleftsolid:", tiles[this.downY][this.leftX])
        //         this.downleft = tiles[this.downY][this.leftX];
        //     }
        // }
        // if(this.upY > 0 && this.rightX <= screenSize){
        //     // console.log("upright:", tiles[this.upY][this.rightX])
        //     if(tiles[this.upY][this.rightX]){
        //         console.log("uprightsolid:", tiles[this.upY][this.rightX])
        //         this.upright = tiles[this.upY][this.rightX];
        //     }
        // }
        // if(this.downY <= screenSize && this.rightX <= screenSize){
        //     // console.log("downright:", tiles[this.downY][this.rightX])
        //     if(tiles[this.downY][this.rightX]){
        //         console.log("downrightsolid:", tiles[this.downY][this.rightX])
        //         this.downright = tiles[this.downY][this.rightX];
        //         tiles[this.downY][this.rightX].color = 'rgba(200,200,0,1)';
        //         // console.log(tiles[this.downY][this.rightX].x, tiles[this.downY][this.rightX].y, this.xtile, this.ytile)
        //     }
        // }
        
        
        // console.log("collisions", this.upleft, this.downleft, this.upright, this.downright)
        // console.log("downright", tiles[this.downY][this.rightX], this.downY, this.rightX)
        // console.log("upright", tiles[this.upY][this.rightX], this.upY, this.rightX)
    }
person.checkTiles = function(sides){
        if(this.upY > 0 && this.leftX > 0){
            // console.log("upleft:", tiles[this.upY][this.leftX])
            if(tiles[this.upY][this.leftX]){
                console.log("upleftsolid:", tiles[this.upY][this.leftX])
                this.upleft = tiles[this.upY][this.leftX];
            }
        }
        if(this.downY <= screenSize && this.leftX > 0){
            // console.log("downleft:", tiles[this.downY][this.leftX])
            if(tiles[this.downY][this.leftX]){
                console.log("downleftsolid:", tiles[this.downY][this.leftX])
                this.downleft = tiles[this.downY][this.leftX];
            }
        }
        if(this.upY > 0 && this.rightX <= screenSize){
            // console.log("upright:", tiles[this.upY][this.rightX])
            if(tiles[this.upY][this.rightX]){
                console.log("uprightsolid:", tiles[this.upY][this.rightX])
                this.upright = tiles[this.upY][this.rightX];
            }
        }
        if(this.downY <= screenSize && this.rightX <= screenSize){
            // console.log("downright:", tiles[this.downY][this.rightX])
            if(tiles[this.downY][this.rightX]){
                console.log("downrightsolid:", tiles[this.downY][this.rightX])
                this.downright = tiles[this.downY][this.rightX];
                tiles[this.downY][this.rightX].color = 'rgba(200,200,0,1)';
            }
        }
}
person.move= function(dirx, diry, jump) {
    // console.log(dirx, diry, jump, this.x, this.y, this.h, this.w, "jkasjhdfa")
        if (Math.abs(jump)==1) {
            speed=this.jumpspeed*jump;
        } else {
            speed=this.speed;
        }
        
        console.log("speed",(speed*diry))
        if (diry == -1) {
            var end = Math.floor(this.y/tileH)
            for(){
            this.getCorners (this.x, this.y+(speed*diry), 0, diry);
            if (!this.upleft.solid && !this.upright.solid) {
                this.y += speed*diry;
                this.ytile = Math.floor((this.y)/tileH);
            } else {
                this.y = ((this.upleft.y*tileH)+this.h) || ((this.upright.y*tileH)+this.h)
                this.ytile = this.upleft.y || this.upright.y
                this.jumpspeed = 0;
            }
            // this.ytile = Math.floor(this.y/tileH);
        }
        }
        if (diry == 1) {
            // console.log("falling")
            if(this.y > (screenSize+this.h)){
                //off map
                //updateDamage(-1)
                this.y = this.startY;
                this.x = this.startX;
            } else {
                if (!this.downleft.solid && !this.downright.solid) {
                    this.ytile = Math.floor((this.y)/tileH);
                    this.y += speed*diry;
                } else {
                    // this.y = (this.ytile+1)*tileH-this.h;
                    this.y = ((this.downleft.y*tileH)-this.h) || ((this.downright.y*tileH)-this.h)
                    this.ytile = this.downleft.y-1 || this.downright.y-1
                    this.jumping = false;
                }
            }
            // this.ytile = Math.floor((this.y)/tileH);
        }
        // console.log("this.x1", this.x)
        
        this.getCorners (this.x+(speed*dirx), this.y, dirx, 0);
        if (dirx == -1) {
            if (!this.downleft.solid && !this.upleft.solid) {
                this.x += speed*dirx;
                //check for tile below
                this.fall();
            } else {
                this.x = this.xtile*tileW+this.w;
            }
            this.xtile = Math.floor(this.x/tileW)-1;
        }
        // console.log("this.x2", this.x)
        
        if (dirx == 1) {
            // console.log("moving right: ", this.x, this.upright, this.downright, this.xtile)
            if (!this.upright.solid && !this.downright.solid) {
                // console.log("all clear, moving right")
                this.x += speed*dirx;
                //check for tile below
                this.fall();
            } else {
                // console.log("something to my right, snapping to it", this.xtile+1)
                this.x = (this.xtile+1)*tileW-this.w;
            }
            this.xtile = Math.floor((this.x+this.speed)/tileW);
        }
        
        // this.clip._x = this.x;
        // this.clip._y = this.y;
        // this.clip.gotoAndStop(dirx+diry*2+3);
        // this.draw()
        return true;
    }
person.jump= function() {
        this.jumpspeed = this.jumpspeed+this.gravity;
        // console.log(tileH-this.h)
        // if (this.jumpspeed>tileH-this.h) {
        //     this.jumpspeed = tileH-this.h;
        // }
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
    	//not while jumping
    	if (!this.jumping) {
    		this.getCorners(this.x, this.y+1);
    		//both tile below are empty
    		if (!this.downleft && !this.downright) {
    			//falling down
    			this.jumpspeed = 0;
    			this.jumping = true;
    		}
    	}
    }
    
person.fall()

}