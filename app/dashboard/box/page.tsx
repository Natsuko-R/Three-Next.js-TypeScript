"use client"

import React, { useState } from 'react';
import BoxScene from './components/BoxScene';
import BoxInfo from './components/BoxInfo';
import Popover from './components/Popover';

const boxes: BoxInfo[] = [
    { id: 1, name: 'Box 1' },
    { id: 2, name: 'Box 2' },
    { id: 3, name: 'Box 3' },
    { id: 4, name: 'Box 4' },
    { id: 5, name: 'Box 5' },
];

const IndexPage: React.FC = () => {
    const [selectedBox, setSelectedBox] = useState<BoxInfo | null>(null);

    const handleBoxClick = (box: BoxInfo) => {
        setSelectedBox(box);
    };

    return (
        <div>
            <BoxScene boxes={boxes} onBoxClick={handleBoxClick} />
            <Popover box={selectedBox} />
        </div>
    );
};

export default IndexPage

