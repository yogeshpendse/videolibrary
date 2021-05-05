import faker from "faker";

faker.seed(123);

export const data = [...Array(50)].map((item) => ({
  id: faker.datatype.uuid(),
  name: faker.lorem.words(),
  image: faker.random.image(),
  creator: faker.lorem.word(),
  duration: faker.random.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  pro: faker.datatype.boolean(),
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  date: faker.date.past(),
  videocode: faker.random.arrayElement([
    "nRUc4gTO-PE",
    "vTbILK0fxDY",
    "EgVXRtq5EIg",
    "f5SE47Xjx2Q"
  ])
}));
// datatype
