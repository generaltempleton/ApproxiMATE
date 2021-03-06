//IdentifyAngleProblem: In this type of problem, you are presented with an angle and three options of
//degree or radian measurements, and then have to determine which measurement matches the presented angle
var IdentifyAngleProblem = function(x, y)
{	
    this.x = x;
	this.y = y;
	
	this.theta = Math.floor((Math.random() * 360) + 1); 
	this.length = 76; //the length of the rays that make up the angle
	
	this.crossY = 128; //the top y-position of the cross drawn
	this.minimumAngle = 16;//One degree is the minimum that the angle can be
	this.maximumAngle = 344;//One less than 360 degrees. It is likely that these numbers need adjustment.
	
	this.minimumDifference = 15; //There can be a minimum of 15 degrees between two angles
	this.maximumDifference = 35; //There can be a maximum of 90 degrees between two angles 
	
	this.targetAngle = chooseValueBetween(this.minimumAngle, this.maximumAngle);
	console.log("this.targetAngle: " + this.targetAngle);
	//This line sets the angle that the user tries to identify
	
	this.choice1 = 0;
	this.choice2 = 0;
	this.choice3 = 0;
	
	this.userChoice = 0;
	
	console.log(this.theta + "    " + this.targetAngle);
	
	switch(chooseValueBetween(1, 3)){
	
		case 1:
		
			this.choice1 = this.targetAngle;
			
			//Set the other two answers to other, incorrect angles
			this.choice2 = this.generateWrongAnswer( this.targetAngle );
			this.choice3 = this.generateWrongAnswer2( this.targetAngle, this.choice2 );
			
			
			break;
		
		case 2:
		
			this.choice2 = this.targetAngle;
			
			//Set the other two answers to other, incorrect angles
			
			this.choice1 = this.generateWrongAnswer( this.targetAngle );
			this.choice3 = this.generateWrongAnswer2( this.targetAngle, this.choice1 );
		
		
			break;
			
		default: //Case 3
		
			this.choice3 = this.targetAngle;
			
			//Set the other two answers to other, incorrect angles
			
			
			this.choice1 = this.generateWrongAnswer( this.targetAngle );
			this.choice2 = this.generateWrongAnswer2( this.targetAngle, this.choice1 );
			
			break;
			
	
	}
}




var chooseValueBetween = function( min, max )//Chooses a random value between the min and the max, inclusive.
{

return( Math.floor(  Math.random() * (1 + max-min) + min  ) );


}



IdentifyAngleProblem.prototype =
{
    update: function(dt)
    {	
		
    },

    draw: function(canvas)
    {
		//console.log(this.length); << old debug code
		canvas.fillStyle = "black";
		canvas.fillRect(engine.w / 2, this.crossY, 1, engine.h); //vertical line
		canvas.fillRect(0, (this.crossY + engine.h) / 2, engine.w, 1); //horizontal line
		
        canvas.font = '24px sans-serif';
        canvas.textAlign = 'center';
		canvas.fillText("Identify the angle!", engine.w / 2, 64);
    
		
		//draws the generated angle
		canvas.strokeStyle = "black";
		var angleX = (engine.w / 2) + (this.length + 12);
		var angleY = (this.crossY + engine.h) / 2 - (this.length + 12);
		canvas.beginPath();
		canvas.moveTo(angleX, angleY); //the initial point
		canvas.lineTo(angleX + this.length, angleY);
		canvas.lineTo(angleX, angleY);
		canvas.lineTo(angleX + Math.cos(this.targetAngle  * Math.PI / 180) * this.length, angleY - Math.sin(this.targetAngle  * Math.PI / 180) * this.length);
		canvas.closePath();
		canvas.stroke(); //draws an outline
		
		//draw the choices
		var leftX = engine.w / 4;
		var rightX = (engine.w / 4) * 3;
		var upY = this.crossY + (engine.h - this.crossY) / 4;
		var downY = this.crossY + (engine.h - this.crossY) / 4 * 3;
		canvas.fillText(this.choice1, leftX, upY);
		canvas.fillText(this.choice2, leftX, downY);
		canvas.fillText(this.choice3, rightX, downY);
    },
	
	//Utility function so that the angle can be generated at any time by calling this function.
	generateAngle: function(){
		this.theta = Math.floor((Math.random() * 360) + 1);
	},
	
	generateWrongAnswer: function( rightAnswer ){
	
			console.log( "rightAnswer: " + rightAnswer );
	
			switch( chooseValueBetween(1, 2) ){
		
			case 1://Go low
			
			
				this.ret = chooseValueBetween( rightAnswer - this.maximumDifference, rightAnswer - this.minimumDifference ) ;
				
				if(this.ret > this.maximumAngle && this.targetAngle != this.maximumAngle){
				
				this.ret = this.maximumAngle;
				}
				
				if(this.ret < this.minimumAngle && this.targetAngle != this.minimumAngle) {
				
				this.ret = this.minimumAngle
				};
				console.log( "Wrong answer: " + this.ret );
				return this.ret;
				
				
				break;
			
			case 2://Go high 
			
				this.ret =  chooseValueBetween( rightAnswer + this.minimumDifference, rightAnswer + this.maximumDifference ) ;
				if(this.ret > this.maximumAngle){//Make sure you don't go too high or too low
				
					this.ret = this.maximumAngle;
				}
				
				if(this.ret < this.minimumAngle) {//^^
				
					this.ret = this.minimumAngle
				};
				
				console.log( "Wrong answer: " + this.ret);
				return this.ret;
				break;
			
			default: // do nothing, this one never happens
		
		}
	
	
	
	},
	
	generateWrongAnswer2: function( rightAnswer, alreadyUsedWrongAnswer){
	
			
		this.ret = this.generateWrongAnswer( rightAnswer );
		
		while( Math.abs(this.ret - alreadyUsedWrongAnswer) <= this.minimumDifference  || this.ret < this.minimumAngle){//If the first generated value was too close to the other answer, try again until it is acceptable.
		
			this.ret = this.generateWrongAnswer(rightAnswer);
		
		}

		return this.ret;
		
	},
	
	giveAnswer: function(answer){ //handles the selection and score tracking progression of the user
		if(answer === 1){
			this.userChoice = this.choice1;
			engine.gameState.selectionBoxX = 10;
			engine.gameState.selectionBoxY = this.crossY + 10;
		}
		else if(answer == 2){
			this.userChoice = this.choice2;
			engine.gameState.selectionBoxX = 10;
			engine.gameState.selectionBoxY = this.crossY + (engine.h - this.crossY) / 2 + 10;
		}
		else if(answer === 3){
			this.userChoice = this.choice3;
			engine.gameState.selectionBoxX = engine.w / 2 + 10;
			engine.gameState.selectionBoxY = this.crossY + (engine.h - this.crossY) / 2 + 10;
		}
		if(this.userChoice === this.targetAngle){
			engine.gameState.numRight++;
			engine.gameState.message = "You got the right answer";
			engine.gameState.messageColor = "green";
		}
		else{
			engine.gameState.numWrong++;
			engine.gameState.message = "You got the wrong answer";
			engine.gameState.messageColor = "red";
		}
		engine.gameState.isDisplayingMessage = true;
	}
}
