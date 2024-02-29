const user = require("./Users");
module.exports = (sequelize,DataTypes)=>{
    const tweet = sequelize.define("tweet",{
        twid:{
            type:DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement:true
        },
        userid:{
            type : DataTypes.INTEGER,
        },
        twtext : DataTypes.STRING(400),
        media:  DataTypes.INTEGER(400),

        numlikes :{
            type : DataTypes.INTEGER
        },
        numretweets:{
            type : DataTypes.INTEGER
        },
    },{
        tableName: "tweet",
        createdAt: "twtime",  //sequilizer khud he update kar deta hai time
        updatedAt: false,
    }
  );

   return tweet;
}