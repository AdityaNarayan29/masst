import { Injectable } from '@nestjs/common';
import { prisma } from '@{{PROJECT_NAME}}/database';

@Injectable()
export class TenantsService {
  async findById(id: string) {
    return prisma.tenant.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    });
  }

  async update(id: string, data: { name?: string }) {
    return prisma.tenant.update({
      where: { id },
      data,
    });
  }
}
