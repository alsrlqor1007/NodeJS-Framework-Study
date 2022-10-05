import * as express from 'express';

const app: express.Express = express(); // express 인스턴스
// const app: express.Application = express();
const port = 8000;

// Router를 통해 요청을 받는다.
app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World! - 클라이언트로 보내는 응답')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})