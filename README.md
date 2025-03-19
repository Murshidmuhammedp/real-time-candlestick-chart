Candlestick Chart Visualization

This project is a real-time Candlestick Chart visualization tool built with React, Redux, and ApexCharts, using Socket.io for real-time updates. It allows users to filter historical price data based on date ranges and predefined timeframes.

🚀 Features

📊 Real-time Candlestick Chart updates using Socket.io.

🗂️ Historical Data Filtering using Start Time & End Time.

⏳ Timeframe Selection (1m, 5m, 15m, 1h, 1d).

🎨 Fully Responsive Design using Tailwind CSS.

⚡ Fast & Efficient Backend powered by Node.js, Express.js, and MongoDB.

🛠️ Technologies Used

Frontend:

React.js – UI framework

Redux Toolkit – State management

ApexCharts – Candlestick chart visualization

Socket.io-client – Real-time updates

Tailwind CSS – Styling

Backend:

Node.js & Express.js – API backend

MongoDB – Database

Socket.io – WebSocket for real-time updates


📥 Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/Murshidmuhammedp/real-time-candlestick-chart.git

cd real-time-candlestick-chart

2️⃣ Backend Setup

cd Backend  # Navigate to backend folder

npm install  # Install dependencies

Create a .env file inside backend/ and configure the following:

PORT=4004

MONGO_URI=your_mongodb_connection_string

Run the backend server:

npm start

3️⃣ Frontend Setup

cd front-end  # Navigate to frontend folder

npm install  # Install dependencies

Run the React app:

npm run dev

🏗️ Architecture Overview

Backend Architecture:

The backend exposes a REST API that allows fetching candlestick data.

It listens for new candlestick entries and broadcasts updates via Socket.io.

Data is stored in MongoDB.

Frontend Architecture:

Uses React + Redux for state management.

Fetches data via Redux Thunks and updates UI dynamically.

Implements Socket.io-client to receive live updates.

Uses ApexCharts to visualize candlestick data.

🎯 Design Decisions

Why ApexCharts? ✅ Supports interactive candlestick charts with smooth animations.

Why Redux Toolkit? ✅ Simplifies state management & API calls with RTK Query.

Why Tailwind CSS? ✅ Speeds up styling and ensures responsive design.

Why Socket.io? ✅ Enables real-time updates without refreshing the page.

📌 API Endpoints

1️⃣ Get Candlestick Data

GET /api/candlestick?startTime=YYYY-MM-DD&endTime=YYYY-MM-DD&timeFrame=1h

Response:

{
  "message": "Data fetched successfully",
  "data": [
    { "timestamp": "2024-03-17T12:00:00Z", "open": 100, "high": 105, "low": 98, "close": 102 }
  ]
}

2️⃣ Create Candlestick Data

POST /api/candlestick

Body:

{
  "open": 100,
  "high": 110,
  "low": 98,
  "close": 105,
  "volume": 5000
}

🛠️ Future Enhancements

✅ User Authentication (Login/Signup)

✅ Database Optimization (Indexing & Aggregation Pipelines)

✅ Advanced Chart Indicators (Moving Averages, RSI, etc.)

🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request or open an Issue.
