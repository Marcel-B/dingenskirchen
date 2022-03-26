import {MongoClient} from "mongodb";

const assert = require('assert');
const circulationRepo = require('./repos/circulationRepo');
const data = require('./circulation.json');

const url = "mongodb://root:example@localhost:8081";

const dbName = "circulation";

async function main() {
    const client = new MongoClient(url);
    await client.connect();
    try {
        const results = await circulationRepo.loadData(data);
        assert.equal(data.length, results.insertedCount);
        const getData = await circulationRepo.get();
        assert.equal(data.length, getData.length);

        const filterData = await circulationRepo.get({Newspaper: getData[4].Newspaper});
        assert.deepEqual(filterData[0], getData[4]);

        const limitData = await circulationRepo.get({}, 3);
        assert.equal(limitData.length, 3);

        const id = getData[4]._id.toString();
        const byId = await circulationRepo.getById(id);
        assert.deepEqual(byId, getData[4]);

        const newItem =
            {
                "Newspaper": "My paper",
                "Daily Circulation, 2004": 1,
                "Daily Circulation, 2013": 2,
                "Change in Daily Circulation, 2004-2013": 100,
                "Pulitzer Prize Winners and Finalists, 1990-2003": 0,
                "Pulitzer Prize Winners and Finalists, 2004-2014": 0,
                "Pulitzer Prize Winners and Finalists, 1990-2014": 0
            };
        const addedItem = await circulationRepo.add(newItem);
        const addedItemQuery = await circulationRepo.getById(addedItem);
        assert.deepEqual(addedItemQuery, newItem);
    } catch (error) {
        console.log(error);
    } finally {
        const admin = client.db(dbName).admin();
        //console.log(await admin.serverStatus());
        await client.db(dbName).dropDatabase();
        console.log(await admin.listDatabases());
        await client.close();
    }
}

main();
