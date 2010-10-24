// =========
// = GAME! =
// =========
// Ideas:
// -enemies follow by having game occasionally set morphs to the person's current location
// -ducking on downarrow
// -allow multiple collision actions
// -animations (death, lvl complete)


// ====================
// = Setup
var scn;
var stc;
var drawing;
var map = []
var mapHeight = 0;
var mapWidth = 0;
var character;
// var ctx;
tiles = []
bg_tiles = []
statics = []
movers = []
person = false;
num_stars = 0;
num_hits = 10;
max_hits = 15;
just_hit = false;
shiftButton = false;
spaceBar = false;
rightArrow = false;
leftArrow = false;
upArrow = false;
editor = false;
init = true;
tileW = 10;
tileH = 10;
// =====================
// window.onbeforeunload = function(e){
 // var p = confirm("Leaving ? You will lose all progress.");
 // !confirm("Leaving ? You will lose all progress.") ? e.preventDefault() : window.reload()
// }

function draw(){
    if(editor){
	    scn.clearRect(ch.x1*tileW -2, ch.y1*tileH -2, tileW+2, tileH+2); 
	}
    // scn.clear = false;
    scn.clearRect(0,0,850,850); // clear canvas
    // scn.clearRect(person.x, person.y, tileW, tileH); 
    

	if(person) detectKeys()
    // for (var y = 0; y<mapHeight; ++y) {
    //  for (var x = 0; x<mapWidth; ++x) {
    //             if(movers[y][x])
	for(m in movers){movers[m].draw()}
    //  }
    // }
}
function gameLoad(map){
    console.log("loading map")
    
    // if(map === String){
        // console.log("string")
    if(map) map = $.evalJSON(map)
    // }
    init = true;
    tiles = 85
    screenSize = tiles * 10;
    // console.log("map", map)
    if(!map) map = generateMap(tiles, tiles);
    bg_tiles = map.bg
    console.log("bg_tiles", bg_tiles)
    // map = myMo;
    tiles = map.tiles;
    // map = generateMap(screenSize);
    mapWidth = map.width;
	mapHeight = map.height;
    // console.log("loading map width&height", mapWidth, mapHeight)
	
	scn = $('#screen').get(0).getContext('2d');
	stc = $('#static').get(0).getContext('2d');
	bg = $('#background').get(0).getContext('2d');
	scn.clearRect(0,0,850,850);
	stc.clearRect(0,0,850,850);
	bg.clearRect(0,0,850,850);

    // if(lvl == "new") editor = true;
    // level(lvl)
	//update all nonmoving things
    // console.log("tiles", tiles)
    fillTiles = function(arr){
        for (var y = 0; y<map.height; ++y) {
            var row = []
    		for (var x = 0; x<map.width; ++x) {
                // console.log("test tile", y, x, tiles[y][x], isNaN(parseInt(tiles[y][x])))
    		    if(arr[y][x] && isNaN(parseInt(arr[y][x]))){
                    // console.log("isnan", map[y][x], parseInt(map[y][x]))
                    t = makeTile(arr[y][x], {xtile:x, ytile:y})
    		        if(Math.random()>.2){
                      // tiles[y][x].solid = false;
                      // t.color = 'rgba(0,0,0,1)';  
    		        } 

                }
                row[x] = 0;
    		}
    	}
    }
    fillTiles(tiles)
    fillTiles(bg_tiles)
    // console.log(tiles)
    // TODO: FIX THIS
    // if(map.person){
    //     makePerson(map.person)
    // }else{
        makePerson(map.person)
    // }
    
	
    // static_draw();

	//connect game controls
	$(window).keydown(route);
	$(window).keyup(route);
	
	//start drawing
	init = false;
    drawing = setInterval(draw, 40);
    // draw()
}
function resetGame(map){
    clearInterval(drawing)
    scn.clearRect(0,0,850,850); // clear canvas
    stc.clearRect(0,0,850,850);
    bg.clearRect(0,0,850,850);
    person = 0;
    movers = [];
    num_stars = 0;
    num_hits = 10;
    max_hits = 15;
    // just_hit = false;
    // spaceBar = false;
    // rightArrow = false;
    // leftArrow = false;
    // upArrow = false;
    console.log("loading new map")
    person = 0;
    gameLoad(map);
}
function static_draw(){
    // console.log("redrawing static")
	stc.clearRect(0,0,850,850);
    draw_tiles(tiles)
}
function bg_draw(){
    // console.log("redrawing static")
	bg.clearRect(0,0,850,850);
    draw_tiles(bg_tiles)
}
draw_tiles = function(arr){
    for (var y = 0; y<mapHeight; ++y) {
    	for (var x = 0; x<mapWidth; ++x) {
    	    if(arr[y][x]){
    	        arr[y][x].draw()
            }
    	}
    }
}
function generateMap(w,h){
    var map = {width:w, height:h}
    console.log("genmap", w, h)
    map.person = {type:"person", id:"person", xtile:1, ytile:2, w:10, h:10, moves:true}
    map.tiles = []
    map.bg = []
    for (var y = 0; y<h; ++y) {
        var row = []
        var rowb = []
		for (var x = 0; x<w; ++x) {
                row[x] = 0
                rowb[x] = 0
        }
        map.tiles.push(rowb)
        map.bg.push(row)
	}
    // console.log(map)
	return map;
}