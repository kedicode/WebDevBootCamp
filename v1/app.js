const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
	res.render('landing');
})

app.get('/campgrounds', (req, res)=>{
	const campgrounds = [
		{name: 'Salmon Creek', image: 'https://cdn.pixabay.com/photo/2016/01/26/23/32/camp-1163419_960_720.jpg'},
		{name: 'Granite Hills', image: 'https://cdn.pixabay.com/photo/2016/08/28/17/05/camping-1626412_960_720.jpg'},
		{name: 'Mountain Goat Run', image: 'https://cdn.pixabay.com/photo/2019/01/23/13/46/camping-tipi-3950296_960_720.jpg'}
	];
	
	res.render('campgrounds', {campgrounds: campgrounds});
})

app.get('/campgrounds/new', (req,res)=>{
	res.render('new');
})

app.post('/campgrounds', (reg, res)=>{
	res.send("You Hit the post route");
})

app.listen(3000, ()=>{
	console.log("The YelpCamp Server Has Started");
})

//Testin