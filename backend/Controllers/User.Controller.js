import User from '../Models/User.model.js'
import papa from 'papaparse'

// @desc    Register a new User
// @rout    POST /api/form/register
// @acce    Public
export const register = async (req, res) => {
    console.log(req.body);
    try {
        const { name, email, country, address, date } = req.body
        if (!name, !email, !country, !address, !date) return res.status(400).send("All field should be present")

        const user = await new User({
            name, email, country, address, dateOfBirth: date
        }).save()
        return res.status(200).json({ Success: "true" })
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message)
    }
}

// @desc    Edit a User
// @rout    POST /api/form/edit
// @acce    Public
export const editUser = async (req, res) => {
    try {
        const { name, email, country, address, date, _id } = req.body
        if (!name, !email, !country, !address, !date, !_id) return res.status(400).send("All field should be present")
        let user = await User.findById(_id)
        if (!user) return res.status(400).send("User Data Not Found")
        user.name = name ? name : user.name
        user.email = email ? email : user.email
        user.country = country ? country : user.country
        user.address = address ? address : user.address
        user.date = date ? date : user.date
        user = await user.save()
        return res.status(200).json({ Success: "true" })
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message)
    }
}

// @desc    Get All Users in the DB
// @rout    GET /api/form
// @acce    Public
export const getAllUsers = async (req, res) => {
    console.log("here");
    try {
        let users = await User.find({})
        return res.status(200).json(users)
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message)
    }
}


// @desc    Get All Users in the DB
// @rout    DELETE /api/form
// @acce    Public
export const deleteUser = async (req, res) => {
    try {
        let { id } = req.params;
        let user = await User.findById(id)
        if (!user) return res.status(400).send("User Data Not Found")
        await User.deleteOne({ _id: id })
        return res.status(200).json({ Success: "true" })
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message)
    }
}

// @desc    Parse req fle to JSON data
// @rout    POST /api/form/parse-file
// @acce    Public
export const csvToJson = async (req, res) => {
    try {
        if (!req.file) return res.status(400).send("File Not Present")
        const buffer = req.file.buffer;

        // Convert the buffer to a string
        const csvString = buffer.toString();

        // Parse the CSV string to JSON
        const json = papa.parse(csvString, {
            header: true
        });
        return res.status(200).json(json.data)
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message)
    }
}

// @desc    Save Table Data to DB
// @rout    POST /api/form/save-to-db
// @acce    Public
export const saveToDb = async (req, res) => {
    try {
        const data=req.body.map(user=>{
            return{
                name:user.name,
                email:user.email,
                dateOfBirth:user.dob,
                address:user.address,
                country:user.country,
            }
        })
        await User.create(data)
        return res.status(200).json({ Success: "true" })
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message)
    }
}

