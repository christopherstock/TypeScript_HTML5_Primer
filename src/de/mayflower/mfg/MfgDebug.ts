
    /*******************************************************************************************************************
    *   The debug system contains debug functions and debug feature toggles.
    *
    *   @author  Christopher Stock
    *   @version 1.0
    *******************************************************************************************************************/
    class MfgDebug
    {
        /** Enables console output. */
        public      static      DEBUG_ENABLE_CONSOLE_OUTPUT                 :boolean            = true;
        /** Disables all sounds. */
        public      static      DEBUG_DISABLE_SOUNDS                        :boolean            = false;
        /** Enables debug blocks. */
        public      static      DEBUG_DRAW_BOUNDING_RECTS                   :boolean            = false;

        /***************************************************************************************************************
        *   Logs a line of output to the default console.
        *
        *   @param msg The message to log to the default console.
        ***************************************************************************************************************/
        public static log( msg:string ):void
        {
            if ( MfgDebug.DEBUG_ENABLE_CONSOLE_OUTPUT )
            {
                console.log( msg );
            }
        }
    }
