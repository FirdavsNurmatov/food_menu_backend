import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.food.createMany({
    data: [
      {
        name: 'Osh',
        image: 'osh.jpg',
        price: 25000,
        description:
          'Guruch, sabzi, go‘sht va ziravorlardan tayyorlanadigan mashhur o‘zbek taomi.',
      },
      {
        name: 'Somsa',
        image: 'somsa.jpg',
        price: 8000,
        description:
          'Go‘shtli yoki kartoshkali ichlik bilan tayyorlangan tandir somsasi.',
      },
      {
        name: 'Lagʻmon',
        image: 'lagmon.jpg',
        price: 22000,
        description:
          'Qo‘l bilan choʻzilgan xamir, sabzavotlar va go‘shtli sous bilan tayyorlanadi.',
      },
      {
        name: 'Shashlik',
        image: 'shashlik.jpg',
        price: 18000,
        description:
          'Ko‘mirda pishirilgan go‘sht bo‘lagi — piyoz va ziravorlar bilan.',
      },
      {
        name: 'Manti',
        image: 'manti.png',
        price: 20000,
        description:
          'Bug‘da pishirilgan go‘shtli xamirli taom, pomidor sousi bilan tortiladi.',
      },
      {
        name: 'Chuchvara',
        image: 'chuchvara.jpg',
        price: 16000,
        description:
          'Mayda xamir ichiga go‘sht solib pishirilgan, qaynatilgan taom.',
      },
    ],
  });

  console.log('✅ 6 ta o‘zbekcha taom muvaffaqiyatli qo‘shildi!');
}

main()
  .catch((e) => {
    console.error('❌ Seed xatosi:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
