
    /*****************************************************************************
    *   The debug system.
    *
    *   @author  Christopher Stock
    *   @version 1.0
    *****************************************************************************/
    class MfgDebug
    {
        /** Disables console output. */
        private     static      DEBUG_ENABLE_CONSOLE_OUTPUT                 :boolean            = true;
        /** Enables vertical movement. */
        public      static      DEBUG_ENABLE_FREE_MOVEMENT                  :boolean            = false;
        /** Disables all images. */
        public      static      DEBUG_DISABLE_IMAGES                        :boolean            = false;
        /** Disables all sounds. */
        public      static      DEBUG_DISABLE_SOUNDS                        :boolean            = true;
        /** Enables debug blocks. */
        public      static      DEBUG_ENABLE_BLOCKS                         :boolean            = false;

        /*****************************************************************************
        *   Logs a line of output to the default console.
        *
        *   @param msg The message to log to the default console.
        *****************************************************************************/
        public static log( msg:string ):void
        {
            if (MfgDebug.DEBUG_ENABLE_CONSOLE_OUTPUT)
            {
                console.log( msg );
            }
        }

        public static toggleMovement()
        {
            MfgDebug.DEBUG_ENABLE_FREE_MOVEMENT = !MfgDebug.DEBUG_ENABLE_FREE_MOVEMENT;
        }
    }
