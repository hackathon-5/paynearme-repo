function PowerUp() {
  // this
  this.sprite = null;
  this.position = {
    x: 0,
    y: 0
  };
}

PowerUp.prototype.initialize = function(spawnPosX, spawnPosY) {
  // console.log("hi");
  this.position.x = spawnPosX;
  this.position.y = spawnPosY;
  this.sprite = game.add.sprite(spawnPosX, spawnPosY, 'health');
  this.sprite.enableBody = true;
  this.sprite.anchor.setTo(0.5, 0.5);
  game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  this.sprite.body.collideWorldBounds = true;
  this.sprite.body.velocity.y = 50;
  this.sprite.body.velocity.x = 0;
  // var shields = shield.animations.add('shields');

};