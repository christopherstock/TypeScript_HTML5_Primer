
    /*******************************************************************************************************************
    *   Represents a level setup.
    *
    *   @author  Christopher Stock
    *   @version 1.0
    *******************************************************************************************************************/
    class MfgLevel
    {
        /** The player instance. */
        public                      player          :MfgPlayer                          = null;

        /** All obstacles the level consists of. */
        private                     items           :Array<MfgObstacle>                 = null;

        /** The level width. */
        public                      width           :number                             = 0;

        /** The level height. */
        public                      height          :number                             = 0;

        /***************************************************************************************************************
        *   Creates a new level instance.
        ***************************************************************************************************************/
        public constructor()
        {
            //set level bounds
            this.width  = MfgSetting.LEVEL_WIDTH;
            this.height = MfgSetting.LEVEL_HEIGHT;

            //create items
            this.initItems();

            //create player instance
            this.initPlayer();
        }

        /***************************************************************************************************************
        *   Inits all items for this level.
        ***************************************************************************************************************/
        private initItems():void
        {
            this.items = [
                new MfgObstacle( 350, 350, Mfg.game.imageSystem.getImage( MfgImage.ITEM ) ),
                new MfgObstacle( 450, 475, Mfg.game.imageSystem.getImage( MfgImage.ITEM ) ),
                new MfgObstacle( 600, 580, Mfg.game.imageSystem.getImage( MfgImage.ITEM ) ),
            ];
        }

        /***************************************************************************************************************
        *   Inits the player for this level.
        ***************************************************************************************************************/
        private initPlayer()
        {
            let playerImage:HTMLImageElement = Mfg.game.imageSystem.getImage( MfgImage.PLAYER_RIGHT );
            this.player = new MfgPlayer( 0, 0, playerImage );
        }

        /***************************************************************************************************************
        *   Draws the level.
        *
        *   @param context The 2D drawing context.
        *   @param camera  The camera context to use for this drawing operation.
        ***************************************************************************************************************/
        public draw( context:CanvasRenderingContext2D, camera:MfgCamera )
        {
            //draw bg
            MfgDrawing.drawImage
            (
                context,
                Mfg.game.imageSystem.getImage( MfgImage.BACKGROUND ),
                0 - camera.x,
                0 - camera.y
            );

            //draw items
            for ( let i:number = 0; i < this.items.length; ++i )
            {
                this.items[ i ].draw( context, camera );
            }

            //draw player
            this.player.draw( context, camera );
        }

        /***************************************************************************************************************
        *   Renders the current level tick.
        ***************************************************************************************************************/
        public render()
        {
            this.player.handlePlayerKeys();
            this.player.clipToLevelBounds();

            this.checkObstacleCollisions();
        }

        /***************************************************************************************************************
        *   Returns a collided obstacle in case of a collision.
        ***************************************************************************************************************/
        private checkObstacleCollisions() : void
        {
            for ( let i:number = 0; i < this.items.length; i++ )
            {
                if ( !this.items[ i ].picked && this.player.rect.collidesWithRect( this.items[ i ].rect ) )
                {
                    this.items[i].picked = true;

                    Mfg.game.soundSystem.playSound( MfgSound.SOUND_PICK_UP );

                    MfgDebug.log( 'Item picked up!' );

                    if ( this.checkGameOver() ) {
                        MfgDebug.log( "You picked up all items!" );
                    }
                }
            }
        }

        /***************************************************************************************************************
        *   Checks if all items are picked and outputs a message in this case.
        *
        *   @return boolean
        ***************************************************************************************************************/
        private checkGameOver() : boolean
        {
            for ( let i:number = 0; i < this.items.length; i++ )
            {
                if ( !this.items[ i ].picked )
                {
                    return false;
                }
            }

            return true;
        }
    }
