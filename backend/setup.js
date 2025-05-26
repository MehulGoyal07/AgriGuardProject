const fs = require('fs');
const path = require('path');

// Create .env file content
const envContent = `MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/agriguard?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development`;

// Path to .env file
const envPath = path.join(__dirname, '.env');

// Check if .env file exists
if (!fs.existsSync(envPath)) {
  // Create .env file
  fs.writeFileSync(envPath, envContent);
  console.log('.env file created successfully!');
  console.log('\nPlease edit the .env file and replace:');
  console.log('1. <username> with your MongoDB Atlas username');
  console.log('2. <password> with your MongoDB Atlas password');
  console.log('3. cluster0.xxxxx.mongodb.net with your actual cluster URL');
} else {
  console.log('.env file already exists. Please check if it contains the correct MongoDB Atlas connection string.');
}

console.log('\nAfter updating the .env file, run:');
console.log('node seed/products.js'); 