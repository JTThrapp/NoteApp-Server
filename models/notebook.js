module.exports = (sequelize, DataTypes) => {
const Notebook = sequelize.define( 'notebook', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // important: {
    //     type: DataTypes.BOOLEAN,
    //     allowNull: true
    // },
    owner: {
        type: DataTypes.INTEGER,
    }
})
return Notebook;
};