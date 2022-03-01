import { makeAutoObservable } from 'mobx';
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
}