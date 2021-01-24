// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { FormWrapper } from "./form-wrapper";
// import { LoadingSpinner } from "./loading-spinner";

// type Inputs = {
//     gameName: string;
// };

// type Props = {
//     onSubmit: (gameId: string) => void;
// };

// export const NewGameForm = (props: Props) => {
//     const [isLoading, setIsLoading] = useState(false);

//     const { register, handleSubmit, reset } = useForm<Inputs>();
//     const onSubmit = async (formData: Inputs) => {
//         setIsLoading(true);
//         await actions.joinGame(formData.gameName);
//         reset();
//         setIsLoading(false);
//         props.onSubmit(formData.gameName);
//     };

//     return (
//         <FormWrapper>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className="flex flex-col mb-4">
//                     <label
//                         className="mb-1 uppercase font-bold text-sm text-gray-600"
//                         htmlFor="gameName"
//                     >
//                         Join A Game
//                     </label>
//                     <input
//                         className="mb-4 border rounded py-2 px-2 text-gray-900"
//                         name="gameName"
//                         id="gameName"
//                         placeholder="Game Name"
//                         type="text"
//                         ref={register({})}
//                     ></input>
//                     {isLoading ? (
//                         <LoadingSpinner></LoadingSpinner>
//                     ) : (
//                         <button
//                             className="rounded py-1 px-2 bg-gray-900 hover:bg-gray-700 text-white"
//                             type="submit"
//                         >
//                             Join
//                         </button>
//                     )}
//                 </div>
//             </form>
//         </FormWrapper>
//     );
// };
