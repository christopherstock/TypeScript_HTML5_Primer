
    /*****************************************************************************
    *   Offers independent drawing functionality for the canvas.
    *
    *   @author  Christopher Stock
    *   @version 1.0
    *****************************************************************************/
    class MfgDrawing
    {
        /** The RGBA statement representing color 'white' with full opacity. */
        public      static      COLOR_WHITE_OPAQUE                      :string         = "rgba( 255, 255, 255, 1.0  )";
        /** The RGBA statement representing color 'grey' with half opacity. */
        public      static      COLOR_GREY_TRANSLUCENT_50               :string         = "rgba( 100, 100, 100, 0.5  )";
        /** The RGBA statement representing color 'grey dark' with full opacity. */
        public      static      COLOR_GREY_DARK_OPAQUE                  :string         = "rgba( 80,  80,  80,  1.0  )";
        /** The RGBA statement representing color 'red' with half opacity. */
        public      static      COLOR_RED_TRANSLUCENT_50                :string         = "rgba( 255, 0,   0,   0.5  )";
        /** The RGBA statement representing color 'red dark' with full opacity. */
        public      static      COLOR_RED_DARK_OPAQUE                   :string         = "rgba( 150, 0,   0,   1.0  )";
        /** The RGBA statement representing color 'yellow' with half opacity. */
        public      static      COLOR_YELLOW_TRANSLUCENT_50             :string         = "rgba( 255, 255, 0,   0.5  )";

        public      static      COLOR_BLACK_OPAQUE                      :string         = "rgba( 0,   0,   0,   1.0  )";

        /*****************************************************************************
        *   Fills a rect with the specified dimensions and color.
        *
        *   @param ctx    The rendering context.
        *   @param x      The left  coordinate.
        *   @param y      The right coordinate.
        *   @param width  The desired width.
        *   @param height The desired height.
        *   @param col    A fill color.
        *****************************************************************************/
        public static fillRect( ctx:CanvasRenderingContext2D, x:number, y:number, width:number, height:number, col:string )
        {
            ctx.fillStyle = col;
            ctx.fillRect( x, y, width, height );
        }

        /*****************************************************************************
        *   Fills a rect with the specified dimensions and color.
        *
        *   @param ctx    The rendering context.
        *   @param x      The left  coordinate.
        *   @param y      The right coordinate.
        *   @param width  The desired width.
        *   @param height The desired height.
        *   @param col    A fill color.
        *****************************************************************************/
        public static drawRect( ctx:CanvasRenderingContext2D, x:number, y:number, width:number, height:number, col:string )
        {
            ctx.strokeStyle = col;
            ctx.strokeRect( x, y, width, height );
        }

        /*****************************************************************************
        *   Draws an image at the specified location with a specified anchor.
        *
        *   @param ctx The rendering context
        *   @param img The image to draw.
        *   @param x   Drawing position x.
        *   @param y   Drawing position y.
        *****************************************************************************/
        public static drawImage( ctx:CanvasRenderingContext2D, img:HTMLImageElement, x:number, y:number )
        {
            ctx.drawImage( img, x, y );
        }
    }
