import { NotFoundException } from '@nestjs/common';

export class LocalAccountNotFoundException extends NotFoundException {
  static authorized(): LocalAccountNotFoundException {
    const message = 'The email or password is incorrect. Try again, please.';

    return new LocalAccountNotFoundException(message);
  }

  static fromId(id: string): LocalAccountNotFoundException {
    const message = 'Local account with ID #' + id + ' not found.';

    return new LocalAccountNotFoundException(message);
  }
}
