import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(createUserDto: UserDto) {
    const { email, name, password, phone }: UserDto = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          cpf: createUserDto.cpf,
          phone,
          points: 0,
        },
      });

      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Usuário já cadastrado');
      }
      throw new InternalServerErrorException('Erro ao criar usuário');
    }
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        Donation: {
          include: {
            items: {
              include: {
                item: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const totalWeight = user.Donation.reduce((total, donation) => {
      return (
        total +
        donation.items.reduce((itemTotal, donationItem) => {
          return itemTotal + donationItem.item.weight * donationItem.quantity;
        }, 0)
      );
    }, 0);

    return {
      ...user,
      totalWeight,
    };
  }

  async remove(id: string) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
