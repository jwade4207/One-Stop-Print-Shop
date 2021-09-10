const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

//import the bannerSchema
//const bannerSchema = require('./Banner');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        //saveBanners: [bannerSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

//has the user password
userSchema.pre('save', async function (next) {
    if(this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

//method to compare and validate password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

//when we get the user, we will get the "banner count" to show how man banners they have saved
// userSchema.virtuals('bannerCount').get(function () {
//     return this.savedBanners.length;
// })

const User = model('User', userSchema);

module.exports = User;