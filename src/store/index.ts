import { create } from "zustand";
import { combine } from "zustand/middleware";

const GAME_ID = '123';

interface PuzzleState {
    gameId: string;
    state: string[],
    status: "not_started" | "in_progress" | "failure" | "succcess",
    winnerId?: string;
}

const initialState: PuzzleState = {
    gameId: GAME_ID,
    status: "not_started",
    state: ["H", "E", "L", "_", " ", "_", "_", "_", "_", "_",]
};

export const useStore = create(combine(initialState, (setState, getState) => {

    const PLAYER_ID = Date.now();

    const socket = new WebSocket("ws://localhost:8080/ws");

    socket.addEventListener("open", () => {
        setState({ status: "in_progress" });
    });

    socket.addEventListener("message", (event: MessageEvent<PuzzleState>) => {
        console.log("Message from server ", event.data);
    });

    socket.addEventListener("close", () => {
        setState({ status: "not_started" });
    })

    return {
        actions: {
            startGame() {
                socket.send("start-game");
            },

            sendKey(input: string) {
                socket.send(JSON.stringify({
                    input,
                    playerId: PLAYER_ID,
                    gameId: GAME_ID,
                }));
            },

        },
    };
}));