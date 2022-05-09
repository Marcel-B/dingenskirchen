import { MongoClient, ObjectId } from 'mongodb';
import { Duengung } from 'shared-types';

const duengungRepo = () => {
  const url = 'mongodb://root:example@localhost:8081';
  const dbName = 'aqua';

  async function get(query = {}, limit = 0) {
    const client = new MongoClient(url);
    try {
      await client.connect();
      const db = client.db(dbName);
      let items = db.collection('duengungen').find(query);
      if (limit > 0) {
        items = items.limit(limit);
      }
      return await items.toArray();
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }

  async function getById(id: string) {
    const client = new MongoClient(url);
    try {
      await client.connect();
      const db = client.db(dbName);
      const item = await db.collection('duengungen')
        .findOne({ _id: new ObjectId(id) });
      return item;
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }

  async function add(item: Duengung) {
    const client = new MongoClient(url);
    try {
      await client.connect();
      const db = client.db(dbName);
      const addedItem = await db.collection('duengungen').insertOne(item);
      console.log(addedItem.insertedId);
      return addedItem.insertedId;
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }

  async function remove(id: string) {
    const client = new MongoClient(url);
    try {
      await client.connect();
      const db = client.db(dbName);
      const result = await db.collection('duengungen').deleteOne({ _id: new ObjectId(id) });
      console.log(result);
      return id;
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }

  async function loadData(data) {
    const client = new MongoClient(url);
    try {
      await client.connect();
      const db = client.db(dbName);
      return await db.collection('duengungen').insertMany(data);
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }

  return { loadData, get, getById, add, remove };
};

export default duengungRepo();
