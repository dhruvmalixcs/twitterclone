/* done in class */
module.exports = (sequelize,DataTypes)=>{
    const users = sequelize.define("users",
    {
        userid:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        username:{
            type:DataTypes.STRING,
            unique:true,
            allownull:false
        },
        passwordhash:{
            type:DataTypes.STRING,
            allownull:false,
        },
        gender:DataTypes.STRING,
        mobile:DataTypes.STRING,
        email : {
            type:DataTypes.STRING,
            defaultValue : "def@gmail.com"
        },
        pic: DataTypes.STRING,
        profiletext:{
            type:DataTypes.STRING,
            defaultValue:"hey there",
        }
    },{
        tableName: "users",
        timestamps: false,
    });
    return users;
};