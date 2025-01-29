const express = require('express');
const axios = require('axios');
const router = express.Router();

let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" }
];

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// Get user by ID along with their orders
router.get('/:id/orders', async (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  try {
    // Change URL to the correct Order Service port
    const { data: orders } = await axios.get(`http://localhost:3002/orders/user/${userId}`);
    res.json({ ...user, orders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});

module.exports = router;
