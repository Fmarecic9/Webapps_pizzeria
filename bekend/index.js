import express from 'express'
import cors from "cors"
import { connectToDatabase } from './db.js'


const db = await connectToDatabase()

const app = express();
app.use(cors());
app.use(express.json())
const PORT = 3000

app.listen(PORT,error=>{
if(error){
    console.log("Nešto ni u redu")
}
console.log(`Server dela na portu: http://localhost:${PORT}`)
})

app.get('/', (req,res)=>{
    res.send("LMAO")
})

app.get('/pizze', async(req,res)=>{
    let pizzeCollection = db.collection('pizze')
    let svePizze = await pizzeCollection.find().toArray()
    res.status(200).json(svePizze)
})

app.post('/pizze', async (req,res)=>{
    let result = {}
    let pizzaBody = req.body
    let pizzeCollection = db.collection('pizze')
    const obavezniKljucevi = ['naziv', 'cijena', 'sastojci', 'slika']; 

    for (let kljuc of obavezniKljucevi) { 
        if (!(kljuc in pizzaBody)) { 
            return res.status(400).json({ error: 'nedostaju obavezni kljucevi' }); } 
        } 
    if (!Number.isInteger(pizzaBody['cijena'])) { 
        return res.status(400).json({ error: 'cijena treba biti cijeli broj' }); 
    } 
    if (!Array.isArray(pizzaBody['sastojci'])) { 
        return res.status(400).json({ error: 'sastojci trebaju biti tipa array' });
    }

    try{
        result = await pizzeCollection.insertOne(pizzaBody); 
        res.status(200).json({ message: 'Pizza je dodana', id: result.insertedId });
    }
    catch(e){
        console.error("error: ", e)
    }
    
    res.status(201).json({result, "insertedId" : result.insertedId})
})

app.post('/narudzba', async (req,res)=>{
    const narudzbaNova = req.body;
    const narudzbeCollection = db.collection('pizzaNarudzbe'); 
    const obavezni_kljucevi = ['ime','prezime','telefon','pizza_stavke']
    const obavezni_kljucevi2 = ['naziv','kolicina','velicina']


    for (let kljuc of obavezni_kljucevi){
        if  (!(kljuc in narudzbaNova)){
            return res.status(400).json({ error: 'nedostaju obavezni kljucevi' });
        }
        if (!Array.isArray(narudzbaNova['pizza_stavke'])){
            return res.status(400).json({error: 'Stavke pizze trebaju biti niz'})
        }
    }
    for (let stavka of narudzbaNova['pizza_stavke']){
        for (let kljuc of obavezni_kljucevi2){
            if (!(kljuc in stavka)){
                return res.status(400).json({ error: 'nedostaju obavezni kljucevi' });
            }
        }
    }
    try {
        const result = await narudzbeCollection.insertOne(narudzbaNova);
        res.status(200).json({ message: 'Narudzba je zaprimljena', id: result.insertedId });
    } catch (e) {
        console.error("Nesto nije u redu.", e);
        res.json({ message: "Doslo je do greske" });
    }
})
