//playable character
// var person = new game_obj({type:"person", id:"person", x:0, y:0, w:10, h:20, moves:true})
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

downmap = {
	"16": function(){shiftButton = true;},
	"91": function(){commandButton = true;},
	"32": function(){spaceBar = true;},
	"39": function(){rightArrow = true;},
	"37": function(){leftArrow = true;},
	"38": function(){upArrow = true;}
};	
upmap = {
	"16": function(){shiftButton = false;},
	"91": function(){commandButton = false;},
	"32": function(){spaceBar = false;},
	"39": function(){rightArrow = false;},
	"37": function(){leftArrow = false;},
	"38": function(){upArrow = false;}
};

function route(e){
    // e.stop()
    // console.log(e.keyCode)
	var fxn = (e.type == "keydown") ? downmap[e.keyCode+""] : upmap[e.keyCode+""]
	if(fxn) {fxn();}
}
$(function(){
$("#playpause").toggle(function(){
    // console.log("hhhh")
    clearInterval(drawing)
    $(this).html("play")
}, function(){
    drawing = setInterval(draw, 40)
    $(this).html("pause")
    
})
})