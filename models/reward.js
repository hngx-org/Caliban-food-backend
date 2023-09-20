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
        reedeemed: {
            type: DataTypes.BOOLEAN
        },
        C: {
            type: DataTypes.TEXT
        }

    })

    return Reward

}