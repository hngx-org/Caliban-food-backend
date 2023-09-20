module.exports = (sequelize, DataTypes) => {

    const Reward = sequelize.define("reward", {
        senderId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        receiverId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        redeemed: {
            type: DataTypes.BOOLEAN
        },
        note: {
            type: DataTypes.TEXT
        }
    
    })

    return Reward

}