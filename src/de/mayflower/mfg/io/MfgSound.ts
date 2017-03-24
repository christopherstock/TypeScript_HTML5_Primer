
    /*******************************************************************************************************************
    *   Specifies all different sound effects being used in the game.
    *
    *   @author  Christopher Stock
    *   @version 1.0
    *******************************************************************************************************************/
    class MfgSound
    {
        /** The background sound 'DKC2 - Enchanted Woods'. */
        public      static      SOUND_BG                        :string                 = "bg.mp3";

        /** The pick up sound. */
        public      static      SOUND_PICK_UP                   :string                 = "pickUp.mp3";

        /** This array contains all filenames of all sounds that shall be loaded. */
        public      static      FILE_NAMES                      :Array<string>          =
        [
            MfgSound.SOUND_BG,
            MfgSound.SOUND_PICK_UP,
        ];
    }
