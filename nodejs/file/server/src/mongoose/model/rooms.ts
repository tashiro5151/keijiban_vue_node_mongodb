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
interface i_rooms extends mongoose.Document {
  id: string;
  name: string;
  genreId: number;
  created_at: Date;
  updated_at: Date;
}

/**
 * model
 */
const rooms = mongoose.model(
  'rooms',
  new schema({
    id: { type: String },
    name: { type: String, minlength: 1, maxlength: 20 },
    genreId: {
      type: Number,
      min: 0,
      max: 17,
      validate: {
        validator: v => {
          if (!Number.isInteger(v)) {
            return false;
          }
          return true;
        }
      }
    },
    created_at: { type: Date },
    updated_at: { type: Date }
  }).index({ id: 1 }, { unique: true })
);

// roomsが存在するか
export const exist_check = async (id: string) => {
  const _ret = await rooms.find({ id: id });
  if (_ret.length === 0) {
    return false;
  }

  return true;
};

// 板作成
export const insert = async (params: {
  id: string;
  name: string;
  genreId: number;
  created_at: Date;
  updated_at: Date;
}) => {
  return (await rooms.insertMany([params])) as i_rooms[];
};

// 更新
export const update = async (params: { id: string }) => {
  await rooms.updateOne(
    { id: params.id },
    { $set: { updated_at: new Date() } }
  );
};

// トップ
export const info = async (params: { num: number }) => {
  return {
    list: (await rooms.aggregate([
      {
        $lookup: {
          from: 'talks',
          localField: 'id',
          foreignField: 'room_id',
          as: 'talk_info'
        }
      },
      {
        $sort: { updated_at: -1 }
      },
      {
        $skip: params.num * 10
      },
      { $limit: 10 },
      {
        $project: {
          id: '$id',
          name: '$name',
          genreId: '$genreId',
          updated_at: '$updated_at',
          count: { $size: '$talk_info.message' }
        }
      }
    ])) as {
      id: string;
      name: string;
      genreId: string;
      updated_at: Date;
      count: number;
    }[],
    count: await rooms.find({}).countDocuments()
  };
};

// 検索
export const search = async (params: { name: string; num: number }) => {
  return {
    list: (await rooms.aggregate([
      {
        $match: {
          name: { $regex: params.name }
        }
      },
      {
        $lookup: {
          from: 'talks',
          localField: 'id',
          foreignField: 'room_id',
          as: 'talk_info'
        }
      },
      {
        $sort: { updated_at: -1 }
      },
      {
        $skip: params.num * 10
      },
      { $limit: 10 },
      {
        $project: {
          id: '$id',
          name: '$name',
          genreId: '$genreId',
          updated_at: '$updated_at',
          count: { $size: '$talk_info.message' }
        }
      }
    ])) as {
      id: string;
      name: string;
      genreId: string;
      updated_at: Date;
      count: number;
    }[],
    count: await rooms.find({ name: { $regex: params.name } }).countDocuments()
  };
};

// ジャンル
export const genre = async (params: { genreId: number; num: number }) => {
  return {
    list: (await rooms.aggregate([
      {
        $match: {
          genreId: params.genreId
        }
      },
      {
        $lookup: {
          from: 'talks',
          localField: 'id',
          foreignField: 'room_id',
          as: 'talk_info'
        }
      },
      {
        $sort: { updated_at: -1 }
      },
      {
        $skip: params.num * 10
      },
      { $limit: 10 },
      {
        $project: {
          id: '$id',
          name: '$name',
          genreId: '$genreId',
          updated_at: '$updated_at',
          count: { $size: '$talk_info.message' }
        }
      }
    ])) as {
      id: string;
      name: string;
      genreId: string;
      updated_at: Date;
      count: number;
    }[],
    count: await rooms.find({ genreId: params.genreId }).countDocuments()
  };
};
