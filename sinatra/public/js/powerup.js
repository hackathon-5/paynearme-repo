var POWERUP_TYPE_HEALTH = 'health';
var POWERUP_TYPE_LAZER_UPGRADE_1 = 'star';
function PowerUp() {
  // this
  this.powerUpType = 'health';
  this.sprite = null;
  this.position = {
    x: 0,
    y: 0
  };
}

PowerUp.prototype.initialize = function(spawnPosX, spawnPosY, powerUpType) {
  // console.log("hi");
  this.position.x = spawnPosX;
  this.position.y = spawnPosY;
  this.powerUpType = powerUpType;
  this.sprite = game.add.sprite(spawnPosX, spawnPosY, powerUpType);
  this.sprite.enableBody = true;
  this.sprite.anchor.setTo(0.5, 0.5);
  game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  this.sprite.body.collideWorldBounds = true;
  this.sprite.body.velocity.y = 50;
  this.sprite.body.velocity.x = 0;
  // var shields = shield.animations.add('shields');

};