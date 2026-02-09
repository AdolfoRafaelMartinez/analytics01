import { Router } from 'express';

const router = Router();

// Page rendering route
router.get('/demo', (req, res) => {
    const { error } = req.query;
    res.render('demo', { error });
});

export default router;
