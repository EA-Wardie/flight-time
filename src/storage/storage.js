import {Storage} from '@ionic/storage';

const store = new Storage();

async function initStore() {
    await store.create();
}

initStore().then(() => {
});

export default {
    async set(key, value) {
        await store.set(key, value);
    },
    async get(key) {
        return await store.get(key);
    },
    async getFromValue(key, value) {
        const keys = await store.keys();
        const items = [];

        for (const key of keys) {
            items.push(JSON.parse(await store.get(key)));
        }

        return items.find((item) => item[key] === value);
    },
    async getAll() {
        const keys = await store.keys();
        const items = [];

        for (const key of keys) {
            items.push(JSON.parse(await store.get(key)));
        }

        return items;
    },
    async remove(key) {
        await store.remove(key);
    },
    async clear() {
        await store.clear();
    },
    async length() {
        return await store.length();
    },
};