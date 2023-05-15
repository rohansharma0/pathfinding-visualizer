import { Algorithm } from "../model/algorithm";
import { Speed } from "../model/speed";

export const ALGORITHM = [
    {
        id: Algorithm.Dijkstra,
        algorithm: "Dijkstra's Algorithm",
        abbreviation: "Dijkstra",
    },
    {
        id: Algorithm.BreadthFirstSearch,
        algorithm: "Breadth First Search",
        abbreviation: "BFS",
    },
    {
        id: Algorithm.DepthFirstSearch,
        algorithm: "Depth First Search",
        abbreviation: "DFS",
    }
];

export const SPEED = [
    {
        id: Speed.SLOW,
        label: "Speed: Slow",
        value: 20,
        default: false,
    },
    {
        id: Speed.MEDIUM,
        label: "Speed: Medium",
        value: 12,
        default: true,
    },
    {
        id: Speed.FAST,
        label: "Speed: Fast",
        value: 6,
        default: false,
    }
]