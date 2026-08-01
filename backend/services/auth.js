const { userModel } = require('../models/users')
const registerServices = async (userData) => {
    const existingUser = await userModel.findByEmail(userData.email)
    if (existingUser) {
        throw new Error('email taken')
    }
    const user = new userModel(userData)
    await user.save()
    return user;
}
const loginServices = async (userData) => {
    const user = await userModel.findByEmail(userData.email)
    if (!user) {
        throw new Error('Email or Password is incorrect')
    }
    const isMatchingPassword = await user.comparePassword(userData.password)
    if (!isMatchingPassword) {
        throw new Error('Email or Password is incorrect')
    }
    const authToken = user.signAuthToken();
    const refreshToken = user.signRefreshToken();
    return { user, authToken, refreshToken };
}

const getProfileServices = async (userId) => {
    const user = await userModel.findById(userId)
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}

const updateProfileServices = async (userId, newData) => {
    delete newData.password;
    delete newData.email;
    const updatedUser = await userModel.findByIdAndUpdate(userId, {
        $set: newData
    },
        {
            new: true,
            runValidators: true
        })
    if (!updatedUser) {
        throw new Error('user not found')
    }
    return updatedUser;
}

const changePasswordServices = async (userId, currentPassword, newPassword) => {
    if (currentPassword === newPassword) {
        throw new Error(`New password cannot be the same as before`)
    }
    let user = await userModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const isCorrectCurrentPassword = await user.comparePassword(currentPassword);
    if (!isCorrectCurrentPassword) {
        throw new Error(`Current password is incorrect`)
    }
    user.password = newPassword;
    await user.save();
    return user;
}

const deleteProfileServices = async (userId) => {
    const deletedUser = await userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
        throw new Error('User not found');
    }
    return { message: 'Profile deleted successfully' };
};
module.exports = { registerServices, loginServices, getProfileServices, updateProfileServices, changePasswordServices, deleteProfileServices }