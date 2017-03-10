
    /*******************************************************************************************************************
    *   The main class containing the point of entry and termination.
    *
    *   TODO ASAP add .js to ignore list.
    *   TODO ASAP unify all doc block stars.
    *   TODO ASAP Add debug toggle to SoundSystem class.
    *   TODO ASAP Remove all weak warnings.
    *   TODO ASAP Add lib folder and outsource lib classes.
    *
    *   @author  Christopher Stock
    *   @version 1.0
    *******************************************************************************************************************/
    class Mfg
    {
        /** The singleton instance of the game. */
        public      static      game            :MfgGame                = null;

        /***************************************************************************************************************
        *   Being invoked when the application starts.
        ***************************************************************************************************************/
        public static main():void
        {
            Mfg.game = new MfgGame();
            Mfg.game.init();
        }
    }

    /***************************************************************************************************************
    *   Application's point of entry.
    ***************************************************************************************************************/
    window.onload = function()
    {
        Mfg.main();
    };

    /***************************************************************************************************************
    *   Application's point of termination.
    ***************************************************************************************************************/
    window.onunload = function()
    {
    };
