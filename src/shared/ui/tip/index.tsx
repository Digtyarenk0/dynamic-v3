import Tippy from '@tippyjs/react';
import classNames from 'classnames';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { ReactElement } from 'react';

import styles from './tip.module.scss';

import './tool-tip.css';

export interface TipProps {
  children: ReactElement;
  content?: ReactElement | string | null;
}

export const Tip = ({ children, content }: TipProps) => (
  <Tippy
    className={classNames(styles.tip, content === null && 'hidden')}
    placement="top"
    content={content}
    interactive
    arrow
    animation="shift-away"
  >
    {children}
  </Tippy>
);
