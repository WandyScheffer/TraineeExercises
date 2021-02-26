var list = []
const databaseInsert = function (data, callback) {
    setTimeout(function () {
        list.push(data);
        if (callback) {
            callback();
        }
    }, 0);
};
///////////////////////
databaseInsert({meuobjeto: "a"}, () => {
    console.log("lista: ", list);
});