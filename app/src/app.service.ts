import { Injectable } from "@nestjs/common";
import * as moment from "moment";

import { APIConfigService } from "./config/api/api.service";

@Injectable()
export class AppService {

  constructor (
    private readonly apiConfigService: APIConfigService
  ) {}

  ping () {
    const { prefix, version } = this.apiConfigService;
    const duration = moment.duration(process.uptime(), "seconds");

    return { version, uptime: duration.humanize(), service: prefix };
  }
}
