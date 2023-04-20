import { useEffect, useRef, useState } from "react";

export function useSocket() {
    const [gameState, setGameState] = useState<string[]>([]);
    const [isStarted, setIsStarted] = useState(false);
    const ws = useRef<WebSocket | null>(null);
    const PLAYER_ID = Date.now();

    useEffect(() => {
        ws.current = new WebSocket(`ws://localhost:8080/ws?name=${PLAYER_ID}`);
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");

        const wsCurrent = ws.current;

        return () => {
            wsCurrent.close();
        };
    }, []);

    useEffect(() => {
        if (!ws.current) return;

        ws.current.onmessage = e => {
            const message = JSON.parse(e.data);
            console.log("message", message)
            switch (message.type) {
                case "matchFound": {
                    setGameState(message.payload);
                    break;
                }
                case "gameStarted": {
                    setIsStarted(true);
                    setGameState(message.payload);
                    break;
                }
                case "gameEnded": {
                    setIsStarted(false);
                    setGameState(message.payload);
                    break;
                }
                
            }
            
        };
    }, []);

    function sendKey(key: string) {
        if ( ws.current ) {
            ws.current.send(JSON.stringify({
                key,
                type: "guess"
            }));
        }
        
    }

    return {
        sendKey,
        gameState,
        isStarted
    }
}