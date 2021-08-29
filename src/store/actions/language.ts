import { languages } from '@app/types/types';

import * as actions from './actions';

export const changeLanguage = (value: languages) => {
  return {
    type: actions.CHANGE_LANGUAGE,
    value: value
  };
};
