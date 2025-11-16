import { Pagination } from '@/types/common';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

class Utility {
  /**
   * Checks if the given value is empty.
   *
   * @param {string | any} val - The value to check.
   * @return {boolean} Returns `true` if the value is empty, `false` otherwise.
   */
  public isEmpty(val: string | any): boolean {
    return val == null || val === null || val.length === 0 || Object.keys(val).length === 0;
  }

  /**
   * Calculates the pagination offset and limit based on the given page and limit values.
   *
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @return {Pagination} The pagination object containing the offset and limit.
   */
  public pagination(page: number, limit: number): Pagination {
    return { offset: (page - 1) * limit, limit: limit };
  }

  /**
   * Generates a hash value.
   *
   * @param {number} noOfBytes - The number of bytes to generate for the hash.
   * @return {string} The generated hash value.
   */
  public hash(noOfBytes: number): string {
    return crypto.randomBytes(noOfBytes).toString('hex');
  }

  /**
   * Generates a one-time password (OTP).
   *
   * @return {string} The generated OTP.
   */
  public generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Hashes the given password.
   *
   * @param {string|Buffer} password - The password to hash.
   * @return {string} The hashed password.
   */
  public async hashPassword(password: string | Buffer): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  /**
   * Compares the given password with the hashed password.
   *
   * @param {string|Buffer} password - The password to compare.
   * @param {string} hashedPassword - The hashed password to compare with.
   * @return {boolean} Returns true if the password matches the hashed password, false otherwise.
   */
  public async comparePassword(password: string | Buffer, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export default new Utility();
