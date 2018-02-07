import 'pixi';
import 'p2';
import Phaser from 'phaser';
// import SceneState from './states/SceneState';
// import GameState from './states/GameState';
import FieldState from './states/FieldState';
import WarpState from './states/WarpState';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from './ui/UI';

import { LOCATIONS } from "./stubs/MapData";

class Game extends Phaser.Game {
  constructor() {
    // These probably won't stay here
    // events.add('onTravelRequest');
    // events.add('onTravelStarted');
    // events.add('onArrived');
    // https://pacoup.com/2011/06/12/list-of-true-169-resolutions/
    super(128, 128, Phaser.AUTO, 'game', null);
    //this.state.add('SceneState', SceneState, false);
    //this.state.add('GameState', GameState, false);
    this.state.add('FieldState', FieldState, false);
    this.state.add('WarpState', WarpState, false);
    this.state.start('FieldState', false, false, {
         x: 0,
         y: 0,
         id: 'blahb'
    });
    // this.state.start('SceneState', false, false, {
    //   useMapId: 'introduction',
    //   useSceneId: 'scene-2'
    // });
  }
}

new Game();

// Boostrap UI
ReactDOM.render(
  <AppContainer locations={LOCATIONS} />,
  document.getElementById('ui')
);
