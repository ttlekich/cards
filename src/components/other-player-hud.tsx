import React from "react";
import { PLAYING } from "../entities/game-mode";
import { UserGame } from "../entities/user-game";
import { Card } from "./card";

type Props = {
    userGame: UserGame;
    isSide?: boolean;
};

export const OtherPlayerHUD: React.FC<Props> = ({ userGame, isSide }) => {
    return (
        <div className="flex flex-col p-5">
            <div className="flex flex-row justify-center gap-2 p-2">
                <div>
                    <b>Player: </b> {userGame.email}
                </div>
                <div>
                    <b>Score: </b> {userGame.score}
                </div>
            </div>
            <div
                className={`
                ${isSide ? "grid" : "flex"}
                ${isSide ? "h-48" : ""}
                justify-center
                `}
            >
                {userGame.mode === PLAYING &&
                    userGame.hand.map((card, i) => (
                        <Card
                            face={"BACK"}
                            key={card.rank + card.suit}
                            card={card}
                            isSelected={false}
                            onClick={() => {}}
                            horizontal={isSide}
                            position={i}
                            total={userGame.hand.length}
                        ></Card>
                    ))}
            </div>
        </div>
    );
};
