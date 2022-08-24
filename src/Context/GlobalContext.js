import React, { useState, useContext, createContext, useEffect, useRef, useCallback } from 'react'
const GlobalContext = createContext();
const RADIUS = 25;
const CLUSTERS_COLORS = ['#f00', '#0f0', '#00f'];

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}

export default function GlobalContextProvider({ children }) {
    const [circles, setCircles] = useState(() => initPositions(RADIUS, window.innerWidth / 15));

    const [centers, setCenters] = useState(null);

    const [isDone, setIsDone] = useState(false);
    const [roundNumber, setRoundNumber] = useState(0);
    const [helperText, setHelperText] = useState(`Round ${roundNumber}`);

    // pick 3 random centers at first
    const firstTimePickCenters = useRef(true);
    useEffect(() => {
        if (firstTimePickCenters.current) {
            setTimeout(() => {
                setCenters(initCentersPostioins());
                setHelperText(`PICKING  ${CLUSTERS_COLORS.length} CENTERS`)
            }, 2000);
        }
        firstTimePickCenters.current = false;
    }, []);

    const clustering = useCallback(() => {
        const newCircles = circles;
        for (let i = 0; i < newCircles.length; i++) {
            const circle = newCircles[i];
            let KNN = centers[0];
            for (let j = 0; j < centers.length; j++) {
                const center = centers[j];

                if (distance(circle.x, center.x, circle.y, center.y) <
                    distance(circle.x, KNN.x, circle.y, KNN.y)) {
                    KNN = center;
                }
            }
            newCircles[i].color = KNN.color;
        }
        setCircles(newCircles);
        setHelperText(`Place the circles in the nearest cluster`)
    }, [circles, centers])

    const moveCenters = useCallback(() => {
        setRoundNumber(prev => prev + 1);
        const newCenters = [];
        for (let i = 0; i < centers.length; i++) {
            const center = centers[i];
            const circlesInThisCluster = circles.filter(el => el.color === center.color);
            let MIN_X = window.innerWidth + window.innerHeight;
            let MIN_Y = window.innerWidth + window.innerHeight;
            let MAX_X = -1;
            let MAX_Y = -1;

            circlesInThisCluster.forEach((circle) => {
                if (circle.x > MAX_X) {
                    MAX_X = circle.x;
                }

                if (circle.x < MIN_X) {
                    MIN_X = circle.x;
                }

                if (circle.y > MAX_Y) {
                    MAX_Y = circle.y;
                }

                if (circle.y < MIN_Y) {
                    MIN_Y = circle.y;
                }
            })

            const newCenter = {
                ...center,
                x: ((MAX_X + MIN_X) / 2),
                y: ((MAX_Y + MIN_Y) / 2)
            }
            newCenters.push(newCenter);
        }

        if (!equals(centers, newCenters)) {
            setCenters(newCenters);
            setHelperText(`move the  ${CLUSTERS_COLORS.length} CENTERS`)
        } else {
            setIsDone(true);
            setHelperText(`clustering process done in ${roundNumber} round 🔥`)
        }
    }, [centers, circles, roundNumber])

    useEffect(() => {
        // pick the new centers
        if (centers !== null && !isDone) {
            // clustering process 
            setTimeout(() => {
                clustering();
            }, 2000);

            setTimeout(() => {
                moveCenters()
            }, 4000);
        }
    }, [centers, moveCenters, clustering , isDone]);

    return (
        <GlobalContext.Provider value={{ circles, centers, RADIUS, helperText }}>
            {children}
        </GlobalContext.Provider>
    )
}

// create random centers
const initCentersPostioins = () => {
    const centers = initPositions(25, 3)
    centers.map((el, index) => { return el.color = CLUSTERS_COLORS[index] })
    return centers;
}
// create random positions objects
const initPositions = (radius, numberOfObjects) => {
    const circlesPositions = [];
    for (let i = 0; i < numberOfObjects; i++) {
        let newPosition = generatePosition(radius);
        if (i !== 0) {
            for (let j = 0; j < circlesPositions.length; j++) {
                const element = circlesPositions[j];
                if (distance(element.x, newPosition.x, element.y, newPosition.y) < 2 * radius) {
                    newPosition = generatePosition(radius);
                    j = -1;
                }
            }
        }
        circlesPositions.push({ ...newPosition, color: "#fff" })
    }
    return circlesPositions;
}
// generate {x , y} position
const generatePosition = (radius) => {
    const x = randomInRange(radius, (window.innerWidth - 2 * radius));
    const y = randomInRange(radius, (window.innerHeight - 2 * radius));
    return { x, y };
}

const randomInRange = (n1, n2) => {
    return parseInt((Math.random() * (n2 - n1)) + n1);
}

const distance = (x1, x2, y1, y2) => {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);