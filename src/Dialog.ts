
import { Router } from "express";
import Redirect from "./Redirect";
import Server from "./Server";


function solveRedirect(redirect : Redirect) {
    let result : { addr?:string, id?:string, then?:{ addr?:string, id?:string } } = {};
    if(redirect.addr)
        result.addr = redirect.addr;
    if(redirect.id)
        result.id = redirect.id;
    if(redirect.dialog)
        result.id = redirect.dialog.getId();

    if(redirect.then)
        result.then = solveRedirect(redirect.then);

    return result;
}


export type Response = Promise<{
    type: string,
    data: any
}> | {
    type: string,
    data: any
};

class Dialog<Input> {
    private server : Server;
    private id : string;
    private articles: ((input: Input) => Response)[] = [];
    private selections: (input: Input) => Response;
    private redirect: (selection: any) => Redirect;

    constructor(server? : Server) {
        if(server)
            server.add(this);
    }

    setId(id : string) {
        this.id = id;
    }
    getId() {
        return this.id;
    }

    attachServer(server : Server) {
        if(this.server)
            throw "Server already attached";
        this.server = server;
        
        const path = `/ht/d/${encodeURIComponent(this.id)}/`;
        
        server.router
        .get(path, async (req, res) => {
            const articles = await Promise.all(this.articles.map(article => article(<any>req.query.value)));
            const selections = await this.selections(<any>req.query.value);
            res.json({
                articles,
                selections
            });
        })
        .post(path, async (req, res) => {
            if(!this.redirect) {
                res.json({
                    end: true
                });
                return;
            }
            const redirect = await this.redirect(req.body.selection);
            
            res.json(solveRedirect(redirect));
        });
    }

    // attach(child : Dialog<any, any>) {
    //     child.idObj = this.idObj;
    //     this.childs.push(child);
    // }
    // detach(child : Dialog<any, any>) {
    //     if(this.childs.includes(child))
    //         this.childs.splice(this.childs.indexOf(child), 1);
    // }

    addArticle(article : (input : Input) => Response) {
        this.articles.push(article);
    }
    removeArticle(article : (input : Input) => Response) {
        if(this.articles.includes(article))
            this.articles.splice(this.articles.indexOf(article), 1);
    }
    setSelections(selections : (input : Input) => Response) {
        this.selections = selections;
    }
    setRedirect(redirect : (selection : any) => Redirect) {
        this.redirect = redirect;
    }
}

export default Dialog;