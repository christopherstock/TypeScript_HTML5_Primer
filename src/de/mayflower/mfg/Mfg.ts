
    /*******************************************************************************************************************
    *   The main class containing the point of entry and termination.
    *
    *   TODO ASAP unify all doc block stars.
    *   TODO ASAP Prune unused settings.
    *   TODO ASAP Remove all weak warnings.
    *   TODO ASAP HUD with string drawing operations (collected points).
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
