import { EventBus } from '../EventBus'
import { Scene } from 'phaser'
import Phaser from 'phaser'
import Matter from 'matter-js'
export class StartScene extends Scene {
  constructor() {
    super('StartScene')
    this.viewportWidth = 1024;
    this.viewportHeight = 768;
  }

  create() {
    let { width, height } = this.sys.game.canvas; // Создаем фон, добавляем переменные высоты и ширины кадра. 
    this.cameras.main.setBackgroundColor(0x30f0f0);
    this.matter.world.setBounds(0,0,width,height,2,1,1,1,1); // Создаем мир Matter

    this.player = this.add.sprite(width/2, height/2, 'player_anim') // Создаем gameObject
    this.playerBody = this.matter.add.rectangle(this.player.x, this.player.y, this.player.width, this.player.height, { isSensor: false });
    this.matter.add.gameObject(this.player, this.playerBody);

    this.anims.create({  // Создаем анимации для игрока
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
    this.keyPressed = this.input.keyboard.addKeys({ // Создаем кнопки в Phaser.js
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      touch: Phaser.Input.Keyboard.KeyCodes.E
    })
    this.matter.world.add(this.playerBody); // Добавляем мир Matter

    this.door = this.add.sprite(width-50, height/2, 'door'); // Создаем объект двери
    this.doorHitbox = this.matter.add.rectangle(this.door.x, this.door.y, this.door.width, this.door.height, { isSensor: true });
    this.matter.add.gameObject(this.door, this.doorHitbox);

    this.matter.collision.create(this.playerBody,this.doorHitbox); 
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
    console.log(this.player.x,this.player.y)
    if(Matter.Collision.collides(this.playerBody,this.doorHitbox)!=null && Matter.Collision.collides(this.playerBody,this.doorHitbox).depth>=30){
      this.changeScene();
    }
    //
  }

  changeScene() {
    this.scene.start('GameOver')
  }
}
