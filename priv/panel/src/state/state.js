import { createGlobalState } from './react-hooks-global-state';

const { GlobalStateProvider, setGlobalState, useGlobalState, getState } = createGlobalState({
  is_mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  local: {},
  backend: {}
});

export const getState2 = (key) => {
    var sl = getState();
    if (key) {
        return sl[key];
    }
    return sl;
}

export { GlobalStateProvider, setGlobalState, useGlobalState };
