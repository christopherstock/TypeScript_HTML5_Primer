
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
        public                  hud                     :MfgHUD                         = null;
        /** Game loop. */
        public                  gameLoop                :MfgGameLoop                    = null;

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
            this.initCanvas();
            this.initKeySystem();
            this.initImageSystem();
        }

        /***************************************************************************************************************
        *   Inits the canvas and appends it to the HTML body element.
        ***************************************************************************************************************/
        private initCanvas()
        {
            this.canvas = new MfgCanvas( MfgSetting.CANVAS_WIDTH, MfgSetting.CANVAS_HEIGHT );

            document.body.appendChild( this.canvas.getCanvasTag() );
        }

        /***************************************************************************************************************
        *   Inits the key system.
        ***************************************************************************************************************/
        private initKeySystem()
        {
            this.keySystem = new MfgKeySystem();
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
        *   Being invoked when all images are loaded, this method initializes the remaining game engine components.
        ***************************************************************************************************************/
        private initAfterImagesLoaded=()=>
        {
            this.soundSystem = new MfgSoundSystem( MfgSound.FILE_NAMES );
            this.soundSystem.playSound( MfgSound.SOUND_BG );

            this.level    = new MfgLevel();
            this.camera   = new MfgCamera();
            this.hud      = new MfgHUD();

            this.gameLoop = new MfgGameLoop();
            this.gameLoop.start();
        };
    }
