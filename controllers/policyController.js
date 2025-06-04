const User = require('../models/User');
const Policy = require('../models/Policy');
const PolicyCategory = require('../models/PolicyCategory');
const PolicyCarrier = require('../models/PolicyCarrier');

exports.searchByUsername = async (req, res) => {
  try {
    const username = req.body.username;
    if (!username) return res.status(400).json({ message: 'Username is required' });

    const user = await User.findOne({ first_name: new RegExp(`^${username}$`, 'i') });
// console.log(user,'user');
    if (!user) return res.status(404).json({ message: 'User not found' });

      res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.aggregatePoliciesByUser = async (req, res) => {
    try {
      const result = await Policy.aggregate([
        {
          $group: {
            _id: "$user_id",
            total_policies: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user"
          }
        },
        { $unwind: "$user" },
        {
          $project: {
            user_name: "$user.first_name",
            total_policies: 1
          }
        }
      ]);
  
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  
