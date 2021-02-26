// 1---------------------------------

const cat_prod = [];

cat_prod.push({id: 1, name: "Higiene"});
cat_prod.push({id: 2, name: "Eletronicos"});
cat_prod.push({id: 3, name: "Outros"});
cat_prod.push({id: 4, name: "Moda"});
cat_prod.push({id: 5, name: "Utensilios"});

console.log("\nCategorias: \n");
cat_prod.forEach(item => console.log(item.name));


console.log("\n---------------------------\n");
cat_prod.forEach(item => {
    return item.name=="Eletronicos" ? console.log(item) : null;
})
