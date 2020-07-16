import * as constants from './constants';

export const setDefaultMin = (id) => ({
  type: constants.SET_DEFAULT_MIN,
  id,
});

export const getMins = () => ({
  type: constants.GET_MINS,
});

export const toggleMinSelect = (id) => ({
  type: constants.TOGGLE_MIN_SELECT,
  id
});
