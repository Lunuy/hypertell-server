import Dialog from "./Dialog";

interface Redirect {
    addr?: string,
    dialog?: Dialog<any>
    id?: string,
    then?: {
        addr?: string,
        dialog?: Dialog<any>
        id?: string
    }
}

export default Redirect;