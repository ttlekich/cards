// import React, { useState, useRef, useEffect } from "react";
// import { UserGame } from "../../src/entities/user-game";
// import { NOT_PLAYING, PLAYING } from "../../src/entities/game-mode";
// import { Card as CardType, Suit } from "../../src/crazy-eights/deck";
// import { TurnControls } from "../../../src/components/turn-controls";
// import { Hand } from "../../src/components/hand";

// type Props = {
//     player: UserGame;
//     position?: "TOP" | "LEFT" | "RIGHT";
// };

// export const PlayerHUD = (props: Props) => {
//     const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
//     const [width, setWidth] = useState(0);
//     const [height, setHeight] = useState(0);

//     const { player } = props;
//     const userGame = props.player;
//     const isPlayer = state.user?.email === player.email;
//     const ref = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         if (ref.current) {
//             setWidth(ref.current.offsetWidth);
//             setHeight(ref.current.offsetHeight);
//         }
//     }, [ref]);

//     const selectCard = (card: CardType) => () => {
//         setSelectedCard(card);
//     };

//     const handleSkip = (event: React.SyntheticEvent) => {
//         event.preventDefault();
//         actions.skipTurn();
//     };

//     const handleChooseSuit = (suit: Suit) => (event: React.SyntheticEvent) => {
//         event.preventDefault();
//         actions.chooseSuit(suit);
//     };

//     const handlePlayCard = (event: React.SyntheticEvent) => {
//         event.preventDefault();
//         console.log(selectedCard);
//         if (selectedCard) {
//             actions.playCard(selectedCard);
//             setSelectedCard(null);
//         }
//     };

//     const handleDrawCard = (nCards: number) => (
//         event: React.SyntheticEvent
//     ) => {
//         event.preventDefault();
//         actions.drawCard(nCards);
//     };

//     const canStart = Boolean(
//         state.game &&
//             state.game.mode === NOT_PLAYING &&
//             userGame.playerNumber === 1
//     );

//     const handleStartGame = (event: React.SyntheticEvent) => {
//         event.preventDefault();
//         actions.startGame();
//     };

//     const isTurn =
//         state.game?.mode === PLAYING &&
//         player.playerNumber === state.game.currentPlayerNumber;

//     const direction = props.position
//         ? props.position === "RIGHT" || props.position === "LEFT"
//             ? "VERTICAL"
//             : "HORIZONTAL"
//         : "HORIZONTAL";

//     const hw = direction === "VERTICAL" ? "w-28 h-80" : "w-96 h-36";

//     return (
//         <div className="flex flex-col p-5 items-center">
//             <div className="flex flex-row justify-center gap-2 p-2">
//                 <div>
//                     <b>Player: </b> {userGame.email}
//                 </div>
//                 <div>
//                     <b>Score: </b> {userGame.score}
//                 </div>
//             </div>
//             <div
//                 className={`flex flex-row justify-center gap-2 p-2 ${hw}`}
//                 ref={ref}
//             >
//                 {props.player.mode === PLAYING ? (
//                     <Hand
//                         isFace={!Boolean(props.position)}
//                         hand={props.player.hand}
//                         selectedCard={selectedCard}
//                         selectCard={selectCard}
//                         parentWidth={width}
//                         parentHeight={height}
//                         direction={direction}
//                     ></Hand>
//                 ) : null}
//             </div>
//             <div className="flex justify-center gap-2 p-2">
//                 {isPlayer && isTurn && (
//                     <TurnControls
//                         handleDrawCard={handleDrawCard}
//                         handlePlayCard={handlePlayCard}
//                         handleChooseSuit={handleChooseSuit}
//                         handleSkip={handleSkip}
//                         isTurn={isTurn}
//                     />
//                 )}
//             </div>
//             {canStart ? (
//                 <button
//                     onClick={handleStartGame}
//                     className="p-3 rounded-sm bg-blue-500 hover:bg-blue-700"
//                 >
//                     Start Game
//                 </button>
//             ) : null}
//         </div>
//     );
// };
