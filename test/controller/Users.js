const Users = require('../model/Users');

const getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};

const createUsers = async (req, res, next) => {
    try {
        const { us_id, us_name, us_email, us_password, us_phone_number, us_address } = req.body;

        const newUser = new Users({
            us_id,
            us_name,
            us_email,
            us_password,
            us_phone_number,
            us_address
        });
        await newUser.save()
        res.status(200).json({ message: 'User created successfully', newUser });
    } catch (error) {
        next(error)
    }
};

const updateUsers = async (req, res, next) => {
    try {
        const id = req.params.id;
        const payload = req.body;

        const updateUser = await Users.findByIdAndUpdate(id, payload, { new: true });
        if (!updateUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', updateUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
    next(error)
};

const deleteUsers = async (req, res, next) => {
    try {
        const id = req.params.id;

        const deleteUser = await Users.findByIdAndDelete(id);
        if (!deleteUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err });
    }
}
module.exports = {
    getUsers,
    createUsers,
    updateUsers,
    deleteUsers
}
