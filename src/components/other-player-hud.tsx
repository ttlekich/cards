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
                    absolute
                    mx-auto
                    justify-center
                `}
                style={{
                    display: "flex",
                    height: "150px",
                    padding: "0 50px",
                    justifyContent: "center",
                    position: "fixed",
                    bottom: isSide ? "50vh" : undefined,
                    left: isSide ? "-50%" : "",
                    right: 0,
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
