const crypto = require('crypto');

// Function to generate a random salt
function generateSalt() {
  return crypto.randomBytes(16).toString('hex');
}

// Function to hash the password using PBKDF2 with the given salt
function hashPassword(password, salt) {
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash;
}

// Function to create a salted hash by combining the salt and hashed password
function createSaltedHash(password) {
  // Generate a salt
  const salt = generateSalt();
  // Hash the password with the generated salt
  const hashedPassword = hashPassword(password, salt);
  // Return the salt and hashed password as a single string
  return `${salt}.${hashedPassword}`;
}

// Function to verify a password against a stored salted hash
function verifyPassword(inputPassword, storedHash) {
  // Split the stored salted hash into its components
  const [salt, storedPasswordHash] = storedHash.split('.');
  // Hash the input password with the stored salt
  const inputPasswordHash = hashPassword(inputPassword, salt);
  // Compare the input password's hash with the stored password hash
  return inputPasswordHash === storedPasswordHash;
}

// Usage example
const password = 'myPassword123';
const saltedHash = createSaltedHash(password);
console.log('Salted Hash:', saltedHash);

const inputPassword = 'myPassword123';
const isPasswordCorrect = verifyPassword(inputPassword, saltedHash);
console.log('Password is correct:', isPasswordCorrect);
