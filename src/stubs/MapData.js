export const LOCATION_TYPE = {
  0: 'COMMERCE',
  1: 'RESOURCE',
  2: 'MILITARY',
  3: 'RESIDENTIAL',
  4: 'HOSTILE'
};

// DATA AREA
// Default location is anywhere that isn't found in locations list, and its coordinates can be generated
// when the ship has left warp. 0 is just a placeholder.
export const DEFAULT_LOCATION = {
  id: "unknown",
  x: 0,
  y: 0,
  meta: {
    name: "Unknown Quadrant",
    type: LOCATION_TYPE.HOSTILE
  }
};

// Assume light years for now :P
export const LOCATIONS = [
  {
    id: "loc-1",
    x: 100,
    y: 2,
    meta: {
      name: "Erebus Terminal",
      type: LOCATION_TYPE.COMMERCE
    }
  },
  {
    id: "loc-2",
    x: 1,
    y: 1,
    meta: {
      name: "Novis Alpha",
      type: LOCATION_TYPE.RESIDENTIAL
    }
  },
  {
    id: "loc-3",
    x: 200,
    y: 300,
    meta: {
      name: "Helios Prime",
      type: LOCATION_TYPE.RESOURCE
    }
  },
  {
    id: "loc-4",
    x: 300,
    y: 100,
    meta: {
      name: "Mythos Base",
      type: LOCATION_TYPE.MILITARY
    }
  }
];
