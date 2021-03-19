// 2---------------------------------

const cat_prod = [];
const prod = [];

cat_prod.push(
    {id: 1, name: "Higiene", status: true},
    {id: 2, name: "Eletronicos", status: true},
    {id: 3, name: "Outros", status: false},
    {id: 4, name: "Moda", status: false},
    {id: 5, name: "Utensilios", status: false}
);

prod.push(
    {id: 1, name: "Celular", price: 2.00, id_categ: 2},
    {id: 2, name: "Sabonete", price: 9.60, id_categ: 1},
    {id: 3, name: "Notebook", price: 8.10, id_categ: 2}
);

console.log("\nNomes de produtos eletronicos:");

prod.filter(item => {
    return item.id_categ == 2;
}).forEach(item => console.log(item.name));


console.log("\nNomes das categorias com produtos com preço menor que 10");

const filteredProd = prod.filter(item => item.price < 10)
    .map(filteredItem => filteredItem.id_categ)

cat_prod.forEach((item) => {
    const verify = filteredProd.some((id) => id == item.id);
    if (verify) {
        console.log(item.name) 
    }
})

console.log("\nProdutos de categorias desativadas:");
cat_prod.filter(item => {
    return !item.status
}).forEach(item => {
    prod.forEach(product => {
        if (product.id_categ == item.id) {
            console.log(product.name) 
        }
    }) 
})


const newCat = cat_prod.map(categ => {
    const productsOfEachCategory = prod.filter(itemProd => categ.id === itemProd.id_categ)
    return {...categ, qt_prod: productsOfEachCategory.length};
});

console.log("\n");
console.log(newCat);