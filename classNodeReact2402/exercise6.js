var list = []
const databaseInsert = function (data, callback) {
    return new Promise((resolve,reject) => {
        setTimeout(function () {
            list.push(data);
            if (callback) {
                resolve(callback());
            }
        }, 0);
    })
};
///////////////////////
databaseInsert({meuobjeto: "a"}, () => {
    console.log("lista: ", list);
}).then();