
    /*******************************************************************************************************************
    *   The debug system contains debug functions and debug feature toggles.
    *
    *   @author  Christopher Stock
    *   @version 1.0
    *******************************************************************************************************************/
    class MfgDebug
    {
        /** Disables console output. */
        public      static      DEBUG_ENABLE_CONSOLE_OUTPUT                 :boolean            = true;
        /** Disables all images. */
        public      static      DEBUG_DISABLE_IMAGE_DRAWING                 :boolean            = false;
        /** Disables all sounds. */
        public      static      DEBUG_DISABLE_SOUNDS                        :boolean            = true;
        /** Enables debug blocks. */
        public      static      DEBUG_ENABLE_BLOCKS                         :boolean            = false;

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
