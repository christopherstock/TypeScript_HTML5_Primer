
    /*******************************************************************************************************************
    *   Represents an obstacle.
    *
    *   @author  Christopher Stock
    *   @version 1.0
    *******************************************************************************************************************/
    class MfgObstacle
    {
        /** The bounding rectangle. */
        public          rect                        :MfgRect                        = null;

        /** The representing image. */
        private         image                       :HTMLImageElement               = null;

        /** Specifies if already being picked by player. */
        public          picked                      :boolean                        = false;

        /***************************************************************************************************************
        *   Creates a new game object.
        *
        *   @param x        Startup position x.
        *   @param y        Startup position y.
        *   @param image    The representing image.
        ***************************************************************************************************************/
        public constructor( x:number, y:number, image:HTMLImageElement )
        {
            this.rect  = new MfgRect( x, y, image.width, image.height );
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
            if (this.picked) return;

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
                    MfgDrawing.COLOR_RED_TRANSLUCENT_33
                );
            }

            //draw image
            MfgDrawing.drawImage( context, this.image, this.rect.x - camera.x, this.rect.y - camera.y );
        }
    }
