class ErrorBadRequest extends Error{
    constructor(){
        super("The field 'name' is empty");
        this.name = "ErrorBadRequest";
        this.idError = 400;
    }
}

module.exports = ErrorBadRequest;