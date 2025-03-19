import { db } from "../config/db.js";
import { io } from "../config/socket.js";
import ApiError from "../utils/apiError.js";

export const getCandlestickData = async (req, res) => {
    try {
        const { startTime, endTime, timeFrame } = req.query;
        const collection = db.collection('candlestickData');

        var query = {};

        if (startTime && endTime) {
            query.timestamp = {
                $gte: new Date(startTime),
                $lte: new Date(endTime),
            };
        }

        const data = await collection.find(query).toArray();

        return res.status(200).json({ message: "Data fetch Successfully", data: data });

    } catch (error) {
        next(error)
    }
};

export const createCandlestickData = async (req, res) => {
    try {
        const { open, high, low, close, volume } = req.body;

        if (
            typeof open !== "number" ||
            typeof high !== "number" ||
            typeof low !== "number" ||
            typeof close !== "number" ||
            typeof volume !== "number"
        ) {
            throw new ApiError(400, "Invalid input data. Numbers are required.");
        }

        const collection = db.collection('candlestickData');

        const newData = {
            timestamp: new Date(),
            open,
            high,
            low,
            close,
            volume
        };

        await collection.insertOne(newData);

        io.emit('newCandlestick', newData);

        return res.status(201).json({ message: "Data Stored successfully", data: newData });

    } catch (error) {
        next(error)
    }
};