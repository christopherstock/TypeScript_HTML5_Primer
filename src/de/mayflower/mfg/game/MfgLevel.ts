
    /*******************************************************************************************************************
    *   Represents a level setup.
    *
    *   @author  Christopher Stock
    *   @version 1.0
    *******************************************************************************************************************/
    class MfgLevel
    {
        /** The player instance. */
        public                      player          :MfgPlayer                          = null;

        /** All obstacles the level consists of. */
        public                      obstacles       :Array<MfgObstacle>                 = null;

        /** The level width. */
        public                      width           :number                             = 0;

        /** The level height. */
        public                      height          :number                             = 0;

        /***************************************************************************************************************
        *   Creates a new level instance.
        ***************************************************************************************************************/
        public constructor()
        {
            //set level bounds
            this.width  = MfgSetting.LEVEL_WIDTH;
            this.height = MfgSetting.LEVEL_HEIGHT;

            //create walls
            this.createObstacles();

            //create player instance
            this.createPlayer();
        }

        /***************************************************************************************************************
        *   Inits all walls for this level.
        ***************************************************************************************************************/
        private createObstacles()
        {
            this.obstacles = [

                new MfgObstacle( 740,  950, Mfg.game.imageSystem.getImage( MfgImage.OBSTACLE_TREE_2       ), true,  null                      ),
                new MfgObstacle( 990,  950, Mfg.game.imageSystem.getImage( MfgImage.OBSTACLE_TREE_2       ), true,  null                      ),
                new MfgObstacle( 1240, 950, Mfg.game.imageSystem.getImage( MfgImage.OBSTACLE_TREE_2       ), true,  null                      ),
                new MfgObstacle( 1490, 950, Mfg.game.imageSystem.getImage( MfgImage.OBSTACLE_TREE_2       ), true,  null                      ),
                new MfgObstacle( 1740, 950, Mfg.game.imageSystem.getImage( MfgImage.OBSTACLE_TREE_2       ), true,  null                      ),
            ];
        }

        /***************************************************************************************************************
        *   Inits the player for this level.
        ***************************************************************************************************************/
        private createPlayer()
        {
            let playerImage:HTMLImageElement = Mfg.game.imageSystem.getImage( MfgImage.PLAYER_DEFAULT );
            this.player = new MfgPlayer( 0, 0, playerImage );
        }

        /***************************************************************************************************************
        *   Draws the level.
        *
        *   @param context The 2D drawing context.
        *   @param camera  The camera context to use for this drawing operation.
        ***************************************************************************************************************/
        public draw( context:CanvasRenderingContext2D, camera:MfgCamera )
        {
            //draw obstacles
            for ( let i:number = 0; i < this.obstacles.length; ++i )
            {
                this.obstacles[ i ].draw( context, camera );
            }

            //draw player
            this.player.draw( context, camera );
        }

        /***************************************************************************************************************
        *   Renders the current level tick.
        ***************************************************************************************************************/
        public render()
        {
            if ( this.player.crashed || this.player.won )
            {
                return;
            }

            this.player.handlePlayerKeys();

            this.player.clipToLevelBounds();

            // this.moveAllObstacles();

            // this.checkCollision();
        }

        /***************************************************************************************************************
        *   Checks if the player collides with a wall.
        ***************************************************************************************************************/
        public checkCollision():void
        {
            for ( let i:number = 0; i < this.obstacles.length; ++i )
            {
                if (
                        this.obstacles[ i ].collidable
                    &&  this.player.rect.collidesWithRect( this.obstacles[ i ].rect )
                )
                {
                    this.player.crashed   = true;

                    MfgDebug.log( "Player crashed." );

                    return;
                }
            }
        }
    }
