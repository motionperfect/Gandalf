import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  static fromId(id: string): UserNotFoundException {
    const message = 'User with ID #' + id + ' not found.';

    return new UserNotFoundException(message);
  }

  static fromEmail(email: string): UserNotFoundException {
    const message = 'User with email ' + email + ' not found.';

    return new UserNotFoundException(message);
  }
}
