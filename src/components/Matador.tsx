import React, {memo, useEffect, useState} from "react";

interface MatadorProps {
    applause?: number,
    setMatarodPosition?: React.Dispatch<React.SetStateAction<number>>,
    matadorPosition?: number
}

const MatadorComponent = ({applause, setMatarodPosition, matadorPosition}: MatadorProps) => {

    const [bullPosition, setBullPosition] = useState(0);

    useEffect(() => {

        const handleBullPosition = (event: Event) => {
            {
                if (event instanceof CustomEvent) {
                    setBullPosition(event.detail.position);
                }
            }
        }

        document.addEventListener('bullRun', handleBullPosition);

        return () => {
            document.removeEventListener('bullRun', handleBullPosition);
        }

    }, []);

    useEffect(() => {

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

        if (matadorPosition === bullPosition) {
            changeMatadorPosition();
        }

        console.log('Bull position: ' + bullPosition);
        console.log('Applause: ' + applause);
        console.log('Matador position: ' + matadorPosition);

    }, [bullPosition]);


    return (
        <div>
            <p>i am matador</p>
        </div>
    )
}

const comparisonFunc = (oldProps: MatadorProps, currentProps: MatadorProps) => {
    return !(currentProps.applause === 3 && oldProps.applause !== currentProps.applause);
}

export const Matador = memo(MatadorComponent, comparisonFunc);