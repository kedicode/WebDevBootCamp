const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
    methodOverride = require('method-override');
    expressSsanitizer = require('express-sanitizer');


//App config

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://dbUser:2855b54de14b6c9253a212d0b4361c1a@cluster0-ktf9m.mongodb.net/RESTfulBlogApp?retryWrites=true&w=majority', {useFindAndModify : false});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSsanitizer());
app.use(methodOverride("_method"));

// Mongoose/model config

const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

const Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
//     title: "My test",
//     image: 'https://unsplash.com/photos/5DB3cYe7Nxk',
//     body: 'This is my first blog entery and it is really cool and so is this lizard.'
// },(err, blog)=>{
//     if(err){
//         console.log(err, blog);
//     } else {
//         console.log("****Blog Created****\n", blog, '****Blog Created****');
//     }
// })

//RESTful Routes

//app.get('')

app.get('/', (req,res)=>{
    res.redirect('/blogs');
})

//INDEX Route
app.get('/blogs', (req, res)=>{
    Blog.find({}, (err, blogs)=>{
        if(err){
            console.log('Error:\n', error);
        } else {
            res.render('index', {blogs: blogs});
        }
    });
});

//NEW Route
app.get('/blogs/new', (req, res)=>{
    res.render('new');
});

//CREATE Route
app.post('/blogs', (req, res)=>{
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, (err, blog)=>{
        if(err){
            console.log(error);
            res.render('/new');
        } else {
            res.redirect('/blogs');
        }
    });
});

//SHOW Route
app.get('/blogs/:id', (req,res)=>{
    Blog.findById(req.params.id, (err, blog)=>{
        if(err){
            res.redirect('/blogs');
        } else {
            res.render('show', {blog: blog});
        }
    })
})

//EDIT Route
app.get('/blogs/:id/edit', (req, res)=>{
    Blog.findById(req.params.id, (err, blog)=>{
        if(err){
            res.redirect('/blogs');
        } else {
            res.render('edit', { blog: blog});
        }
    })
})

//UPDATE Route
app.put('/blogs/:id', (req, res)=>{
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, blog)=>{
        if(err){
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs/' + blog._id);
        }
    })
})

//DELETE Route
app.delete('/blogs/:id', (req, res)=>{
    Blog.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            res.redirect("/blogs/" + req.params.id);
        } else {
            res.redirect('/blogs/')
        }

    })
})

app.listen(3000, ()=>{
    console.log("Blog server is running");
});
