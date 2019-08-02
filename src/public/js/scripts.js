const form = document.querySelector('.container-form'),
    getProducts = document.getElementById('get-products'),
    submit = document.getElementById('submit'),
    tbody = document.getElementById('tbody'),
    newProduct = document.getElementById('new-product')


const showProducts = ()=>{
    fetch('/products')
        .then(data=>data.json())
        .then(data=>{
            let html= ``
            data.products.forEach(product=>{
                html+=`
                    <tr>
                        <td>${product.id}</td>
                        <td><input type="text" value=${product.name} class=name></td>
                        <td>
                            <button class=update>UPDATE</button>
                            <button class=delete>DELETE</button>
                        <td>
                    <tr>
                `
            })
            tbody.innerHTML = html
        })
        .catch(err=>console.log('err'))
}
const updateProduct = ()=>{

}
const deleteProduct= ()=>{

}

const createProduct = target=>{
    if(!target.value.trim()) return
    fetch('/products', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:target.value})
    }).then(data=>data.json())
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
    showProducts()
}
form.addEventListener('click',e=>{
    e.preventDefault()
    let target = e.target
    if(target===getProducts)
        return showProducts()
    if(target===submit)
        return createProduct(newProduct)
})