import Phaser from 'phaser'

export class Player extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y) {
    super(scene.matter.world, x, y, 'player_anim');

    this.scene = scene;
    scene.add.existing(this);
    //this.scene.physics.add.existing(this);
    const body = scene.matter.add.rectangle(x, y, this.width, this.height, { isSensor: false });
    this.setExistingBody(body);
    this.createAnimations();
    this.setUpKeyboardInput();
  }

  createAnimations() {
    this.scene.anims.create({
      key: 'walk_down',
      frames: this.scene.anims.generateFrameNumbers('player_anim', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: 2
    })
    this.scene.anims.create({
      key: 'walk_right',
      frames: this.scene.anims.generateFrameNumbers('player_anim', { start: 4, end: 7 }),
      frameRate: 6,
      repeat: 2
    })
    this.scene.anims.create({
      key: 'walk_left',
      frames: this.scene.anims.generateFrameNumbers('player_anim', { start: 8, end: 11 }),
      frameRate: 6,
      repeat: 2
    })
    this.scene.anims.create({
      key: 'walk_up',
      frames: this.scene.anims.generateFrameNumbers('player_anim', { start: 12, end: 15 }),
      frameRate: 6,
      repeat: 2
    })
  }

  setUpKeyboardInput() {
    this.keyPressed = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      touch: Phaser.Input.Keyboard.KeyCodes.E
    })
  }

  update() {
    this.movePlayerManager();
  }

  movePlayerManager() {
    //Movement Logic
    if (this.keyPressed.left.isDown) {
      this.x -= 2.5
    } else if (this.keyPressed.right.isDown) {
      this.x += 2.5
    }
    if (this.keyPressed.up.isDown) {
      this.y -= 2.5
    } else if (this.keyPressed.down.isDown) {
      this.y += 2.5
    }

    //Animation logic
    if (this.keyPressed.up.isDown) {
      this.anims.play('walk_up', true)
    } else if (this.keyPressed.down.isDown) {
      this.anims.play('walk_down', true)
    } else if (this.keyPressed.left.isDown) {
      if (!this.keyPressed.up.isDown && !this.keyPressed.down.isDown) {
        this.anims.play('walk_left', true)
      }
    } else if (this.keyPressed.right.isDown) {
      if (!this.keyPressed.up.isDown && !this.keyPressed.down.isDown) {
        this.anims.play('walk_right', true)
      }
    } else {
      this.anims.stop()
    }
  }
  sleep(){
    this.keyPressed.up.reset();
    this.keyPressed.down.reset();
    this.keyPressed.left.reset();
    this.keyPressed.right.reset();
  }
}
