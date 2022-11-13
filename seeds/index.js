const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 1000; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '628544a80cae8f23cdab5255',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dul7v69rc/image/upload/v1653249840/YelpCamp/lnnmbvhnh6ce1nr75qcc.jpg',
          filename: 'YelpCamp/lnnmbvhnh6ce1nr75qcc'
        },
        {
          url: 'https://res.cloudinary.com/dul7v69rc/image/upload/v1653249841/YelpCamp/okqtafarlgx46uvefcd4.jpg',
          filename: 'YelpCamp/okqtafarlgx46uvefcd4'
        },
        {
          url: 'https://res.cloudinary.com/dul7v69rc/image/upload/v1653249842/YelpCamp/bccupw3tm1bqeu5vsv3n.jpg',
          filename: 'YelpCamp/bccupw3tm1bqeu5vsv3n'
        }
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})