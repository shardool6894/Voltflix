const { issueReportModel } = require('../models/reports')
const { chargingStationModel } = require('../models/stations')
const getAllReportsServices = async () => {
    return await issueReportModel.find({}).sort({ createdAt: -1 });
}
const createReportServices = async (data) => {
    const trimmedName = data.stationName.trim();
    const escapedName = trimmedName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const station = await chargingStationModel.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${escapedName}$`, "i") } },
        { status: "fault" },
        { returnDocument: "after" }
    )
    if (!station) {
        throw new Error('station not registered')
    }
    const report = {
        stationName: station.name,
        issueType: data.issueType,
        description: data.description,
        reporterName: data.reporterName?.trim() || "Anonymous",
        photo : data.photo || 'No photo',
    };
    const saveReport = await issueReportModel.create(report);
    return saveReport
}

const updateReportStatusServices = async (userid, reportid, stationStatus) => {
    const report = await issueReportModel.findById(reportid);
    if (!report) {
        throw new Error('report not found')
    }
    report.status = "resolved";
    report.resolvedAt = new Date();
    report.resolvedBy = userid;
    await report.save();
    await chargingStationModel.findOneAndUpdate(
        { name: report.stationName },
        { status: stationStatus }, { returnDocument: "after" }
    );
    return report;
}
const dismissReportServices = async (userId, reportId) => {
    const report = await issueReportModel.findById(reportId);
    if (!report) {
        throw new Error('Report not found');
    }
    report.status = "closed";
    report.dismissedAt = new Date();
    report.dismissedBy = userId;
    await report.save();
    return report;
}
module.exports = { getAllReportsServices, createReportServices, updateReportStatusServices, dismissReportServices }