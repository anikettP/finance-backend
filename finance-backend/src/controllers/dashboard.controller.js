const dashboardService = require('../dashboard/dashboard.service');
const sendResponse = require('../utils/response.util');

const getSummary = async (req, res, next) => {
  try {
    const data = await dashboardService.getDashboardSummary();
    sendResponse(res, 200, true, 'Dashboard summary fetched successfully', data);
  } catch (error) {
    next(error);
  }
};

const getMonthlyTrend = async (req, res, next) => {
  try {
    const data = await dashboardService.getMonthlyTrend();
    sendResponse(res, 200, true, 'Monthly trend fetched successfully', data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSummary,
  getMonthlyTrend,
};
