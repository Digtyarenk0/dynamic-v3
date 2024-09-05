import cs from 'classnames';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './navigation.module.scss';

export type NavigationProps = {
  className?: string;
  data: Array<{
    title: string;
    link: string;
    links?: string[];
  }>;
};

const onPath = (links?: string[]) =>
  links
    ?.map((i) => {
      const is = i.indexOf(location.pathname);
      if (is === 0) {
        return true;
      }
    })
    .filter(Boolean)[0];

export const Navigation: React.FC<NavigationProps> = ({ className, data }: NavigationProps) => {
  return (
    <ul className={cs(styles.navigation, className)}>
      {data.map(({ title, link, links }) => (
        <li key={link}>
          <NavLink
            to={link}
            className={({ isActive }) => {
              const isRoot = location.pathname === '/';
              const style = isActive || (!isRoot && onPath(links)) ? styles.nav_link_active : '';
              return style;
            }}
          >
            {title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default null;
