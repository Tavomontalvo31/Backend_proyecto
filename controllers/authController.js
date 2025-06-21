const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrarUsuario = async (req, res) => {
    const { name, email, password } = req.body
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ name, email, password })
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save();

        const payload = { user: { id: user.id } }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}

exports.autenticarUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: 'User does not exists' })
        }

        const esMatch = await bcrypt.compare(password, user.password)
        if (!esMatch) {
            return res.status(400).json({ msg: 'Invalid password' })
        }

        const payload = { user: { id: user.id } }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        res.json({ token })
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}