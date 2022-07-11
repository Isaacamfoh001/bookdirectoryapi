const router = require('express').Router();
const {Book} = require('../models/book');
const {verifyToken, verifyTokenAndAuthorization} = require('../middleware/verifyToken');

router.post('/', [verifyTokenAndAuthorization], async(req, res)=>{

    const book = new Book(req.body);
    try {
        const savedBook = await book.save();
        console.log(savedBook);
        res.status(200).send(savedBook); 
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/', [verifyToken], async(req, res)=>{

    try {
        if(req.query){
            let book = await Book.find(req.query);
            if(book == '' ){
                res.status(404).send('No results found')
            }else{ 
                res.status(200).send(book)
            }
            
        }else{
            const books = await Book.find();
            if(!books) res.status(404).send('No books available at the moment');
            console.log(books);
            res.status(200).send(books);
        }
          
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/:id',[verifyToken], async(req,res)=>{
    try {
        const book = await Book.findById(req.params.id);
        if(!book) res.status(404).send('Book you are searching for does not exist');
        res.status(200).send(book);
    } catch (error) {
        res.status(400).send(error);
    }
});


// router.get('/', [verifyToken], async(req, res) => {
//     let book = await Book.find(req.query);
//     console.log(book);
//     console.log(req.query);
//     res.send(book);

// });

router.put('/:id', [verifyTokenAndAuthorization], async(req, res)=>{
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id, { $set:req.body}, {new: true});
        if(!book) return res.status(404).send('Book not found hence cannot be updated');
        console.log(book);
        res.status(200).send(book);    
        
    } catch (error) {
        res.status(400).send(error);
        
    }
    
});

router.delete('/:id',[verifyTokenAndAuthorization], async(req, res)=>{
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if(!book) return res.status(404).send('Book not found hence cannot be deleted');
        res.status(200).send('Book sucessfully deleted')
        
    } catch (error) {
        res.status(400).send(error);
    } 
});

module.exports = router;
