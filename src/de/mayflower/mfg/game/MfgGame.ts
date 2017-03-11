
    /*******************************************************************************************************************
    *   Handles the game logic.
    *
    *   @author  Christopher Stock
    *   @version 1.0
    *******************************************************************************************************************/
    class MfgGame
    {
        /** Canvas for all drawing operations. */
        public                          canvas              :MfgCanvas                      = null;
        /** Key handling system. */
        public                          keySystem           :MfgKeySystem                   = null;
        /** Image loading and providing system. */
        public                          imageSystem         :MfgImageSystem                 = null;
        /** Sound loading and providing system. */
        public                          soundSystem         :MfgSoundSystem                 = null;
        /** Current level instance. */
        public                          level               :MfgLevel                       = null;
        /** Current player viewport. */
        public                          camera              :MfgCamera                      = null;
        /** Heads Up Display. */
        private                         hud                 :MfgHUD                         = null;

        /***************************************************************************************************************
        *   Creates a new game logic.
        ***************************************************************************************************************/
        public constructor()
        {
        }

        /***************************************************************************************************************
        *   Inits this app from scratch.
        ***************************************************************************************************************/
        public init()
        {
            //set document title and acclaim debug console
            document.title = MfgSetting.TITLE;
            MfgDebug.log( MfgSetting.TITLE );

            //create undeployed canvas
            this.canvas = new MfgCanvas( MfgSetting.CANVAS_WIDTH, MfgSetting.CANVAS_HEIGHT );

            //attach key listeners
            this.keySystem = new MfgKeySystem();

            //load all images
            this.imageSystem = new MfgImageSystem
            (
                MfgImage.FILE_NAMES,
                this.initAfterImagesLoaded
            );
        }

        /***************************************************************************************************************
        *   Being invoked when all images are loaded,
        *   this method initializes the remaining stuff.
        ***************************************************************************************************************/
        private initAfterImagesLoaded=()=>
        {
            //load all sounds
            this.soundSystem = new MfgSoundSystem( MfgSound.FILE_NAMES );

            //play bg sound
            this.soundSystem.playSound( MfgSound.SOUND_BG_TD2 );

            //init a new level
            this.level  = new MfgLevel();
            this.camera = new MfgCamera();
            this.hud    = new MfgHUD();

            //show the canvas
            document.body.appendChild( this.canvas.getCanvasTag() );

            //start the main thread
            window.setInterval( this.tick, MfgSetting.THREAD_DELAY );
        };

        /***************************************************************************************************************
        *   Handles one game tick.
        ***************************************************************************************************************/
        public tick=()=>
        {
            this.hud.fpsMeter.tickStart();

            this.render();
            this.draw();

            this.hud.fpsMeter.tick();
        };

        /***************************************************************************************************************
        *   Renders the current game scene.
        ***************************************************************************************************************/
        private render()
        {
            this.level.render();

            this.camera.update
            (
                this.level.width,
                this.level.height,
                this.canvas.getWidth(),
                this.canvas.getHeight(),
                this.level.player.rect
            );
        }

        /***************************************************************************************************************
        *   Draws the current game frame.
        ***************************************************************************************************************/
        private draw()
        {
            //draw canvas bg
            MfgDrawing.fillRect
            (
                this.canvas.getContext(),
                0,
                0,
                this.canvas.getWidth(),
                this.canvas.getHeight(),
                MfgDrawing.COLOR_BLACK_OPAQUE
            );

            //draw level
            this.level.draw( this.canvas.getContext(), this.camera );
        }
    }
