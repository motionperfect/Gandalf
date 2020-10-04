import { Injectable } from '@nestjs/common';
import moment from 'moment';

@Injectable()
export class HealthService {
  ping() {
    const duration = moment.duration(process.uptime(), 'seconds');

    return { uptime: duration.humanize() };
  }
}
