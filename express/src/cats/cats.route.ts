import { Cat } from "./cats.model";
import { Router } from 'express';

const router = Router();

// READ 고양이 전체 데이터 모두 조회
router.get('/cats', (req, res) => {
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
router.get('/cats/:id', (req, res) => {
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
router.post('/cats', (req, res) => {
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

export default router;