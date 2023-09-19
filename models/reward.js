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
            type: DataTypes.INTEGER
        },
        reedeemed: {
            type: DataTypes.BOOLEAN
        },
        note: {
            type: DataTypes.STRING
        }
    
    })

    return Reward

}