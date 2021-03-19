// 1---------------------------------

const cat_prod = [];

cat_prod.push(
    {id: 1, name: "Higiene"},
    {id: 2, name: "Eletronicos"},
    {id: 3, name: "Outros"},
    {id: 4, name: "Moda"},
    {id: 5, name: "Utensilios"}
);

console.log("\nCategorias: \n");
cat_prod.forEach(item => console.log(item.name));

console.log("\n---------------------------\n");

cat_prod.forEach(item => {
    if (item.name==="Eletronicos") {
        console.log(item)
    }
})
