const Record = require('../models/record.model');
const mongoose = require('mongoose');

const getDashboardSummary = async () => {
  const summary = await Record.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: null,
        totalIncome: {
          $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] },
        },
        totalExpenses: {
          $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalIncome: 1,
        totalExpenses: 1,
        netBalance: { $subtract: ['$totalIncome', '$totalExpenses'] },
      },
    },
  ]);

  const categoryTotals = await Record.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: '$category',
        total: { $sum: '$amount' },
      },
    },
    { $sort: { total: -1 } },
  ]);

  const recentTransactions = await Record.find({ isDeleted: false })
    .sort('-date')
    .limit(5)
    .populate('createdBy', 'name');

  return {
    summary: summary[0] || { totalIncome: 0, totalExpenses: 0, netBalance: 0 },
    categoryWise: categoryTotals,
    recentTransactions,
  };
};

const getMonthlyTrend = async () => {
  const trend = await Record.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' },
          type: '$type',
        },
        total: { $sum: '$amount' },
      },
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 },
    },
    {
      $group: {
        _id: {
          year: '$_id.year',
          month: '$_id.month',
        },
        income: {
          $sum: { $cond: [{ $eq: ['$_id.type', 'income'] }, '$total', 0] },
        },
        expense: {
          $sum: { $cond: [{ $eq: ['$_id.type', 'expense'] }, '$total', 0] },
        },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  return trend;
};

module.exports = {
  getDashboardSummary,
  getMonthlyTrend,
};
