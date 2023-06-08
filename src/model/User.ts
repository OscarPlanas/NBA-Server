import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  email: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true }
});

const User = model<IUser>('User', UserSchema);

// Users hardcodeados
const usersData = [
  {
    name: 'John Doe',
    username: 'johndoe',
    password: 'password1',
    email: 'johndoe@example.com'
  },
  {
    name: 'Jane Smith',
    username: 'janesmith',
    password: 'password2',
    email: 'janesmith@example.com'
  },

];

// Create and save the users
async function createUsers() {
  try {
    for (const userData of usersData) {
      const existingUser = await User.findOne({ username: userData.username });
      if (!existingUser) {
        const createdUser = await User.create(userData);
        console.log('User created:', createdUser);
      } else {
        console.log('User already exists:', existingUser);
      }
    }
  } catch (error) {
    console.error('Error creating users:', error);
  }
}

createUsers();

export default User;
