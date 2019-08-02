const express = require('express'),
    app = express(),
    fs = require('fs')


let db = {}
const loadingDB = ()=>{
    try{
        db = JSON.parse(fs.readFileSync(`src/data.json`))
    }catch{
        db = {"products":[]}
    }
    return db
}

const saveDB = ()=>{
    return new Promise((resolve,reject)=>{
        let data =JSON.stringify(db)
        fs.writeFile('src/data.json',data,err=>{
            if(err) return reject(err)
            return resolve(data)
        })
    })
}

app.set('port',1700)

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static(`${__dirname}/public`))

app.get('/products',(req,res)=>{
    loadingDB()
    res.json(db)
})
app.post('/products',(req,res)=>{
    const {name} = req.body
    loadingDB()
    db.products.push({
        id: db.products.slice(-1).id + 1 | db.products.length + 1, 
        name
    })
    
    saveDB()
        .then(()=>res.json('created'))
        .catch(()=>res.json('no creado'))
})

app.put('/products/:id',(req,res)=>{
    const {name} = req.body
    const {id} = req.params

    db.products = db.products.reduce((acc,product)=>{
        if(product.id===id)
            product.name = name
        acc.push(product)
        return acc
    },[])
    
    saveDB()
        .then(()=>res.json('actualizado'))
        .catch(()=>res.json('no actualizado'))
})

app.delete('/products/:id',(req,res)=>{
    const {id} = req.params

    db.products = db.products.reduce((acc,product)=>{
        if(product.id===id) return acc
        acc.push(product)
        return acc
    },[])
    
    saveDB()
        .then(()=>res.json('eliminado'))
        .catch(()=>res.json('no eliminado'))
})

app.listen(app.get('port'))