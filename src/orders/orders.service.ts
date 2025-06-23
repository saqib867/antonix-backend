import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: DatabaseService) {}
  async create(createOrderDto: CreateOrderDto) {
    const { items } = createOrderDto;
    const create = await this.prismaService.order.create({
      data: {
        items: {
          create: items.map((item: any) => ({
            title: item.title,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });
    return create;
  }

  async findAll() {
    // I can paginate here but I will leave it as it is
    const res = await this.prismaService.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });

    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
