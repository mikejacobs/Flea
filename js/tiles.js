tileTypes = {
    "platform": {type:"platform", moves:false, solid:true, color:'rgba(0,0,0,1)'},
    "crosshair": {type:"crosshair", moves:true, solid:false, color:'rgba(255,0,0,1)'},
    "hazard": {type:"hazard", moves:false, solid:true, color:'rgba(255,0,0,1)', collideAction: function(other, dir){
        if(other.id == "person"){
            update_damage(-1);
            if(other.hanging){
                other.hanging = false;
            }
        }
    }},
    "sidehold": {type:"sidehold", moves:false, solid:true, color:'rgba(100,100,0,1)', collideAction: function(other, dir){
        if(upArrow){
            other.hanging = true;
            other.jumping = false;
        }
    }},
    "star": {type:"star", moves:false, solid:false, color:'rgba(225,220,20,1)', collideAction: function(other, dir){
        if(other.id =="person"){
			num_stars++;
            // log(num_stars, this.id)
			$('#collection').html(num_stars);
			this.remove()
		}
    }},
    "heart": {type:"heart", moves:false, solid:false, color:'rgba(225,20,20,1)', collideAction: function(other, dir){
		if(other.id == "person"){
			update_damage(1);
			this.remove()
		}
    }},
    "spring": {type:"spring", moves:false, solid:true, push:-20, color:'rgba(0,255,0,1)', collideAction: function(other, dir){
        console.log("dir", dir)
        if(dir == "downright" || dir == "downleft"){
            other.ytile = this.ytile -1;
            other.draw()
            other.jumping = true;
            other.jumpspeed = this.push;
		    other.jump();
		}
        // if(this.options.active == false) this.options.active = true;
        // other.toSet.x += this.dirx*this.options.speed;
    }}
    // "crosshair": {type:"crosshair", moves:true, solid:false, color:'rgba(255,0,0,1)'}
}
makeTile = function(obj){
    console.log(obj)
    var o = tileTypes[obj.type]
    //overwrite with specified vals
    for(arg in obj) o[arg] = obj[arg];
    return new game_obj(o)
}
console.log("tiletypes loaded", tileTypes)