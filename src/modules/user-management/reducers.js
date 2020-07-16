import * as constants from './constants';

const initialState = {
  mins: [
    { id: '9192127582', type: 'dealer', selected: false, default: false },
    { id: '9194282582', type: 'dealer', selected: true, default: false },
    { id: '9197581829', type: 'dealer', selected: true, default: true },
    { id: '9991285919', type: 'retailer', selected: false, default: false },
    { id: '9198192502', type: 'retailer', selected: true, default: true },
    { id: '9181212498', type: 'retailer', selected: true, default: false },
    { id: '9191236786', type: 'dealer', selected: false, default: false },
    { id: '9191231222', type: 'retailer', selected: false, default: false },
    { id: '9192281958', type: 'dealer', selected: false, default: false },
    { id: '9201987239', type: 'retailer', selected: true, default: false },
  ],
};

const minReducers = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_DEFAULT_MIN:
      const type = state.mins.find((min) => action.id === min.id).type;

      return {
        ...state,
        mins: state.mins.map((min) => {
          if (min.type !== type) return min;
          return {
            ...min,
            default: min.id === action.id,
          };
        }),
      };

    case constants.TOGGLE_MIN_SELECT:
      let mins = state.mins
        .map((min) => ({
          ...min,
          selected: min.id === action.id ? !min.selected : min.selected,
          default:
            min.id === action.id ? min.default && !min.selected : min.default,
        }))
        .reduce((r, min, _, a) => {
          const type = a.find((min) => action.id === min.id).type;
          const noDefaults =
            a.filter((m) => m.type === type).every((m) => !m.default) &&
            r.filter((m) => m.type === type).every((m) => !m.default);
          const newMin = {
            ...min,
            default:
              min.type === type && noDefaults && min.selected
                ? true
                : min.default,
          };
          return r.concat([newMin]);
        }, []);

      return { ...state, mins };

    default:
      return state;
  }
};

export default minReducers;
