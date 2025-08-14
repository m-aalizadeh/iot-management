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
Clone the repository:

git clone git@github.com:m-aalizadeh/iot-management.git
cd iot-management
Install dependencies:
npm install

Configuration
Create a .env file in the root directory:
RABBITMQ_URL=amqp://localhost:5672
MONGODB_URI=mongodb://localhost:27017/iot-xray

Running the Application
npm run start:dev
