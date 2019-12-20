/**
 * コアモジュール
 */
import * as Express from 'express';
import * as mongoose from 'mongoose';

/**
 * model
 */
import {
  exist_check,
  search,
  update,
  info,
  genre,
  insert as rooms_insert
} from 'src/mongoose/model/rooms';
import { select, insert as talks_insert } from 'src/mongoose/model/talks';

const route = '/api/v1';
export const v1 = (app: Express.Application) => {
  // search
  app.get(
    route + '/search/:str/:num',
    async (req: Express.Request, res: Express.Response) => {
      try {
        res.send(
          await search({ name: req.params.str, num: Number(req.params.num) })
        );
      } catch (e) {
        res.sendStatus(500);
      }
    }
  );

  // genre
  app.get(
    route + '/rooms/:id/:num',
    async (req: Express.Request, res: Express.Response) => {
      try {
        res.send(
          await genre({
            genreId: Number(req.params.id),
            num: Number(req.params.num)
          })
        );
      } catch (e) {
        res.sendStatus(500);
      }
    }
  );

  // 最新順
  app.get(
    route + '/rooms/:num',
    async (req: Express.Request, res: Express.Response) => {
      try {
        res.send(
          await info({
            num: Number(req.params.num)
          })
        );
      } catch (e) {
        res.sendStatus(500);
      }
    }
  );

  // talks
  app.get(
    route + '/talks/:id/:num',
    async (req: Express.Request, res: Express.Response) => {
      try {
        res.send(
          await select({
            room_id: req.params.id,
            num: Number(req.params.num)
          })
        );
      } catch (e) {
        res.sendStatus(500);
      }
    }
  );

  // 板をつくる
  app.post(
    route + '/rooms',
    async (req: Express.Request, res: Express.Response) => {
      try {
        const _ret = await rooms_insert({
          id: String(new mongoose.mongo.ObjectId()),
          name: String(req.body.name),
          genreId: Number(req.body.genreId),
          created_at: new Date(),
          updated_at: new Date()
        });
        res.send({ id: _ret[0].id });
      } catch (e) {
        res.sendStatus(500);
      }
    }
  );

  // 投稿
  app.post(
    route + '/talks',
    async (req: Express.Request, res: Express.Response) => {
      try {
        // 板が存在するか
        if (!(await exist_check(String(req.body.room_id)))) {
          res.sendStatus(500);
          return;
        }

        await talks_insert({
          talkId: String(new mongoose.mongo.ObjectId()),
          room_id: String(req.body.room_id),
          name: String(req.body.name),
          message: String(req.body.message),
          ip: req.ip,
          created_at: new Date(),
          updated_at: new Date()
        });

        await update({ id: String(req.body.room_id) });

        res.send({});
      } catch (e) {
        res.sendStatus(500);
      }
    }
  );
};
