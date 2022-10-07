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
// logging middleware
app.get('/cats/som', (req, res, next) => {
    console.log(req.rawHeaders[1]);
    console.log('this is som middleware');
    next();
})

// json middleware: express에서 json을 읽을 수 있도록 하는 미들웨어 추가
app.use(express.json());

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

// READ 고양이 전체 데이터 모두 조회
app.get('/cats', (req, res) => {
    try {
        const cats = Cat;
        // throw new Error('db connect error');
        res.status(200).send({
            success: true,
            data: {
                cats,
            }
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
        })
    }
})

// READ 특정 고양이 데이터 조회
// 동적 라우팅
app.get('/cats/:id', (req, res) => {
    try {
        const params = req.params;
        const cats = Cat.find((cat) => {
            return cat.id === params.id;
        });
        // throw new Error('db connect error');
        res.status(200).send({
            success: true,
            data: {
                cats,
            }
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
        })
    }
})

// CREATE 새로운 고양이 추가
app.post('/cats', (req, res) => {
    try {
        const data = req.body;
        Cat.push(data);

        res.status(200).send({
            success: true,
            data: { data },
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
})

// 존재하지 않는 라우터로 요청을 받았을 경우를 처리하는 미들웨어
// 404 middleware
app.use((req, res, next) => {
    console.log('this is error middleware');
    res.send({ error: '404 not found error' });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})