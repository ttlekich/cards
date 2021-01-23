import React from "react";
import { PLAYING } from "../entities/game-mode";
import { UserGame } from "../entities/user-game";
import { Card } from "./card";

type Props = {
    userGame: UserGame;
    location: "TOP" | "LEFT" | "RIGHT";
    isSide?: boolean;
};

const ANGLE = 90;

export const OtherPlayerHUD: React.FC<Props> = ({
    userGame,
    isSide,
    location,
}) => {
    const nCards = userGame.mode === PLAYING ? userGame.hand.length : 0;
    const middle =
        (nCards / 2) % 2 === 0 ? nCards / 2 - 0.5 : Math.ceil(nCards / 2);
    return (
        <div
            className={`
                    flex
                    flex-col
                    p-2
                    relative
                    ${isSide ? "-top-1/2" : "left-1/2"}
                    ${isSide ? "transform -translate-y-1/2" : ""}
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
                className={``}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                    flexDirection: isSide ? "column" : "row",
                }}
            >
                {userGame.mode === PLAYING &&
                    userGame.hand.map((card, i) => {
                        if (location === "TOP") {
                            return (
                                <Card
                                    face={"BACK"}
                                    key={card.rank + card.suit}
                                    card={card}
                                    isSelected={false}
                                    onClick={() => {}}
                                    horizontal={isSide}
                                    position={nCards * (i - middle)}
                                    location={location}
                                    total={userGame.hand.length}
                                    angle={(ANGLE / nCards) * (i - middle)}
                                ></Card>
                            );
                        }
                        if (location === "RIGHT") {
                            return (
                                <Card
                                    face={"BACK"}
                                    key={card.rank + card.suit}
                                    card={card}
                                    isSelected={false}
                                    onClick={() => {}}
                                    horizontal={isSide}
                                    position={nCards * (i - middle)}
                                    location={location}
                                    total={userGame.hand.length}
                                    angle={(ANGLE / nCards) * (i - middle)}
                                ></Card>
                            );
                        } else {
                            return (
                                <Card
                                    face={"BACK"}
                                    key={card.rank + card.suit}
                                    card={card}
                                    isSelected={false}
                                    onClick={() => {}}
                                    horizontal={isSide}
                                    position={nCards * (i - middle)}
                                    total={userGame.hand.length}
                                    location={location}
                                    angle={(ANGLE / nCards) * (i - middle)}
                                ></Card>
                            );
                        }
                    })}
            </div>
        </div>
    );
};
