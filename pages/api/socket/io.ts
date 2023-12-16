import { NextApiRequest } from "next";
import { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIo } from "@/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  // added with copilot
  if (!res.socket) {
    res.socket = {} as any;
  }
  if (!res.socket.server) {
    res.socket.server = {} as any;
  }
  // added with copilot
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    res.end();
  }
};

export default ioHandler;
