import React, {memo, useEffect, useState} from "react";
import './Matador.css'
import {playApplause} from "../../applause/playApplause";
import {getFlag, setFlag} from "../../applause/applauseFlag";

interface MatadorProps {
    applause?: number,
    setMatarodPosition?: React.Dispatch<React.SetStateAction<number>>,
    matadorPosition?: number
}

const MatadorComponent = ({applause, setMatarodPosition, matadorPosition}: MatadorProps) => {

    const [bullPosition, setBullPosition] = useState(0);
    const [applauseState, setApplauseState] = useState(0)

    useEffect(() => {

        const handleBullPosition = (event: Event) => {
            if (event instanceof CustomEvent && event.type === 'bullRun') {
                setBullPosition(event.detail.position);
            }
        }
        document.addEventListener('bullRun', handleBullPosition);

        const handleUserInteract = (event: Event) => {
            if (event instanceof CustomEvent && event.type === 'interact') {
                setFlag(true);
                console.log('Enable applause');
            }
        }
        document.addEventListener('interact', handleUserInteract);

        return () => {
            document.removeEventListener('bullRun', handleBullPosition);
            document.removeEventListener('interact', handleUserInteract);
        }
    }, []);

    useEffect(() => {

        if (getFlag() && applause && applause !== 0) {
            playApplause(applause);
        }

    }, [applauseState]);


    useEffect(() => {
        if (applause) {
            setApplauseState(applause);
        }

        const changeMatadorPosition = () => {

            if (setMatarodPosition) {
                const positions = Array
                    .from({length: 8}, (_, i) => i)
                    .filter(pos => pos !== bullPosition);
                const position = positions[Math.floor(Math.random() * positions.length)];
                console.log(`Matador is moving from ${matadorPosition} to ${position}`);
                setMatarodPosition(position);
            }
        }

        console.log('Bull run to ' + bullPosition);
        if (matadorPosition === bullPosition) {
            changeMatadorPosition();
        }

    }, [bullPosition]);

    return (
        <div className='matador-container'>

        </div>
    )
}

const comparisonFunc = (oldProps: MatadorProps, currentProps: MatadorProps) => {
    return !(currentProps.applause === 3 && oldProps.applause !== currentProps.applause);
}

export const Matador = memo(MatadorComponent, comparisonFunc);