# DevDocSync

A comprehensive documentation synchronization system with backend and frontend components.

## Project Structure

```
devdocsync/
├── backend/
│   └── fastapi_app/        # FastAPI backend service (includes Flask functionality)
│       ├── main.py         # Main FastAPI application
│       ├── api/            # API routes
│       ├── models/         # Database models
│       ├── services/       # Business logic services
│       ├── db.py           # Database configuration
│       └── websocket/      # WebSocket handlers
├── frontend/               # React frontend
│   ├── public/             # Static assets
│   └── src/
│       ├── components/     # React components
│       ├── pages/          # Page components
│       ├── api/            # API client functions
│       └── App.jsx         # Main App component
├── README.md               # This file
└── docker-compose.yml      # Docker orchestration
```

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- Docker (optional)

### Backend Setup

1. Navigate to the backend directory
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run FastAPI app:
   ```bash
   cd backend/fastapi_app
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Docker Setup

Run the entire application stack:

```bash
docker-compose up
```

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License.
