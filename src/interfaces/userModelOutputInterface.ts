import { Document, ObjectId } from 'mongoose';

export default interface UserModelOutputInterface extends Document {
  username: String;
  password: String;
}