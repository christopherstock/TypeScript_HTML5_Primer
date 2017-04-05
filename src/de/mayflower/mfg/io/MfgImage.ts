
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
        /** Image for the player - heading left. */
        public      static      PLAYER_LEFT             :string                 = "player_left.png";
        /** Image for the player - heading right. */
        public      static      PLAYER_RIGHT            :string                 = "player_right.png";
        /** Image for the item. */
        public      static      ITEM                    :string                 = "item.png";

        /** This array contains all filenames of all images that shall be loaded. */
        public      static      FILE_NAMES              :Array<string>          =
        [
            MfgImage.BACKGROUND,
            MfgImage.PLAYER_LEFT,
            MfgImage.PLAYER_RIGHT,
            MfgImage.ITEM,
        ];
    }
