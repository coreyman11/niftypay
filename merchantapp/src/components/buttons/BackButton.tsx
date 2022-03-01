import React, { FC, HTMLAttributes, ReactNode } from 'react';
import { BackIcon } from '../images/BackIcon';
import * as css from './BackButton.module.pcss';

export interface BackButtonProps {
    children: ReactNode;
    onClick: HTMLAttributes<HTMLButtonElement>['onClick'];
}

export const BackButton: FC<BackButtonProps> = ({ children, onClick }) => {
    return (
        <button className={css.button} type="button" onClick={onClick}>
            <BackIcon />
            {children}
        </button>
    );
};
