module.exports = function(sequelize, DataTypes) {

    
            return sequelize.define('definition', {
                description: DataTypes.STRING,
                logType: DataTypes.STRING, /* by time, reps, weight, ... */
                owner: DataTypes.INTEGER
            },{
        });
    };
    
