// =============
// = active =
// =============
var game_obj = function(args){
    //replace defaults
    for(arg in args) this[arg] = args[arg];
    if(this.moves){
        movers.push(this)
        // movers[this.ytile][this.xtile] = this;
        this.container = movers;
        this.context = scn
    } else {
        if(this.type=="background"){
            bg_tiles[this.ytile][this.xtile] = this;
            this.container = bg_tiles
            this.context = bg
        }else{
            tiles[this.ytile][this.xtile] = this;
            this.container = tiles
            this.context = stc
        }
    }
    this.draw()
}
game_obj.prototype = {
    id:"",
    container:[],
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
    jumpstart:-20,
    jumpspeed:0,
    gravity:1,
    speed:7,
    wasHanging:false,
    hanging:false,
    collideAction:function(){},
    draw:function(){
        if(this.display){
            this.context.fillStyle = this.color;
            // this.context.fillRect(this.x*tileW, this.y*tileH, tileW, tileH);
            this.context.fillRect(this.xtile*tileW, this.ytile*tileH, tileW, tileH);

        }
    },
    getCorners: function() {},
    move:function() {},
    jump:function() {},
    fall:function() {},
    remove: function() {
        // console.log("removing", this.y, this.x)
        // arr = (this.moves) ? movers : tiles;
        if(!this.moves)
            this.container[this.ytile][this.xtile] = 0
        else{//in movers
            for(o in this.container){
                if(this.container[o] == this) this.container[o] = 0
            }
        }
        if(!this.moves && !init){
            if(this.type == "background")
                bg_draw()
            else
                static_draw()
        }
    }

}
var tile = function(args){
    return  new game_obj(args)
}
function inBounds(x,y){
    // console.log("check bounds of: ", x, y)
    if(x>(mapWidth/10)-1 || x<0){
        return false;
    }
    if(y>(mapHeight/10)-1 || y<0){
        return false;
    }
    return true;

}