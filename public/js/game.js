
var game = new Phaser.Game(600, 900, Phaser.AUTO, 'space-ghost', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('bullet', 'assets/original/ectoplasm.png');
    game.load.image('enemyBullet', 'assets/enemy-bullet.png');
    game.load.spritesheet('invader', 'assets/invader32x32x4.png', 32, 32);
    game.load.image('invader2', 'assets/original/saucer.png', 45, 44);
    game.load.image('invader3', 'assets/original/saucer_b.png', 45, 44);

    game.load.spritesheet('ship', 'assets/original/ghostship.png', 33, 32);
    game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
    game.load.spritesheet('shield', 'assets/shield.png', 192, 192, 20);
    game.load.image('starfield', 'assets/starfield.png');
    game.load.image('background', 'assets/background2.png');
    game.load.atlas('arcade', 'assets/virtualjoystick/skins/generic-joystick.png', 'assets/virtualjoystick/skins/generic-joystick.json');
    game.load.image('menu', 'assets/new_game.png', 270, 180);
    game.load.image(POWERUP_TYPE_HEALTH, 'assets/' + POWERUP_TYPE_HEALTH + '.png', 75, 75);
    game.load.image(POWERUP_TYPE_LAZER_UPGRADE_1, 'assets/'+ POWERUP_TYPE_LAZER_UPGRADE_1 + '.png', 24, 22);
    // game.load.image('background', 'assets/virtualjoystick/back.png');
    // game.load.image('player', 'assets/virtualjoystick/ship.png');
    // game.load.image('bullet2', 'assets/virtualjoystick/bullet2.png');
    // game.load.image('bullet9', 'assets/virtualjoystick/bullet9.png');
    // game.load.image('bullet10', 'assets/virtualjoystick/bullet10.png');

}

var player;
var bullets;
var bulletTime = 0;
var cursors;
var fireButton;
var explosions;
var starfield;
var score = 0;
var scoreString = '';
var scoreText;
var lives;
var enemyBullet;
var firingTimer = 0;
var stateText;
var livingEnemies = 0;
var pad;
var buttonA;
var stick;
var waveManager;
var enemies = [];
var invincibility = false;
var shield;
var powerups = [];
var playerHp = 1;
var lazerUpgrade = null;
function create() {
    game.world.setBounds(0, 0, 600, 780)
    pad = game.plugins.add(Phaser.VirtualJoystick);

    stick = pad.addStick(80, game.stage.height - 65, 100, 'arcade');
    stick.deadZone = 0;
    stick.scale = 0.5;

    buttonA = pad.addButton(game.world.width - 70, game.stage.height - 65, 'arcade', 'button1-up', 'button1-down');
    buttonA.onDown.add(fireBullet);
    buttonA.scale = 0.9;
    buttonA.repeatRate = 100;
    // buttonA.addKey(Phaser.Keyboard.CONTROL);

    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, 600, 780, 'starfield');

    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(100, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    //  The hero!
    player = game.add.sprite(300, game.world.height - 20, 'ship');
    var shields = player.animations.add('animate');
    player.animations.play('animate', 30, true);
    noInvincible();

    player.enableBody = true;
    player.anchor.setTo(0.5, 0.5);
    
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;

    //  The baddies!
    // createAliens();

    //  The score
    scoreString = 'Score : ';
    scoreText = game.add.text(game.world.width / 2 - 100, game.stage.height - 60, scoreString + score, { font: '34px Arial', fill: '#fff' });

    //  Lives
    lives = game.add.group();
    game.add.text(game.world.width / 2 - 100, game.stage.height - 110, 'Lives : ', { font: '34px Arial', fill: '#fff' });

    //  Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    for (var i = 0; i < 3; i++) 
    {
        var ship = lives.create(game.world.width / 2 + 80 - (30 * i), game.stage.height - 88, 'ship');
        ship.anchor.setTo(0.5, 0.5);
        ship.angle = 90;
    }

    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(setupInvader, this);

    // // The enemy's bullets
    // enemyBullets = game.add.group();
    // enemyBullets.enableBody = true;
    // enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    // enemyBullets.createMultiple(30, 'enemyBullet');
    // enemyBullets.setAll('anchor.x', 0.5);
    // enemyBullets.setAll('anchor.y', 1);
    // enemyBullets.setAll('outOfBoundsKill', true);
    // enemyBullets.setAll('checkWorldBounds', true);

    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(150, 'enemyBullet');
    
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // game.input.onDown.add(gofull, this);

    // Code for the fullscreen
    var xyz = game.add.text( game.world.width - 400, 2, 'Click to fullscreen', { font: '24px Arial', fill: '#fff' });
    xyz.inputEnabled = true;
    xyz.events.onInputUp.add(function () {
        gofull();
            console.log("balls");
        });

        /*
        Code for the pause menu
    */

    // Create a label to use as a button
    pause_label = game.add.text( game.world.width - 100, 2, 'Pause', { font: '24px Arial', fill: '#fff' });
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(function () {
        // When the paus button is pressed, we pause the game
        game.paused = true;

        // Then add the menu
        // menu = game.add.sprite( game.world.width/2, game.world.height/2, 'menu');
        // menu.anchor.setTo(0.5, 0.5);

        // And a label to illustrate which menu item was chosen. (This is not necessary)
        choiceLabel = game.add.text( game.world.width/2, game.world.height-150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
        choiceLabel.anchor.setTo(0.5, 0.5);
    });

    // Add a input listener that can help us return from being paused
    game.input.onDown.add(unpause, self);

    // And finally the method that handels the pause menu
    function unpause(event){
        // Only act if paused
        if(game.paused){
            // menu.destroy();
            choiceLabel.destroy();
            game.paused = false;
        }
    };


    waveManager = new WaveManager();
    _.each(enemyWaves, function(wave) {
        waveManager.addWave(
            wave.spawnTimer,
            wave.enemyType,
            wave.xPosition,
            wave.yPosition
        );
    });
    waveManager.calculateTimers();
    shield = game.add.sprite(player.body.x, player.body.y, 'shield');
    var shields = shield.animations.add('shields');    

}

function gofull() {

    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(false);
    }

}

function setupInvader (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

}

function update() {

    //  Scroll the background
    starfield.tilePosition.y += 2;
    // console.log(playerHp);
    if(playerHp > 1) {    
        shield.animations.play('shields', 30, true);
        shield.position.x = player.body.x - 84;
        shield.position.y = player.body.y - 75;
    } else {
        shield.animations.stop('shields');
    }
    // powerup.


    if (player.alive)
    {
        

        var maxSpeed = 200;

        if (stick.isDown)
        {
            game.physics.arcade.velocityFromRotation(stick.rotation, stick.force * maxSpeed, player.body.velocity);
        }
        else
        {
            player.body.velocity.set(0);
        }

        //  Reset the player, then check for movement keys

        if (cursors.left.isDown)
        {
            player.body.velocity.x = -200;
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 200;
        }
        if (cursors.up.isDown)
        {
            player.body.velocity.y = -200;
        }
        else if (cursors.down.isDown)
        {
            player.body.velocity.y = 200;
        }

        //  Firing?
        if (fireButton.isDown)
        {
            fireBullet();
        }

        // if (game.time.now > firingTimer)
        // {
        //     waveManager.enemyFires();
        // }

        //  Run collision
        // game.physics.arcade.overlap(bullets, enemies, collisionHandler, null, this);
        if(!invincibility) {
            game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
        }
        _.each(powerups, function(powerup) {
            game.physics.arcade.overlap(powerup.sprite, player, doPowerUp, null, powerup);    
        });
        _.each(enemies, function (enemy) {
            game.physics.arcade.overlap(bullets, enemy.enObj, collisionHandler, null, enemy);
            enemy.update();
        });
    }

}

function doPowerUp(powerup, player) {
    console.log(this);
    powerup.kill();
    if(this.powerUpType == POWERUP_TYPE_HEALTH) {
        if(playerHp == 1) { 
            shield = game.add.sprite(player.body.x, player.body.y, 'shield');
            var shields = shield.animations.add('shields');
        }
        if(playerHp == 1) {
            playerHp += 1;    
        }
    } else if(this.powerUpType == POWERUP_TYPE_LAZER_UPGRADE_1) {
        lazerUpgrade = POWERUP_TYPE_LAZER_UPGRADE_1;
    }
}

function render() {
    // if (game.scale.isFullScreen)
    // {
    //     game.debug.text('ESC to leave fullscreen', game.world.width / 2 - 120, 16);
    // }
    // else
    // {
    //     game.debug.text('Click / Tap to go fullscreen', game.world.width / 2 - 120, 16);
    // }
}

function collisionHandler (enemy, bullet) {

    bullet.kill();
    this.hp -= 1;
    if(this.hp <= 0) {
        if(Math.floor(Math.random() * 20) == 0){
            powerup = new PowerUp();
            powerup.initialize(enemy.body.x, enemy.body.y, POWERUP_TYPE_HEALTH);
            powerups.push(powerup);
        }
        else if(Math.floor(Math.random() * 10) == 0){
            powerup = new PowerUp();
            powerup.initialize(enemy.body.x, enemy.body.y, POWERUP_TYPE_LAZER_UPGRADE_1);
            powerups.push(powerup);
        }
        this.stopFiring();
        livingEnemies -= 1;
        enemy.kill();

        score += 20;
        scoreText.text = scoreString + score;

        var explosion = explosions.getFirstExists(false);
        explosion.reset(enemy.body.x + 20, enemy.body.y + 22);
        explosion.play('kaboom', 30, false, true);
    }
    // if (livingEnemies <= 0)
    // {
    //     score += 1000;
    //     scoreText.text = scoreString + score;

    //     enemyBullets.callAll('kill',this);
    //     stateText.text = " You Won, \n Refresh to \n restart";
    //     stateText.visible = true;

    //     //the "click to restart" handler
    //     game.input.onTap.addOnce(restart,this);
    // }

}
function noInvincible () {
    invincibility = false;
    player.alpha = .75;
}

function enemyHitsPlayer (player,bullet) {
    
    bullet.kill();
    playerHp -= 1;
    if (playerHp == 1) {
        shield.kill();
    }
    if (playerHp <= 0) {
        lazerUpgrade = null;

        live = lives.getFirstAlive();

        if (live)
        {
            live.kill();
            invincibility = true;
            player.alpha = 0.5;
            game.time.events.add(Phaser.Timer.SECOND * 3, noInvincible, this);
        }

        //  And create an explosion :)
        var explosion = explosions.getFirstExists(false);
        explosion.reset(player.body.x, player.body.y);
        explosion.play('kaboom', 30, false, true);
        playerHp = 1;
    }
    // When the player dies
    if (lives.countLiving() < 1)
    {
        player.kill();
        enemyBullets.callAll('kill');

        stateText.text=" GAME OVER \n Refresh to \n restart";
        stateText.visible = true;

        //the "Refresh to restarter
        // game.input.onTap.addOnce(restart,this);
    }

}

function fireBullet () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(player.x, player.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;
        }

        if(lazerUpgrade == POWERUP_TYPE_LAZER_UPGRADE_1) {
            bullet = bullets.getFirstExists(false);
            bullet.reset(player.x - 15, player.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;

            bullet = bullets.getFirstExists(false);
            bullet.reset(player.x + 15, player.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;
        }
    }

}

function resetBullet (bullet) {

    //  Called if the bullet goes out of the screen
    bullet.kill();

}

function restart () {

    //  A new level starts
    
    //resets the life count
    lives.callAll('revive');
    //  And brings the aliens back from the dead :)
    enemies.removeAll();
    // createAliens();

    //revives the player
    player.revive();
    //hides the text
    stateText.visible = false;

}
