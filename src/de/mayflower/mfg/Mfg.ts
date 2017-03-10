
    /*******************************************************************************************************************
    *   The main class containing the point of entry and termination.
    *
    *   TODO ASAP HUD with string drawing operations (collected points).
    *   TODO ASAP Simplify init system.
    *   TODO ASAP Create new game logic.
    *   TODO ASAP Remove redundance in image and sound system.
    *
    *   @author  Christopher Stock
    *   @version 1.0
    *******************************************************************************************************************/
    class Mfg
    {
        /** The singleton instance of the game logic. */
        public          static          game                :MfgGame                = null;

        /***************************************************************************************************************
        *   Being invoked when the application starts.
        ***************************************************************************************************************/
        public static main():void
        {
            Mfg.game = new MfgGame();
            Mfg.game.init();
        }
    }

    /*******************************************************************************************************************
    *   Application's point of entry.
    *******************************************************************************************************************/
    window.onload = function()
    {
        Mfg.main();
    };

    /*******************************************************************************************************************
    *   Application's point of termination.
    *******************************************************************************************************************/
    window.onunload = function()
    {
    };
