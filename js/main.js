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
    console.log("loading map", map)
    tiles = 85

    // if(map === String){
        // console.log("string")

    
    if(map) {
        // map = $.evalJSON(map)
        if(map[0]["id"]){ /* if loaded through template */
            console.log("loading map from db")
            tempmap = generateMap(tiles, tiles);
            // map = $.evalJSON(map)
            // console.log("importing this map's tiles ", maparr["tiles"])
            decompressTiles = function(arr){
                // console.log("array to decompress"+arr)
                output = []
                for (t in arr) {
                    el = arr[t].split("|")
                    output.push({type: decode_type[parseInt(el[0])], color: el[1], xtile: parseInt(el[2]), ytile: parseInt(el[3])})
        	    }
                // console.log("output", output)
        	    return output
        	}
        	tempmap.tiles = decompressTiles(map[0]["level"]["tiles"])
        	tempmap.bg = decompressTiles(map[0]["level"]["bg"])
        	map = tempmap
        }
        tiles = map.width;
    }
    init = true;
    screenSize = tiles * 10;
    // console.log("map", map)
    empty_map = generateMap(tiles, tiles);
    tiles = empty_map.tiles
    bg_tiles = empty_map.bg
    console.log("bg_tiles", bg_tiles)
    // map = myMo;
    // tiles = map.tiles;
    // map = generateMap(screenSize);
    mapWidth = empty_map.width;
	mapHeight = empty_map.height;
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
    
    //fill the tiles
    if(map){
        fillTiles = function(arr, m){
            for (tile in m) {
                    // console.log("isnan", map[y][x], parseInt(map[y][x]))
                    makeTile(m[tile])
                    // arr[m[tile].ytile][m[tile].xtile] = m[tile]
                    
            }
        }
        fillTiles(tiles, map.tiles)
        fillTiles(bg_tiles, map.bg)
        makePerson(map.person)
    } else{
        makePerson(empty_map.person)
    }
    // console.log(tiles)
    // TODO: FIX THIS
    // if(map.person){
    //     makePerson(map.person)
    // }else{
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
    if (drawing) clearInterval(drawing)
    scn = $('#screen').get(0).getContext('2d');
	stc = $('#static').get(0).getContext('2d');
	bg = $('#background').get(0).getContext('2d');
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