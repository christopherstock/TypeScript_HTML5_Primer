
    /*******************************************************************************************************************
    *   Offers independent drawing functionality for the canvas.
    *
    *   @author  Christopher Stock
    *   @version 1.0
    *******************************************************************************************************************/
    class MfgDrawing
    {
        /** The RGBA statement representing color 'black' with full opacity. */
        public      static      COLOR_BLACK_OPAQUE                      :string         = "rgba( 0,   0,   0,   1.0  )";

        /** The RGBA statement representing color 'red' with third opacity. */
        public      static      COLOR_RED_TRANSLUCENT_33                :string         = "rgba( 255, 0,   0,   0.33 )";

        /** The RGBA statement representing color 'blue' with third opacity. */
        public      static      COLOR_BLUE_TRANSLUCENT_33               :string         = "rgba( 0,   0,   255, 0.33 )";

        /***************************************************************************************************************
        *   Fills a rect with the specified dimensions and color.
        *
        *   @param ctx    The rendering context.
        *   @param x      The left  coordinate.
        *   @param y      The right coordinate.
        *   @param width  The desired width.
        *   @param height The desired height.
        *   @param col    A fill color.
        ***************************************************************************************************************/
        public static fillRect( ctx:CanvasRenderingContext2D, x:number, y:number, width:number, height:number, col:string )
        {
            ctx.fillStyle = col;
            ctx.fillRect( x, y, width, height );
        }

        /***************************************************************************************************************
        *   Draws an image at the specified location with a specified anchor.
        *
        *   @param ctx The rendering context
        *   @param img The image to draw.
        *   @param x   Drawing position x.
        *   @param y   Drawing position y.
        ***************************************************************************************************************/
        public static drawImage( ctx:CanvasRenderingContext2D, img:HTMLImageElement, x:number, y:number )
        {
            ctx.drawImage( img, x, y );
        }
    }
