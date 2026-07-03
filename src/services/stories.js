import { Story } from "../models/story.js";

export const createStory = async (payload) => {
    return await Story.create(payload);
}