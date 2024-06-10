import { PrismaClient } from "@prisma/client";
import { Injectable } from "../../../decorators/injectable";



@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }
}
