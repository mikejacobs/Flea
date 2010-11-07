<html>
<head>
<script src="http://mjacobs.me/flea/play/js/jquery.js" type="text/javascript" charset="utf-8"></script>
    <style type="text/css" media="screen">
        .preview{
            width:170px;
            height:110px;
            border:1px solid #ebebeb;
            display:block;
            float:left;
            margin-bottom:20px;
            margin-right:20px;
        }
    </style>
</head>
<body>
        
    <script type="text/javascript" charset="utf-8">
    $(function(){
        makePreview = function(tiles, bg, id){
            // console.log("tiles", tiles, "bg", bg)
            makeCanvas = function(){
                return $("<canvas class='preview'></canvas>")
            }
            canvas = makeCanvas()
            ctx = canvas.get(0).getContext('2d')
            $("<a href='http://mjacobs.me/flea/#"+id+"'></a>").append(canvas).appendTo("body")
            tileW = 4
            tileH = 3
            loadPreview = function(arr, ctx){
                // console.log("array to decompress"+arr)

                output = []
                for (t in arr) {
                    el = arr[t].split("|")
                    ctx.fillStyle = el[1];
                    // ctx.strokeStyle = el[1];
                    // ctx.lineWidth   = 1;
                    // this.context.fillRect(this.x*tileW, this.y*tileH, tileW, tileH);
                    // ctx.strokeRect(parseInt(el[2])*tileW, parseInt(el[3])*tileH, tileW, tileH);
                    ctx.fillRect(parseInt(el[2])*tileW, parseInt(el[3])*tileH, tileW, tileH);
                    // console.log(parseInt(el[2])*tileW, parseInt(el[3])*tileH, tileW, tileH);
                }
                // console.log("output", output)
                return output
            }
            bg = loadPreview(bg, ctx)
            tiles = loadPreview(tiles, ctx)
        }

        // bg = decompressTiles(bg)
        $.ajax({
            url: 'load',
            success: make
        });
    })
    make = function(data){
        console.log(data)
        // make sidebar
        for(p in data){
            // p = 3
            console.log(data[p]["id"])
            makePreview(data[p]["level"]["tiles"], data[p]["level"]["bg"], data[p]["id"])
        }
    }
    </script>
</body>
</html>