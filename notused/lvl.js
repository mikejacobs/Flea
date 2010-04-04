// ========
// = lvl1 =
// ========
function level(lvl){
    // console.log("level" + lvl);
	//reset items
	// log("loading lvl1")
	// items = []
	// init_player()
	//land
	switch(lvl){
	    case "new":
	        init_person(0, 0)
	    break;
	    case "1":
	        init_person(150, 400)
            
	        var c1 = new character("c1", 100, 490, 10, 10, true)
	        c1.options = {jumps:true, runner:true, hanger:false, left:60, right:150, speed:5} // inactive by default
	        c1.dirx = 1;	
            
            
	        platform("land1", 0, 500, 200, 50, false)
	        platform("land2", 250, 100, 100, 380, false)
	        var star1 = new treasure("star1", 240, 300 ,10,10, false, "star")
	        // var star2 = new star("star2", 240, 400 ,10,10, false)
            
	        //stairs
	        var l3 = new item("land3", 0, 400, 50, 50, false)
	        var l5 = new item("land5", 0, 300, 50, 50, false)
	        var l5 = new item("land5", 0, 200, 50, 50, false)
	        var l5 = new item("land5", 0, 100, 50, 50, false)
	        var l5 = new item("land5", 0, 0, 50, 50, false)
	        var l5 = new item("land5", 50, 0, 140, 10, false)
	        var hazard1 = hazard("hazard1", 0, 465, 40, 20, false)
	        var hazard2 = hazard("hazard2", 0, 365, 40, 20, false)
	        var hazard3 = hazard("hazard3", 0, 265, 40, 20, false)
	        var hazard4 = hazard("hazard4", 0, 165, 40, 20, false)
	        var hazard5 = hazard("hazard5", 0, 165, 40, 20, false)
	        var hazard5 = hazard("hazard5", 0, 65, 40, 20, false)
	        var heart1 = new treasure("h1", 100, -10 ,10,10, false, "heart")


	        //  single block area
	        var l6 = new item("land6", 268, 540, 10, 10, false)
	        l6.collideAction = function(){
	        	c2.options.hanger = false
	        	c2.options.runner = true
	        	c2.options.jumper = true		
            
	        }
	        var star2 = new treasure("star2", 258, 550 ,10,10, false, "star")
	        var star3 = new treasure("star3", 380, 420 ,10,10, false, "star")
	        // var star2 = new star("star2", 100, 450,10,10, false)
            
	        //jumpers
	        var p1 = platform("p1", 400, 500, 50, 10, true)
	        p1.options = {active:false, left:350, right:800, speed:1};
	        p1.dirx = 1;
	        p1.collideAction=function(other, dir){
	        	if(p1.options.active == false) p1.options.active = true;
	        	if(!other.collisions.right && !other.collisions.left){
	        	other.toSet.x += p1.dirx*p1.options.speed;
	        }
	        }
            // var l7 = new item("land7", 420, 400, 250, 10, false)
	        var c2 = new character("c2", 490, 410, 10, 10, true)
	        c2.options = {jumps:false, runner:false, hanger:true, left:420, right:800, speed:5}                 // inactive by default
	        c2.dirx = 1;	
	        var h6 = hazard("h6", 400, 650, 400, 10, false)
	        h6.solid = false;
	        h6.options = {push:20}
	        h6.collideAction = function(other, dir){
	        	if(other.id != "person"){
	        		other.jumping = true;
	        		other.acceleration = this.options.push;
	        	}
	        }
            // var l8 = new item("land8", 620, 420, 50, 30, false)
        break;
        case "2":
	        init_person(0, 0)
	        //land
	        var l1 = new item("land1", 0, 160, 100, 330, false)
	        var star1 = new treasure("star1", 280, 350 ,10,10, false, "star")
	        var star2 = new treasure("star2", 320, 50 ,10,10, false, "star")
	        var star3 = new treasure("star3", 610, 470 ,10,10, false, "star")
	        var star4 = new treasure("star4", 20, 530 ,10,10, false, "star")
	        star4.collideAction = function(){resetGame(3)}
            var heart1 = new treasure("h1", 30, 30 ,10,10, false, "heart")
	        
	        var l2 = new item("land2", 50, 90, 100, 10, false)
	        var l3 = new item("land3", 150, 80, 100, 10, false)
	        var l4 = new item("land4", 290, 50, 10, 300, false)
	        var l5 = new item("land5", 600, 370, 10, 100, false)
	        l5.collideAction=function(){
	        	platform2.options.active = true;
	        }
	        var l6 = new item("land6", 0, 540, 100, 10, false)
            
	        //platforms
	        var platform1 = platform("platform1", 320, 320, 100, 10, true)	
	        platform1.dirx = 1;
	        platform1.options = {active:true, left:320, right:800, speed:1};
            
	        var platform2 = platform("platform2", 500, 540, 50, 10, true)
	        platform2.dirx = 1;
	        platform2.options = {active:false, left:70, right:850, speed:3};
            
	        // var platform3 = platform("platform3", 270, 540, 50, 10, true)
	        // platform3.dirx = -1;
	        // platform3.options = {active:false, left:100, right:270};
            
            
	        // hazards
	        var hazard1 = hazard("hazard1", 315, 150, 530, 100, false)
	        var hazard2 = hazard("hazard2", 385, 250, 250, 49, false)
	        var hazard3 = hazard("hazard3", 100, 370, 500, 100, false)
	        // var hazard4 = hazard("hazard4", 600, 370, 10, 50, false)
	        // hazard4.color = 'rgba(220,20,0,1)'
            
	        //springs
	        var s1 = spring("spring1", 100, 360, 120, 10, false)
        break;
        case "3":
	        init_person(0, 0)
	        //land
            platform("land1", 300, 420, 100, 330, false)
            platform("land2", 400, 540, 400, 30, false)
            platform("land3", 140, 430, 20, 10, false)
            platform("land3", 180, 430, 20, 10, false)
            platform("land3", 220, 430, 20, 10, false)
            platform("land3", 260, 430, 40, 10, false)
            platform("land3", 100, 430, 20, 10, false)
            
            platform("land3", 798, 440, 20, 130, false)
            platform("land3", 780, 380, 20, 100, false)
            platform("land3", 761, 312, 20, 108, false)
            platform("land3", 742, 310, 39, 50, false)
            var l5 = platform("land5", 670, 420, 20, 10, true)
            l5.solid = false;
            l5.display = false;
            var l4 = platform("land3", 678, 280, 5, 100, false)
            l4.collideAction=function(){
	        	l5.display = true;
	        	l5.solid = true;
	        }
            platform("land3", 671, 240, 20, 100, false)
            platform("land3", 660, 240, 43, 50, false)
            platform("land3", 540, 240, 100, 30, false)
            platform("land3", 100, 240, 400, 30, false)
            
	        // hazards
            hazard("hazard1", 20, 380, 20, 200, false)
            hazard("hazard2", 60, 380, 20, 200, false)
            hazard("hazard3", 100, 380, 300, 50, false)
            hazard("hazard3", 712, 350, 5, 80, false)
            var c2 = character("c2", 490, 410, 10, 10, true)
	        c2.options = {jumps:true, runner:true, hanger:false, left:420, right:800, speed:5}                 // inactive by default
	        c2.dirx = 1;
	        // var hazard4 = hazard("hazard4", 600, 370, 10, 50, false)
	        // hazard4.color = 'rgba(220,20,0,1)'
            
	        //springs
	        spring("spring1", 0, 540, 20, 10, false)
	        spring("spring2", 40, 540, 20, 10, false)
	        spring("spring3", 80, 540, 20, 10, false)
	        var s4 = spring("spring4", 370, 360, 40, 10, true)
	        s4.options = {active:true, left:120, right:370, speed:2, push:15};
	        
            spring("spring5", 120, 540, 100, 10, false)
            spring("spring8", 240, 540, 60, 10, false)
            spring("spring3", 818, 550, 40, 10, false)
	        
        break;
        case "4":
            init_person(0, 500)
            spring("spring1", 0, 540, 4, 10, false)
            var s4 = spring("spring6", 70, 420, 4, 4, true)
            s4.options = {active:true, left:20, right:370, speed:2, push:20};
	        spring("spring2", 240, 540, 4, 4, false)
	        spring("spring3", 260, 420, 4, 4, false)
	        spring("spring4", 200, 300, 4, 4, false)
	        spring("spring5", 100, 180, 4, 4, false)
	        var l1 = platform("land1", 30, 50, 200, 10, false)
	        
	        //continual hazard barrage
	        var balls = [];
	        var b = 0;
	        var cannon = function(){
	            var yyy = 20*(Math.random()*4);
                // console.log(yyy)
	            balls[b] = platform("cannon"+b, 220, yyy, 10, 10, true)
	            balls[b].dirx = 1;
    	        balls[b].options = {active:true, left:220, right:500, speed:4};
    	        console.log(b)
    	        if(b > 15) {
    	            clearInterval(swarm)
	            } else {
	                b++;
	            }
                // balls[b].conditionals.push(function(){
                //     if(this.x ==0) //die
                // })
	        }
            var swarm = setInterval(cannon, 5000)
            var p1 = platform("platform_1", 300, 190, 100, 10, false)
            p1.collideAction=function(){
                clearInterval(swarm)
                for(d in balls){
                    balls[d].remove();
                }
                
            }
            hazard("hazard3", 300, 200, 100, 10, false)
            hazard("hazard4", 290, 110, 10, 100, false)
	    break;
        default:
        throw "No such level! Get the source and make it yourself :)";
}

}