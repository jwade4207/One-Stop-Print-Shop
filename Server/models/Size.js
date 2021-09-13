const mongoose = require('mongoose');

const { Schema } = mongoose;

const sizeSchema = new Schema({ 
    small: {
        type: String,
        required: true,
        trim: true
    },
    medium: {
        type: String,
        require: true,
        trim: true
    },
    large: {
        type: String,
        require: true,
        trim: true
    }
});


/* Size will be:
sm- 3x6
md- 4x8
lg- 12x6 */
const Size = mongoose.model('Size', sizeSchema);

module.exports = Size