function WaveManager() {
  this.waves = [];
}

WaveManager.prototype.addWave = function(spawnTimeInSeconds, enemyType, spawnPosX, spawnPosY) {
  var newWave = new Wave();
  newWave.initialize(spawnTimeInSeconds, enemyType, spawnPosX, spawnPosY);
  this.waves.push(newWave);
};

WaveManager.prototype.calculateTimers = function() {
  context = this;
  _.each(this.waves, function(wave) {
    game.time.events.add(Phaser.Timer.SECOND * wave.spawnTimeInSeconds, context.spawnEnemey, wave);
  });
};

WaveManager.prototype.spawnEnemey = function() {
  var enemy = new Enemy();
  enemy.initialize(this.spawnPos.x, this.spawnPos.y, this.enemyType, enemyBullets);
  enemies.push(enemy);
  livingEnemies += 1;
};

function Wave() {
  this.spawnTimeInSeconds = null;
  this.enemyType = null;
  this.spawnPos = {
    x: 0,
    y: 0
  };
}

Wave.prototype.initialize = function(spawnTimeInSeconds, enemyType, spawnPosX, spawnPosY) {
  this.spawnTimeInSeconds = spawnTimeInSeconds;
  this.enemyType = enemyType;
  this.spawnPos.x = spawnPosX;
  this.spawnPos.y = spawnPosY;
};

function Enemy() {
  this.enemyType = null;
  this.position = {
    x: 0,
    y: 0
  };
  this.hp = 1;
  this.context = null;
  this.enObj = null;
  this.dead = false;
  // this.tween = null;
}

var ENEMY_TYPE_A = 'a';
var ENEMY_TYPE_B_POS = 'b_pos';
var ENEMY_TYPE_B_NEG = 'b_neg';
var ENEMY_TYPE_C = 'c';
var ENEMY_TYPE_BOSS_1 = 'boss1';

Enemy.prototype.initialize = function(spawnPosX, spawnPosY, enemyType, bullets) {
  this.enemyType = enemyType;
  this.position.x = spawnPosX;
  this.position.y = spawnPosY;
  this.context = game.add.group();
  this.context.enableBody = true;
  this.context.physicsBodyType = Phaser.Physics.ARCADE;

  this.bullets = bullets;
  this.fireRate = 1000;
  this.nextFire = game.time.now + this.fireRate;
  this.fireChunk = 0;

  this.enObj = this.context.create(this.position.x, this.position.y, 'invader');
  this.enObj.anchor.setTo(0.5, 0.5);
  // console.log(this.enObj);
  this.enObj.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
  this.enObj.play('fly');
  if (this.enemyType != ENEMY_TYPE_BOSS_1) {
    this.enObj.body.moves = true;
  } else {
    this.enObj.body.moves = true;
  }

  // base this on enemy type
  if(this.enemyType == ENEMY_TYPE_A) {
    this.enObj.body.velocity.y = 100;
  } else if (this.enemyType == ENEMY_TYPE_B_POS) {
    this.enObj.body.velocity.x = 75;
    this.enObj.body.velocity.y = 100;
  } else if (this.enemyType == ENEMY_TYPE_B_NEG) {
    this.enObj.body.velocity.x = -75;
    this.enObj.body.velocity.y = 100;
  } else if (this.enemyType == ENEMY_TYPE_C) {
    this.enObj.body.velocity.x = 0;
    this.enObj.body.velocity.y = 30;
    this.hp = 12;
  } else if (this.enemyType == ENEMY_TYPE_BOSS_1) {
    console.log("Hi");
    this.hp = 30;
    this.tween = game.add.tween(this.enObj).to( { x: 550 }, 3500, Phaser.Easing.Linear.None, true, 0, 1000, true);
    
    // this.tween.onLoop.add(this.descend, this);  
  }
  // //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
  // this.tween = game.add.tween(this.enObj).to( { y: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
  // this.tween.onLoop.add(this.descend, this);

  //  Create our Timer
  // timer = game.time.create(false);

  // //  Set a TimerEvent to occur after 2 seconds
  // timer.loop(2000, this.enemyFires, this);

  // //  Start the timer running - this is important!
  // //  It won't start automatically, allowing you to hook it to button events and the like.
  // timer.start();
  // console.log(this);
  // game.time.events.repeat(Phaser.Timer.SECOND * 1, this.enemyFires, this);
  return this;
};

Enemy.prototype.update = function () {
  if (game.time.now > this.nextFire && this.bullets.countDead() > 0 && !this.dead && !this.enemyType == ENEMY_TYPE_C)
    {
      this.nextFire = game.time.now + this.fireRate;

      var bullet = this.bullets.getFirstDead();

      bullet.reset(this.enObj.body.x + 15, this.enObj.body.y + 40);

      // bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 500);
      game.physics.arcade.moveToObject(bullet,player,200);
    }

  if (this.enemyType == ENEMY_TYPE_C && !this.dead) {

    if (this.enObj.position.y >= 400) {
      this.enObj.body.velocity.y = 0;
    }

    if (game.time.now > this.nextFire && this.bullets.countDead() > 0) {
      if (this.fireChunk < 3) {
        this.nextFire = game.time.now + 100;
        this.fireChunk ++;
      } else {
        this.nextFire = game.time.now + 3000;
        this.fireChunk = 0;
      }
      var bullet = this.bullets.getFirstDead();

      bullet.reset(this.enObj.body.x + 15, this.enObj.body.y + 40);

      game.physics.arcade.moveToObject(bullet,player,500);
    }
  }
};

Enemy.prototype.stopFiring = function() {
  this.dead = true;
};
