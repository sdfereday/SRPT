import 'pixi';
import 'p2';
import Phaser from 'phaser';

//// TODO: Fix the problem with the relative import urls
// Also find a nicer way to store volatile data, these aren't great.
import DSMapData from "../stubs/MapData";
import DSPlayerData from "../stubs/PlayerData";

class GameState {
  init(params) {
    console.log("State change params:", params);
    this.sceneData = params;
  }

  preload() {

  }

  create() {
    console.log("Warp state loaded.");
  }

  update() {

    if (this.isDone) {
      return;
    }
    // Not overly immutable, might want to fix that somehow. In fact,
    // may want to just pass in what you want to affect such is functional.
    this.data.p1.x += this.data.p2.x > this.data.p1.x ? 1 : -1;
    this.data.p1.y += this.data.p2.y > this.data.p1.y ? 1 : -1;
    // Exposing this publically will allow the UI, etc to use it for something.
    let loc = distanceApprox(this.data.p1, this.data.p2);
    if (loc <= 0) {
      this.isDone = true;
      // Trigger something to change states...
      // events.trigger('onArrived', this.data.p2);
    } else {
        console.log("Travelling...");
    }

  }

}

export default GameState;
