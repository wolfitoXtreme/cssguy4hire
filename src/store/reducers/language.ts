import { languages } from '@app/types/types';

import * as storeActions from '@store/actions/actions';

const initialState = {
  lang: languages.ENGLISH
};

const reducer = (
  state: { lang: string } = initialState,
  action: { type: string; value: languages }
) => {
  const changeLanguage = () => {
    return {
      ...state,
      lang: action.value
    };
  };

  const runAction = {
    [storeActions.CHANGE_LANGUAGE]: changeLanguage
  };

  if (typeof runAction[action.type] === 'function') {
    return runAction[action.type]();
  }

  return state;
};

export default reducer;
