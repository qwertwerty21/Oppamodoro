
var myPomoTimer;

$(document).ready(function(){

	if( typeof Notification === 'function' ){
		if( Notification.permission !== "granted" ){
			Notification.requestPermission();
		}
	}

	
	
	myPomoTimer = new Timer( ( 60000 * 25 ) );
	myPomoTimer.init();
	console.log(this);
	console.log(myPomoTimer);
	console.log(window.myPomoTimer);
});

