const registerDataSchema = require('../schema/userschema')
const jwt = require('jsonwebtoken');

const your_secret_key = "sdssghjg32j4g32g4jhg3g4wgsadc267832wew874856cds454ds564cf6sd"


exports.getUser = async (req, res) => {
    try {
        const user = await registerDataSchema.find()
        return res.status(200).json({ data: user, message: "user get successfully" });
    } catch (error) {
        res.send(error)
    }
}

exports.createUser = async (req, res) => {
    try {
        const user = new registerDataSchema({
            email: req.body.email,
            password: req.body.password,
            mobileNumber: req.body.mobileNumber,

        })
        await user.save()
        return res.status(200).json({ data: user, message: "user created successfully" });
    } catch (error) {
        res.send(error)

    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await registerDataSchema.findOne({ email });

        // Check if the user exists and the password is correct
        if (user && password === user.password ) {
            // Generate JWT token
            const token = jwt.sign({ userId: user._id, email: user.email }, your_secret_key, { expiresIn: '1h' });
            res.status(200).json({ token, message: "Login successfully" });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }

    jwt.verify(req.headers.authorization, your_secret_key, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }
        req.user = decoded.userId;
    });
    return  res.status(200).json({  userData : req.user , message: "token verify successfully" });;

    
};