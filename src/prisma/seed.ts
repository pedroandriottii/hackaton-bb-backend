import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.item.createMany({
    data: [
      {
        title: 'Bateria',
        description:
          'As baterias levam de 500 a 1.000 anos para se degradar...',
        img: 'https://firebasestorage.googleapis.com/v0/b/upload-images-16007.appspot.com/o/images_hackathon%2Fbateria.jpg?alt=media&token=7c60800a-e2f4-4a0f-bd9d-685ba03fb429',
        points: 80,
        weight: 250,
      },
      {
        title: 'Celular',
        description: 'Um celular leva cerca de 1.000 anos para se decompor...',
        points: 70,
        img: 'https://firebasestorage.googleapis.com/v0/b/upload-images-16007.appspot.com/o/images_hackathon%2Fcelulat.jpg?alt=media&token=21295e62-e6f5-485d-adf8-26399ac1d094',
        weight: 200,
      },
      {
        title: 'Impressora',
        description: 'As impressoras possuem cartuchos com tinta tóxica...',
        img: 'https://firebasestorage.googleapis.com/v0/b/upload-images-16007.appspot.com/o/images_hackathon%2Fimpressora.jpg?alt=media&token=4d474f4c-734c-4633-a8a6-fe2b4914e0c3',
        points: 60,
        weight: 800,
      },
      {
        title: 'Mouse',
        description: 'O mouse leva cerca de 450 anos para se degradar...',
        img: 'https://firebasestorage.googleapis.com/v0/b/upload-images-16007.appspot.com/o/images_hackathon%2Fmouse.jpg?alt=media&token=ddd5ea24-639c-41db-af35-ca9736a5ee81',
        points: 40,
        weight: 150,
      },
      {
        title: 'Notebook',
        description:
          'Notebooks contêm metais e plásticos que demoram séculos para se decompor...',
        img: 'https://firebasestorage.googleapis.com/v0/b/upload-images-16007.appspot.com/o/images_hackathon%2Fnotebook.jfif?alt=media&token=0f9cb131-b691-4b88-8dba-b6d2a40d1264',
        points: 90,
        weight: 1500,
      },
      {
        title: 'Placa Mãe',
        description: 'A placa mãe leva até 1.000 anos para se decompor...',
        img: 'https://firebasestorage.googleapis.com/v0/b/upload-images-16007.appspot.com/o/images_hackathon%2Fplaca_mae.jpg?alt=media&token=f578c0b2-129b-459f-a1a9-58acb408e366',
        points: 50,
        weight: 500,
      },
      {
        title: 'Teclado',
        description:
          'O teclado, feito de plástico, leva cerca de 500 anos para se decompor...',
        img: 'https://firebasestorage.googleapis.com/v0/b/upload-images-16007.appspot.com/o/images_hackathon%2Fteclado.jpg?alt=media&token=eed72614-8687-41c6-9aef-3904859cd637',
        points: 40,
        weight: 200,
      },
      {
        title: 'Televisão',
        description:
          'Uma televisão pode levar até 1.000 anos para se decompor...',
        img: 'https://firebasestorage.googleapis.com/v0/b/upload-images-16007.appspot.com/o/images_hackathon%2Ftelevisao.jpg?alt=media&token=6c86f393-8029-4eff-b2d5-39a416b28676',
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
