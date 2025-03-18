import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../features/candlestickSlice'
import io from 'socket.io-client';

const socket = io('http://localhost:4004');

const CandlestickChart = () => {

    const dispath = useDispatch()
    const { data, status } = useSelector((state) => state.data)
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    useEffect(() => {
        dispath(fetchData({ startTime, endTime }));

        socket.on('newCandlestick', newData => {
            dispath(fetchData({ startTime, endTime }));
        });

        return () => {
            socket.off('newCandlestick');
        }
    }, [dispath, startTime, endTime]);

    return (
        <div>
           
        </div>
    )
}

export default CandlestickChart
