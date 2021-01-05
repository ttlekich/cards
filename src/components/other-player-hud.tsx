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
        <div
            className={`
                    flex
                    flex-col
                    p-2
                `}
        >
            <div className="flex flex-row justify-center gap-2 p-2 text-sm">
                <div>
                    <span className="font-semibold">Player: </span>{" "}
                    {userGame.email}
                </div>
                <div>
                    <span className="font-semibold">Score: </span>{" "}
                    {userGame.score}
                </div>
            </div>
            <div
                className={`
                    grid
                    mx-auto
                    justify-center
                `}
                style={{
                    gridTemplateColumns:
                        "repeat(auto-fit,  minmax(10px, max-content))",
                }}
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
