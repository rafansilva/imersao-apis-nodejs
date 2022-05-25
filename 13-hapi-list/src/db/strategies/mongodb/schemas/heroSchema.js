import Mongoose from 'mongoose';

const heroSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  power: {
    type: String,
    required: true,
  },
  insertedAt: {
    type: Date,
    default: Date().toLocaleString("pt-BR")
  }
});

export const HeroSchema = new Mongoose.model('herois', heroSchema);


