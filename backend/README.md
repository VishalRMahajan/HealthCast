# FastAPI Backend

This is a basic FastAPI backend.

## Description

This project demonstrates how to create a simple backend using FastAPI, a modern, fast (high-performance), web framework for building APIs with Python 3.7+.

## Features

- User authentication
- CRUD operations for managing resources
- Docker containerization for easy deployment

## Prerequisites

- Python 3.7+
- pip (Python package manager)
- Docker (optional, for containerization)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/VishalRMahajan/CORS-Crushers.git
    ```

2. Navigate to the project directory:

    ```bash
    cd CORS-Crushers
    ```

3. Install the required dependencies:

    ```bash
    pip install -r requirements.txt
    ```

## Usage

1. Start the FastAPI server:

   Since the `main.py` file is located in the `backend` directory, you need to specify the module path as `backend.main` when starting the server.

    ```bash
    uvicorn backend.main:app --reload
    ```

2. Open your web browser and go to `http://127.0.0.1:8000/docs` to access the Swagger UI for interacting with the API.

## Deployment

  Use the following command when deploying to a cloud provider like AWS, Azure, GCP, etc:

  ```bash
  gunicorn -k uvicorn.workers.UvicornWorker backend.main:app
  ```

## Configuration

- Modify the `config.py` file to configure settings such as database connection, authentication, etc.

## Contributing

Contributions are welcome! Please feel free to open a pull request or submit an issue.

## License

This project is licensed under the [MIT License](../LICENSE.txt).
