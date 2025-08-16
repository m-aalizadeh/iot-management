A NestJS application for processing and managing X-ray data from IoT devices, featuring RabbitMQ integration and MongoDB storage.

Table of Contents

- Features
- Prerequisites
- Installation
- Configuration
- Running the Application

Features

- 🐇 RabbitMQ Integration: Processes messages from IoT devices
- 🗄 MongoDB Storage: Stores processed X-ray signals
- 📡 REST API: CRUD operations for signal data
- 📊 Data Analysis: Calculates statistics and metrics
- 📝 Swagger Documentation: Interactive API documentation

Prerequisites

- Node.js v16+
- npm or yarn
- MongoDB
- RabbitMQ

Installation
Clone the repository: git clone git@github.com:m-aalizadeh/iot-management.git <br>
cd iot-management <br>
Install dependencies:<br>
npm install <br>

Configuration <br>
Create a .env file in the root directory:<br>
RABBITMQ_URL=amqp://localhost:5672<br>
MONGODB_URI=mongodb://localhost:27017/iot-xray<br>

Running the Application<br>
npm run start:dev
