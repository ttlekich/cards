// import React from "react";
// import { Suit, Suits } from "../../src/crazy-eights/deck";
// import { SuitButton } from "./suit-button";

// type Props = {
//     handleChooseSuit: (suit: Suit) => (event: React.SyntheticEvent) => void;
// };

// export const SuitChooser: React.FC<Props> = ({ handleChooseSuit }) => {
//     return (
//         <div className="flex flex-row gap-2">
//             {Suits.map((suit) => (
//                 <SuitButton
//                     key={suit}
//                     suit={suit}
//                     onClick={handleChooseSuit(suit)}
//                 ></SuitButton>
//             ))}
//         </div>
//     );
// };
