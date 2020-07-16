import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): { message: string, code: number } {
    return {
      message: 'Hello World!',
      code: 325
    }
  }
}
