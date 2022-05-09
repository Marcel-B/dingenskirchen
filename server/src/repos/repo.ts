import { MongoClient, ObjectId } from 'mongodb';

class Repo<T> {
  //private url = 'mongodb://root:example@localhost:8081';
  private url = 'mongodb://marcel:h00terNullOne0ne@192.168.2.103:8099';
  private dbName = 'aqua';
  private client: MongoClient;

  constructor(private collection: string) {
    this.client = new MongoClient(this.url);
  }

  private async getDb() {
    await this.client.connect();
    return this.client.db(this.dbName);
  }

  async get(query = {}, limit = 0) {
    try {
      const db = await this.getDb();
      let items = db.collection(this.collection).find(query);
      if (limit > 0) {
        items = items.limit(limit);
      }
      return await items.toArray();
    } catch (error) {
      throw error;
    } finally {
      await this.client.close();
    }
  }

  async getById(id: string) {
    try {
      const db = await this.getDb();
      const item = await db.collection(this.collection)
        .findOne({ _id: new ObjectId(id) });
      return item;
    } catch (error) {
      throw error;
    } finally {
      await this.client.close();
    }
  }

  async add(item: T) {
    try {
      const db = await this.getDb();
      const addedItem = await db
        .collection(this.collection)
        .insertOne(item);
      return addedItem.insertedId;
    } catch (error) {
      throw error;
    } finally {
      await this.client.close();
    }
  }

  async remove(id: string) {
    try {
      const db = await this.getDb();
      const result = await db
        .collection(this.collection)
        .deleteOne({ _id: new ObjectId(id) });
      return id;
    } catch (error) {
      throw error;
    } finally {
      await this.client.close();
    }
  }

  async loadData(data: T[]) {
    try {
      const db = await this.getDb();
      return await db
        .collection(this.collection)
        .insertMany(data);
    } catch (error) {
      throw error;
    } finally {
      await this.client.close();
    }
  }
}

export default Repo;