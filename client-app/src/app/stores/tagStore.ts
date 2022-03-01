import { makeAutoObservable, runInAction } from 'mobx';
import { Tag } from '../models/tag';
import agent from '../api/agent';

export default class TagStore {
  tags: Tag[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadTags = async () => {
    try {
      this.tags = await agent.Tags.list();
    } catch (error) {
      console.log(error);
    }
  };

  createTag = async (tag: Tag) => {
    try {
      await agent.Tags.create(tag);
      runInAction(() => {
        this.tags.push(tag);
      });
    } catch (error) {
      console.log(error);
    }
  };
}