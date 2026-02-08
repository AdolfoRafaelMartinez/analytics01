import { Router } from 'express';

const router = Router();

// Page rendering route
router.get('/demo', (req, res) => {
    res.render('demo');
});

export default router;
