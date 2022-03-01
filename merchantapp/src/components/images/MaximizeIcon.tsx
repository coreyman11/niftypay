import React, { FC } from 'react';

export const MaximizeIcon: FC = () => {
    return (
        <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="m15 3h6v6" />
                <path d="m9 21h-6v-6" />
                <path d="m21 3-7 7" />
                <path d="m3 21 7-7" />
            </g>
        </svg>
    );
};
