const Record = require('../models/record.model');

const createRecord = async (recordData, userId) => {
  return await Record.create({
    ...recordData,
    createdBy: userId,
  });
};

const getRecords = async (query = {}, userId, userRole) => {
  // If user is viewer, only show records with proper filter (though usually anyone can see all for dashboard)
  // But here, it says "Get all records (all roles)"

  const { type, category, startDate, endDate, search, page = 1, limit = 10 } = query;

  const mongoQuery = { isDeleted: false };

  if (type) mongoQuery.type = type;
  if (category) mongoQuery.category = category;
  if (startDate || endDate) {
    mongoQuery.date = {};
    if (startDate) mongoQuery.date.$gte = new Date(startDate);
    if (endDate) mongoQuery.date.$lte = new Date(endDate);
  }

  if (search) {
    mongoQuery.$or = [
      { note: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;
  const records = await Record.find(mongoQuery)
    .populate('createdBy', 'name email')
    .sort('-date')
    .skip(skip)
    .limit(limit);

  const total = await Record.countDocuments(mongoQuery);

  return {
    records,
    pagination: {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    },
  };
};

const getRecordById = async (id) => Record.findOne({ _id: id, isDeleted: false });

const updateRecord = async (id, updateData) =>
  Record.findOneAndUpdate({ _id: id, isDeleted: false }, updateData, {
    new: true,
    runValidators: true,
  });

const deleteRecord = async (id) =>
  Record.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });

module.exports = {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
};
