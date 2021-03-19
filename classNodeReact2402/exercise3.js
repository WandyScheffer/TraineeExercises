// 3---------------------------------

const cat_prod = [];

cat_prod.push({id: 1, name: "Higiene", status: true, products: [
    {id:1, name:"sabonete", price:1},
    {id:2, name:"creme dental", price:2},
    {id:3, name:"escova de dentes", price:3},
]});

cat_prod.push({id: 2, name: "Eletronicos", status: true, products: [
    {id:4, name:"fone", price:4},
    {id:5, name:"mouse", price:5},
    {id:6, name:"tv", price:6},
]});

cat_prod.push({id: 3, name: "Alimentos", status: false, products: [
    {id:7, name:"batata", price:7},
    {id:8, name:"alho", price:5},
    {id:9, name:"cebola", price:9},
]});

cat_prod.push({id: 4, name: "Moda", status: false, products: [
    {id:10, name:"camisa", price:10},
    {id:11, name:"calça", price:11},
    {id:12, name:"relogio", price:12},
]});

cat_prod.push({id: 5, name: "Utensilios", status: false, products: [
    {id:13, name:"garfo", price:13},
    {id:14, name:"canivete", price:14},
    {id:15, name:"estilete", price:15},
]});

let {products} = cat_prod.find(item => {
    return item.id == 2;
});

console.log("\nNomes de produtos eletronicos:");
products.forEach(item => console.log(item.name))

console.log("\nNomes de categorias com produtos de preço < 10:");
cat_prod.filter(itemCat => {
    return itemCat.products.some(itemProd => itemProd.price < 10) ? 
    console.log(itemCat.name) : null
})


console.log("\nProdutos de categorias desativadas:");
const desactivateProducts = cat_prod
.filter(itemCat =>  !(itemCat.status))
.reduce( (reduceProducts, currentCategory, index) => {
    if (index===1) reduceProducts = reduceProducts.products;
    return [...reduceProducts, ...currentCategory.products];
})
console.table(desactivateProducts);


cat_prod.forEach(itemCat => {
    let qt_prod = 0;
    itemCat.products.forEach(() => {
        qt_prod+=1;
    });
    itemCat.qt_products = qt_prod;
})

console.log("\nCategorias com a quantidade de produtos que cada uma tem: \n");
console.table(cat_prod);