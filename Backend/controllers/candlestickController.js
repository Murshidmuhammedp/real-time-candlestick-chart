import { db } from "../config/db.js";
import { io } from "../config/socket.js";

export const getCandlestickData = async (req, res) => {
    try {
        const { startTime, endTime, timeframe } = req.query;

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
        console.log(error)
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
}

export const createCandlestickData = async (req, res) => {
    try {
        const { timestamp, open, high, low, close, volume } = req.query;

        const collection = db.collection('candlestickData');

        const newData = {
            timestamp: new Date(timestamp),
            open,
            high,
            low,
            close,
            volume
        };

        await collection.insertOne(newData);

        io.emit('newCandlestick', newData);

        return res.status(201).json({ message: "Data Stored", data: newData });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
}