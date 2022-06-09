import { useState, useEffect } from 'react';
import { useStoreState } from '@/hooks/Hooks';
import { get } from 'lodash';
import { Character } from '@/components/games/poker';

const items = [
    ['/images/item1.svg'],
    ['/images/item1.svg'],
    ['/images/item1.svg', '/images/item1.svg', '/images/item1.svg'],
    ['/images/item1.svg', '/images/item1.svg', '/images/item1.svg'],
    ['/images/item1.svg'],
    [
        '/images/item1.svg',
        '/images/item1.svg',
        '/images/item1.svg',
        '/images/item1.svg',
        '/images/item1.svg',
    ],
];

const Avatars = () => {
    const state = useStoreState();
    const currentSeat = get(state, 'currentSeat.currentSeat', 0);

    const [iceAmount, setICEAmount] = useState(0);
    const [xpAmount, setXPAmount] = useState(0);
    const [dgAmount, setDGAmount] = useState(0);
    const [players, setPlayers] = useState<any[]>([]);

    useEffect(() => {
        setICEAmount(state.tokenAmounts.ICE_AMOUNT);
        setXPAmount(state.tokenAmounts.XP_AMOUNT);
        setDGAmount(state.tokenAmounts.DG_AMOUNT);
    }, [state.tokenAmounts]);

    useEffect(() => {
        setPlayers(Object.values(state.tableData.seats || {}));
    }, [state.tableData, state.socket.id]);

    return (
        <>
            {new Array(6).fill(0).map((data, i) => {
                const classString =
                    'characterPos' + `${Math.abs(6 - i + currentSeat) % 6}`;

                return (
                    <Character
                        key={`character_${i}`}
                        classString={classString}
                        user={i === currentSeat}
                        index={i}
                        items={items[i]}
                        ice={iceAmount}
                        xp={xpAmount}
                        dg={dgAmount}
                        data={players[i]}
                    />
                );
            })}
        </>
    );
};

export default Avatars;