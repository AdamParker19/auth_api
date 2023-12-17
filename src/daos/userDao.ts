import signupInterface from '../interfaces/signupInterface';
import UserModelOutputInterface from '../interfaces/userModelOutputInterface';
import User from '../models/User';

class UserDao {
  constructor() {
  }

  public getUser = async (username: String) : Promise<UserModelOutputInterface> => {
    const user : UserModelOutputInterface  = await User.findOne({ username });
    return user;
  }

  public addUser = async (user : signupInterface) : Promise<UserModelOutputInterface> => {
    const {username, password} = user
    const newUser = new User({ username, password });
    await newUser.save();
    return newUser;
  }
}

export default UserDao;
