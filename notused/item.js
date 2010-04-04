// =============
// = items =
// =============

var item = function(o, x, y, w, h, moves, type){
	this.moves = moves;	
	// log(this.moves);
	(this.moves) ? items.push(this) : statics.push(this);
	this.ctx = (this.moves) ? scn : stc;
	this.type = type;
	this.id = o;
	this.x = x;
	this.y = y;	
	this.w = w;
	this.h = h;
	this.update();
}
item.prototype = {
	id:null,
	type:"",
	bounds:null,
	options:{},
	dirx:0,
	diry:0,
	moves:false,
	jumping:false,
	jumpheight:100,
	speed:0,
	acceleration:1,
	gravity:10,
	collisions:null,
	hanging: false,
	ctx: null,
	toSet:{x:0, y:0},
	color:'rgba(135,119,100,1)',
	solid:true,
	display: true,
	// cProcesses:[],
	draw:function(){
		if(this.display){
		this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
        // this.ctx.fillRect(Math.random()*5 + this.x, Math.random()*5 + this.y, this.w, this.h);
	}
	},
	update: function(){
		this.bounds = {left: this.x, top: this.y, right: this.w+this.x, bottom: this.h+this.y};
		// log(this.bounds.left, this.bounds.right, this.bounds.top, this.bounds.bottom)
	},
    set: function(){
        if(this.display){
            this.x +=this.toSet.x;
            this.y +=this.toSet.y;
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(this.x, this.y, this.w, this.h);
            this.toSet = {x:0, y:0};
        }
    },
    remove: function(){
        var array = (this.moves) ? items : statics;
        for (i in array) {
            if(array[i] == this){
                array.splice(i, 1);
            }
        }
        if(this.moves){
            items = array; 
        } else {
            statics = array;
            static_draw()
        }
    },	
	isCollision: function(other, side, x, y){
		// if(this.moves){ this.update();}
			var inY =   other.bounds.top > this.bounds.top && other.bounds.bottom < this.bounds.bottom ||
			other.bounds.top < this.bounds.bottom && other.bounds.bottom >= this.bounds.bottom ||
			other.bounds.top <= this.bounds.top && other.bounds.bottom > this.bounds.top;

			var inX =   other.bounds.left > this.bounds.left && other.bounds.right < this.bounds.right ||
			other.bounds.left < this.bounds.right && other.bounds.right >= this.bounds.right ||
			other.bounds.left <= this.bounds.left && other.bounds.right > this.bounds.left;
            // console.log("other directions", side, other.dirx, other.diry)
			if(side=="top"){
			    
			    if(y==1 && inX && other.bounds.top <= this.bounds.bottom && other.bounds.bottom > this.bounds.bottom){
			        other.y = this.y + this.w;
			        return true;
			    }
			}
			if(side == "right"){
			    
                // console.log(other.bounds.top < this.bounds.bottom && other.bounds.bottom >= this.bounds.bottom)
				if(x==1 && inY && (other.bounds.right + other.speed) >= this.bounds.left && other.bounds.left < this.bounds.left){
				    other.x = this.x - other.w;
				    return true;
				}
			}
			if(side=="bottom"){
			    
				if(y==-1  && inX && other.bounds.bottom >= this.bounds.top && other.bounds.top < this.bounds.top){
				    other.y = this.y - other.h;
				    return true;
				}
			}
			if(side == "left"){
                // console.log(other.bounds.top < this.bounds.bottom && other.bounds.bottom >= this.bounds.bottom)
			    
				if(x==-1 && inY && (other.bounds.left - other.speed) <= this.bounds.right && other.bounds.right > this.bounds.right){
				    other.x = this.x + this.w;
				    return true;
				}
			}
			return false;

		
	},
	collideAction: function(other, dir){
		// for(a in this.cProcesses){
		// 	// log("processing", this.id)
		// 	if(this.cProcesses[a])
		// 	this.cProcesses[a](other, dir);
		// }
	}
}

// ======================
// = collision checking =
// ======================
function checkAllCollisions(obj){
	return {top: checkCollisions(obj, "top"), right: checkCollisions(obj, "right"), bottom: checkCollisions(obj, "bottom"), left: checkCollisions(obj, "left")};
}
function checkCollisions(obj, dir, x, y){
    // console.log("checking collisions for: ", obj.id)
	
	var collision = false;
	for(o in items){
		if(items[o].id != obj.id){
			items[o].update()
			obj.update()
			if(items[o].isCollision(obj, dir, x, y)) {
				collision = true;
                // console.log("item", obj,dir)
				items[o].collideAction(obj, dir);
			}
		}
	}	
	for(o in statics){
		if(statics[o].id != obj.id){
			statics[o].update()
			obj.update()
			if(statics[o].isCollision(obj, dir, x, y)) {
				if(statics[o].solid) collision = true;
                // console.log("static", obj,dir)
				statics[o].collideAction(obj, dir);
			}
		}
	}
	return collision;
}
