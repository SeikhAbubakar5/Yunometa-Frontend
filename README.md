# React + Vite

This is the React frontend for the Inventory Analytics Dashboard. It visualizes inventory data using charts and filters, enabling insights like category distribution, stock vs. MSL trends, and monthly consumption trends.

#Tech Stack
- React.js (Functional Components + Hooks)
- Tailwind CSS
- Recharts (for visualizations)
- Axios (for API communication)
- Context API (global filter state management)

#Features
- Global filtering with start/end date, ABC class, item name, and item ID.
- Category-wise pie chart.
- Line chart for stock vs. MSL with reference lines.
- Bar chart showing monthly consumption for top 5 items.
- Fully responsive design.
# Setup Instructions
Install dependencies:
run bash
cd frontend
npm install
# Start the development server:
npm run dev
*******************************************
Inventory Analytics Dashboard – Backend
This is the Express + MongoDB backend for the Inventory Analytics Dashboard. It provides API endpoints for category distribution, stock vs. MSL trends, and monthly consumption summaries.
Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- CORS
- dotenv for configuration
# API Endpoints
 Method  Endpoint                          Description                       
 GET     /api/categories/distribution      Get item count per category       
 GET     /api/items/\:itemId/stock-vs-msl  Get stock trend for given item ID 
 GET     /api/consumption-trend            Get monthly consumption trend     
 GET     /api/itr                          Get Inventory Turnover Ratio 

# .env
MONGODB_URI=mongodb+srv://seikhabubakar47:Seikh786@yunometa1.kuueowy.mongodb.net/?retryWrites=true&w=majority&appName=Yunometa1
#Install dependencies:
npm install
# Start the backend server:
npm start



*******************************************
