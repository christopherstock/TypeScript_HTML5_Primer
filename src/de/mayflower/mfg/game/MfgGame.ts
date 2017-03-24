
    /*******************************************************************************************************************
    *   Handles the game logic.
    *
    *   @author  Christopher Stock
    *   @version 1.0
    *******************************************************************************************************************/
    class MfgGame
    {
        /** Canvas for all drawing operations. */
        public                  canvas                  :MfgCanvas                      = null;
        /** Key handling system. */
        public                  keySystem               :MfgKeySystem                   = null;
        /** Image loading and providing system. */
        public                  imageSystem             :MfgImageSystem                 = null;
        /** Sound loading and providing system. */
        public                  soundSystem             :MfgSoundSystem                 = null;
        /** Current level instance. */
        public                  level                   :MfgLevel                       = null;
        /** Current player viewport. */
        public                  camera                  :MfgCamera                      = null;
        /** Heads Up Display. */
        private                 hud                     :MfgHUD                         = null;

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
            document.title = MfgSetting.TITLE;
            MfgDebug.log( MfgSetting.TITLE );

            this.initCanvas();
            this.initKeySystem();
            this.initImageSystem();
        }

        /***************************************************************************************************************
        *   Being invoked when all images are loaded, this method initializes the remaining game engine components.
        ***************************************************************************************************************/
        private initAfterImagesLoaded=()=>
        {
            this.initSoundSystem();

            this.level  = new MfgLevel();
            this.camera = new MfgCamera();
            this.hud    = new MfgHUD();

            this.startMainThread();
        };

        /***************************************************************************************************************
        *   Inits the canvas and appends it to the HTML body element.
        ***************************************************************************************************************/
        private initCanvas()
        {
            this.canvas = new MfgCanvas( MfgSetting.CANVAS_WIDTH, MfgSetting.CANVAS_HEIGHT );
            document.body.appendChild( this.canvas.getCanvasTag() );
        }

        /***************************************************************************************************************
        *   Inits all images and invokes a callback function when all images are loaded.
        ***************************************************************************************************************/
        private initImageSystem()
        {
            this.imageSystem = new MfgImageSystem
            (
                MfgImage.FILE_NAMES,
                this.initAfterImagesLoaded
            );
        }

        /***************************************************************************************************************
        *   Inits the key system.
        ***************************************************************************************************************/
        private initKeySystem()
        {
            this.keySystem = new MfgKeySystem();
        }

        /***************************************************************************************************************
        *   Inits the sound system and plays the bg sound.
        ***************************************************************************************************************/
        private initSoundSystem()
        {
            this.soundSystem = new MfgSoundSystem( MfgSound.FILE_NAMES );

            this.soundSystem.playSound( MfgSound.SOUND_BG );
        }

        /***************************************************************************************************************
        *   Starts the main thread that will launch the game.
        ***************************************************************************************************************/
        private startMainThread()
        {
            window.setInterval( this.tick, MfgSetting.THREAD_DELAY );
        }

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
            //renders the level
            this.level.render();

            //update camera position
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
            //clear canvas
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
