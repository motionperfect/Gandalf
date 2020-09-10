import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  /**
   * @returns {UserNotFoundException}
   */
  static authorized(): UserNotFoundException {
    return new UserNotFoundException(
      'The email or password is incorrect. Try again, please.',
    );
  }

  /**
   * @param {string} id
   * @returns {UserNotFoundException}
   */
  static fromId(id: string): UserNotFoundException {
    return new UserNotFoundException('User with ID #' + id + ' not found.');
  }

  /**
   * @param {string} email
   * @returns {UserNotFoundException}
   */
  static fromEmail(email: string): UserNotFoundException {
    return new UserNotFoundException(
      'User with email ' + email + ' not found.',
    );
  }
}
