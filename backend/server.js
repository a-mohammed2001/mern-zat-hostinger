const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/zat-blogs",{useNewUrlParser: true})
.then(()=>{console.log("connect")})
.catch((err)=>{console.log(err)})
// Schema
const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    author:{
        type: String,
        required:true
    },
    img:{
        type: String,
        required:true
    },
    date:{
        type: String,
        required:true
    },
    isUpdated:{
        type: Boolean,
        required:true
    },
    paragraphs:{
        type: String,
        required:true
    },
});
// Model
const Blog = mongoose.model('blog',blogSchema)
// async function createBlog(title,author,paragraphs){
// }
// async function getBlog(req,res){
   
// }
// async function updateBlog(id,title,author,date,paragraphs){   
// }
// async function deleteBlog(id){
// }
app.get('/', async (req, res)=>{
    const blogs = await Blog.find().sort({date:-1});
    res.send(blogs)
});
app.post('/add',async (req, res)=>{
    const {title,author,paragraphs} = req.body;        
    const newBlog = new Blog({
        title:title,
        author:author,
        img:"/images/new blog.jpg",
        date:new Date().getFullYear()+'-'+ (new Date().getMonth()+1) +'-'+ new Date().getDate(),
        isUpdated:true,
        paragraphs:paragraphs,
    });  
    // Crud => Create
    const result = await newBlog.save();
    console.log(result);
})
app.put('/edit',async (req, res)=>{
        const {id,title,author,date,paragraphs} = req.body;  
        try {
            await Blog.findByIdAndUpdate(id,{
                title:title, 
                author:author,
                date:date,
                paragraphs:paragraphs
            })
        } catch (err) {
                console.log(err);
            }  
    }
)
app.delete('/delete/:id',async (req, res)=>{
    const {id} = req.params;  
    await Blog.findByIdAndRemove(id).exec();
})
app.listen(4000,(req,res)=>{
    console.log('listening on port 4000');
});

