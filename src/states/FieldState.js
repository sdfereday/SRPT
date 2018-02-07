import "pixi";
import "p2";
import Phaser from "phaser";

//// TODO: Fix the problem with the relative import urls
// Also find a nicer way to store volatile data, these aren't great.
import DSMapData from "../stubs/MapData";
import DSPlayerData from "../stubs/PlayerData";

class FieldState {
  init(params) {
    console.log("State change params:", params);
    this.sceneData = params;
  }

  preload() {}

  create() {
    console.log("Field state loaded.");

    let self = this;
    setTimeout(() => {
      self.state.start("WarpState", false, false, {
        x: 0,
        y: 0,
        id: "blahb"
      });
    }, 2000);
  }

  update() {}
}

export default FieldState;
