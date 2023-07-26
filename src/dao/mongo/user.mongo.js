import { UserModel } from "./models/user.model.js"


class UserManagerMongo { // manager User
    constructor() {
        //  iniciar la base de datos
        this.userModel = UserModel
    }

    getUser     = async (limit=10, page=1)=> await this.userModel.paginate({ },{limit, page, lean: true})
    
    getByIdUser = async (uid) => await this.userModel.findOne({_id: uid})
    
    createUser  = async (newUser)=> await this.userModel.create(newUser)
    
    updateUser = async (uid, userUpdate) => await this.userModel.findOneAndUpdate({_id: uid}, userUpdate)

    deleteUser = async (uid) => await this.userModel.findOneAndDelete({_id: uid})

}
    
export default UserManagerMongo