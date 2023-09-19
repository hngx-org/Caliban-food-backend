module.exports = (sequelize, DataTypes) => {

    const Reward = sequelize.define("reward", {
        senderid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        receiverid: {
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