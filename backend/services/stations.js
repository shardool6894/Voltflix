const { connect } = require('node:http2');
const { chargingStationModel } = require('../models/stations');

const returnAllStationsLiterallyServices = async () => {
    const data = await chargingStationModel.find({})
    return data;
}
const returnAllStationsServices = async (latitude, longitude, maxDistance) => {
    const data = await chargingStationModel.find({
        location: {
            $near: {
                $geometry: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
                $maxDistance: parseInt(maxDistance, 10)
            }
        }
    })
    return data;
}

const returnAvailableStationsServices = async (latitude, longitude, maxDistance) => {
    const unfilteredData = await returnAllStationsServices(latitude, longitude, maxDistance);
    const filteredData = unfilteredData.filter((element) => {
        return (element.status === "available")
    })
    return filteredData
}

const returnInUseStationsServices = async (latitude, longitude, maxDistance) => {
    const unfilteredData = await returnAllStationsServices(latitude, longitude, maxDistance);
    const filteredData = unfilteredData.filter((element) => {
        return (element.status === "in-use")
    })
    return filteredData
}

const returnFaultyStationsServices = async (latitude, longitude, maxDistance) => {
    const unfilteredData = await returnAllStationsServices(latitude, longitude, maxDistance);
    const filteredData = unfilteredData.filter((element) => {
        return (element.status === "fault")
    })
    return filteredData
}
//make admin access only
const createStationServices = async (data) => {
    const obj = {
        name : data.name,
        address : data.address,
        location : {
            type : data.location.type,
            coordinates : data.location.coordinates
        },
        connectors : data.connectors,
        status : data.status,
        network : data.network
    }
    const savedData = await chargingStationModel.create(obj);
    return savedData;
} 

const updateStationServices = async (id,data) => {
    const obj = {
        id : data._id,
        name : data.name,
        address : data.address,
        location : {
            type : data.location.type,
            coordinates : data.location.coordinates
        },
        connectors : data.connectors,
        status : data.status,
        network : data.network
    }
    // const originalData = await chargingStationModel.findById(obj.id)
    const updatedData = await chargingStationModel.findByIdAndUpdate(obj.id,obj,{new : true, runValidators : true})
    return updatedData;
}

const deleteStationServices = async (id) => {
    await chargingStationModel.findByIdAndDelete(id);
    return 'deletion successful'
}
module.exports = { returnAllStationsLiterallyServices, returnAllStationsServices, returnAvailableStationsServices, returnInUseStationsServices, returnFaultyStationsServices, createStationServices, updateStationServices, deleteStationServices }