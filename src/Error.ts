export type MyError = {
    message: string | ErrorMessages
    resolution?: string | undefined;
}

export const enum ErrorMessages {
    DBError = "error occured while using the DB"
}

export const isError = (
    toBeDetermined: any | MyError
): toBeDetermined is MyError => {
    // !!= if the obj passed to it has a field of "message" it will return true if not false
    return !!(toBeDetermined as MyError).message;
};