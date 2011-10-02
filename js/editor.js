// ===========
// = crosshair =
// ===========
var crosshairs = {}
var crosshairType = "brush"
var dragging = false;
var startX = 0
var startY = 0
prevxtile = 0
prevytile = 0
ch = false;
editor = true;
var stack = [];
var last_change = 0;
currentMaterial = 0;
makeCrosshair = function(x, y) {
    crosshairs = new game_obj(tileTypes.crosshair)
    crosshairs.x1 = 0
    crosshairs.y1 = 0
    crosshairs.x2 = 0
    crosshairs.y2 = 0
    this.dirx = 0
    this.diry = 0
    crosshairs.update = function(x1, y1, x2, y2) {
        this.prevxtile = this.x2
        this.prevytile = this.y2
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
    }
    crosshairs.draw = function() {
        this.dirx = (this.x1 - this.x2) / Math.abs(this.x1 - this.x2) || 0
        this.diry = (this.y1 - this.y2) / Math.abs(this.y1 - this.y2) || 0
        scn.clearRect(ch.x1 * tileW - 2, ch.y1 * tileH - 2, tileW + 2, tileH + 2);
        scn.strokeRect(this.x1 * tileW, this.y1 * tileH, (this.x1 - this.x2) * -tileW, (this.y1 - this.y2) * -tileH)
    }
    crosshairs.makeMaterial = function(x, y, xo, yo) {
        if (shiftButton) {
            if (currentMaterial == "background") {
                if (bg_tiles[ch.y1 + y + yo][ch.x1 + x + xo]) {
                    bg_tiles[ch.y1 + y + yo][ch.x1 + x + xo].remove()
                }
            } else {
                if (tiles[ch.y1 + y + yo][ch.x1 + x + xo]) {
                    tiles[ch.y1 + y + yo][ch.x1 + x + xo].remove()
                }
            }
        } else {
            var c = $.jPicker.ColorMethods.hexToRgba(opts.color)
            if (currentMaterial == "person") {
                person.x = (ch.x1 * tileW) + tileW / 2;
                person.y = ((ch.y1 + 1) * tileH) - person.h;
                person.startX = person.x;
                person.startY = person.y;
                person._color = "rgba(" + c.r + "," + c.g + "," + c.b + "," + c.a + ")"
            } else {
                makeTile({
                    type: currentMaterial,
                    xtile: ch.x1 + x + xo,
                    ytile: ch.y1 + y + yo,
                    w: tileW,
                    h: tileH,
                    moves: opts.moves,
                    color: "rgba(" + c.r + "," + c.g + "," + c.b + "," + c.a + ")",
                    spikes: $("input[name='spikes']:checked").val()
                })
            }
        }
    }
    crosshairs.xtile = x
    crosshairs.ytile = y
    return crosshairs;
}

function getOpts() {
    var opts = {}
    var form = $("form#" + currentMaterial).serialize().split("&")
    for (pair in form) {
        o = form[pair].split("=")
        if (o[1] == "true") o[1] = true;
        if (o[1] == "false") o[1] = false;
        opts["" + o[0]] = o[1]
    }
    return opts
}
$(function() {
    recentColors = $("#recentColors")
    $('.color').jPicker({
        window: // used to define the position of the popup window
        // only useful in binded mode
        {
            position: {
                x: '150px',
                // acceptable values "left", "center", "right",
                // "screenCenter", or relative px value
                y: '-150px',
                // acceptable values "top", "bottom", "center", or relative px value
            },
        },
        images: {
            clientPath: 'js/jPicker/images/'
        }
    });
    // crosshair
    $("#screen").mouseout(function(e) {
        if (ch) {
            for (o in movers) {
                if (movers[o].type == "crosshair") {
                    removeFromArray(movers, o);
                }
            }
            ch = 0;
        }

        // ch.display = false;
    })
    $("#screen").mouseover(function(e) {
        if (!ch) {
            ch = makeCrosshair(Math.round((e.pageX + shiftedX - 5) / 10), Math.round((e.pageY - 5) / 10));
            ch.chtype = crosshairType;
        }
    })
    $("#screen").mousemove(function(e) {
        xtile = Math.round((e.pageX + shiftedX - 5) / 10);
        ytile = Math.round((e.pageY - 5) / 10);
        if (ch && !dragging) {
            ch.display = true;
            //TODO remove and draw
            ch.update(xtile, ytile, xtile + 1, ytile + 1)
        }
        if (ch && dragging && prevytile != ytile && prevxtile != xtile && ch.chtype == "box") {
            ch.update(startX, startY, xtile, ytile)
        }
        if (ch.chtype == "brush" && dragging) {
            if (shiftButton) {
                if (currentMaterial == "background") {
                    if (bg_tiles[ytile][xtile]) {
                        bg_tiles[ytile][xtile].remove()
                    }
                } else {
                    if (tiles[ytile][xtile]) {
                        tiles[ytile][xtile].remove()
                    }
                }
            } else {
                var c = $.jPicker.ColorMethods.hexToRgba(opts.color)
                makeTile({
                    type: currentMaterial,
                    xtile: xtile,
                    ytile: ytile,
                    w: tileW,
                    h: tileH,
                    moves: opts.moves,
                    color: "rgba(" + c.r + "," + c.g + "," + c.b + "," + c.a + ")",
                    spikes: $("input[name='spikes']:checked").val()
                })
            }
        }
        return false;
    })
    // make object
    $("#screen").mousedown(function(e) {
        if (ch) {
            dragging = true;
            if (currentMaterial != "person") {
                startX = Math.round((e.pageX + shiftedX - 5) / 10);
                startY = Math.round((e.pageY - 5) / 10);
            }
        }
        return false;
    })
    $("#screen").mouseup(function(e) {
        if (ch) {
            opts = getOpts()
            if (dragging) {
                opts.width = Math.abs(ch.x1 - ch.x2)
                opts.height = Math.abs(ch.y1 - ch.y2)
            } else {
                opts.width = tileW
                opts.height = tileH
            }
            //calculate offsets
            var xo = (ch.dirx > 0) ? -1 : 0;
            var yo = (ch.diry > 0) ? -1 : 0;
            backup()
            for (var y = 0; Math.abs(y) < opts.height; y -= ch.diry) {
                for (var x = 0; Math.abs(x) < opts.width; x -= ch.dirx) {
                    if (inBounds(ch.x1 + x, ch.y1 + y)) {
                        ch.makeMaterial(x, y, xo, yo)
                    }
                }
            }
            static_draw()
        }
        dragging = false;


    }).css("cursor", "default")
    $(".material").click(function() {
        //change material
        $(".material").css({
            "background": "none",
            "color": "black"
        })
        currentMaterial = $(this).attr("type")
        cursor = $(this).attr("cursor")
        $(this).css({
            "background": "#000",
            "color": "white"
        })
        $("#opts .tool").hide()
        $("#opts .tool#" + currentMaterial).show()
        $("#opts #name").html(currentMaterial)

        switch (cursor) {
        case "crosshair":
            ch = makeCrosshair(0, 0);
            break;
        case "false":
            ch = false;
            break;
        default:
            ch = false;
        }

    })
    $(".crosshair").click(function() {
        $(".crosshair").removeClass("active")
        $(this).addClass("active")
        crosshairType = $(this).attr("type")
        ch.chtype = crosshairType;
        //TODO: change cursor based on crosshair type
        if (ch.chtype == "box") $("#screen").css("cursor", "crosshair")
        else $("#screen").css("cursor", "nw-resize")
    })
    $("#opts .tool").hide()
    $("#person_apply").click(function() {
        opts = getOpts()
        person.startX = Number(opts.xtile);
        person.startY = Number(opts.ytile);

        c = $.jPicker.ColorMethods.hexToRgba(opts.color);
        person._color = "rgba(" + c.r + "," + c.g + "," + c.b + "," + c.a + ")";
        person.color = person._color;
    })
    $("#save").click(function() {

        encode = exportMap()
        console.log("sending", encode)
        $.ajax({
            type: 'POST',
            url: 'http://mjacobs.me/savelevel',
            data: {
                "level": encode
            },
            success: function(data) {
                console.log("sent", data);
            }
        });
    })
    $("#undo").click(undo)
    $("#redo").click(redo)
    $("#clear").click(function() {
        clearInterval(drawing)
        importMap(generateMap(85, 85))
        drawing = setInterval(draw, 40);
    })
    $("#printtiles").click(function() {
        console.log("printing")
        console.log("tiles", $.toJSON(tiles))
        console.log("bg_tiles", $.toJSON(bg_tiles))
    })
    $("#import").click(function() {
        clearInterval(drawing)
        txt = prompt("Map", "");
        // map = []
        if (txt) {
            // rows = txt.split("|")
            // for(row in rows){
            //     map.push(rows[row].split(","))
            // }
            // console.log(map)
            importMap(txt)
        }
    })

})

function updateArea(x1, y1, x2, y2, outline, opts) {
    var dirx = (x1 - x2) / Math.abs(x1 - x2) || 0
    var diry = (y1 - y2) / Math.abs(y1 - y2) || 0
    // xoffset = 
    // yoffset = 
    // console.log("outline")
    scn.fillStyle = get_v(tiles[y2][x2].color) > 75 ? '#000000' : '#ffffff'
    // scn.clearRect(ch.x1*tileW -1, ch.y1*tileH -1, tileW+2, tileH+2); 
    scn.strokeRect(x1 * tileW, y1 * tileH, (x1 - x2) * -tileW, (y1 - y2) * -tileH)
}

function makeArea(x1, y1, x2, y2, outline, opts) {
    var dirx = (x1 - x2) / Math.abs(x1 - x2) || 0
    var diry = (y1 - y2) / Math.abs(y1 - y2) || 0
    // console.log(dirx, diry)
    for (var y = 0; Math.abs(y) < Math.abs(y1 - y2); y += diry) {
        for (var x = 0; Math.abs(x) < Math.abs(x1 - x2); x += dirx) {
            opts.x = x1 += x
            opts.y = y1 += y
            // console.log("makingarea", opts.x, opts.y)
            new game_obj(opts)
        }
    }
}

function importMap(maparr) {
    // console.log(typeof maparr)
    // console.log("importing this map", maparr)
    maparr = $.evalJSON(maparr)
    // console.log("importing this map's tiles ", maparr["tiles"])
    decompressTiles = function(arr) {
        // console.log("array to decompress"+arr)
        output = []
        for (t in arr) {
            el = arr[t].split("|")
            output.push({
                type: decode_type[parseInt(el[0])],
                color: el[1],
                xtile: parseInt(el[2]),
                ytile: parseInt(el[3])
            })
        }
        return output
    }
    maparr.tiles = decompressTiles(maparr.tiles)
    maparr.bg = decompressTiles(maparr.bg)

    scn.clearRect(0, 0, mapWidth, mapHeight); // clear canvas
    resetGame(maparr)
}

function exportMap() {
    var maparr = {
        width: mapWidth,
        height: mapHeight,
        person: {
            type: person.type,
            id: person.id,
            xtile: Math.round(person.startX / tileW),
            ytile: Math.round(person.startY / tileH),
            w: person.w,
            h: person.h,
            moves: person.moves
        }
    }
    // console.log("genmap", w, h)
    maparr.tiles = []
    maparr.bg = []
    compressTiles = function(arr, output) {
            for (var y = 0; y < mapHeight; ++y) {
                for (var x = 0; x < mapWidth; ++x) {
                    if (arr[y][x] && arr[y][x] != 0) {
                        output.push("" + encode_type[arr[y][x].type] + "|" + arr[y][x].color + "|" + arr[y][x].xtile + "|" + arr[y][x].ytile)
                    }
                }
            }
        }
    compressTiles(tiles, maparr.tiles)
    compressTiles(bg_tiles, maparr.bg)
    return $.toJSON(maparr)
    // return maparr
}

function backup() {
    stack.push(exportMap())
    last_change = 0;
    $("#undo").show()
}

function undo() {
    if (stack.length > 0) {
        last_change = exportMap()
        importMap(stack.pop())
        $("#redo").show()
        if (stack.length > 0) $("#undo").hide()
    }
}

function redo() {
    if (last_change) {
        last_change = exportMap()
        $("#redo").hide()
        $("#undo").show()
        importMap(last_change)
    }
}

get_v = function(rgb) {
    rgb = rgb.split(",")[1].slice(0, -1).split(",")
    // console.log("rgb", rgb)
    return Math.floor(Math.max(Math.max(rgb.r / 255, rgb.b / 255), rgb.g / 255) * 100);
}

removeFromArray = function(array, from, to) {
    var rest = array.slice((to || from) + 1 || array.length);
    array.length = from < 0 ? array.length + from : from;
    return array.push.apply(array, rest);
};