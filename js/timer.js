( function( global, $ ){
	
	var $countDownTimeDis = $( "#countDownTimeDis" );
	var $plusWorkBtn = $( "#plusWorkBtn" );
	var $minusWorkBtn = $( "#minusWorkBtn" );

	var kickOutTheJams;
	var timeInMilSec;
	var paused = true;
	var pomodorosFinished = 0;
	var startTime;
	var differenceTime;
	var time;

	var arrayOfBGGifs = [
		"img/gif1.gif",
		"img/gif2.gif",
		"img/gif3.gif",
		"img/gif4.gif",
		"img/gif5.gif",
		"img/gif6.gif"
	];


	//the constructor function
	var Timer = function( timeInMilSecW ){

		this.timeInMilSecW = timeInMilSecW;

		timeInMilSec = timeInMilSecW;

	};

	Timer.prototype.countItDown = function(){
		//used to cache 'this' referring to Timer object, because setInterval executes in global scope thereby changing 'this'
		var that = this;

		if( !paused ){
			
			startTime = Number( new Date() );

			this.tickTock = setInterval( function(){



				var nowTime = Number( new Date() );
				//calculate then difference between then and now and subtract the DIFFERENCE from time to get a more accurate timer
				differenceTime = Math.floor( nowTime - startTime );
				time = timeInMilSec - differenceTime;

				if( time < 1 ){
					that.showMeTheCats();
				}

				//convert time to min and secs array
				var minSecArray = that.convertTime( time );
				//pass returned array from minSecArray to be displayed
				var timeString = that.createTimeString( minSecArray );
				$countDownTimeDis.html( timeString );

				nowTime = startTime;

			}, 300 );	
		}

		else{
			//subtract differenceTime fron timeInMilSec so future calculations make sense
			timeInMilSec = timeInMilSec - differenceTime;
			clearInterval(this.tickTock);
		}
		
	};

	Timer.prototype.convertTime = function( time ){
		//60000 ms in 1 minute
		var minutes = Math.floor( time / 60000 );
		//get the remaining seconds which don't make up a minute and convert to secs--1000 ms in 1 sec
		var seconds = Math.floor( ( time % 60000 ) / 1000 );

		if( minutes < 0 && seconds < 0 ){
			minutes = 0;
			seconds = 0;
		}

		return [ minutes, seconds ];
	};

	Timer.prototype.createTimeString = function( array ){
		//add '00' to front and only display the last two digits
		return ( ( "00" + array[0] ).slice( -2 ) + ":" + ( "00" + array[1] ).slice( -2 ) );
	};


	Timer.prototype.showMeTheCats = function(){
		//clear old interval
		clearInterval(this.tickTock);
		timeInMilSec = this.timeInMilSecW;
		
		//reset clock and display kitties
		if( !this.kickOutTheJams ){
			
			this.kickOutTheJams = true;
			//CATS VOLUME PLAYUS IN BACKGROUND EVEN THOUGH HIDEEN TIMER KEEPS COUNTING EVEN IN YOUTUBE MODE FIX THAT AND YOU GOOD 
			

			$( "#mainContentArea" ).addClass( "hidden" );
			$( "#kPopShowerDiv" ).removeClass( "hidden" );
			
			if( kPopIframeYT ){
				kPopIframeYT.playVideo();
			}
			
			pomodorosFinished++;
			$( "#pomFinCountDis" ).html( pomodorosFinished );
			console.log(this);
			this.showNotification();
			
		}
	
	};

	Timer.prototype.getRandomGif = function(){
		var chosenNum = Math.round( Math.random() * ( arrayOfBGGifs.length - 1 ) );
		return arrayOfBGGifs[ chosenNum ];
	};

	Timer.prototype.showNotification = function(){
		if( typeof Notification === 'function' ){
			
			if( !this.kickOutTheJams ){
				var workNotification = new Notification( "Oppa-modoro Gangnam Style!", {
					body: "Sugeo hae~! It's work time!",
					icon: "img/psylogo.png"
				});

				workNotification.onclick = function(){
					window.focus();
				};
			}

			else if( this.kickOutTheJams ){
			
				var breakNotification = new Notification( "Oppa-modoro Gangnam Style!", {
					body: "You've completed " + pomodorosFinished + " Oppa-modoro(s)! Go saeng haesseo! Time for a quick break!",
					icon: "img/psylogo.png"
				});	

				breakNotification.onclick = function(){
					window.focus();
				};
						
			}
		}

	};

	Timer.prototype.onPauseBtn = function(){
		
		var $pauseBtn = $( "#startPauseBtn" );
		var $glyphiconSpan = $( "#startPauseBtn span" );
		var that = this;
		
		$pauseBtn.on( "click", function(){

			$glyphiconSpan.toggleClass( "glyphicon-play glyphicon-pause" );
			
			if( !paused ){
				paused = true;
				$plusWorkBtn.prop( "disabled", false );
				$minusWorkBtn.prop( "disabled", false );
				
			}

			else{
				paused = false;
				$plusWorkBtn.prop( "disabled", true );
				$minusWorkBtn.prop( "disabled", true );
				
			}

			that.countItDown();
		} );
	};

	Timer.prototype.onPlusMinusDuration = function(){

		var that = this;

		$plusWorkBtn.on( "click", function(){

			if( that.timeInMilSecW < ( 60000 * 99 ) ){
				clearInterval( this.tickTock );
				that.timeInMilSecW += 60000;
				that.updateDuration();

				if( !kickOutTheJams ){
					timeInMilSec = that.timeInMilSecW;
					var minSecConversion = that.convertTime( timeInMilSec );
					minSecConversion = that.createTimeString( minSecConversion );
					$countDownTimeDis.html( minSecConversion );
				}
			}

		});

		$minusWorkBtn.on( "click", function(){
			
			if( that.timeInMilSecW > 60000 ){
				
				clearInterval( this.tickTock );
				that.timeInMilSecW -= 60000;
				that.updateDuration();

				if( !kickOutTheJams ){
					timeInMilSec = that.timeInMilSecW;
					var minSecConversion = that.convertTime( timeInMilSec );
					minSecConversion = that.createTimeString( minSecConversion );
					$countDownTimeDis.html( minSecConversion );
				}
			}
	
		});

		

		

	};

	Timer.prototype.updateDuration = function(){
		var $workTimeCounter = $( "#workTimeCounter" );
		

		var workTimeInMinSec = this.convertTime( this.timeInMilSecW );
		

		workTimeInMinSec = this.createTimeString( workTimeInMinSec );
		

		$workTimeCounter.html( workTimeInMinSec );
		
	};

	Timer.prototype.init = function(){
		this.onPauseBtn();
		this.onPlusMinusDuration();
		this.updateDuration();
	};

	global.Timer = Timer;
})( window, jQuery );