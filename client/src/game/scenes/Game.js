import { EventBus } from '../EventBus'
import { Scene } from 'phaser'
import Phaser from 'phaser'

export class Game extends Scene {
  constructor() {
    super('Game')
  }

  create() {
    this.cameras.main.setBackgroundColor(0x30f0f0)
    this.player = this.add.sprite(500, 400, 'player_anim')
    var frameNames = this.textures.get('player_anim').getFrameNames()
    console.log(frameNames)
    this.anims.create({
      key: 'walk_down',
      frames: this.anims.generateFrameNumbers('player_anim', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: 2
    })
    this.anims.create({
      key: 'walk_right',
      frames: this.anims.generateFrameNumbers('player_anim', { start: 4, end: 7 }),
      frameRate: 6,
      repeat: 2
    })
    this.anims.create({
      key: 'walk_left',
      frames: this.anims.generateFrameNumbers('player_anim', { start: 8, end: 11 }),
      frameRate: 6,
      repeat: 2
    })
    this.anims.create({
      key: 'walk_up',
      frames: this.anims.generateFrameNumbers('player_anim', { start: 12, end: 15 }),
      frameRate: 6,
      repeat: 2
    })
    //creating a player
    // try {
    //   this.anims.createFromAseprite({
    //     key: 'player_anim_down',
    //     frames: 0, //this.cache.generateFrameNumbers(),
    //     frameRate: 3,
    //     repeat: -1
    //   })
    // } catch (err) {
    //   console.log(err)
    // }
    this.keyPressed = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      touch: Phaser.Input.Keyboard.KeyCodes.E
    })
    EventBus.emit('current-scene-ready', this)
  }
  movePlayerManager() {
    //Movement Logic
    if (this.keyPressed.left.isDown) {
      this.player.x -= 2.5
    } else if (this.keyPressed.right.isDown) {
      this.player.x += 2.5
    }
    if (this.keyPressed.up.isDown) {
      this.player.y -= 2.5
    } else if (this.keyPressed.down.isDown) {
      this.player.y += 2.5
    }

    //Animation logic
    if (this.keyPressed.up.isDown) {
      this.player.anims.play('walk_up', true)
    } else if (this.keyPressed.down.isDown) {
      this.player.anims.play('walk_down', true)
    } else if (this.keyPressed.left.isDown) {
      if (!this.keyPressed.up.isDown && !this.keyPressed.down.isDown) {
        this.player.anims.play('walk_left', true)
      }
    } else if (this.keyPressed.right.isDown) {
      if (!this.keyPressed.up.isDown && !this.keyPressed.down.isDown) {
        this.player.anims.play('walk_right', true)
      }
    } else {
      this.player.anims.stop()
    }

    // if (
    //   (this.keyPressed.left.isDown && this.keyPressed.up.isDown) ||
    //   (this.keyPressed.right.isDown && this.keyPressed.up.isDown)
    // ) {
    //   console.log(' L AND U')
    //   this.player.anims.play('walk_up', true)
    // } else if (
    //   (this.keyPressed.left.isDown && this.keyPressed.down.isDown) ||
    //   (this.keyPressed.right.isDown && this.keyPressed.down.isDown)
    // ) {
    //   this.player.anims.play('walk_down', true)
    // }
  }
  update() {
    this.movePlayerManager()
    if (this.keyPressed.left.isDown) {
      console.log('l')
    } else if (this.keyPressed.right.isDown) {
      console.log('r')
    }
    if (this.keyPressed.up.isDown) {
      console.log('u')
    } else if (this.keyPressed.down.isDown) {
      console.log('d')
    }
  }

  changeScene() {
    this.scene.start('GameOver')
  }
}
