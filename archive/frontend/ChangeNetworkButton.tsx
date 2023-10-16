// import "./ChangeNetworkButton.css";
// import { useNetwork, useSwitchNetwork } from "wagmi";
// import React from "react";
// import CaretDown from "../assets/caret-down.svg?react";
//
// export const ChangeNetworkButton = () => {
//   const { chain } = useNetwork();
//   const { error, isLoading, pendingChainId, switchNetwork } =
//     useSwitchNetwork();
//
//   const supportedChains = [
//     { id: 1, name: "mainnet" },
//     { id: 11155111, name: "sepolia" },
//   ];
//
//   return (
//     <>
//       <div className="relative" data-te-dropdown-ref>
//         <button
//           className="flex items-center whitespace-nowrap rounded bg-blue-300 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
//           type="button"
//           id="dropdownMenuButton1"
//           data-te-dropdown-toggle-ref
//           aria-expanded="false"
//           data-te-ripple-init
//           data-te-ripple-color="light"
//         >
//           {!chain ? "Select network" : chain.name}
//           <span className="ml-2 w-2">
//             <CaretDown />
//           </span>
//         </button>
//         <ul
//           className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
//           aria-labelledby="dropdownMenuButton1"
//           data-te-dropdown-menu-ref
//         >
//           {supportedChains.map((x) => (
//             <li>
//               <a
//                 className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
//                 href="#"
//                 data-te-dropdown-item-ref
//                 // disabled={!switchNetwork || x.id === chain?.id}
//                 key={x.id}
//                 onClick={() => switchNetwork?.(x.id)}
//               >
//                 {x.name}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//       {/*{chain && <div>Connected to {chain.name}</div>}*/}
//
//       <div>{error && error.message}</div>
//     </>
//   );
// };
