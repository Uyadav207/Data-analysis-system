# Data Analysis Tool

This project is a robust data analysis tool designed to efficiently visualize plots and graphs from large CSV files. It provides an intuitive interface for users to upload CSV files, visualize data using interactive and responsive data visualization components, and manipulate visualization parameters.

## Overview

The tool is built using React JS (Vite) for the front end and Node.js for the backend. It allows users to upload CSV files, parse and process the data, and visualize it using ECharts for React. The backend is responsible for handling file uploads, parsing CSV files, and storing data in a PostgreSQL database. The frontend provides an interface for users to interact with the data, select files for visualization, and manipulate visualization parameters.

<img src="https://github.com/Uyadav207/BMW-data-analysis-system/blob/main/Benchmarks/Data-analysis-tool.png" alt="screenshot" ></img>

## Demo Video

[Watch The Demo Video](https://drive.google.com/file/d/1Mze6O2mjWeSiPV2U6hzxChCqzXW30gXZ/view?usp=drive_link)

## Features

- Quick project setup and build optimizations using React JS (Vite) for the frontend.
- Scalable backend service using Node.js with PostgreSQL database for handling large data uploads and processing.
- Interactive and responsive data visualization components using ECharts for React.
- Functionality for users to upload CSV files, visualize plots and graphs, and manipulate visualization parameters.

## Setup Instructions

1. Install Node.js if not already installed: [Node.js Installation Guide](https://nodejs.org/en/download/).
2. Clone the repository: `git clone https://github.com/Uyadav207/Data-analysis-system.git`
3. Make sure Docker and docker desktop is installed on your system.
4. cd `Data-analysis-system`
5. `docker-compose up --build` to start the application container
6. Application will be started on `localhost:5173`
7. To remove the container `docker-compose down`

> Potential Bug:  Postgres image may be buggy for the current version, please make sure to compose using command `docker-compose up --build` unless database sucessfully contected.


## Dependencies

### Backend Dependencies

- Express.js: Web application framework for Node.js.
- Multer: Middleware for handling file uploads.
- Sequelize: Promise-based ORM for Node.js.
- fast CSV: Library for parsing CSV data in stream
- fs: Creating Read stream for parsing each row  and saving it into JSon in Database
- PostgreSQL: Database management system.

### Frontend Dependencies

- React: JavaScript library for building user interfaces.
- ECharts for React: React wrapper for ECharts library.
- Axios: Promise-based HTTP client for making API requests.
- Material-UI: React component library for building UIs.

## Usage and features

1. Upload CSV files using the frontend interface.
2. Visualize data using interactive charts and graphs.
3. Manipulate visualization parameters such as chart type, colors, and axis labels.
4. Restore Visulaised plots to initial render i.e reset
5. Download visualized plots.
6. Explore details within plots by zooming in and out.
7. Set Range for visualising data for particular data ranges over x axis.
8. Filter data to be visualised: Select and Deselect Parameters to be visualised

## Benchmarks

Small File Size: 1000 - 1200 rows

<img src="https://github.com/Uyadav207/Data-analysis-system/blob/main/Benchmarks/benchmark_small_File.png" alt="screenshot" ></img>

Medium file: 10000 - 20000 rows

<img src="https://github.com/Uyadav207/Data-analysis-system/blob/main/Benchmarks/Benchmark3mb.png" alt="screenshot" ></img>

Larger File with 2000000 rows

<img src="https://github.com/Uyadav207/Data-analysis-system/blob/main/Benchmarks/Benchmark_10mb.png" alt="screenshot" ></img>

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
