module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define('note', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: true
        },
        important: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        owner: {
            type: DataTypes.INTEGER
        }
    })
    return Note;
};

