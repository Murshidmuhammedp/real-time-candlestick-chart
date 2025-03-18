import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../features/candlestickSlice'
import io from 'socket.io-client';
import Chart from 'react-apexcharts';

const socket = io('http://localhost:4004');

const CandlestickChart = () => {

    const dispatch = useDispatch()
    const { data, status } = useSelector((state) => state.data);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    useEffect(() => {
        dispatch(fetchData({ startTime, endTime }));

        socket.on('newCandlestick', (newData) => {
            dispatch(fetchData({ startTime, endTime }));
        });

        return () => {
            socket.off('newCandlestick');
        };
    }, [dispatch, startTime, endTime]);

    const chartOptions = {
        chart: {
            type: "candlestick",
            height: 400,
        },
        xaxis: {
            type: "datetime",
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
        },
    };

    const series = [{
        data: data.map(d => ({
            x: new Date(d.timestamp),
            y: [d.open, d.high, d.low, d.close]
        }))
    }];

    return (
        <div className="min-h-screen flex flex-col items-center p-4 bg-black">
            <div className="w-full max-w-2xl flex flex-wrap gap-4 justify-center">
                <input
                    type="date"
                    onChange={e => setStartTime(e.target.value)}
                    className="p-2 border bg-blue-400 rounded-lg w-full sm:w-auto"
                />
                <input
                    type="date"
                    onChange={e => setEndTime(e.target.value)}
                    className="p-2 border bg-blue-400 rounded-lg w-full sm:w-auto"
                />
                <button
                    onClick={() => dispatch(fetchData({ startTime, endTime }))}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full sm:w-auto"
                >
                    Fetch Data
                </button>
            </div>

            <div className="w-full mt-4">
                {status === 'loading' ? (
                    <p className="text-white text-center">Loading...</p>
                ) : (
                    <Chart type="candlestick" series={series} options={chartOptions} height="600px" />
                )}
            </div>
        </div>
    );
};


export default CandlestickChart
