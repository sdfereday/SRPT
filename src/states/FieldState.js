import "pixi";
import "p2";
import Phaser from "phaser";
import events from '../events/EventManager';

//// TODO: Fix the problem with the relative import urls
// Also find a nicer way to store volatile data, these aren't great.
import DSMapData from "../stubs/MapData";
import DSPlayerData from "../stubs/PlayerData";

class FieldState {
  init(params) {
    console.log("Would be useful to pass a param type for different initialisations.");
    console.log("State change params:", params);
    this.sceneData = params;
  }

  preload() {}

  create() {
    console.log("Field state loaded.");

    // Before this triggers, it'd be good to put an animation that kicks off first (don't wait for it, just set a timer),
    // but it'll make things look authentic, then the warp state just needs to be a singular animation on its own.
    events.on('onTravelRequest', (data) => {
      this.state.start("WarpState", false, false, data);
    });
  }

  update() {}
}

export default FieldState;
