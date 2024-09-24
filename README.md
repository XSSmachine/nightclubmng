
## NightClub Manager

## Overview

NightClub Manager is a web application built with React for the frontend and Python for the backend. This project aims to simplify and streamline the management of nightclubs, opening door to more services and events which can be implemented with use of technology. This project is focused more on the frontend while backend is still in development..

## Demo

Check out our video demonstration to see NightClub Manager in action:

[![YouTube](http://i.ytimg.com/vi/zq3MdWkV0c4/hqdefault.jpg)](https://www.youtube.com/watch?v=zq3MdWkV0c4)

## Table of Contents

- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Backend Setup

1. Create a new project with a pipenv virtual environment using Python 3.11:
   ```
   pipenv --python 3.11
   ```

2. Clone this repository and copy all files from the `BACKEND` directory into your new project.

3. Activate the virtual environment:
   ```
   pipenv shell
   ```

4. Install the required dependencies:
   ```
   pipenv sync
   ```

5. Start the backend server:
   ```
   uvicorn main:app --reload
   ```

The backend will be running on `http://localhost:8000`. You can access the API documentation and test endpoints at `http://localhost:8000/docs`.

### Frontend Setup

1. Navigate to the `frontend` directory.

2. Install the required dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

The frontend will be accessible at `http://localhost:3000`.

## Technologies Used

- Frontend: React.js
- Backend: Python (FastAPI)
- Database: PostgreSQL

## Contributing

We welcome contributions to the NightClub Manager project. Please feel free to get invested in this and help me bring this to production.

## License

This project is licensed under the [MIT License](LICENSE.md).

---

For any questions or support, please [open an issue](https://github.com/yourusername/nightclub-manager/issues) or contact our team at [your-email@example.com].

Citations:
