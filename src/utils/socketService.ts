// // src/Api/socket.ts
// import { io } from "socket.io-client";

// const SERVER_URL = "https://renthub.centralindia.cloudapp.azure.com/";

// export const createSocket = (userId: string) => {
//   return io(SERVER_URL, {
//     transports: ["websocket"],
//     query: {
//       userId,
//     },
//   });
// };
// const socket = createSocket("12345");

// socket.on("connect",()=>{
//     console.log("socket connected",socket.id)
// });
// ``