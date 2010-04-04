//all objects inherit kim.item

// =============
// = platforms =
// =============
var platforms = {}
var platform = function(name, x, y, w, h, moves){
	platforms[name] = new item(name, x, y, w, h, moves, "platform");
	platforms[name].options = {active:false, left:0, right:0, speed:1} // inactive by default
	platforms[name].collideAction = function(other, dir){
		if(this.options.active == false && this.moves) this.options.active = true;
		other.toSet.x += this.dirx*this.options.speed;
	}
	platforms[name].draw = function(){
		this.update();
		// log("drawing this", this.bounds.left)
		if(this.options.active){
			if(this.bounds.left <= this.options.left){
				this.dirx = 1;
			}else if(this.bounds.right >= this.options.right){
				this.dirx = -1;
			}
			// log("platforms", this.id, this.dirx)
			// log(this.options.speed)
			this.x = this.bounds.left + this.dirx * this.options.speed;
			this.y = this.bounds.top;
			this.set();
		}else{
			this.set()
		}
	}
	return platforms[name];
}
// ===========
// = hazards =
// ===========
var hazards = {}
var hazard = function(name, x, y, w, h, moves){
	hazards[name] = new item(name, x, y, w, h, moves, "hazard");
	hazards[name].options = {direction:1}
	hazards[name].color = 'rgba(220,20,0,1)'
	hazards[name].collideAction = function(other, dir){
        // other.x += other.dirx*-10
		other.jumping = true;
		other.acceleration = 5
		if(other.id == "person")
		update_damage(-1);
	}
	return hazards[name];
}
// ===========
// = springs =
// ===========
var springs = {}
var spring = function(name, x, y, w, h, moves){
	springs[name] = new item(name, x, y, w, h, moves, "platform");
	springs[name].color = 'rgba(20,220,20,1)'
	springs[name].options = {active:false, left:0, right:0, speed:1, push:20} // inactive by default
	springs[name].collideAction = function(other, dir){
	    // if(dir == "bottom")
		other.jumping = true;
		other.acceleration = this.options.push;
		// person.y -=300;
		if(this.options.active == false && this.moves) this.options.active = true;
		other.toSet.x += this.dirx*this.options.speed;
	}
	springs[name].draw = function(){
		this.update();
		// log("drawing this", this.bounds.left)
		if(this.options.active){
			if(this.bounds.left <= this.options.left){
				this.dirx = 1;
			}else if(this.bounds.right >= this.options.right){
				this.dirx = -1;
			}
			// log("platforms", this.id, this.dirx)
			// log(this.options.speed)
			this.x = this.bounds.left + this.dirx * this.options.speed;
			this.y = this.bounds.top;
			this.set();
		}else{
			this.set()
		}
	}
	return springs[name];
}
// ===========
// = stars =
// ===========
var treasures = {}
var treasure = function(name, x, y, w, h, moves, type){
	treasures[name] = new item(name, x, y, w, h, moves, "treasure");
	treasures[name].solid = false;
	if(type == "star"){
		treasures[name].color = 'rgba(225,220,20,1)'
		treasures[name].collideAction = function(other, dir){
			if(other.id =="person"){
				num_stars++;
				// log(num_stars, this.id)
				$('collection').innerHTML = ""+num_stars;
				this.display = false;
				this.draw = function(){console.log("nothing")}
				static_draw();
				this.collideAction = function(){}
			}
		}
	}else if(type == "heart"){
		treasures[name].color = 'rgba(225,20,20,1)'
		treasures[name].collideAction = function(other, dir){
			if(other.id == "person"){
				update_damage(1);
				this.display = false;
				this.draw = function(){console.log("nothing")}
				static_draw();
				this.collideAction = function(){}
			}
		}	
	}
	return treasures[name];
}
function star(name, x, y, w, h, moves, type){
    new treasure(name, x, y, w, h, moves, "star")
}
function heart(name, x, y, w, h, moves, type){
    new treasure(name, x, y, w, h, moves, "heart")
}
// ===============
// = characrters =
// ===============
var characters = {}
var character = function(name, x, y, w, h, moves){
	characters[name] = new item(name, x, y, w, h, moves, "character"); //playable obj--you!
	characters[name].color = 'rgba(0,0,255,1)'
	characters[name].options = {jumps: false, runner:false, hanger:false, left:0, right:0, speed:5} // inactive by default
	characters[name].collideAction = function(other, dir){
		if(other.id == "person")
		update_damage(-1)
	}
	characters[name].draw = function(){
		this.update();
		this.collisions = checkAllCollisions(this);
		// log(this.x + this.w + this.speed*2)
		if(this.options.runner){
			if(this.x - this.speed < this.options.left){
				// log(this.id, "hit left boundary")
				this.dirx = 1;
				this.x = this.x + (this.dirx * this.speed);
			}else if(this.x + this.w + this.speed > this.options.right){
				// log(this.id, "hit right boundary")
				this.dirx = -1;
				this.x = this.x + (this.dirx * this.speed);
			}
			this.x = this.x + (this.dirx * this.speed);
			// log("platforms", this.id, this.dirx)
			// log(this.options.speed)
			// this.y = this.bounds.top;
			// this.set();	
		}

		//jumping
		(this.options.hanger) ? this.hanging = true : this.hanging = false;
		if(this.collisions.top) {
			this.jumping = false;
		}	
		if (!this.jumping && !this.collisions.bottom && !this.hanging){
			if(this.acceleration < this.gravity) this.acceleration ++;
			for(var a = 0; a < this.acceleration; a++){
				this.collisions = checkAllCollisions(this)
				if(!this.collisions.bottom) {
					this.y+= 1;
				} else {
					this.diry = 0;
					this.acceleration = this.gravity;
				}
			}
			this.diry = 1;
		} else if (this.jumping && !this.collisions.top){
			for(var a = 0; a < this.acceleration; a++){
				this.collisions = checkAllCollisions(this)
				if(!this.collisions.top) {
					this.y-= 1;
				} else {/*log("collision top")*/}
			}
			this.diry = -1;
			this.acceleration--;
			if(this.acceleration<=0){
				this.jumping = false;
			}
		} else if (this.collisions.bottom){
			// log("this")
			this.diry = 0;
			this.acceleration = this.gravity;
		}	
		//update
		// log("sending", setx, sety)
		this.set()

		// }
	}
	return characters[name];
}