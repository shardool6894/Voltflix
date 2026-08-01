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
const dismissReportServices = async () => {
    const report = await Report.findById(req.params.id);
    if (!report) {
        return res.status(404).json({
            success: false,
            message: "Report not found"
        });
    }
    report.status = "closed";
    report.dismissedAt = new Date();
    report.dismissedBy = req.user._id;
    await report.save();
}
module.exports = { getAllReportsServices, createReportServices, updateReportStatusServices, dismissReportServices }