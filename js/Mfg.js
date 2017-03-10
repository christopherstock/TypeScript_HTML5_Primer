var MfgGame = (function () {
    function MfgGame() {
        var _this = this;
        this.canvas = null;
        this.keySystem = null;
        this.imageSystem = null;
        this.soundSystem = null;
        this.level = null;
        this.camera = null;
        this.hud = null;
        this.initAfterImagesLoaded = function () {
            _this.soundSystem = new MfgSoundSystem(MfgSound.FILE_NAMES);
            _this.soundSystem.playSound(MfgSound.SOUND_BG_TD2);
            _this.level = new MfgLevel();
            _this.camera = new MfgCamera();
            _this.hud = new MfgHUD();
            document.body.appendChild(_this.canvas.getCanvasTag());
            window.setInterval(_this.tick, MfgSetting.THREAD_DELAY);
        };
        this.tick = function () {
            _this.hud.fpsMeter.tickStart();
            _this.render();
            _this.draw();
            _this.hud.fpsMeter.tick();
        };
    }
    MfgGame.prototype.init = function () {
        document.title = MfgSetting.TITLE;
        MfgDebug.log(MfgSetting.TITLE);
        this.canvas = new MfgCanvas(MfgSetting.CANVAS_WIDTH, MfgSetting.CANVAS_HEIGHT);
        this.keySystem = new MfgKeySystem();
        this.imageSystem = new MfgImageSystem(MfgImage.FILE_NAMES, this.initAfterImagesLoaded);
    };
    MfgGame.prototype.render = function () {
        this.level.render();
        this.camera.update(this.level.width, this.level.height, this.canvas.getWidth(), this.canvas.getHeight(), this.level.player.rect);
    };
    MfgGame.prototype.draw = function () {
        MfgDrawing.fillRect(this.canvas.getContext(), 0, 0, this.canvas.getWidth(), this.canvas.getHeight(), MfgDrawing.COLOR_WHITE_OPAQUE);
        this.level.draw(this.canvas.getContext(), this.camera);
    };
    return MfgGame;
}());
var MfgLevel = (function () {
    function MfgLevel() {
        this.player = null;
        this.obstacles = null;
        this.width = 0;
        this.height = 0;
        this.width = MfgSetting.LEVEL_WIDTH;
        this.height = MfgSetting.LEVEL_HEIGHT;
        this.createObstacles();
        this.createPlayer();
    }
    MfgLevel.prototype.createObstacles = function () {
        this.obstacles = [
            new MfgObstacle(0, 0, Mfg.game.imageSystem.getImage(MfgImage.BG_1), false, null),
            new MfgObstacle(0, 904, Mfg.game.imageSystem.getImage(MfgImage.BG_1), false, null),
            new MfgObstacle(0, 1808, Mfg.game.imageSystem.getImage(MfgImage.BG_1), false, null),
            new MfgObstacle(0, 2712, Mfg.game.imageSystem.getImage(MfgImage.BG_1), false, null),
            new MfgObstacle(0, 3616, Mfg.game.imageSystem.getImage(MfgImage.BG_1), false, null),
            new MfgObstacle(0, 4520, Mfg.game.imageSystem.getImage(MfgImage.BG_1), false, null),
            new MfgObstacle(0, 5424, Mfg.game.imageSystem.getImage(MfgImage.BG_1), false, null),
            new MfgObstacle(0, 6328, Mfg.game.imageSystem.getImage(MfgImage.BG_1), false, null),
            new MfgObstacle(0, 7232, Mfg.game.imageSystem.getImage(MfgImage.BG_1), false, null),
            new MfgObstacle(0, 8136, Mfg.game.imageSystem.getImage(MfgImage.BG_1), false, null),
            new MfgObstacle(0, 9040, Mfg.game.imageSystem.getImage(MfgImage.BG_1), false, null),
            new MfgObstacle(0, 9944, Mfg.game.imageSystem.getImage(MfgImage.BG_1), false, null),
            new MfgObstacle(0, 10848, Mfg.game.imageSystem.getImage(MfgImage.BG_1), false, null),
            new MfgObstacle(0, 11752, Mfg.game.imageSystem.getImage(MfgImage.BG_1), false, null),
            new MfgObstacle(815, 903, Mfg.game.imageSystem.getImage(MfgImage.DECO_COUNTY_ROAD), false, null),
            new MfgObstacle(1349, 903, Mfg.game.imageSystem.getImage(MfgImage.DECO_COUNTY_ROAD), false, null),
            new MfgObstacle(1883, 903, Mfg.game.imageSystem.getImage(MfgImage.DECO_COUNTY_ROAD), false, null),
            new MfgObstacle(0, 903, Mfg.game.imageSystem.getImage(MfgImage.DECO_COUNTY_ROAD), false, null),
            new MfgObstacle(615, 3150, Mfg.game.imageSystem.getImage(MfgImage.DECO_COUNTY_ROAD), false, null),
            new MfgObstacle(1149, 3150, Mfg.game.imageSystem.getImage(MfgImage.DECO_COUNTY_ROAD), false, null),
            new MfgObstacle(1683, 3150, Mfg.game.imageSystem.getImage(MfgImage.DECO_COUNTY_ROAD), false, null),
            new MfgObstacle(815, 1715, Mfg.game.imageSystem.getImage(MfgImage.DECO_COUNTY_ROAD), false, null),
            new MfgObstacle(1349, 1715, Mfg.game.imageSystem.getImage(MfgImage.DECO_COUNTY_ROAD), false, null),
            new MfgObstacle(1883, 1715, Mfg.game.imageSystem.getImage(MfgImage.DECO_COUNTY_ROAD), false, null),
            new MfgObstacle(740, 2950, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_2), true, null),
            new MfgObstacle(990, 2950, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_2), true, null),
            new MfgObstacle(1240, 2950, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_2), true, null),
            new MfgObstacle(1490, 2950, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_2), true, null),
            new MfgObstacle(1740, 2950, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_2), true, null),
            new MfgObstacle(515, 0, Mfg.game.imageSystem.getImage(MfgImage.DECO_ROAD_STRAIGHT), false, null),
            new MfgObstacle(515, 391, Mfg.game.imageSystem.getImage(MfgImage.DECO_ROAD_STRAIGHT), false, null),
            new MfgObstacle(515, 782, Mfg.game.imageSystem.getImage(MfgImage.DECO_ROAD_STRAIGHT), false, null),
            new MfgObstacle(515, 1173, Mfg.game.imageSystem.getImage(MfgImage.DECO_ROAD_STRAIGHT), false, null),
            new MfgObstacle(515, 1564, Mfg.game.imageSystem.getImage(MfgImage.DECO_ROAD_STRAIGHT), false, null),
            new MfgObstacle(315, 1955, Mfg.game.imageSystem.getImage(MfgImage.DECO_ROAD_LEFT), false, null),
            new MfgObstacle(860, -50, Mfg.game.imageSystem.getImage(MfgImage.DECO_FIELD_1), false, null),
            new MfgObstacle(860, 380, Mfg.game.imageSystem.getImage(MfgImage.DECO_FIELD_1), false, null),
            new MfgObstacle(1310, -50, Mfg.game.imageSystem.getImage(MfgImage.DECO_FIELD_1), false, null),
            new MfgObstacle(1310, 380, Mfg.game.imageSystem.getImage(MfgImage.DECO_FIELD_1), false, null),
            new MfgObstacle(830, 1000, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_2), true, null),
            new MfgObstacle(1030, 1000, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_2), true, null),
            new MfgObstacle(1230, 1000, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_2), true, null),
            new MfgObstacle(1430, 1000, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_2), true, null),
            new MfgObstacle(1630, 1000, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_2), true, null),
            new MfgObstacle(1830, 1000, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_2), true, null),
            new MfgObstacle(315, 2346, Mfg.game.imageSystem.getImage(MfgImage.DECO_ROAD_STRAIGHT), false, null),
            new MfgObstacle(315, 2737, Mfg.game.imageSystem.getImage(MfgImage.DECO_ROAD_STRAIGHT), false, null),
            new MfgObstacle(315, 3128, Mfg.game.imageSystem.getImage(MfgImage.DECO_ROAD_STRAIGHT), false, null),
            new MfgObstacle(315, 3519, Mfg.game.imageSystem.getImage(MfgImage.DECO_ROAD_STRAIGHT), false, null),
            new MfgObstacle(315, 3910, Mfg.game.imageSystem.getImage(MfgImage.DECO_ROAD_STRAIGHT), false, null),
            new MfgObstacle(315, 4251, Mfg.game.imageSystem.getImage(MfgImage.DECO_ROAD_STRAIGHT), false, null),
            new MfgObstacle(315, 4835, Mfg.game.imageSystem.getImage(MfgImage.DECO_ROAD_STRAIGHT), false, null),
            new MfgObstacle(315, 5226, Mfg.game.imageSystem.getImage(MfgImage.DECO_ROAD_STRAIGHT), false, null),
            new MfgObstacle(275, 90, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_1), true, null),
            new MfgObstacle(275, 360, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_1), true, null),
            new MfgObstacle(275, 630, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_1), true, null),
            new MfgObstacle(275, 1050, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_1), true, null),
            new MfgObstacle(275, 1330, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_1), true, null),
            new MfgObstacle(275, 1610, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_1), true, null),
            new MfgObstacle(15, -50, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_1), true, null),
            new MfgObstacle(15, 220, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_1), true, null),
            new MfgObstacle(15, 490, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_1), true, null),
            new MfgObstacle(15, 1190, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_1), true, null),
            new MfgObstacle(15, 1470, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_1), true, null),
            new MfgObstacle(15, 1750, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_1), true, null),
            new MfgObstacle(140, 2040, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_1), true, null),
            new MfgObstacle(50, 2350, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_1), true, null),
            new MfgObstacle(50, 2620, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_1), true, null),
            new MfgObstacle(50, 2890, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_1), true, null),
            new MfgObstacle(50, 3160, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_1), true, null),
            new MfgObstacle(50, 3430, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_1), true, null),
            new MfgObstacle(50, 3700, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_1), true, null),
            new MfgObstacle(830, 1450, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_WATER_2), true, null),
            new MfgObstacle(1350, 1490, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_3), true, null),
            new MfgObstacle(1550, 1490, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_3), true, null),
            new MfgObstacle(750, 2230, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_HOUSE_1), true, null),
            new MfgObstacle(615, 2455, Mfg.game.imageSystem.getImage(MfgImage.DECO_COUNTY_ROAD), false, null),
            new MfgObstacle(1149, 2455, Mfg.game.imageSystem.getImage(MfgImage.DECO_COUNTY_ROAD), false, null),
            new MfgObstacle(1683, 2455, Mfg.game.imageSystem.getImage(MfgImage.DECO_COUNTY_ROAD), false, null),
            new MfgObstacle(1180, 2270, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_3), true, null),
            new MfgObstacle(1380, 2270, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_3), true, null),
            new MfgObstacle(1580, 2270, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_3), true, null),
            new MfgObstacle(1780, 2270, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_3), true, null),
            new MfgObstacle(780, 2570, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_3), true, null),
            new MfgObstacle(980, 2570, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_3), true, null),
            new MfgObstacle(1180, 2570, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_3), true, null),
            new MfgObstacle(1380, 2570, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_3), true, null),
            new MfgObstacle(1580, 2570, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_3), true, null),
            new MfgObstacle(1780, 2570, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_3), true, null),
            new MfgObstacle(850, 1850, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_6), true, null),
            new MfgObstacle(1080, 1850, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_6), true, null),
            new MfgObstacle(1310, 1850, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_6), true, null),
            new MfgObstacle(1540, 1850, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_6), true, null),
            new MfgObstacle(1770, 1850, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_6), true, null),
            new MfgObstacle(-709, 3958, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_WATER_1), true, null),
            new MfgObstacle(615, 3958, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_WATER_1), true, null),
            new MfgObstacle(1639, 3958, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_WATER_1), true, null),
            new MfgObstacle(315, 3861, Mfg.game.imageSystem.getImage(MfgImage.DECO_BRIDGE), false, null),
            new MfgObstacle(-250, 4250, Mfg.game.imageSystem.getImage(MfgImage.DECO_FIELD_1), false, null),
            new MfgObstacle(-250, 4720, Mfg.game.imageSystem.getImage(MfgImage.DECO_FIELD_1), false, null),
            new MfgObstacle(700, 800, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_CAR_3), true, MfgDirection.NORTH),
            new MfgObstacle(700, 800, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_CAR_1), true, MfgDirection.NORTH),
            new MfgObstacle(560, 900, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TRUCK_4), true, MfgDirection.SOUTH),
            new MfgObstacle(360, 2751, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TRUCK_2), true, MfgDirection.SOUTH),
            new MfgObstacle(495, 2285, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_CAR_2), true, MfgDirection.NORTH_EAST),
            new MfgObstacle(360, 2751, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TRUCK_2), true, MfgDirection.SOUTH),
            new MfgObstacle(495, 3150, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TRUCK_3), true, MfgDirection.NORTH),
            new MfgObstacle(495, 3410, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TRUCK_5), true, MfgDirection.NORTH),
            new MfgObstacle(495, 4100, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_CAR_4), true, MfgDirection.NORTH),
            new MfgObstacle(750, 3280, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_4), true, null),
            new MfgObstacle(950, 3280, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_4), true, null),
            new MfgObstacle(1150, 3280, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_4), true, null),
            new MfgObstacle(750, 3400, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_4), true, null),
            new MfgObstacle(950, 3400, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_4), true, null),
            new MfgObstacle(1150, 3400, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_4), true, null),
            new MfgObstacle(750, 3520, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_4), true, null),
            new MfgObstacle(950, 3520, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_4), true, null),
            new MfgObstacle(1150, 3520, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_4), true, null),
            new MfgObstacle(750, 3640, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_4), true, null),
            new MfgObstacle(950, 3640, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_4), true, null),
            new MfgObstacle(1150, 3640, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_4), true, null),
            new MfgObstacle(750, 3780, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_4), true, null),
            new MfgObstacle(950, 3780, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_4), true, null),
            new MfgObstacle(1150, 3780, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_TREE_4), true, null),
            new MfgObstacle(315, 4642, Mfg.game.imageSystem.getImage(MfgImage.DECO_ROAD_FINISH_LINE), false, null),
            new MfgObstacle(650, 4500, Mfg.game.imageSystem.getImage(MfgImage.OBSTACLE_SIGN_1), true, null),
        ];
    };
    MfgLevel.prototype.createPlayer = function () {
        var playerImage = Mfg.game.imageSystem.getImage(MfgImage.PLAYER_DEFAULT);
        this.player = new MfgPlayer(MfgSetting.PLAYER_STARTUP_X, MfgSetting.PLAYER_STARTUP_Y, playerImage);
    };
    MfgLevel.prototype.draw = function (context, camera) {
        MfgDrawing.drawImage(context, Mfg.game.imageSystem.getImage(MfgImage.BG_1), 0 - camera.x, 0 - camera.y);
        for (var i = 0; i < this.obstacles.length; ++i) {
            this.obstacles[i].draw(context, camera);
        }
        this.player.draw(context, camera);
    };
    MfgLevel.prototype.render = function () {
        if (this.player.crashed || this.player.won) {
            return;
        }
        this.player.handlePlayerKeys();
        if (!MfgDebug.DEBUG_ENABLE_FREE_MOVEMENT) {
            this.player.moveDown();
            this.player.clipToLevelBounds();
            this.moveAllObstacles();
            this.checkCollision();
        }
    };
    MfgLevel.prototype.moveAllObstacles = function () {
        for (var i = 0; i < this.obstacles.length; ++i) {
            if (this.obstacles[i].movingDirection != null) {
                if (this.obstacles[i].rect.y < Mfg.game.camera.y + Mfg.game.canvas.getHeight()) {
                    this.obstacles[i].move();
                }
            }
        }
    };
    MfgLevel.prototype.checkCollision = function () {
        for (var i = 0; i < this.obstacles.length; ++i) {
            if (this.obstacles[i].collidable
                && this.player.rect.collidesWithRect(this.obstacles[i].rect)) {
                this.player.colliding = true;
                this.player.crashed = true;
                MfgDebug.log("Player crashed.");
                return;
            }
        }
        this.player.colliding = false;
    };
    return MfgLevel;
}());
var MfgObstacle = (function () {
    function MfgObstacle(x, y, image, collidable, movingDirection) {
        this.rect = null;
        this.image = null;
        this.collidable = false;
        this.movingDirection = null;
        this.rect = new MfgRect2D(x, y, image.width, image.height);
        this.image = image;
        this.collidable = collidable;
        this.movingDirection = movingDirection;
    }
    MfgObstacle.prototype.draw = function (context, camera) {
        if (MfgDebug.DEBUG_ENABLE_BLOCKS) {
            MfgDrawing.fillRect(context, this.rect.x - camera.x, this.rect.y - camera.y, this.rect.width, this.rect.height, MfgDrawing.COLOR_YELLOW_TRANSLUCENT_50);
        }
        if (!MfgDebug.DEBUG_DISABLE_IMAGES) {
            MfgDrawing.drawImage(context, this.image, this.rect.x - camera.x, this.rect.y - camera.y);
        }
    };
    MfgObstacle.prototype.move = function () {
        switch (this.movingDirection) {
            case MfgDirection.NORTH:
                {
                    this.rect.y -= MfgSetting.OBSTACLE_SPEED_MOVE_Y;
                    break;
                }
            case MfgDirection.NORTH_EAST:
                {
                    this.rect.x += MfgSetting.OBSTACLE_SPEED_MOVE_X;
                    this.rect.y -= MfgSetting.OBSTACLE_SPEED_MOVE_Y;
                    break;
                }
            case MfgDirection.EAST:
                {
                    this.rect.x += MfgSetting.OBSTACLE_SPEED_MOVE_X;
                    break;
                }
            case MfgDirection.SOUTH_EAST:
                {
                    this.rect.x += MfgSetting.OBSTACLE_SPEED_MOVE_X;
                    this.rect.y += MfgSetting.OBSTACLE_SPEED_MOVE_Y;
                    break;
                }
            case MfgDirection.SOUTH:
                {
                    this.rect.y += MfgSetting.OBSTACLE_SPEED_MOVE_Y;
                    break;
                }
            case MfgDirection.SOUTH_WEST:
                {
                    this.rect.x -= MfgSetting.OBSTACLE_SPEED_MOVE_X;
                    this.rect.y += MfgSetting.OBSTACLE_SPEED_MOVE_Y;
                    break;
                }
            case MfgDirection.WEST:
                {
                    this.rect.x -= MfgSetting.OBSTACLE_SPEED_MOVE_X;
                    break;
                }
            case MfgDirection.NORTH_WEST:
                {
                    this.rect.x -= MfgSetting.OBSTACLE_SPEED_MOVE_X;
                    this.rect.y -= MfgSetting.OBSTACLE_SPEED_MOVE_Y;
                    break;
                }
        }
    };
    return MfgObstacle;
}());
var MfgPlayer = (function () {
    function MfgPlayer(x, y, image) {
        this.rect = null;
        this.image = null;
        this.colliding = false;
        this.crashed = false;
        this.won = false;
        this.rect = new MfgRect2D(x, y, image.width, image.height);
        this.image = image;
    }
    MfgPlayer.prototype.draw = function (context, camera) {
        if (MfgDebug.DEBUG_ENABLE_BLOCKS) {
            MfgDrawing.fillRect(context, this.rect.x - camera.x, this.rect.y - camera.y, this.rect.width, this.rect.height, MfgDrawing.COLOR_GREY_TRANSLUCENT_50);
            if (this.colliding) {
                MfgDrawing.fillRect(context, this.rect.x - camera.x, this.rect.y - camera.y, this.rect.width, this.rect.height, MfgDrawing.COLOR_RED_TRANSLUCENT_50);
            }
        }
        if (!MfgDebug.DEBUG_DISABLE_IMAGES) {
            MfgDrawing.drawImage(context, (this.crashed ? Mfg.game.imageSystem.getImage(MfgImage.PLAYER_CRASHED) : this.image), this.rect.x - camera.x, this.rect.y - camera.y);
        }
    };
    MfgPlayer.prototype.handlePlayerKeys = function () {
        var speedX = (MfgDebug.DEBUG_ENABLE_FREE_MOVEMENT ? 10 : MfgSetting.PLAYER_SPEED_MOVE_Y);
        var speedY = (MfgDebug.DEBUG_ENABLE_FREE_MOVEMENT ? 10 : MfgSetting.PLAYER_SPEED_MOVE_Y);
        if (Mfg.game.keySystem.isPressed(MfgKeySystem.KEY_LEFT)) {
            this.rect.x -= speedX;
        }
        if (Mfg.game.keySystem.isPressed(MfgKeySystem.KEY_RIGHT)) {
            this.rect.x += speedX;
        }
        if (MfgDebug.DEBUG_ENABLE_FREE_MOVEMENT) {
            if (Mfg.game.keySystem.isPressed(MfgKeySystem.KEY_UP)) {
                this.rect.y -= speedY;
            }
            if (Mfg.game.keySystem.isPressed(MfgKeySystem.KEY_DOWN)) {
                this.rect.y += speedY;
            }
        }
        if (Mfg.game.keySystem.isPressed(MfgKeySystem.KEY_1)) {
            MfgDebug.toggleMovement();
            Mfg.game.keySystem.setNeedsRelease(MfgKeySystem.KEY_1);
        }
    };
    MfgPlayer.prototype.clipToLevelBounds = function () {
        if (this.rect.x < 0)
            this.rect.x = 0;
        if (this.rect.x > Mfg.game.level.width - this.rect.width)
            this.rect.x = Mfg.game.level.width - this.rect.width;
        if (this.rect.y < 0)
            this.rect.y = 0;
        if (this.rect.y > Mfg.game.level.height - this.rect.height)
            this.rect.y = Mfg.game.level.height - this.rect.height;
    };
    MfgPlayer.prototype.moveDown = function () {
        this.rect.y += MfgSetting.PLAYER_SPEED_MOVE_Y;
        if (this.rect.y > 4675) {
            this.won = true;
            MfgDebug.log("Player reached the finish line.");
        }
    };
    return MfgPlayer;
}());
var MfgKeySystem = (function () {
    function MfgKeySystem() {
        var _this = this;
        this.pressed = null;
        this.needsRelease = null;
        this.handleKeyDown = function (evt) {
            var keyCode = evt.which;
            if (!_this.needsRelease[keyCode]) {
                _this.pressed[keyCode] = true;
            }
            MfgDebug.log("key pressed [" + keyCode + "]");
        };
        this.handleKeyUp = function (evt) {
            var keyCode = evt.which;
            _this.pressed[keyCode] = false;
            _this.needsRelease[keyCode] = false;
            MfgDebug.log("key released [" + keyCode + "]");
        };
        this.pressed = [];
        this.needsRelease = [];
        var onKeyDown = this.handleKeyDown;
        var onKeyUp = this.handleKeyUp;
        window.addEventListener("keydown", onKeyDown, false);
        window.addEventListener("keyup", onKeyUp, false);
        window.addEventListener("onkeydown", onKeyDown, false);
        window.addEventListener("onkeyup", onKeyUp, false);
    }
    MfgKeySystem.prototype.isPressed = function (keyCode) {
        return this.pressed[keyCode];
    };
    MfgKeySystem.prototype.setNeedsRelease = function (keyCode) {
        this.needsRelease[keyCode] = true;
        this.pressed[keyCode] = false;
    };
    MfgKeySystem.KEY_LEFT = 37;
    MfgKeySystem.KEY_UP = 38;
    MfgKeySystem.KEY_RIGHT = 39;
    MfgKeySystem.KEY_DOWN = 40;
    MfgKeySystem.KEY_ENTER = 13;
    MfgKeySystem.KEY_ESCAPE = 27;
    MfgKeySystem.KEY_SPACE = 32;
    MfgKeySystem.KEY_1 = 49;
    return MfgKeySystem;
}());
var MfgSetting = (function () {
    function MfgSetting() {
    }
    MfgSetting.TITLE = "HTML5 TypeScript Primer, (c) 2017 Mayflower GmbH, v. 1.0";
    MfgSetting.CANVAS_WIDTH = 900;
    MfgSetting.CANVAS_HEIGHT = 600;
    MfgSetting.THREAD_DELAY = 10;
    MfgSetting.LEVEL_WIDTH = 2000;
    MfgSetting.LEVEL_HEIGHT = 5000;
    MfgSetting.PLAYER_OFFSET_TOP = 20;
    MfgSetting.PLAYER_STARTUP_X = 565;
    MfgSetting.PLAYER_STARTUP_Y = MfgSetting.PLAYER_OFFSET_TOP;
    MfgSetting.PLAYER_SPEED_MOVE_X = 2;
    MfgSetting.PLAYER_SPEED_MOVE_Y = 2;
    MfgSetting.OBSTACLE_SPEED_MOVE_X = 0.25;
    MfgSetting.OBSTACLE_SPEED_MOVE_Y = 0.5;
    MfgSetting.PATH_IMAGE = "res/image/";
    MfgSetting.PATH_SOUND = "res/sound/";
    MfgSetting.PRELOADER_WIDTH = 200;
    MfgSetting.PRELOADER_HEIGHT = 15;
    return MfgSetting;
}());
var MfgImage = (function () {
    function MfgImage() {
    }
    MfgImage.PLAYER_DEFAULT = MfgSetting.PATH_IMAGE + "player/default.png";
    MfgImage.PLAYER_CRASHED = MfgSetting.PATH_IMAGE + "player/crashed.png";
    MfgImage.BG_1 = MfgSetting.PATH_IMAGE + "bg/bg1.jpg";
    MfgImage.DECO_ROAD_STRAIGHT = MfgSetting.PATH_IMAGE + "deco/roadStraight.png";
    MfgImage.DECO_ROAD_LEFT = MfgSetting.PATH_IMAGE + "deco/roadLeft.png";
    MfgImage.DECO_ROAD_RIGHT = MfgSetting.PATH_IMAGE + "deco/roadRight.png";
    MfgImage.DECO_ROAD_FINISH_LINE = MfgSetting.PATH_IMAGE + "deco/finishLine.png";
    MfgImage.DECO_BRIDGE = MfgSetting.PATH_IMAGE + "deco/bridge.png";
    MfgImage.DECO_FIELD_1 = MfgSetting.PATH_IMAGE + "deco/field1.png";
    MfgImage.DECO_COUNTY_ROAD = MfgSetting.PATH_IMAGE + "deco/countryRoad.png";
    MfgImage.OBSTACLE_WATER_1 = MfgSetting.PATH_IMAGE + "obstacle/water1.png";
    MfgImage.OBSTACLE_WATER_2 = MfgSetting.PATH_IMAGE + "obstacle/water2.png";
    MfgImage.OBSTACLE_TREE_1 = MfgSetting.PATH_IMAGE + "obstacle/tree1.png";
    MfgImage.OBSTACLE_TREE_2 = MfgSetting.PATH_IMAGE + "obstacle/tree2.png";
    MfgImage.OBSTACLE_TREE_3 = MfgSetting.PATH_IMAGE + "obstacle/tree3.png";
    MfgImage.OBSTACLE_TREE_4 = MfgSetting.PATH_IMAGE + "obstacle/tree4.png";
    MfgImage.OBSTACLE_TREE_5 = MfgSetting.PATH_IMAGE + "obstacle/tree5.png";
    MfgImage.OBSTACLE_TREE_6 = MfgSetting.PATH_IMAGE + "obstacle/tree6.png";
    MfgImage.OBSTACLE_TREE_7 = MfgSetting.PATH_IMAGE + "obstacle/tree7.png";
    MfgImage.OBSTACLE_TREE_8 = MfgSetting.PATH_IMAGE + "obstacle/tree8.png";
    MfgImage.OBSTACLE_TREE_9 = MfgSetting.PATH_IMAGE + "obstacle/tree9.png";
    MfgImage.OBSTACLE_CAR_1 = MfgSetting.PATH_IMAGE + "obstacle/car1.png";
    MfgImage.OBSTACLE_CAR_2 = MfgSetting.PATH_IMAGE + "obstacle/car2.png";
    MfgImage.OBSTACLE_CAR_3 = MfgSetting.PATH_IMAGE + "obstacle/car3.png";
    MfgImage.OBSTACLE_CAR_4 = MfgSetting.PATH_IMAGE + "obstacle/car4.png";
    MfgImage.OBSTACLE_TRUCK_1 = MfgSetting.PATH_IMAGE + "obstacle/truck1.png";
    MfgImage.OBSTACLE_TRUCK_2 = MfgSetting.PATH_IMAGE + "obstacle/truck2.png";
    MfgImage.OBSTACLE_TRUCK_3 = MfgSetting.PATH_IMAGE + "obstacle/truck3.png";
    MfgImage.OBSTACLE_TRUCK_4 = MfgSetting.PATH_IMAGE + "obstacle/truck4.png";
    MfgImage.OBSTACLE_TRUCK_5 = MfgSetting.PATH_IMAGE + "obstacle/truck5.png";
    MfgImage.OBSTACLE_HOUSE_1 = MfgSetting.PATH_IMAGE + "obstacle/house1.png";
    MfgImage.OBSTACLE_SIGN_1 = MfgSetting.PATH_IMAGE + "obstacle/sign1.png";
    MfgImage.FILE_NAMES = [
        MfgImage.PLAYER_DEFAULT,
        MfgImage.PLAYER_CRASHED,
        MfgImage.BG_1,
        MfgImage.DECO_ROAD_LEFT,
        MfgImage.DECO_ROAD_RIGHT,
        MfgImage.DECO_ROAD_STRAIGHT,
        MfgImage.DECO_ROAD_FINISH_LINE,
        MfgImage.DECO_BRIDGE,
        MfgImage.DECO_FIELD_1,
        MfgImage.DECO_COUNTY_ROAD,
        MfgImage.OBSTACLE_WATER_1,
        MfgImage.OBSTACLE_WATER_2,
        MfgImage.OBSTACLE_TREE_1,
        MfgImage.OBSTACLE_TREE_2,
        MfgImage.OBSTACLE_TREE_3,
        MfgImage.OBSTACLE_TREE_4,
        MfgImage.OBSTACLE_TREE_5,
        MfgImage.OBSTACLE_TREE_6,
        MfgImage.OBSTACLE_TREE_7,
        MfgImage.OBSTACLE_TREE_8,
        MfgImage.OBSTACLE_TREE_9,
        MfgImage.OBSTACLE_CAR_1,
        MfgImage.OBSTACLE_CAR_2,
        MfgImage.OBSTACLE_CAR_3,
        MfgImage.OBSTACLE_CAR_4,
        MfgImage.OBSTACLE_TRUCK_1,
        MfgImage.OBSTACLE_TRUCK_2,
        MfgImage.OBSTACLE_TRUCK_3,
        MfgImage.OBSTACLE_TRUCK_4,
        MfgImage.OBSTACLE_TRUCK_5,
        MfgImage.OBSTACLE_HOUSE_1,
        MfgImage.OBSTACLE_SIGN_1,
    ];
    return MfgImage;
}());
var MfgImageSystem = (function () {
    function MfgImageSystem(fileNames, callback) {
        var _this = this;
        this.fileNames = [];
        this.loadedCount = 0;
        this.loadedImages = [];
        this.callback = null;
        this.onImageLoaded = function () {
            ++_this.loadedCount;
            MfgDebug.log("loaded imgage [" + _this.loadedCount + "] / [" + _this.fileNames.length + "]");
            if (_this.loadedCount == _this.fileNames.length) {
                MfgDebug.log("All images loaded");
                _this.callback();
            }
        };
        this.fileNames = fileNames;
        this.callback = callback;
        this.loadImages();
    }
    MfgImageSystem.prototype.loadImages = function () {
        for (var i = 0; i < this.fileNames.length; ++i) {
            this.loadedImages[this.fileNames[i]] = this.loadImage(this.fileNames[i]);
        }
    };
    MfgImageSystem.prototype.loadImage = function (filename) {
        var img = new Image();
        img.src = filename;
        img.onload = this.onImageLoaded;
        return img;
    };
    MfgImageSystem.prototype.getImage = function (id) {
        return this.loadedImages[id];
    };
    return MfgImageSystem;
}());
var MfgSound = (function () {
    function MfgSound() {
    }
    MfgSound.SOUND_BG_TD2 = MfgSetting.PATH_SOUND + "bg1.mp3";
    MfgSound.FILE_NAMES = [
        MfgSound.SOUND_BG_TD2,
    ];
    return MfgSound;
}());
var MfgSoundSystem = (function () {
    function MfgSoundSystem(fileNames) {
        this.allSounds = [];
        for (var i = 0; i < fileNames.length; ++i) {
            this.allSounds[fileNames[i]] = new Audio(fileNames[i]);
        }
    }
    MfgSoundSystem.prototype.playSound = function (id) {
        if (!MfgDebug.DEBUG_DISABLE_SOUNDS) {
            var clipClone = this.allSounds[id].cloneNode(true);
            clipClone.play();
        }
    };
    return MfgSoundSystem;
}());
var Mfg = (function () {
    function Mfg() {
    }
    Mfg.main = function () {
        Mfg.game = new MfgGame();
        Mfg.game.init();
    };
    Mfg.game = null;
    return Mfg;
}());
window.onload = function () {
    Mfg.main();
};
window.onunload = function () {
};
var MfgDebug = (function () {
    function MfgDebug() {
    }
    MfgDebug.log = function (msg) {
        if (MfgDebug.DEBUG_ENABLE_CONSOLE_OUTPUT) {
            console.log(msg);
        }
    };
    MfgDebug.toggleMovement = function () {
        MfgDebug.DEBUG_ENABLE_FREE_MOVEMENT = !MfgDebug.DEBUG_ENABLE_FREE_MOVEMENT;
    };
    MfgDebug.DEBUG_ENABLE_CONSOLE_OUTPUT = true;
    MfgDebug.DEBUG_ENABLE_FREE_MOVEMENT = false;
    MfgDebug.DEBUG_DISABLE_IMAGES = false;
    MfgDebug.DEBUG_DISABLE_SOUNDS = true;
    MfgDebug.DEBUG_ENABLE_BLOCKS = false;
    return MfgDebug;
}());
var MfgCamera = (function () {
    function MfgCamera() {
        this.x = 0;
        this.y = 0;
        this.x = 0;
        this.y = 0;
    }
    MfgCamera.prototype.update = function (levelWidth, levelHeight, canvasWidth, canvasHeight, subject) {
        this.x = subject.x - canvasWidth / 2 + subject.width / 2;
        if (this.x < 0)
            this.x = 0;
        if (this.x > levelWidth - canvasWidth)
            this.x = levelWidth - canvasWidth;
        this.y = subject.y - MfgSetting.PLAYER_OFFSET_TOP;
        if (this.y < 0)
            this.y = 0;
        if (this.y > levelHeight - canvasHeight)
            this.y = levelHeight - canvasHeight;
    };
    return MfgCamera;
}());
var MfgCanvas = (function () {
    function MfgCanvas(aTargetWidth, aTargetHeight) {
        this.iCanvasTag = null;
        this.iContext = null;
        this.iCanvasTag = document.createElement('canvas');
        this.iCanvasTag.width = aTargetWidth;
        this.iCanvasTag.height = aTargetHeight;
        this.iContext = this.iCanvasTag.getContext('2d');
        MfgDebug.log("Canvas setup with [" + this.iCanvasTag.width + "]x[" + this.iCanvasTag.height + "]");
    }
    MfgCanvas.prototype.getCanvasTag = function () {
        return this.iCanvasTag;
    };
    MfgCanvas.prototype.getContext = function () {
        return this.iContext;
    };
    MfgCanvas.prototype.getWidth = function () {
        return this.iCanvasTag.width;
    };
    MfgCanvas.prototype.getHeight = function () {
        return this.iCanvasTag.height;
    };
    return MfgCanvas;
}());
var MfgDrawing = (function () {
    function MfgDrawing() {
    }
    MfgDrawing.fillRect = function (ctx, x, y, width, height, col) {
        ctx.fillStyle = col;
        ctx.fillRect(x, y, width, height);
    };
    MfgDrawing.drawRect = function (ctx, x, y, width, height, col) {
        ctx.strokeStyle = col;
        ctx.strokeRect(x, y, width, height);
    };
    MfgDrawing.drawImage = function (ctx, img, x, y) {
        ctx.drawImage(img, x, y);
    };
    MfgDrawing.COLOR_WHITE_OPAQUE = "rgba( 255, 255, 255, 1.0  )";
    MfgDrawing.COLOR_GREY_TRANSLUCENT_50 = "rgba( 100, 100, 100, 0.5  )";
    MfgDrawing.COLOR_GREY_DARK_OPAQUE = "rgba( 80,  80,  80,  1.0  )";
    MfgDrawing.COLOR_RED_TRANSLUCENT_50 = "rgba( 255, 0,   0,   0.5  )";
    MfgDrawing.COLOR_RED_DARK_OPAQUE = "rgba( 150, 0,   0,   1.0  )";
    MfgDrawing.COLOR_YELLOW_TRANSLUCENT_50 = "rgba( 255, 255, 0,   0.5  )";
    MfgDrawing.COLOR_BLACK_OPAQUE = "rgba( 0,   0,   0,   1.0  )";
    return MfgDrawing;
}());
var MfgHUD = (function () {
    function MfgHUD() {
        this.fpsMeter = null;
        this.fpsMeter = new FPSMeter(null, {
            graph: 1,
            decimals: 1,
            position: "absolute",
            zIndex: 10,
            right: "5px",
            top: "auto",
            left: "auto",
            bottom: "5px",
            margin: "0",
            heat: 0
        });
        var options = this.fpsMeter.options;
        options.heat = 1;
    }
    return MfgHUD;
}());
var MfgDirection;
(function (MfgDirection) {
    MfgDirection[MfgDirection["NORTH"] = 0] = "NORTH";
    MfgDirection[MfgDirection["NORTH_EAST"] = 1] = "NORTH_EAST";
    MfgDirection[MfgDirection["NORTH_WEST"] = 2] = "NORTH_WEST";
    MfgDirection[MfgDirection["EAST"] = 3] = "EAST";
    MfgDirection[MfgDirection["SOUTH"] = 4] = "SOUTH";
    MfgDirection[MfgDirection["SOUTH_EAST"] = 5] = "SOUTH_EAST";
    MfgDirection[MfgDirection["SOUTH_WEST"] = 6] = "SOUTH_WEST";
    MfgDirection[MfgDirection["WEST"] = 7] = "WEST";
})(MfgDirection || (MfgDirection = {}));
var MfgRect2D = (function () {
    function MfgRect2D(x, y, width, height) {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    MfgRect2D.prototype.collidesWithRect = function (rect) {
        return (this.x < rect.x + rect.width
            && this.x + this.width > rect.x
            && this.y < rect.y + rect.height
            && this.y + this.height > rect.y);
    };
    return MfgRect2D;
}());
//# sourceMappingURL=Mfg.js.map