tileTypes = {
    "platform": {
        type: "platform",
        moves: false,
        solid: true,
        color: 'rgba(0,0,0,1)'
    },
    "crosshair": {
        type: "crosshair",
        moves: true,
        solid: false,
        color: 'rgba(255,0,0,1)'
    },
    "hazard": {
        type: "hazard",
        moves: false,
        solid: true,
        color: 'rgba(255,0,0,1)',
        collideAction: function(other, dir) {
            if (other.id == "person") {
                spikeTranslator = {
                    "right": "left",
                    "top": "down",
                    "bottom": "top",
                    "left": "right"
                }
                // console.log("spikes", this.spikes, spikeTranslator[this.spikes])
                if (dir.indexOf(spikeTranslator[this.spikes]) != -1) {
                    update_damage(-1);
                    if (other.hanging) {
                        other.hanging = false;
                    }
                }
            }
        },
        draw: function() {
            if (this.display) {
                this.context.fillStyle = this.color;
                d = (this.spikes) ? this.spikes : "top";
                if (d == "top" || d == "bottom") {
                    d = (d == "top") ? 1 : -1;
                    offset = (d == -1) ? tileH : 0;
                    this.context.beginPath();
                    this.context.moveTo(this.xtile * tileW, this.ytile * tileW + (tileW * d) + offset);
                    this.context.lineTo(this.xtile * tileW, this.ytile * tileW + ((tileW / 2) * d) + offset);
                    this.context.lineTo(this.xtile * tileW + (tileW / 2), this.ytile * tileW + offset);
                    // this.context.lineTo(this.xtile*tileW + 8, this.ytile*tileW  + (tileW/2));
                    this.context.lineTo(this.xtile * tileW + tileW, this.ytile * tileW + ((tileW / 2) * d) + offset);
                    this.context.lineTo(this.xtile * tileW + tileW, this.ytile * tileW + (tileW * d) + offset);
                    this.context.fill();
                } else if (d == "right" || d == "left") {
                    d = (d == "left") ? 1 : -1;
                    offset = (d == -1) ? tileW : 0;
                    this.context.beginPath();
                    this.context.moveTo(this.xtile * tileW + (tileW * d) + offset, this.ytile * tileH);
                    this.context.lineTo(this.xtile * tileW + ((tileW / 2) * d) + offset, this.ytile * tileH);
                    this.context.lineTo(this.xtile * tileW + offset, this.ytile * tileH + (tileH / 2));
                    // this.context.lineTo(this.xtile*tileW + 8, this.ytile*tileW  + (tileW/2));
                    this.context.lineTo(this.xtile * tileH + ((tileH / 2) * d) + offset, this.ytile * tileH + tileH);
                    this.context.lineTo(this.xtile * tileH + (tileH * d) + offset, this.ytile * tileH + tileH);
                    this.context.fill();
                }

            }
        },
    },
    "sidehold": {
        type: "sidehold",
        moves: false,
        solid: true,
        color: 'rgba(100,100,0,1)',
        collideAction: function(other, dir) {
            if (upArrow) {
                other.hanging = true;
                other.jumping = false;
            }
        },
        draw: function() {
            if (this.display) {
                this.context.fillStyle = this.color;
                for (i = 0; i < tileW; i += 3) {
                    for (j = 0; j < tileW; j += 3) {
                        this.context.fillRect(this.xtile * tileW + i, this.ytile * tileH + j, 2, 2);
                    }
                }
            }
        },
    },
    "star": {
        type: "star",
        moves: false,
        solid: false,
        color: 'rgba(225,220,20,1)',
        collideAction: function(other, dir) {
            if (other.id == "person") {
                num_stars++;
                // log(num_stars, this.id)
                $('#collection').html(num_stars);
                this.remove()

            }
        },
        draw: function() {
            if (this.display) {
                this.context.fillStyle = this.color;
                // [10,40,40,40,50,10,60,40,90,40,65,60,75,90,50,70,25,90,35,60]
                this.context.fill();

            }
        }
    },
    "heart": {
        type: "heart",
        moves: false,
        solid: false,
        color: 'rgba(225,20,20,1)',
        collideAction: function(other, dir) {
            if (other.id == "person") {
                update_damage(1);
                this.remove()
            }
        }
    },
    "background": {
        type: "background",
        moves: false,
        solid: false,
        color: 'rgba(225,20,20,1)'
    },
    "spring": {
        type: "spring",
        moves: false,
        solid: true,
        push: -20,
        color: 'rgba(0,255,0,1)',
        collideAction: function(other, dir) {
            // console.log("dir", dir)
            if (dir == "downright" || dir == "downleft") {
                other.ytile = this.ytile - 1;
                other.draw()
                other.jumping = true;
                other.jumpspeed = this.push;
                other.jump();
            }
            // if(this.options.active == false) this.options.active = true;
            // other.toSet.x += this.dirx*this.options.speed;
        },
        draw: function() {
            if (this.display) {
                this.context.fillStyle = this.color;
                this.context.beginPath();
                this.context.moveTo(this.xtile * tileW, this.ytile * tileW + tileW);
                this.context.arc(this.xtile * tileW + (tileW / 2), this.ytile * tileW + (tileW / 2), 4, Math.PI, 0, false)
                this.context.lineTo(this.xtile * tileW + tileW, this.ytile * tileW + tileW);
                this.context.fill();

            }
        },
    }
    // "crosshair": {type:"crosshair", moves:true, solid:false, color:'rgba(255,0,0,1)'}
}
makeTile = function(obj) {
    // console.log("maketile:", obj)
    // console.log(typeof obj.type, parseInt(obj.type))
    // if(parseInt(obj.type) != NaN) obj.type = decode_type[parseInt(obj.type)]
    // if(typeof obj.type == "number") obj.type = decode_type[obj.type]
    var o = tileTypes[obj.type]
    // console.log(o.type)
    //overwrite with specified vals
    for (arg in obj) o[arg] = obj[arg];
    return new game_obj(o)
}
decode_type = ["platform", "crosshair", "hazard", "sidehold", "star", "heart", "background", "spring"]
encode_type = {
    "platform": 0,
    "crosshair": 1,
    "hazard": 2,
    "sidehold": 3,
    "star": 4,
    "heart": 5,
    "background": 6,
    "spring": 7
}
// console.log("tiletypes loaded", tileTypes)