const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const env = process.env;
const DB_HOST =
  process.env.NODE_ENV === "development" ? env.DB_HOST_DEV : env.DB_HOST;
const url = `mongodb+srv://${env.DB_USER}:${env.DB_PASS}@${DB_HOST}`;

const loc = [
  { coordinates: [47.92720032, 106.90215636] },
  { coordinates: [47.9217363, 106.91082526] },
  { coordinates: [47.93037624, 106.92362309] },
  { coordinates: [47.91404099, 106.92928791] },
  { coordinates: [47.91501895, 106.89117908] },
  { coordinates: [47.92859342, 106.89135075] },
  { coordinates: [47.91064675, 106.91435337] },
  { coordinates: [47.91898812, 106.94422245] },
  { coordinates: [47.89944828, 106.9083868] },
  { coordinates: [47.89944828, 106.9083868] },
  { coordinates: [47.89242746, 106.92512378] },
  { coordinates: [47.89811711, 106.85902376] },
];

function getRandomPos() {
  const first = Math.floor(Math.random() * (loc.length - 1));
  let second;
  function rn() {
    second = Math.floor(Math.random() * (loc.length - 1));
    if (first === second) {
      rn();
    }
  }
  rn();
  return [loc[first].coordinates[1], loc[first].coordinates[0]];
}

MongoClient.connect(url, async (err, db) => {
  if (err) throw err;
  try {
    const dbo = db.db("quiz-maker");
    const repeated = await dbo.collection("deliveries").find({}).toArray();
    for await (const delivery of repeated) {
      console.log(delivery._id);
      await dbo.collection("deliveries").updateOne(
        {
          _id: ObjectID(delivery._id),
        },
        {
          $set: {
            pickUpCoords: {
              coordinates: getRandomPos(),
            },
            deliveryCoords: {
              coordinates: getRandomPos(),
            },
            rewardMoney: 2000,
          },
        }
      );
    }
    db.close();
  } catch (e) {
    console.error(e);
  }
});
