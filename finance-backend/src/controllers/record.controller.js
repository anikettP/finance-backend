const recordService = require('../services/record.service');
const sendResponse = require('../utils/response.util');

const createRecord = async (req, res, next) => {
  try {
    const record = await recordService.createRecord(req.body, req.user._id);
    sendResponse(res, 201, true, 'Record created successfully', record);
  } catch (error) {
    next(error);
  }
};

const getRecords = async (req, res, next) => {
  try {
    const data = await recordService.getRecords(
      req.query,
      req.user._id,
      req.user.role
    );
    sendResponse(res, 200, true, 'Records fetched successfully', data);
  } catch (error) {
    next(error);
  }
};

const getRecordById = async (req, res, next) => {
  try {
    const record = await recordService.getRecordById(req.params.id);
    if (!record) {
      return sendResponse(res, 404, false, 'Record not found');
    }
    sendResponse(res, 200, true, 'Record fetched successfully', record);
  } catch (error) {
    next(error);
  }
};

const updateRecord = async (req, res, next) => {
  try {
    const record = await recordService.updateRecord(req.params.id, req.body);
    if (!record) {
      return sendResponse(res, 404, false, 'Record not found');
    }
    sendResponse(res, 200, true, 'Record updated successfully', record);
  } catch (error) {
    next(error);
  }
};

const deleteRecord = async (req, res, next) => {
  try {
    const record = await recordService.deleteRecord(req.params.id);
    if (!record) {
      return sendResponse(res, 404, false, 'Record not found');
    }
    sendResponse(res, 200, true, 'Record deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
};
