module.exports = (sequelize, DataTypes) => {

    const Lunch = sequelize.define("lunch", {
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
            type: DataTypes.BOOLEAN,
            defaultValue: false

        },
        note: {
            type: DataTypes.TEXT
        }
    },{
        freezeTableName: true
      }
    );

    Lunch.associate = models => {
        Lunch.belongsTo(models.Organization, {
            foreignKey: "org_id",
            as:"organization"
        })
    }

    return Lunch;

}