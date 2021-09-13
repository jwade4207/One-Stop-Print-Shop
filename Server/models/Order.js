const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    banner: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Banner'
        }
    ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order