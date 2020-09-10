import { NotFoundException } from '@nestjs/common';

export class LocalAccountNotFoundException extends NotFoundException {
  /**
   * @returns {UserNotFoundException}
   */
  static authorized(): LocalAccountNotFoundException {
    return new LocalAccountNotFoundException(
      'The email or password is incorrect. Try again, please.',
    );
  }

  /**
   * @param {string} id
   * @returns {UserNotFoundException}
   */
  static fromId(id: string): LocalAccountNotFoundException {
    return new LocalAccountNotFoundException(
      'Local account with ID #' + id + ' not found.',
    );
  }
}
