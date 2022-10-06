import * as express from 'express';
import { Cat, CatType } from './app.model';

const app: express.Express = express(); // express 인스턴스
// const app: express.Application = express();
const port = 8000;

app.use((req, res, next) => {
    // middleware를 거쳐서 라우터로 보낸다.
    // 순서나 위치에 따라 미들웨어의 적용 범위가 다르다.
    console.log(req.rawHeaders[1]); // 어디서 요청보냈는지 확인
    console.log('this is logging middleware');
    // next: 다음 라우터로 이동하는 함수
    next();
})

// 특정 라우터에만 미들웨어를 적용하는 또 다른 방법
app.get('/cats/som', (req, res, next) => {
    console.log(req.rawHeaders[1]);
    console.log('this is som middleware');
    next();
})

// Router를 통해 요청을 받는다.
app.get('/', (req: express.Request, res: express.Response) => {
   res.send({ cats: Cat })
})

app.get('/cats/blue', (req, res, next: express.NextFunction) => {
    res.send({ blue: Cat[0] });
})

app.get('/cats/som', (req, res) => {
    res.send({ som: Cat[1] });
})

// 존재하지 않는 라우터로 요청받았을 경우를 처리하는 미들웨어(마지막에 위치한다.)
app.use((req, res, next) => {
    console.log('this is error middleware');
    res.send({ error: '404 not found error' });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})