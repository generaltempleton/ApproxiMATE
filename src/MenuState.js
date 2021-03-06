var MenuState = function(w, h)
{
    this.w = w || 0;
    this.h = h || 0;

    this.running = true;
	
	//we may need a current-screen system where the MenuState.js file handles all different states
}

MenuState.prototype =
{
    // Update the simulation each frame
    update: function(dt)
    {
		
    },

	keyPress: function( keyCode)
	{
		switch(keyCode){				
			case 38: // Up arrow
				console.log("Up pressed");
				break;
			case 40: // Down arrow
				console.log("Down pressed");
				break;
		}
	},

    /*giveResources: function(resources)
    {
        this.stageSelection.giveResources(resources);
        this.characterSelection.giveResources(resources);
    },*/

    // Functions for starting and stopping the simulation
    start: function() { this.running = true },
    pause: function() { this.running = false },
    // Returns running
    isRunning: function() { return this.running },

    draw: function(canvas)
    {
        canvas.clearRect(0, 0, this.w, this.h);
		canvas.fillText("This is the main menu", 320, 240);
    },

}
