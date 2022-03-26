import { MongoClient } from 'mongodb';

export interface Messung {
  wert: number;
  typ: string;
  zeitpunkt: Date;
}

const aquaRepo = () => {
  const url = 'mongodb://root:example@localhost:8081';
  const dbName = 'aqua';
  const messwertCollection = 'messwerte';

  const get = async (query = {}, limit = 0) => {
    const client = new MongoClient(url);
    try {
      await client.connect();
      const db = client.db(dbName);
      let items = db.collection<Messung>(messwertCollection).find(query);
      if (limit > 0) {
        items = items.limit(limit);
      }
      return await items.toArray();

    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  };

  const add = async (item: Messung) => {
    const client = new MongoClient(url);
    try {
      await client.connect();
      const db = client.db(dbName);
      const addedItem = await db.collection(messwertCollection).insertOne(item);
      return addedItem.insertedId;
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  };
  return { get, add };
};
export default aquaRepo();