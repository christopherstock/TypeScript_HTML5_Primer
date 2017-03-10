
    /*******************************************************************************************************************
    *   Represents an obstacle.
    *
    *   @author  Christopher Stock
    *   @version 1.0
    *******************************************************************************************************************/
    class MfgObstacle
    {
        /** The bounding rectangle. */
        public          rect                        :MfgRect2D                      = null;

        /** The representing image. */
        private         image                       :HTMLImageElement               = null;

        /** Specifies the direction this object should move. */
        public          movingDirection             :MfgDirection                   = null;

        /** Specifies if already being picked by player. */
        public          picked                      :boolean                        = false;

        /***************************************************************************************************************
        *   Creates a new game object.
        *
        *   @param x               Startup position x.
        *   @param y               Startup position y.
        *   @param image           The representing image.
        *   @param movingDirection Specifies the direction to move this obstacle.
        *                          <code>null</code> if this obstacle should not move.
        ***************************************************************************************************************/
        public constructor( x:number, y:number, image:HTMLImageElement, movingDirection:MfgDirection )
        {
            this.rect            = new MfgRect2D( x, y, image.width, image.height );
            this.image           = image;
            this.movingDirection = movingDirection;
        }

        /***************************************************************************************************************
        *   Draws this sprite for the specified camera context.
        *
        *   @param context The 2D drawing context.
        *   @param camera  The camera context to use for this drawing operation.
        ***************************************************************************************************************/
        public draw( context:CanvasRenderingContext2D, camera:MfgCamera )
        {
            if (this.picked) return;

            //draw image
            if ( !MfgDebug.DEBUG_DISABLE_IMAGE_DRAWING )
            {
                MfgDrawing.drawImage
                (
                    context,
                    this.image,
                    this.rect.x - camera.x,
                    this.rect.y - camera.y
                );
            }

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
                    MfgDrawing.COLOR_RED_TRANSLUCENT_50
                );
            }
        }
    }
