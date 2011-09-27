<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Flea</title>
    <meta name="author" content="Michael Jacobs">
    <!-- Date: 2008-03-11 -->
    <script src="js/jquery.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/main.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/game.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/controls.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/tiles.js" type="text/javascript" charset="utf-8"></script>
    <!-- // <script src="objects.js" type="text/javascript" charset="utf-8"></script> -->
    <script src="js/json.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/person.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/editor.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/jquery.json-2.2.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/jPicker/jpicker-1.0.13.min.js" type="text/javascript" charset="utf-8"></script>
    <link rel="stylesheet" href="css/game.css" type="text/css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="css/editor.css" type="text/css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="js/jPicker/css/jPicker-1.0.13.css" type="text/css" media="screen" title="no title" charset="utf-8">
</head>
<body>
    <div id="viewer">
    <canvas id="background" width="850" height="550" style="background:#fff;position:absolute;top:0px;left:0px;"></canvas>
    <canvas id="static" width="850" height="550" style="position:absolute;top:0px;background:transparent;left:0px;"></canvas>
    <canvas id="screen" width="850" height="550" style="background:transparent;position:absolute;top:0px;left:0px;"></canvas>
    </div>
    <div class="counter" style="top:560px;left:10px;">    
        <h2>Damage</h2>
        <div id="damage">
            <div id="hit1" class="hit red"></div>
            <div id="hit2" class="hit red"></div>
            <div id="hit3" class="hit red"></div>
            <div id="hit4" class="hit yellow"></div>
            <div id="hit5" class="hit yellow"></div>
            <div id="hit6" class="hit yellow"></div>
            <div id="hit7" class="hit green"></div>
            <div id="hit8" class="hit green"></div>
            <div id="hit9" class="hit green"></div>
            <div id="hit10" class="hit green"></div>
            <div id="hit11" style="display:none;" class="hit green"></div>
            <div id="hit12" style="display:none;" class="hit green"></div>
            <div id="hit13" style="display:none;" class="hit green"></div>
            <div id="hit14" style="display:none;" class="hit green"></div>
            <div id="hit15" style="display:none;" class="hit green"></div>
            <div style="clear:both;"></div>   
        </div>
    </div>
    <div class="counter" style="top:560px;left:110px;">  
        <h2>Stars</h2>
        <h1 id="collection">0</h1>
    </div>
    <div id="materials">
        <a href="#" class="material" cursor="crosshair" type="person">Person</a><br>
        <a href="#" class="material" cursor="crosshair" type="platform">Platform</a><br>
        <a href="#" class="material" cursor="crosshair" type="sidehold">Side Hold</a><br>
        <a href="#" class="material" cursor="crosshair" type="hazard">Hazard</a><br>
        <a href="#" class="material" cursor="crosshair" type="spring">Spring</a><br>
        <a href="#" class="material" cursor="crosshair" type="star">Star</a><br>
        <a href="#" class="material" cursor="crosshair" type="heart">Heart</a><br>
        <a href="#" class="material" cursor="crosshair" type="background">Background</a><br>
    </div>
    <div id="colorpicker">
        <!-- <a href="#" id="currentColor">
            
        </a>
        <div id="recentColors">
            
        </div> -->
        
    </div>
    <div id="opts">
        <span id="name"></span> options<br><br>
        <form id="person" class="tool">
        <input type="text" value="#000" class="color" name="color"><br>
        <span style="display:none">
        
        <label style="display:none" for="">Xtile</label>        
        <input style="display:none" type="text" name="xtile"><br>
        <label style="display:none" for="">Ytile</label>        
        <input style="display:none" type="text" name="ytile"><br>
        <label style="display:none" for="width">W</label><input type="text" name="width" value="1" id="width" style="width:40px;"> x 
        <label style="display:none" for="height">H</label><input type="text" name="height" value="1" id="height" style="width:40px;"><br></span>
        <br>
        <input type="button" value="Make Changes" id="person_apply">
        </form>
        <form id="platform" class="tool">
            <span style="display:none">
            
        <label style="display:none" for="name">Name</label><br><input type="text" name="name" value="" id="name"><br><br>
        <label style="display:none" for="width">W</label><input type="text" name="width" value="1" id="width" style="width:40px;"> x 
        <label style="display:none" for="height">H</label><input type="text" name="height" value="1" id="height" style="width:40px;"><br><br>
        <input style="display:none" type="radio" name="moves" value="true"> Moves
        <input style="display:none" type="radio" name="moves" value="false" checked style="margin-left:20px;"> Static<br><br>
        <input style="display:none" type="radio" name="solid" value="true"> Surface
        <input style="display:none" type="radio" name="solid" value="false" checked style="margin-left:20px;"> Decoration<br><br></span>
        <input type="text" value="#000" name="color" class="color"><br>
        </form>
        <form id="sidehold" class="tool">
            <span style="display:none">
            
        <label style="display:none" for="name">Name</label><br><input type="text" name="name" value="" id="name"><br><br>
        <label style="display:none" for="width">W</label><input type="text" name="width" value="1" id="width" style="width:40px;"> x 
        <label style="display:none" for="height">H</label><input type="text" name="height" value="1" id="height" style="width:40px;"><br><br>
        <input style="display:none" type="radio" name="moves" value="true"> Moves
        <input style="display:none" type="radio" name="moves" value="false" checked style="margin-left:20px;"> Static<br><br>
        <input style="display:none" type="radio" name="solid" value="true"> Surface
        <input style="display:none" type="radio" name="solid" value="false" checked style="margin-left:20px;"> Decoration<br><br></span>
        <input type="text" value="#000" name="color" class="color"><br>
        </form>
        <form id="hazard" class="tool">
            <label for="spikes">Spikes</label><br>
            <input type="radio" name="spikes" value="top" checked> Top
            <input type="radio" name="spikes" value="right" style="margin-left:20px;"> Right<br><br>
            <input type="radio" name="spikes" value="bottom"> Bottom
            <input type="radio" name="spikes" value="left" style="margin-left:20px;"> Left<br><br>
        <span style="display:none">
        <label style="display:none" for="name">Name</label><br><input type="text" name="name" value="" id="name"><br><br>
        <label style="display:none" for="width">W</label><input type="text" name="width" value="1" id="width" style="width:40px;"> x 
        <label style="display:none" for="height">H</label><input type="text" name="height" value="1" id="height" style="width:40px;"><br><br>
        <input style="display:none" type="radio" name="moves" value="true"> Moves
        <input style="display:none" type="radio" name="moves" value="false" checked style="margin-left:20px;"> Static<br><br>
        <input style="display:none" type="radio" name="solid" value="true"> Surface
        <input style="display:none" type="radio" name="solid" value="false" checked style="margin-left:20px;"> Decoration<br><br>
        </span>
        <input type="text" value="#000" name="color" class="color"><br>
        </form>
        <form id="spring" class="tool">
            <span style="display:none">
        
        <label for="name">Name</label><br><input type="text" name="name" value="" id="name"><br><br>
        <label for="width">W</label><input type="text" name="width" value="1" id="width" style="width:40px;"> x 
        <label for="height">H</label><input type="text" name="height" value="1" id="height" style="width:40px;"><br><br>
        <input type="radio" name="moves" value="true"> Moves
        <input type="radio" name="moves" value="false" checked style="margin-left:20px;"> Static<br><br>
        <input type="radio" name="solid" value="true"> Surface
                        <input type="radio" name="solid" value="false" checked style="margin-left:20px;"> Decoration<br><br>
                    </span>
        <input type="text" value="#000" name="color" class="color"><br>
        </form>
        <form id="star" class="tool">
            <span style="display:none">
        
        <label for="name">Name</label><br><input type="text" name="name" value="" id="name"><br><br>
        <label for="width">W</label><input type="text" name="width" value="1" id="width" style="width:40px;"> x 
        <label for="height">H</label><input type="text" name="height" value="1" id="height" style="width:40px;"><br><br>
        <input type="radio" name="moves" value="true"> Moves
        <input type="radio" name="moves" value="false" checked style="margin-left:20px;"> Static<br><br>
        <input type="radio" name="solid" value="true"> Surface
                        <input type="radio" name="solid" value="false" checked style="margin-left:20px;"> Decoration<br><br></span>
        <input type="text" value="#000" name="color" class="color"><br>
        </form>
        <form id="heart" class="tool">
            <span style="display:none">
            
        <label for="name">Name</label><br><input type="text" name="name" value="" id="name"><br><br>
        <label for="width">W</label><input type="text" name="width" value="1" id="width" style="width:40px;"> x 
        <label for="height">H</label><input type="text" name="height" value="1" id="height" style="width:40px;"><br><br>
        <input type="radio" name="moves" value="true"> Moves
        <input type="radio" name="moves" value="false" checked style="margin-left:20px;"> Static<br><br>
        <input type="radio" name="solid" value="true"> Surface
                        <input type="radio" name="solid" value="false" checked style="margin-left:20px;"> Decoration<br><br></span>
        <input type="text" value="#000" name="color" class="color"><br>
        </form>
        <form id="background" class="tool">
            <span style="display:none">
            
            <label for="name">Name</label><br><input type="text" name="name" value="" id="name"><br><br>
            <label for="width">W</label><input type="text" name="width" value="1" id="width" style="width:40px;"> x 
            <label for="height">H</label><input type="text" name="height" value="1" id="height" style="width:40px;"><br><br>
            <input type="radio" name="moves" value="true"> Moves
            <input type="radio" name="moves" value="false" checked style="margin-left:20px;"> Static<br><br>
            <input type="radio" name="solid" value="true"> Surface
                            <input type="radio" name="solid" value="false" checked style="margin-left:20px;"> Decoration<br><br></span>
        <input type="text" value="#000" name="color" class="color"><br>
        </form>

    </div>
    <div id="mapfxns">
        <a href="#" id="save">Save Map</a>  
        <a href="#" id="import">Import Map</a>  
        <a href="#" id="clear">Clear Map</a>  
        <!-- <a href="#" style="display:none;" id="undo">Undo</a> -->
        <!-- <a href="#" style="display:none;" id="redo">Redo</a> -->
        <a href="#" id="playpause">Pause</a>
        <!-- <a href="#" id="printtiles">Print Tiles</a> -->
    </div>
    <div id="savebox">
        <textarea name="savebox_area" id="savebox_area" rows="8" cols="40"></textarea>
    </div>
    <script type="text/javascript" charset="utf-8">
    // console.log(window.location.href)
    url = window.location.href.split("#")
    if(url[1]){
        $.ajax({
            url: 'http://mjacobs.me/a/load',
            data: {id:url[1]},
            success: function(data){
                console.log(data)
                gameLoad(data)
            }
        });
    } else {
       gameLoad(); 
    }
    </script>
</body>
</html>
