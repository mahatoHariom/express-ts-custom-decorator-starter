
import { Injectable } from "../../../decorators/injectable";
import { PrismaService } from "../prisma/prisma.services";


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async create(data: { name: string; email: string;password:string }) {
    return this.prisma.user.create({
      data:{
        name:data.name,
        email:data?.email,
        password:data.password
       

      }
    });
  }
}
