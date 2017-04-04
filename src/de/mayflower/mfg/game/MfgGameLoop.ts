
    /*******************************************************************************************************************
    *   Handles the game loop.
    *
    *   @author  Christopher Stock
    *   @version 1.0
    *******************************************************************************************************************/
    class MfgGameLoop
    {
        /***************************************************************************************************************
        *   Creates a new game loop.
        ***************************************************************************************************************/
        public constructor()
        {
        }

        /***************************************************************************************************************
        *   Starts the game loop.
        ***************************************************************************************************************/
        public start()
        {
            window.setInterval( this.tick, MfgSetting.THREAD_DELAY );
        }

        /***************************************************************************************************************
        *   Handles one game tick.
        ***************************************************************************************************************/
        public tick=()=>
        {
            Mfg.game.hud.fpsMeter.tickStart();

            this.render();
            this.draw();

            Mfg.game.hud.fpsMeter.tick();
        };

        /***************************************************************************************************************
        *   Renders the current game scene.
        ***************************************************************************************************************/
        private render()
        {
            //renders the level
            Mfg.game.level.render();

            //update camera position
            Mfg.game.camera.update
            (
                Mfg.game.level.width,
                Mfg.game.level.height,
                Mfg.game.canvas.getWidth(),
                Mfg.game.canvas.getHeight(),
                Mfg.game.level.player.rect
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
                Mfg.game.canvas.getContext(),
                0,
                0,
                Mfg.game.canvas.getWidth(),
                Mfg.game.canvas.getHeight(),
                MfgDrawing.COLOR_BLACK_OPAQUE
            );

            //draw level
            Mfg.game.level.draw( Mfg.game.canvas.getContext(), Mfg.game.camera );
        }
    }
