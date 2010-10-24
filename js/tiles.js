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
        },
        draw:function(){
            if(this.display){
                this.context.fillStyle = this.color;
                // this.context.fillRect(this.xtile*tileW, this.ytile*tileH, tileW, tileH);
                // this.context.beginPath();  
                // this.context.moveTo(this.xtile*tileW, this.ytile*tileW + tileW);
                // this.context.lineTo(this.xtile*tileW, this.ytile*tileW + (tileW/2));
                // this.context.lineTo(this.xtile*tileW + 4, this.ytile*tileW);
                // this.context.lineTo(this.xtile*tileW + 8, this.ytile*tileW  + (tileW/2));
                // this.context.lineTo(this.xtile*tileW + tileW, this.ytile*tileW  + (tileW/2));
                // this.context.lineTo(this.xtile*tileW + tileW, this.ytile*tileW  + tileW);
                // this.context.fill();
                
                this.context.beginPath();  
                this.context.moveTo(this.xtile*tileW, this.ytile*tileW + tileW);
                this.context.lineTo(this.xtile*tileW, this.ytile*tileW + (tileW/2));
                this.context.lineTo(this.xtile*tileW + (tileW/2), this.ytile*tileW);
                // this.context.lineTo(this.xtile*tileW + 8, this.ytile*tileW  + (tileW/2));
                this.context.lineTo(this.xtile*tileW + tileW, this.ytile*tileW  + (tileW/2));
                this.context.lineTo(this.xtile*tileW + tileW, this.ytile*tileW  + tileW);
                this.context.fill();

            }
        },
    },
    "sidehold": {type:"sidehold", moves:false, solid:true, color:'rgba(100,100,0,1)', collideAction: function(other, dir){
        if(upArrow){
            other.hanging = true;
            other.jumping = false;
        }
    },
    draw:function(){
        if(this.display){
            this.context.fillStyle = this.color;
            for(i=0; i<tileW; i+=3){
                for(j=0; j<tileW; j+=3){
                    this.context.fillRect(this.xtile*tileW + i, this.ytile*tileH + j, 2, 2);
                }
            }
        }
    },
    },
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
    "background": {type:"background", moves:false, solid:false, color:'rgba(225,20,20,1)'},
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
    },
    draw:function(){
        if(this.display){
            this.context.fillStyle = this.color;            
            this.context.beginPath();  
            this.context.moveTo(this.xtile*tileW, this.ytile*tileW + tileW);

            this.context.arc(this.xtile*tileW + (tileW/2), this.ytile*tileW + (tileW/2), 4, Math.PI, 0, false)

            this.context.lineTo(this.xtile*tileW + tileW, this.ytile*tileW  + tileW);
            this.context.fill();

        }
    },
    }
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