import { EventBus } from '../EventBus'
import { Scene } from 'phaser'
import Phaser from 'phaser'

export class Game extends Scene {
  constructor() {
    super('Game')
  }

  create() {
    this.cameras.main.setBackgroundColor(0x30f0f0)
    this.player = this.add.image(500, 400, 'skeleton') //creating a player
    this.keyPressed = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    })
    EventBus.emit('current-scene-ready', this)
  }
  movePlayerManager() {
    if (this.keyPressed.left.isDown) {
      this.player.x -= 2.5
    } else if (this.keyPressed.right.isDown) {
      this.player.x += 2.5
    }
    if (this.keyPressed.up.isDown) {
      this.player.y -= 2.5
    } else if (this.keyPressed.down.isDown) {
      this.player.y += 2.5
    } //else console.log('Nothing was pressed')
  }
  update() {
    this.movePlayerManager()
  }

  changeScene() {
    this.scene.start('GameOver')
  }
}
