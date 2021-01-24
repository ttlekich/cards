// import React from "react";
// import { Card } from "./card";
// import { FINISHED, NOT_PLAYING, PLAYING } from "../entities/game-mode";
// import * as R from "ramda";

// export const DrawPile = () => {
//     if (!state.game) return <></>;
//     switch (state.game.mode) {
//         case PLAYING:
//             const lastPlayed = R.last(state.game.discard);
//             return (
//                 <>
//                     {state.game && (
//                         <div className="flex justify-center items-center gap-4">
//                             <Card
//                                 card={{ suit: "S", rank: "A" }}
//                                 face={"BACK"}
//                                 isSelected={false}
//                                 direction={"VERTICAL"}
//                             ></Card>
//                             {lastPlayed && (
//                                 <Card
//                                     card={lastPlayed}
//                                     face={"FRONT"}
//                                     isSelected={false}
//                                     direction={"VERTICAL"}
//                                 ></Card>
//                             )}
//                         </div>
//                     )}
//                 </>
//             );
//         case FINISHED:
//         case NOT_PLAYING:
//             return <></>;
//     }
// };
