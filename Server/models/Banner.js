const mongoose = require('mongoose');

const { Schema } = mongoose;

const bannerSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    customMessage: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        require: true,
        min: 0.99
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    }
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;