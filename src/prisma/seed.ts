import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.item.createMany({
    data: [
      {
        title: 'Bateria',
        description:
          'As baterias levam de 500 a 1.000 anos para se degradar...',
        points: 80,
        weight: 250,
      },
      {
        title: 'Celular',
        description: 'Um celular leva cerca de 1.000 anos para se decompor...',
        points: 70,
        weight: 200,
      },
      {
        title: 'Impressora',
        description: 'As impressoras possuem cartuchos com tinta tóxica...',
        points: 60,
        weight: 800,
      },
      {
        title: 'Mouse',
        description: 'O mouse leva cerca de 450 anos para se degradar...',
        points: 40,
        weight: 150,
      },
      {
        title: 'Notebook',
        description:
          'Notebooks contêm metais e plásticos que demoram séculos para se decompor...',
        points: 90,
        weight: 1500,
      },
      {
        title: 'Placa Mãe',
        description: 'A placa mãe leva até 1.000 anos para se decompor...',
        points: 50,
        weight: 500,
      },
      {
        title: 'Teclado',
        description:
          'O teclado, feito de plástico, leva cerca de 500 anos para se decompor...',
        points: 40,
        weight: 200,
      },
      {
        title: 'Televisão',
        description:
          'Uma televisão pode levar até 1.000 anos para se decompor...',
        points: 100,
        weight: 10000,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
