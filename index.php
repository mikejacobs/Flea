<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html lang="en">
    <?php
    $val = $_GET['level'];
    if ($val == "") $val = 1;
    ?>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>platformer in progress</title>
    <meta name="generator" content="TextMate http://macromates.com/">
    <meta name="author" content="Michael Jacobs">
    <!-- Date: 2008-03-11 -->
    <!-- // <script src="../js/MochiKit/MochiKit.js" type="text/javascript" charset="utf-8"></script> -->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="canvas.js" type="text/javascript" charset="utf-8"></script>
    <script src="tileTypes.js" type="text/javascript" charset="utf-8"></script>
    <script src="tile.js" type="text/javascript" charset="utf-8"></script>
    <!-- // <script src="objects.js" type="text/javascript" charset="utf-8"></script> -->
    <!-- // <script src="lvl.js" type="text/javascript" charset="utf-8"></script> -->
    <script src="person.js" type="text/javascript" charset="utf-8"></script>
    <?php if($val == "new"){
        echo '<script src="leveleditor.js" type="text/javascript" charset="utf-8"></script>';
    } ?>
    <style type="text/css" media="screen">
    *{margin:0px;padding:0px;}
    body{overflow:hidden;background:#ebebeb;}
    .hit{display:block;float:left;width:5px;height:20px;margin-right:3px;}
    .green{background:#44aa44;}
    .yellow{background:rgb(225,220,20);}
    .red{background:rgb(220,20,0);}
    .counter{
        position:absolute;
        font-size:36px;
        color:#ff00ff;
        margin-bottom:5px;
    }
    .counter h1{
        font-size:36px;
        color:#ff00ff;
    }
    .counter h2{
        font-size:16px;
        color:#444;
        margin-bottom:5px;
    }
    #materials{
        position:absolute;
        top:150px;
        left:860px;
    }
        .material{
            color:#000;
        }
    #palette{
        position:absolute;
        left:860px;
        top:300px;
    }
    #currentColor{
        display:block;
        width:50px;
        height:50px;
        border:1px solid #000;
    }
        .color{
            display:block;
            width:10px;
            height:10px;
            float:left;
            margin:0px 5px 5px 0px;
        }
    #opts{
        position:absolute;
        left:940px;
        top:300px;
        
    }
    </style>
</head>
<body>
    <canvas id="static" width="850" height="550" style="position:absolute;top:0px;background:#fff;left:0px;"></canvas>
    <canvas id="screen" width="850" height="550" style="background:transparent;position:absolute;top:0px;left:0px;"></canvas>
    <div class="counter" style="top:20px;left:860px;">    
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
    <div class="counter" style="top:80px;left:860px;">  
        <h2>Stars</h2>
        <h1 id="collection">0</h1>
    </div>
    <div id="materials">
        <a href="#" class="material" id="type_character">Character</a><br>
        <a href="#" class="material" id="type_platform">Platform</a><br>
        <a href="#" class="material" id="type_hazard">Hazard</a><br>
        <a href="#" class="material" id="type_spring">Spring</a><br>
        <a href="#" class="material" id="type_star">Star</a><br>
        <a href="#" class="material" id="type_heart">Heart</a><br>
    </div>
    <div id="palette">
        <a href="#" id="currentColor">
            
        </a>
        <div id="recentColors">
            
        </div>
    </div>
    <div id="opts">
        <form>
        <label for="name">Name</label><br><input type="text" name="name" value="" id="name"><br><br>
        <label for="width">W</label><input type="text" name="width" value="1" id="width" style="width:40px;"> x 
        <label for="height">H</label><input type="text" name="height" value="1" id="height" style="width:40px;"><br><br>
        <input type="radio" name="moves" value="true"> Moves
        <input type="radio" name="moves" value="false" checked style="margin-left:20px;"> Static<br><br>
        <input type="radio" name="solid" value="true"> Solid
        <input type="radio" name="solid" value="false" checked style="margin-left:20px;"> Invisible<br><br>
        </form>
        <a href="#" id="save">Save Map</a><br>
        <a href="#" id="clear">Clear Map</a>
    </div>
    <script type="text/javascript" charset="utf-8">
    gameLoad(<?php echo '"' . $val . '"'; ?>);
    </script>
</body>
</html>
