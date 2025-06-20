// import { getLogs } from "@/api/boards/boards-api";
// import { ILog } from "@/api/boards/boards.types";
// import {
//   DrawerContent,
//   DrawerHeader,
//   DrawerTitle,
//   Drawer,
// } from "@/components/ui/drawer";
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";

// interface IlogListDrawerProps {
//   streakId: string;
// }
// const LogListDrawer: React.FC<IlogListDrawerProps> = ({ streakId }) => {
//   const [logs, setLogs] = useState<Array<ILog> | null>(null);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const handleLogs = async (streakId: string) => {
//     // change this limit by pagination calendar
//     const logData = await getLogs(streakId, 100);
//     if (logData) {
//       setLogs(logData);
//     }
//     setLogs(logData);
//     setIsDrawerOpen(true);
//   };
//   return (
//     <div className="">
//       <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
//         <Button
//           size="sm"
//           variant="outline"
//           onClick={() => handleLogs(streakId)}
//         >
//           Show Logs
//         </Button>
//         <DrawerContent className="flex gap-2 md:max-w-xl self-center items-center m-auto mb-4 p-2">
//           <DrawerHeader>
//             <DrawerTitle>Log History</DrawerTitle>
//           </DrawerHeader>
//           {(!logs || !logs?.length) && (
//             <p className="text-gray-100 text-md ">No logs found </p>
//           )}
//           {logs?.map((log) => (
//             <div key={log.id} className="flex flex-col w-full px-2 mb-4  p-2 ">
//               <p className="text-gray-100 text-lg line-clamp-2">
//                 {log.description}
//               </p>
//               <p className="text-gray-200 opacity-60 text-xs  shrink-0">
//                 {/* {log.createdAt} */}
//                 {new Date(log.created_at).toDateString()} -{" "}
//                 {new Date(log.created_at).toLocaleTimeString()}
//               </p>
//             </div>
//           ))}
//           {/* <DrawerFooter>
//           <Button>Submit</Button>
//           <DrawerClose>
//             <Button variant="outline">Cancel</Button>
//           </DrawerClose>
//         </DrawerFooter> */}
//         </DrawerContent>
//       </Drawer>
//     </div>
//   );
// };

// export default LogListDrawer;
