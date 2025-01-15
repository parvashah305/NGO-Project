const mongoose = require("mongoose")
const brcypt = require("bcryptjs")

const ngoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

ngoSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();

    const salt = await brcypt.genSalt(10);

    this.password = await brcypt.hash(this.password, salt);

    next();
});

ngoSchema.methods.matchPassword = async function(enteredPassword){
    return await brcypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('NGO', ngoSchema);