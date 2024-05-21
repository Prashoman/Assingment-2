import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
        await mongoose.connect(config.databaseUrl as string);
        app.listen(config.port, () => {
        console.log(`Server is running  listening on port ${config.port}`)
        })
  } catch (err: string | any) {
    throw new Error(err);
    
  }
}
main()
