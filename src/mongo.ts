import mongoose from 'mongoose';

export const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || '', {
      // Removed useUnifiedTopology as it is no longer needed
    });
    console.log('✅ MongoDB Atlas connected');
  } catch (err) {
    console.error('❌ MongoDB Atlas connection error:', err);
  }
};
