var list = []
const databaseInsert = function (data) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            list.push(data);
            resolve(list);
        }, 0);
    })
};
///////////////////////
databaseInsert({meuobjeto: "a"})
.then( result => console.table(result));