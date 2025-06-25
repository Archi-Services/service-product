import express from 'express';

const router = express.Router();

router.get('/ping', (req, res) => {
  res.json({ message: 'Backend OK 🚀' });
});

export default router;
