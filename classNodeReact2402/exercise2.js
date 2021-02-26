// 2---------------------------------

const cat_prod = [];
const prod = [];

cat_prod.push({id: 1, name: "Higiene", status: true});
cat_prod.push({id: 2, name: "Eletronicos", status: true});
cat_prod.push({id: 3, name: "Outros", status: false});
cat_prod.push({id: 4, name: "Moda", status: false});
cat_prod.push({id: 5, name: "Utensilios", status: false});

prod.push({id: 1, name: "Celular", price: 2.00, id_categ: 2});
prod.push({id: 2, name: "Sabonete", price: 9.60, id_categ: 1});
prod.push({id: 3, name: "Notebook", price: 8.10, id_categ: 2});
// prod.push({id: 4, name: "Batata", price: 8.10, id_categ: 3});

console.log("\nNomes de produtos eletronicos:");

prod.filter(item => {
    return item.id_categ == 2;
}).forEach(item => console.log(item.name));


console.log("\nNomes das categorias com produtos com preço menor que 10");

const filteredProd = prod.filter(item => item.price < 10)
    .map(filteredItem => filteredItem.id_categ)

cat_prod.forEach((item) => {
    filteredProd.some((id) => id == item.id) ? console.log(item.name) : null;
})

console.log("\nProdutos de categorias desativadas:");
cat_prod.filter(item => {
    return !item.status
}).forEach(item => {
    prod.forEach(product => {
        product.id_categ == item.id ? console.log(product.name) : null;      
    }) 
})



const newCat = cat_prod.map(categ => {
    let qt_prod = 0
    prod.forEach(itemProd => {
        qt_prod += itemProd.id_categ == categ.id ? 1 : 0;
    })
    return {...categ, qt_prod};
});

console.log("\n");
console.log(newCat);