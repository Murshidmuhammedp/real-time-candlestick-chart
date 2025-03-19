import { db } from "../config/db.js";
import { io } from "../config/socket.js";
import ApiError from "../utils/apiError.js";

export const getCandlestickData = async (req, res, next) => {
    try {
        const { startTime, endTime, timeFrame } = req.query;
        const collection = db.collection('candlestickData');

        var query = {};

        if (startTime && endTime) {
            query.timestamp = {
                $gte: new Date(startTime),
                $lte: new Date(endTime),
            };
        } else if (timeFrame) {
            const now = new Date();
            let startTimeFilter;

            switch (timeFrame) {
                case "1m":
                    startTimeFilter = new Date(now.getTime() - 1 * 60 * 1000);
                    break;
                case "5m":
                    startTimeFilter = new Date(now.getTime() - 5 * 60 * 1000);
                    break;
                case "15m":
                    startTimeFilter = new Date(now.getTime() - 15 * 60 * 1000);
                    break;
                case "1h":
                    startTimeFilter = new Date(now.getTime() - 60 * 60 * 1000);
                    break;
                case "1d":
                    startTimeFilter = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                    break;
                default:
                    return res.status(400).json({ error: "Invalid timeframe" });
            }

            query.timestamp = { $gte: startTimeFilter };
        }

        const data = await collection.find(query).toArray();

        return res.status(200).json({ message: "Data fetch Successfully", data: data });

    } catch (error) {
        next(error)
    }
};

export const createCandlestickData = async (req, res, next) => {
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