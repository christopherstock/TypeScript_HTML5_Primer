
    /*******************************************************************************************************************
    *   Specifies all different images being used in the game.
    *
    *   @author  Christopher Stock
    *   @version 1.0
    *******************************************************************************************************************/
    class MfgImage
    {
        /** Image for the background. */
        public      static      BACKGROUND              :string                 = "bg.jpg";
        /** Image for the player. */
        public      static      PLAYER                  :string                 = "player.png";
        /** Image for the item. */
        public      static      ITEM                    :string                 = "item.png";

        /** This array contains all filenames of all images that shall be loaded. */
        public      static      FILE_NAMES              :Array<string>          =
        [
            MfgImage.BACKGROUND,
            MfgImage.PLAYER,
            MfgImage.ITEM,
        ];
    }
