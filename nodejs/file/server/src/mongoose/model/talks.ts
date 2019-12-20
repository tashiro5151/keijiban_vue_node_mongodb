/**
 * コアモジュール
 */
import * as mongoose from 'mongoose';

/**
 * mongoose
 */
import { schema } from 'src/mongoose';

/**
 * interface
 */
interface i_talks extends mongoose.Document {
  talkId: string;
  room_id: string;
  name: string;
  message: string;
  ip: string;
  created_at: Date;
  updated_at: Date;
}

/**
 * model
 */
const talks = mongoose.model(
  'talks',
  new schema({
    talkId: { type: String },
    room_id: { type: String },
    name: { type: String, minlength: 1, maxlength: 15 },
    message: { type: String, minlength: 1, maxlength: 150 },
    created_at: { type: Date },
    updated_at: { type: Date }
  }).index({ talkId: 1 }, { unique: true })
);

// 投稿
export const insert = async (params: {
  talkId: string;
  room_id: string;
  name: string;
  message: string;
  ip: string;
  created_at: Date;
  updated_at: Date;
}) => {
  return (await talks.insertMany([params])) as i_talks[];
};

// 投稿一覧
export const select = async (params: { room_id: string; num: number }) => {
  return {
    list: (await talks
      .find({ room_id: params.room_id })
      .sort({ updated_at: 1 })
      .skip(params.num * 100)
      .limit(100)) as i_talks[],
    count: await talks.find({ room_id: params.room_id }).countDocuments()
  };
};
