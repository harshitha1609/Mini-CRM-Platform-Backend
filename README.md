# Mini CRM Platform

## Project Overview
This project, built for the **Xeno SDE Internship Assignment 2025**, is a Mini CRM Platform that allows users to create marketing campaigns and define audience segments based on customer data. It consists of two main components:
- **Frontend**: A campaign creation UI built with Next.js, hosted on Vercel.
- **Backend**: A Node.js/Express API with Kafka pub-sub architecture for asynchronous data persistence, integrated with MongoDB Atlas, and hosted on Render.

## Local Setup Instructions

### Prerequisites
- **Node.js**: Version 18 or higher (tested with v22.14.0).
- **Kafka**: Install Kafka and Zookeeper (tested with Kafka 3.9.0).
- **MongoDB Atlas**: Set up a MongoDB Atlas account and create a database named `xeno-crm`.
- **Git**: To clone the repositories.
- **Command Prompt**: For running commands on Windows (or any terminal on other OS).

### Backend Setup
1. **Clone the Backend Repository**:
   ```bash
   git clone https://github.com/harshitha1609/Mini-CRM-Platform-Backend.git
   cd Mini-CRM-Platform-Backend
   ```
2. **Start Zookeeper and Kafka**:
   - Navigate to your Kafka installation directory (e.g., `C:\kafka`).
   - Start Zookeeper:
     ```bash
     cd C:\kafka
     .\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
     ```
   - Start Kafka in a new Command Prompt window:
     ```bash
     cd C:\kafka
     .\bin\windows\kafka-server-start.bat .\config\server.properties
     ```
   - Create the Kafka topic `your-topic-name`:
     ```bash
     .\bin\windows\kafka-topics.bat --create --topic your-topic-name --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
     ```
3. **Set Up the Backend**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `backend` directory with your MongoDB Atlas connection string:
     ```
     MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/xeno-crm?retryWrites=true&w=majority&appName=<appName>
     ```
     - Replace `<username>`, `<password>`, `<cluster>`, and `<appName>` with your MongoDB Atlas credentials.
   - Start the backend server:
     ```bash
     npm start
     ```
   - Start the Kafka consumer in a new Command Prompt window:
     ```bash
     cd C:\Users\harshitha\temp\Mini-CRM-Platform-Backend\backend
     node kafkaConsumer.js
     ```

### Frontend Setup
1. **Clone the Frontend Repository**:
   ```bash
   git clone https://github.com/harshitha1609/Mini-CRM-Frontend.git
   cd Mini-CRM-Frontend
   ```
2. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```
3. **Start the Frontend Server**:
   ```bash
   npm run dev
   ```
4. **Access the Application**:
   - Open your browser and go to `http://localhost:3000/campaign` to access the campaign creation UI.
   - **Note**: The backend server must be running for the campaign creation UI to function. Kafka runs locally, so campaign creation will work fully only in the local setup.

## Summary of AI Tools and Other Tech Used
- **Backend Tech Stack**:
  - **Node.js with Express**: For building the REST API to handle customer data ingestion and campaign creation.
  - **Kafka (`kafka-node`)**: For pub-sub architecture, enabling asynchronous data persistence.
  - **MongoDB Atlas**: Cloud database for storing customer data.
  - **Other Tools**: `dotenv` for environment variables, `mongoose` for MongoDB integration, `cors` for enabling CORS.
- **Frontend Tech Stack**:
  - **Next.js**: For building the campaign creation UI.
- **Hosting**:
  - **Render**: Backend API hosting.
  - **Vercel**: Frontend UI hosting.

## Known Limitations or Assumptions
- **AI Features**: Not included due to focus on core functionality.
- **MongoDB Access**: Assumes MongoDB Atlas is accessible and configured correctly with the IP whitelist allowing local and Render connections.

## Repository Links
- Backend Repository: [https://github.com/harshitha1609/Mini-CRM-Platform-Backend](https://github.com/harshitha1609/Mini-CRM-Platform-Backend)
- Frontend Repository: [https://github.com/harshitha1609/Mini-CRM-Frontend](https://github.com/harshitha1609/Mini-CRM-Frontend)
