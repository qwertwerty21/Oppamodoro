var tag = document.createElement( "script" );
tag.src = "http://www.youtube.com/iframe_api";

var $firstScript = $( "script" ).first();
$firstScript.parent().append( tag );

var player;
var kPopIframeYT;




window.onYouTubeIframeAPIReady = function(){
	
	player = new YT.Player( "kPopShowerDiv", {
		playerVars:{
			listType: "playlist",
			list: "PLYnGL4xCCL3Jyp4B1xpjXbESDH6oT22Y_"
		},
		events: {
			"onReady": onPlayerReady,
			"onStateChange": onPlayerStateChange
		}
	
	});
	
}

function onPlayerReady( event ){
	kPopIframeYT = event.target;
	kPopIframeYT.pauseVideo();
}

function onPlayerStateChange(event) {    
	
	    
    if(event.data === 0) {            
        	
		if( kPopIframeYT ){
				var pauseYT = function(){ kPopIframeYT.pauseVideo(); };
        		setTimeout( pauseYT, 1000 );
			}		

		
		myPomoTimer.countItDown();
		
		$( "#kPopShowerDiv" ).addClass( "hidden" );

		$( "#mainContentArea" ).removeClass( "hidden" );

		var newBGGif = myPomoTimer.getRandomGif();

		newBGGif = "url(" + newBGGif + ") no-repeat center fixed";

		$( "body" ).css( "background", newBGGif );
		$( "body" ).css( "background-size", "cover")
		
		myPomoTimer.kickOutTheJams = false;
		myPomoTimer.showNotification();

		

		//FIX THE -1:-1 TIMING AND YOU GOOD FOO
		

			//REDO ALL THIS SHIT
        //FIGURE OUT WHAT TO DO DO HERE IE HIDE BREAK WINDOW SHOW WORK WINDOW AND ShIT
    }
 }