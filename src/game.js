import 'pixi';
import 'p2';
import Phaser from 'phaser';
// import SceneState from './states/SceneState';
import BootState from './states/BootState';
import FieldState from './states/FieldState';
import WarpState from './states/WarpState';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from './ui/UI';

import { LOCATIONS } from "./stubs/MapData";

class Game extends Phaser.Game {
  constructor() {
    // https://pacoup.com/2011/06/12/list-of-true-169-resolutions/
    super(512, 316, Phaser.AUTO, 'game', null);
    this.state.add('BootState', BootState, false);
    this.state.add('FieldState', FieldState, false);
    this.state.add('WarpState', WarpState, false);
    this.state.start('BootState', false, false);
    //this.state.add('SceneState', SceneState, false);
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
