
    /*******************************************************************************************************************
    *   Represents the player.
    *
    *   @author  Christopher Stock
    *   @version 1.0
    *******************************************************************************************************************/
    class MfgPlayer
    {
        /** The bounding rectangle. */
        public          rect                        :MfgRect2D                      = null;

        /** The representing image. */
        private         image                       :HTMLImageElement               = null;

        /** Indicates crashed state. */
        public          crashed                     :boolean                        = false;

        /** Indicates that the player reached the finish line. */
        public          won                         :boolean                        = false;

        /***************************************************************************************************************
        *   Creates a new game object.
        *
        *   @param x     Startup position x.
        *   @param y     Startup position y.
        *   @param image The representing image.
        ***************************************************************************************************************/
        public constructor( x:number, y:number, image:HTMLImageElement )
        {
            this.rect  = new MfgRect2D( x, y, image.width, image.height );
            this.image = image;
        }

        /***************************************************************************************************************
        *   Draws this sprite for the specified camera context.
        *
        *   @param context The 2D drawing context.
        *   @param camera  The camera context to use for this drawing operation.
        ***************************************************************************************************************/
        public draw( context:CanvasRenderingContext2D, camera:MfgCamera )
        {
            //draw debug rect
            if ( MfgDebug.DEBUG_DRAW_BOUNDING_RECTS )
            {
                MfgDrawing.fillRect
                (
                    context,
                    this.rect.x - camera.x,
                    this.rect.y - camera.y,
                    this.rect.width,
                    this.rect.height,
                    MfgDrawing.COLOR_GREY_TRANSLUCENT_50
                );
            }

            //draw image
            if ( !MfgDebug.DEBUG_DISABLE_IMAGE_DRAWING )
            {
                MfgDrawing.drawImage
                (
                    context,
                    ( this.crashed ? Mfg.game.imageSystem.getImage( MfgImage.PLAYER_CRASHED ) : this.image ),
                    this.rect.x - camera.x,
                    this.rect.y - camera.y
                );
            }
        }

        /***************************************************************************************************************
        *   Handle the keys the user has pressed.
        ***************************************************************************************************************/
        public handlePlayerKeys()
        {
            if ( Mfg.game.keySystem.isPressed( MfgKeySystem.KEY_LEFT ) )
            {
                this.rect.x -= MfgSetting.PLAYER_SPEED_MOVE_X;
            }

            if ( Mfg.game.keySystem.isPressed( MfgKeySystem.KEY_RIGHT ) )
            {
                this.rect.x += MfgSetting.PLAYER_SPEED_MOVE_X;
            }

            if ( Mfg.game.keySystem.isPressed( MfgKeySystem.KEY_UP ) )
            {
                this.rect.y -= MfgSetting.PLAYER_SPEED_MOVE_Y;
            }

            if ( Mfg.game.keySystem.isPressed( MfgKeySystem.KEY_DOWN ) )
            {
                this.rect.y += MfgSetting.PLAYER_SPEED_MOVE_Y;
            }
        }

        /***************************************************************************************************************
        *   Clip the player to the horizontal level bounds.
        ***************************************************************************************************************/
        public clipToLevelBounds()
        {
            if ( this.rect.x < 0                                        ) this.rect.x = 0;
            if ( this.rect.x > Mfg.game.level.width - this.rect.width   ) this.rect.x = Mfg.game.level.width - this.rect.width;
            if ( this.rect.y < 0                                        ) this.rect.y = 0;
            if ( this.rect.y > Mfg.game.level.height - this.rect.height ) this.rect.y = Mfg.game.level.height - this.rect.height;
        }
    }
