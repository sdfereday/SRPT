import 'pixi';
import 'p2';
import Phaser from 'phaser';

//// TODO: Fix the problem with the relative import urls
// Also find a nicer way to store volatile data, these aren't great.
import DSMapData from "../stubs/MapData";
import DSPlayerData from "../stubs/PlayerData";

class GameState {
  init(params) {
    // Because you 'might' want to load the same map but run a different scene, we keep
    // the two separated.
    console.log("State change params:", params);
    this.sceneData = params;
  }

  render() {
    // this.game.debug.bodyInfo(this.hero, 32, 32);
    // this.game.debug.body(this.hero);
    // this.game.debug.bodyInfo(this.hero.activeWeapon, 32, 32);
    // this.game.debug.body(this.hero.activeWeapon);
    // this.enemies.children.forEach((e) => {
    //     this.game.debug.bodyInfo(e.activeWeapon, 32, 32);
    //     this.game.debug.body(e.activeWeapon);
    // });
  }

  preload() {
    // scale the game 4x
    this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.game.scale.setUserScale(6, 6);

    // enable crisp rendering
    this.game.renderer.renderSession.roundPixels = true;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

    // this.game.load.spritesheet('player', 'resources/Game/player.png', 128, 128, 20);
    // this.game.load.spritesheet('enemy', 'resources/Game/enemy.png', 128, 128, 20);

    this.game.load.image("ground", "/assets/gfx/ground.png");
    this.game.load.image("player", "/assets/gfx/player.png");
  }

  create() {
    // Populate things
    this.player = this.game.add.sprite(
      this.game.width / 2,
      this.game.height / 2,
      "player"
    );
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.collideWorldBounds = true;

    // Listen to events
    //events.subscribe("onTravelRequest", this.onTravelRequest.bind(this));
    //events.subscribe("onArrived", this.onArrived.bind(this));

    // Finally, enable camera
    this.game.camera.follow(this.hero, Phaser.Camera.FOLLOW_TOPDOWN);
  }

  update() {
    // ...
  }

  onTravelRequest({ nextLocationId }) {
    console.log("Game state received signal.", nextLocationId);
    const loc = findLocationById(nextLocationId, LOCATIONS);

    if (player.currentLocation.id === nextLocationId) {
      console.error("The players position was never updated.");
      return;
    }

    if (loc) {
      console.log("Go to:", loc);
      const p1 = player.getCurrentLocation();
      const p2 = {
        id: loc.id,
        x: loc.x,
        y: loc.y
      };
      stateManager.push(warpState, {
        p1,
        p2
      });
      //events.trigger("onTravelStarted");
    }
  }

  onArrived(loc) {
    player.setCurrentLocation(loc);
    stateManager.push(fieldState);
  }
}

export default GameState;
