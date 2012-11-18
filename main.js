/*!
 * 
 *   melonJS
 *   http://www.melonjs.org
 *		
 *   Step by step game creation tutorial
 *
 **/

// game resources
var g_resources = [{
    name: "area01_level_tiles",
    type: "image",
    src: "data/area01_tileset/area01_level_tiles.png"
}, {
    name: "area01",
    type: "tmx",
    src: "data/area01.tmx"
}, {
    name: "area02",
    type: "tmx",
    src: "data/area02.tmx"
}, {
    name: "keen_walk_right",
    type: "image",
    src: "data/sprite/keen_walk_right.png"
}, {
	// the parallax background
    name: "area01_bkg0",
    type: "image",
    src: "data/area01_parallax/area01_bkg0.png"
}, {
    name: "area01_bkg1",
    type: "image",
    src: "data/area01_parallax/area01_bkg1.png"
}, {
	// the spinning coin spritesheet
    name: "spinning_coin_gold",
    type: "image",
    src: "data/sprite/spinning_coin_gold.png"
}, 
// our enemty entity
{
    name: "wheelie_right",
    type: "image",
    src: "data/sprite/wheelie_right.png"
}, {
	// game font
    name: "32x32_font",
    type: "image",
    src: "data/sprite/32x32_font.png"
},
// audio resources
{
    name: "cling",
    type: "audio",
    src: "data/audio/",
    channel: 2
}, {
    name: "stomp",
    type: "audio",
    src: "data/audio/",
    channel: 1
}, {
    name: "jump",
    type: "audio",
    src: "data/audio/",
    channel: 1
}, {
    name: "DST-InertExponent",
    type: "audio",
    src: "data/audio/",
    channel: 1
}, {
    name: "title_screen",
    type: "image",
    src: "data/GUI/title_screen.png"
}];


var jsApp	= 
{	
	/* ---
	
		Initialize the jsApp
		
		---			*/
	onload: function()
	{
		
		// init the video
		if (!me.video.init('jsapp', 240, 140, true, 'auto'))
		{
			alert("Sorry but your browser does not support html 5 canvas.");
         return;
		}
				
		// initialize the "audio"
		me.audio.init("mp3,ogg");
		
		// set all resources to be loaded
		me.loader.onload = this.loaded.bind(this);
		
		// set all resources to be loaded
		me.loader.preload(g_resources);

		// load everything & display a loading screen
		me.state.change(me.state.LOADING);

		// me.debug.renderHitBox = true;

        me.video.scale(me.video.getScreenFrameBuffer(), 3);
	},
	
	
/* ---
 
    callback when everything is loaded
 
    --- */
loaded: function() {
    // set the "Play/Ingame" Screen Object
    me.state.set(me.state.MENU, new TitleScreen());
 
    // set the "Play/Ingame" Screen Object
    me.state.set(me.state.PLAY, new PlayScreen());
 
    // set a global fading transition for the screen
    me.state.transition("fade", "#FFFFFF", 250);
 
    // add our player entity in the entity pool
    me.entityPool.add("mainPlayer", PlayerEntity);
    me.entityPool.add("CoinEntity", CoinEntity);
    me.entityPool.add("EnemyEntity", EnemyEntity);
 
    // enable the keyboard
    me.input.bindKey(me.input.KEY.LEFT, "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    me.input.bindKey(me.input.KEY.X, "jump", true);
 
    // display the menu title
    me.state.change(me.state.MENU);
}

}; // jsApp

/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend({
 
    onResetEvent: function() {
    	// play the audio track
    	me.audio.playTrack("DST-InertExponent");

        // load a level
        me.levelDirector.loadLevel("area01");
 		
 		/*context.drawImage(this.title, 0, 0);
        this.font.draw(context, "LEVEL ONE", 20, 240);*/

        // add a default HUD to the game mngr
        me.game.addHUD(0, 430, 640, 60);
 
        // add a new HUD item
        me.game.HUD.addItem("score", new ScoreObject(620, 10));
 
        // make sure everyhting is in the right order
        me.game.sort();
 
    },
 
    /* ---
 
    action to perform when game is finished (state change)
 
    --- */
    onDestroyEvent: function() {
         // remove the HUD
    	me.game.disableHUD();
 
    	// stop the current audio track
    	me.audio.stopTrack();
    }
 
});


//bootstrap :)
window.onReady(function() 
{
	jsApp.onload();
});
