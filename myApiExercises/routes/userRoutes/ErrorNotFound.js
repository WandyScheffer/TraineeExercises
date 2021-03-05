class ErrorNotFound extends Error{
    constructor(){
        super('User not found!');
        this.name = "ErrorNotFound";
        this.idError = 404;
    }
}

module.exports = ErrorNotFound;