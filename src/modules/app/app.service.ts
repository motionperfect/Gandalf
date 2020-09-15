import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class AppService {
  ping() {
    const duration = moment.duration(process.uptime(), 'seconds');

    return { uptime: duration.humanize() };
  }
}
