var enemyWaves = [
  // Wave 1 - 3 left row
  { spawnTimer: 1,
    enemyType: 'a',
    xPosition: 50,
    yPosition: 0 },

  { spawnTimer: 1,
    enemyType: 'a',
    xPosition: 140,
    yPosition: 0 },

  { spawnTimer: 1,
    enemyType: 'a',
    xPosition: 230,
    yPosition: 0 },

  // Wave 2 - 3 right row
  { spawnTimer: 5,
    enemyType: 'a',
    xPosition: 550,
    yPosition: 0 },

  { spawnTimer: 5,
    enemyType: 'a',
    xPosition: 460,
    yPosition: 0 },

  { spawnTimer: 5,
    enemyType: 'a',
    xPosition: 370,
    yPosition: 0 },

  // Wave 3 - 4 left column
  { spawnTimer: 10,
    enemyType: 'a',
    xPosition: 100,
    yPosition: 0 },

  { spawnTimer: 11,
    enemyType: 'a',
    xPosition: 100,
    yPosition: 0 },

  { spawnTimer: 12,
    enemyType: 'a',
    xPosition: 100,
    yPosition: 0 },

  { spawnTimer: 13,
    enemyType: 'a',
    xPosition: 100,
    yPosition: 0 },

  // Wave 4 - 4 right column
  { spawnTimer: 12,
    enemyType: 'a',
    xPosition: 500,
    yPosition: 0 },

  { spawnTimer: 13,
    enemyType: 'a',
    xPosition: 500,
    yPosition: 0 },

  { spawnTimer: 14,
    enemyType: 'a',
    xPosition: 500,
    yPosition: 0 },

  { spawnTimer: 15,
    enemyType: 'a',
    xPosition: 500,
    yPosition: 0 },

  // Wave 5 - 5 full row
  { spawnTimer: 18,
    enemyType: 'a',
    xPosition: 100,
    yPosition: 0 },

  { spawnTimer: 18,
    enemyType: 'a',
    xPosition: 200,
    yPosition: 0 },

  { spawnTimer: 18,
    enemyType: 'a',
    xPosition: 300,
    yPosition: 0 },

  { spawnTimer: 18,
    enemyType: 'a',
    xPosition: 400,
    yPosition: 0 },

  { spawnTimer: 18,
    enemyType: 'a',
    xPosition: 500,
    yPosition: 0 },

  // Wave 6 - Diamond
  { spawnTimer: 23,
    enemyType: 'a',
    xPosition: 300,
    yPosition: 0 },

  { spawnTimer: 24.5,
    enemyType: 'a',
    xPosition: 250,
    yPosition: 0 },

  { spawnTimer: 24.5,
    enemyType: 'a',
    xPosition: 350,
    yPosition: 0 },

  { spawnTimer: 26,
    enemyType: 'a',
    xPosition: 200,
    yPosition: 0 },

  { spawnTimer: 26,
    enemyType: 'a',
    xPosition: 400,
    yPosition: 0 },

  { spawnTimer: 27.5,
    enemyType: 'a',
    xPosition: 150,
    yPosition: 0 },

  { spawnTimer: 27.5,
    enemyType: 'a',
    xPosition: 450,
    yPosition: 0 },

  { spawnTimer: 29,
    enemyType: 'a',
    xPosition: 100,
    yPosition: 0 },

  { spawnTimer: 29,
    enemyType: 'a',
    xPosition: 500,
    yPosition: 0 },

  { spawnTimer: 30.5,
    enemyType: 'a',
    xPosition: 150,
    yPosition: 0 },

  { spawnTimer: 30.5,
    enemyType: 'a',
    xPosition: 450,
    yPosition: 0 },

  { spawnTimer: 32,
    enemyType: 'a',
    xPosition: 200,
    yPosition: 0 },

  { spawnTimer: 32,
    enemyType: 'a',
    xPosition: 400,
    yPosition: 0 },

  { spawnTimer: 33.5,
    enemyType: 'a',
    xPosition: 250,
    yPosition: 0 },

  { spawnTimer: 33.5,
    enemyType: 'a',
    xPosition: 350,
    yPosition: 0 },

  { spawnTimer: 35,
    enemyType: 'a',
    xPosition: 300,
    yPosition: 0 },

  // Wave 8 - X
  { spawnTimer: 40,
    enemyType: 'a',
    xPosition: 100,
    yPosition: 0 },

  { spawnTimer: 40,
    enemyType: 'a',
    xPosition: 500,
    yPosition: 0 },

  { spawnTimer: 41.5,
    enemyType: 'a',
    xPosition: 150,
    yPosition: 0 },

  { spawnTimer: 41.5,
    enemyType: 'a',
    xPosition: 450,
    yPosition: 0 },

  { spawnTimer: 43,
    enemyType: 'a',
    xPosition: 200,
    yPosition: 0 },

  { spawnTimer: 43,
    enemyType: 'a',
    xPosition: 400,
    yPosition: 0 },

  { spawnTimer: 44.5,
    enemyType: 'a',
    xPosition: 250,
    yPosition: 0 },

  { spawnTimer: 44.5,
    enemyType: 'a',
    xPosition: 350,
    yPosition: 0 },

  { spawnTimer: 46,
    enemyType: 'a',
    xPosition: 300,
    yPosition: 0 },

  { spawnTimer: 47.5,
    enemyType: 'a',
    xPosition: 250,
    yPosition: 0 },

  { spawnTimer: 47.5,
    enemyType: 'a',
    xPosition: 350,
    yPosition: 0 },

  { spawnTimer: 49,
    enemyType: 'a',
    xPosition: 200,
    yPosition: 0 },

  { spawnTimer: 49,
    enemyType: 'a',
    xPosition: 400,
    yPosition: 0 },

  { spawnTimer: 50.5,
    enemyType: 'a',
    xPosition: 150,
    yPosition: 0 },

  { spawnTimer: 50.5,
    enemyType: 'a',
    xPosition: 450,
    yPosition: 0 },

  { spawnTimer: 52,
    enemyType: 'a',
    xPosition: 100,
    yPosition: 0 },

  { spawnTimer: 52,
    enemyType: 'a',
    xPosition: 500,
    yPosition: 0 },

  { spawnTimer: 55,
    enemyType: 'b_pos',
    xPosition: 100,
    yPosition: 0 },

  { spawnTimer: 55,
    enemyType: 'b_neg',
    xPosition: 500,
    yPosition: 0 },

];

    // waveManager.addWave();
    // waveManager.addWave(1, 'a', 400, 0);

    // waveManager.addWave(1, 'b_pos', 0, 0);
    // waveManager.addWave(2, 'b_pos', 0, 0);
    // waveManager.addWave(3, 'b_pos', 0, 0);
    // waveManager.addWave(4, 'b_pos', 0, 0);
    // waveManager.addWave(1.5, 'b_neg', game.world.width, 0);
    // waveManager.addWave(2.5, 'b_neg', game.world.width, 0);
    // waveManager.addWave(3.5, 'b_neg', game.world.width, 0);
    // waveManager.addWave(4.5, 'b_neg', game.world.width, 0);

    // waveManager.addWave(1, 'b_neg', 0, 0);
    // waveManager.addWave(1.5, 'a', 100, 0);
    // waveManager.addWave(1.5, 'a', 400, 0);
    // waveManager.addWave(2, 'a', 100, 0);
    // waveManager.addWave(2, 'a', 400, 0);
    // waveManager.addWave(2.5, 'a', 100, 0);
    // waveManager.addWave(2.5, 'a', 400, 0);
    // waveManager.addWave(3, 'a', 100, 0);
    // waveManager.addWave(3, 'a', 400, 0);
