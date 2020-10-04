import { NotFoundException } from '@nestjs/common';

export class LocalAccountNotFoundException extends NotFoundException {
  static unauthorized(): LocalAccountNotFoundException {
    const message = 'Incorrect email or password. Try again, please.';

    return new LocalAccountNotFoundException(message);
  }

  static fromId(id: string): LocalAccountNotFoundException {
    const message = 'Local account with ID #' + id + ' not found.';

    return new LocalAccountNotFoundException(message);
  }
}
