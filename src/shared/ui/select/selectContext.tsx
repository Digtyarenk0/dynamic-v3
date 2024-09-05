import { createContext, useContext } from 'react';

import { UpdateSelectedOptionI } from './types';

interface ContextI {
  isHover: boolean;
  selectedOption: string;
  changeSelectedOption(p: UpdateSelectedOptionI): void;
}

const defaultState: ContextI = {
  isHover: false,
  selectedOption: '',
  changeSelectedOption: () => '',
};

const SelectContext = createContext<ContextI>(defaultState);

const useSelectContext = () => useContext(SelectContext);

export { useSelectContext, SelectContext };
