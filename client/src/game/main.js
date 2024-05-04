import { Boot } from "./scenes/Boot";
import { StartScene } from "./scenes/StartScene";
import { GameOver } from "./scenes/GameOver";
import { MainMenu } from "./scenes/MainMenu";
import Phaser from "phaser";
import { Preloader } from "./scenes/Preloader";

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: "game-container",
  backgroundColor: "#028af8",
  scene: [Boot, Preloader, MainMenu, StartScene, GameOver],
  physics: {
    default: "matter",
    matter: {
      debug: true,
      gravity: { y: 0 },
    },
  },
  scale: {
    //mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "game-container",
    width: window.innerWidth,
    height: window.innerHeight,
  },
};

const StartGame = (parent) => {
  return new Phaser.Game({ ...config, parent: parent });
};

export default StartGame;
