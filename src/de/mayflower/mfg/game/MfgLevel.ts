
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

        public defaultObstacles:Array<MfgObstacle> = [];

        /***************************************************************************************************************
        *   Creates a new level instance.
        ***************************************************************************************************************/
        public constructor()
        {
            //set level bounds
            this.width  = MfgSetting.LEVEL_WIDTH;
            this.height = MfgSetting.LEVEL_HEIGHT;

            //create walls
            this.obstacles = this.defaultObstacles = this.createObstacles();

            //create player instance
            this.createPlayer();
        }

        /***************************************************************************************************************
        *   Inits all walls for this level.
        ***************************************************************************************************************/
        private createObstacles():Array<MfgObstacle>
        {
            if (this.defaultObstacles.length > 0) {
                return this.defaultObstacles;
            }

            return [

                new MfgObstacle( 740,  450, Mfg.game.imageSystem.getImage( MfgImage.ITEM       ), true,  null                      ),
                new MfgObstacle( 990,  450, Mfg.game.imageSystem.getImage( MfgImage.ITEM       ), true,  null                      ),
                new MfgObstacle( 1240, 450, Mfg.game.imageSystem.getImage( MfgImage.ITEM       ), true,  null                      ),
            ];
        }

        /***************************************************************************************************************
        *   Inits the player for this level.
        ***************************************************************************************************************/
        private createPlayer()
        {
            let playerImage:HTMLImageElement = Mfg.game.imageSystem.getImage( MfgImage.PLAYER );
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
            //draw bg
            MfgDrawing.drawImage
            (
                context,
                Mfg.game.imageSystem.getImage( MfgImage.BACKGROUND ),
                0 - camera.x,
                0 - camera.y
            );

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

            const obstacle = this.getCollidedObstacle();
            if (obstacle) {
                this.obstacles = this.defaultObstacles = this.createObstacles().filter((o:MfgObstacle):boolean => {
                    return !(o.rect.x === obstacle.rect.x && o.rect.y === o.rect.y);
                });
            }
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

        /**
         * Returns a collided obstacle in case of a collision.
         * TODO: possibly join this with `this.checkCollision`
         *
         * @returns {MfgObstacle}
         */
        public getCollidedObstacle():MfgObstacle
        {
            for (let i:number = 0; i < this.obstacles.length; i++) {
                if (this.obstacles[i].collidable && this.player.rect.collidesWithRect(this.obstacles[i].rect)) {
                    return this.obstacles[i];
                }
            }
        }
    }
