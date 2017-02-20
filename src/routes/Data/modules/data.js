import demon from '../../../data/demon.json';

// ------------------------------------
// Constants
// ------------------------------------

const getLevelLabels = (demons) => {
  // find and min max level
  let min = 1;
  let max = 99;

  // generate label list
  let levels = [];
  for (var i=min; i<=max; i++) {
    levels.push(i.toString());
  }

  return levels;
};

const getStatsByLevel = (demons, statName) => {
  const results = demons.filter((demon) => {
    return demon.Level <= 100;
  }).map((demon) => {
    return {
      x: demon.Level,
      y: demon[statName],
    };
  });

  return results;
};

const getValuesForLevel = (demons, levelLabels, statName) => {
  // create empty array for each level
  let fullData = {};
  levelLabels.forEach((l) => {
    fullData[l] = [];
  });

  // go through each demon and categorize the level
  demons.forEach((d) => {
    if (fullData[d.Level.toString()]) fullData[d.Level.toString()].push(d[statName]);
  });

  return fullData;
};

const getAverageValueForLevel = (levelValues) => {
  // go through and get the average for each level
  let results = {};
  Object.keys(levelValues).forEach((key) => {
    const values = levelValues[key];
    let sum = 0;
    values.forEach((v) => {
      sum += v;
    });

    const avg = sum / values.length;
    results[key] = isNaN(avg) ? 0 : sum / values.length;
  });

  return results;
};

const convertToArray = (values) => {
  let results = [];
  Object.keys(values).forEach((key) => {
    results[parseInt(key)] = values[key];
  });
  return results;
};

const getMovingAverage = (data, legSize) => {
  // get the moving average 1-1 with the data by gradually increasing the window size
  let results = [];

  // verify that the windowSize works with the length of data passed in
  if ((legSize * 2 + 1) > data.length) {
    return data;
  };

  // get the data from the beginning
  for (var i=1; i<=legSize; i++) {
    let currentValue = 0;
    for (var j=1; j <= i * 2; j++) {
      currentValue += parseFloat(data[j]);
    }
    results[i] = currentValue / (i * 2);
  }

  // get the middle data
  for (var i=legSize + 1; i < data.length - legSize; i++) {
    let currentValue = 0;
    for (var j=i - legSize; j <= i + legSize; j++) {
      currentValue += data[j];
    }
    results[i] = currentValue / (legSize * 2 + 1)
  }

  // get the end data
  for (var i=data.length - legSize; i<data.length; i++) {
    let currentValue = 0;
    for (var j=i - (data.length - i - 1); j < data.length; j++) {
      currentValue += data[j];
    }
    results[i] = currentValue / ((data.length - i - 1) * 2 + 1);
  }

  return results;
};

const getMeanAbsoluteDeviation = (values, centralValue) => {
  // Take in a list of numbers and get the mean absolute deviation
  let count = values.length;

  let fullValues = 0;
  values.forEach((value) => {
    fullValues += Math.abs(value - centralValue);
  });

  return fullValues / count;
};

export function loadStatsByLevel (statName) {
  return {
    type: "LOAD_STATS_BY_LEVEL",
    payload: statName
  };
}

export function loadLevelLabels () {
  return {
    type: "LOAD_LEVEL_LABELS",
    payload: {}
  };
}

export function loadMovingAvgStats (statName) {
  return {
    type: "LOAD_MOVING_AVG_STATS",
    payload: statName
  }
}

// ------------------------------------
// Actions
// ------------------------------------

export const actions = {
  loadMovingAvgStats,
  loadLevelLabels,
  loadStatsByLevel
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ["LOAD_LEVEL_LABELS"]: (state, action) => {
    if (state.levelLabels.length === 0) {
      // only load if it hasn't been loaded yet
      return Object.assign({}, state, {
        levelLabels: getLevelLabels(demon.demons),
      });
    }
    else {
      return state;
    }
  },
  ["LOAD_STATS_BY_LEVEL"]: (state, action) => {
    const statName= action.payload;
    if (!state.statsByLevel[statName]) {
      // only load if this stat hasn't been loaded
      const demons = demon.demons;
      const values = getStatsByLevel(demons, statName);

      return Object.assign({}, state, {
        statsByLevel: {
          ...state.statsByLevel,
          [statName]: values
        }
      })
    }
    else {
      return state;
    }
  },
  ["LOAD_MOVING_AVG_STATS"]: (state, action) => {
    const statName = action.payload;
    if (!state.movingAverages[statName]) {
      // only load if this stat hasn't been loaded
      const demons = demon.demons;
      const values = getValuesForLevel(demons, state.levelLabels, statName);

      // Get average values for each stat
      const avg = getAverageValueForLevel(values);

      // Convert each set of data to an array
      const array = convertToArray(avg);

      // Get a moving average for each state
      const movingAvg = getMovingAverage(array, 2);

      return Object.assign({}, state, {
        movingAverages: {
          ...state.movingAverages,
          [statName]: movingAvg
        }
      });
    }
    else {
      return state;
    }
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  levelLabels: [],
  movingAverages: {},
  statsByLevel: {},
};
export default function dataReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
