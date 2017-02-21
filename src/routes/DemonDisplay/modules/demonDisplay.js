/**
 * Created by bigbl on 2/20/2017.
 */
import demon from '../../../data/demon.json';

// ------------------------------------
// Constants
// ------------------------------------

export function loadDemonByName (demonName) {
  return {
    type: "LOAD_DEMON_BY_NAME",
    payload: demonName
  };
}

// ------------------------------------
// Actions
// ------------------------------------

export const actions = {
  loadDemonByName,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ["LOAD_DEMON_BY_NAME"]: (state, action) => {
    const demonName = action.payload;
    const filteredDemons = demon.demons.filter((d) => d.Name === demonName);
    if (filteredDemons.length === 1) {
      return filteredDemons[0];
    }
    else {
      return state;
    }
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function demonDisplayReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
