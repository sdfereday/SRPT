export const PlayerData = {
  x: 0,
  y: 0,
  currentLocation: null,

  setCurrentLocation({ x, y, id }) {
    if (id === this.currentLocation) {
      console.info("Already at that location.");
      return;
    }
    this.x = x;
    this.y = y;
    this.currentLocation = id;
  },

  getCurrentLocation() {
    return {
      id: this.currentLocation,
      x: this.x,
      y: this.y
    };
  }
};
