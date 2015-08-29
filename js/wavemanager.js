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
    // console.log(wave);
    game.time.events.add(Phaser.Timer.SECOND * wave.spawnTimeInSeconds, context.spawnEnemey, wave);
  });
};

WaveManager.prototype.spawnEnemey = function() {
  // console.log(wave);
  console.log("hi");
  console.log(this);
  var enemey = new Enemey();
  enemey.initialize(this.spawnPos.x, this.spawnPos.y, this.enemyType);
  // // The enemy's bullets
  // enemyBullets = game.add.group();
  // enemyBullets.enableBody = true;
  // enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
  // enemyBullets.createMultiple(30, 'enemyBullet');
  // enemyBullets.setAll('anchor.x', 0.5);
  // enemyBullets.setAll('anchor.y', 1);
  // enemyBullets.setAll('outOfBoundsKill', true);
  // enemyBullets.setAll('checkWorldBounds', true);  
};

WaveManager.prototype.enemyFires = function() {

    // //  Grab the first bullet we can from the pool
    // enemyBullet = enemyBullets.getFirstExists(false);

    // livingEnemies.length=0;

    // aliens.forEachAlive(function(alien){

    //     // put every living enemy in an array
    //     livingEnemies.push(alien);
    // });


    // if (enemyBullet && livingEnemies.length > 0)
    // {
        
    //     var random=game.rnd.integerInRange(0,livingEnemies.length-1);

    //     // randomly select one of them
    //     var shooter=livingEnemies[random];
    //     // And fire the bullet from this enemy
    //     enemyBullet.reset(shooter.body.x, shooter.body.y);

    //     game.physics.arcade.moveToObject(enemyBullet,player,120);
    //     firingTimer = game.time.now + 2000;
    // }

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

function Enemey() {
  this.enemyType = null;
  this.position = {
    x: 0,
    y: 0
  };
  this.context = null;
  this.enObj = null;
  this.tween = null;
}

Enemey.prototype.initialize = function(spawnPosX, spawnPosY, enemyType) {
  this.enemyType = enemyType;
  this.position.x = spawnPosX;
  this.position.y = spawnPosY;
  this.context = game.add.group();
  this.context.enableBody = true;
  this.context.physicsBodyType = Phaser.Physics.ARCADE;

  this.enObj = this.context.create(this.position.x, this.position.y, this.enemyType);
  this.enObj.anchor.setTo(0.5, 0.5);
  // console.log(this.enObj);
  this.enObj.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
  this.enObj.play('fly');
  this.enObj.body.moves = false;

  // //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
  this.tween = game.add.tween(this.enObj).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
  this.tween.onLoop.add(this.descend, this);
};

Enemey.prototype.descend = function() {
  console.log(this);
  this.y += 10;
};