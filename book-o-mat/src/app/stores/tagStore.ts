import { makeAutoObservable, runInAction } from 'mobx';
import { Tag } from '../models/tag';
import agent from '../api/agent';

export default class TagStore {
  tags: Tag[] = [];

  constructor() {
    this.loadTags().catch(error => console.log(error));
    makeAutoObservable(this);
  }

  get getTags() {
    return this.tags;
  };

  loadTags = async () => {
    try {
      const tags = await agent.Tags.list();
      runInAction(() => this.tags = tags);
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

  deleteTag = async (id: string) => {
    try {
      await agent.Tags.delete(id);
      runInAction(() => {
        this.tags = [...this.tags.filter(t => t.id !== id)];
      });
    } catch (error) {
      console.log(error);
    }
  };
}