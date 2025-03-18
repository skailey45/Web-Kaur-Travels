import { customAlphabet } from 'nanoid';

// Create a custom nanoid function with a secure alphabet
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const length = 21; // Default nanoid length

// Ensure length is always a positive integer
const getNanoId = (size?: number) => {
  const safeSize = Math.max(1, Math.floor(size || length));
  const nanoid = customAlphabet(alphabet, safeSize);
  return nanoid();
};

export default getNanoId;