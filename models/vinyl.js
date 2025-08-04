import mongoose from 'mongoose';

const VinylSchema = new mongoose.Schema({
  title: String,
  image: String,
  price: Number,
  category: String,
  description: String,
  stock: Number,
  soundcloud: String,
});

const Vinyl = mongoose.models.Vinyl || mongoose.model('Vinyl', VinylSchema);

export default Vinyl;
