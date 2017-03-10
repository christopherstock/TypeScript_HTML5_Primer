
    /*******************************************************************************************************************
    *   All project settings, adjustments and balancings.
    *
    *   @author  Christopher Stock
    *   @version 1.0
    *******************************************************************************************************************/
    class MfgSetting
    {
        /** Application title. */
        public      static      TITLE                                       :string             = "HTML5 TypeScript Primer, (c) 2017 Mayflower GmbH, v. 1.0";

        /** Desired canvas width. */
        public      static      CANVAS_WIDTH                                :number             = 900;
        /** Desired canvas height. */
        public      static      CANVAS_HEIGHT                               :number             = 500;

        /** Delay between each thread tick in milliseconds. */
        public      static      THREAD_DELAY                                :number             = 10;

        /** Desired level width. */
        public      static      LEVEL_WIDTH                                 :number             = 1600;
        /** Desired level height. */
        public      static      LEVEL_HEIGHT                                :number             = 800;

        /** The relative path where all images the app makes use of reside. */
        public      static      PATH_IMAGE                                  :string             = "res/image/";
        /** The relative path where all images the app makes use of reside. */
        public      static      PATH_SOUND                                  :string             = "res/sound/";

        /** The player's horizontal movement speed in pixels per tick. */
        public      static      PLAYER_SPEED_MOVE_X                         :number             = 5;
        /** The player's vertical movement speed in pixels per tick. */
        public      static      PLAYER_SPEED_MOVE_Y                         :number             = 5;
    }
