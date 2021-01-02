import Dialog from "./Dialog";
import express, { Express, Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";

export interface ServerOptions {
    cors?: Parameters<typeof cors>[0]
}

class Server {
    router: Router;
    private head: Dialog<any>;
    private idCounter = 0;
    private server: Express;
    private dialogs: Dialog<any>[] = [];
    constructor(options : ServerOptions = {}) {
        const router = Router();
        this.router = router;

        if(options.cors)
            router.use(cors(options.cors));

        router.use(bodyParser.urlencoded({ extended: true }));
        router.use(bodyParser.json());

        this.router.get("/ht/head/", (req, res, next) => {
            res.json({
                id: this.head.getId()
            });
        });
    }
    listen(port : number) {
        const server = express();
        this.server = server;

        server.use("/", this.router);

        this.server.listen(port);
    }

    setHead(dialog : Dialog<any>) {
        this.add(dialog);
        this.head = dialog;
    }
    add(dialog : Dialog<any>) {
        if(this.dialogs.includes(dialog)) return;

        if(dialog.getId() === undefined) {
            dialog.setId(String(this.idCounter++));
        }
        dialog.attachServer(this);

        this.dialogs.push(dialog);
    }
}


export default Server;