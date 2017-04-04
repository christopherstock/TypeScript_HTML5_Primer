
    /*******************************************************************************************************************
    *   Loads and manages all desired sounds.
    *
    *   @author  Christopher Stock
    *   @version 1.0
    *******************************************************************************************************************/
    class MfgSoundSystem
    {
        /** This array contains all loaded sounds. */
        private                     allSounds                               :Array<HTMLAudioElement>    = [];

        /***************************************************************************************************************
        *   Loads all audio elements.
        *
        *   @param fileNames An array containing all filenames of the sounds to load.
        ***************************************************************************************************************/
        constructor( fileNames:Array<string> )
        {
            for ( let i:number = 0; i < fileNames.length; ++i )
            {
                try
                {
                    this.allSounds[ fileNames[ i ] ] = new Audio( MfgSetting.PATH_SOUND + fileNames[ i ] );
                }
                catch ( e )
                {
                    MfgDebug.log( "Error on creating Audio element: " + e.message );
                }
            }
        }

        /***************************************************************************************************************
        *   Creates and plays a COPY of the specified audio object.
        *
        *   @param id The ID of the audio object to play.
        ***************************************************************************************************************/
        public playSound( id:string )
        {
            if ( !MfgDebug.DEBUG_DISABLE_SOUNDS )
            {
                let clipClone:HTMLAudioElement = <HTMLAudioElement>this.allSounds[ id ].cloneNode( true );
                clipClone.play();
            }
        }
    }
