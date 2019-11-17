const express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	mongoose = require('mongoose');

//Connect to Db
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://dbUser:Cw5S9sba0g7Pu8ZF0iF3@cluster0-ktf9m.mongodb.net/yelp_camp?retryWrites=true&w=majority');

//Setup Schema
const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

const Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create({
// 	name: 'Granite Hills',
// 	image: 'https://cdn.pixabay.com/photo/2016/08/28/17/05/camping-1626412_960_720.jpg'
// }, (err, campground) => {
// 	if (err) {
// 		console.log(error);
// 	} else {
// 		console.log("Saved Campground:\n", campground);
// 	}
// })

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('landing');
})

app.get('/campgrounds', (req, res) => {
	Campground.find({}, (err, campgrounds) => {
		if (err) {
			console.log(error)
		} else {
			res.render('campgrounds', { campgrounds: campgrounds });
		}
	});
})

app.get('/campgrounds/new', (req, res) => {
	res.render('new');
})

app.post('/campgrounds', (req, res) => {
	const name = req.body.name;
	const image = req.body.image;
	Campground.create({ name: name, image: image }, (err, campground) => {
		if (err) {
			console.log(err);
		} else {
			console.log("New Campground\n", campground);
			res.redirect('/campgrounds');
		}
	});
	// res.send("You Hit the post route");
})

app.listen(3000, () => {
	console.log("The YelpCamp Server Has Started");
})
