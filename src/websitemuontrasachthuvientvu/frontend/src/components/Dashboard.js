import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import { FaUsers, FaBook, FaChartLine } from "react-icons/fa";
import axios from "axios";

ChartJS.register(
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

const Dashboard = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    const [statistics, setStatistics] = useState({
        topUsers: [],
        topBooks: [],
        topCategories: []
    });

    useEffect(() => {
        axios
            .get("http://localhost/websitemuontrasachthuvientvu/backend/get_statistics.php")
            .then((response) => {
                setStatistics(response.data);
                console.log("API Response:", response.data);
            })
            .catch((error) => console.error("Error fetching statistics:", error));
    }, []);

    const topUsersData = {
        labels: statistics.topUsers.map((user) => user.name),
        datasets: [
            {
                label: "Số lượt mượn sách trong tháng",
                data: statistics.topUsers.map((user) => user.borrow_count),
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1
            }
        ]
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: Math.max(...statistics.topUsers.map((user) => user.borrow_count)) + 1,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    const topBooksData = {
        labels: statistics.topBooks.map((book) => book.title),
        datasets: [
            {
                data: statistics.topBooks.map((book) => book.borrow_count),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)"
                ],
                borderWidth: 1
            }
        ]
    };

    const topCategoriesData = {
        labels: statistics.topCategories.map((category) => category.name),
        datasets: [
            {
                label: "Số lượng sách của thể loại",
                data: statistics.topCategories.map((category) => category.total_quantity),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderWidth: 1,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(75, 192, 192, 1)"
            }
        ]
    };

    return (
        <div className="container mx-auto mt-8 px-4">
            <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-10">
                📊 Dashboard - Thống kê
            </h1>

            {/* Biểu đồ cột */}
            <div className="mb-10 p-6 shadow-lg rounded-lg bg-white border border-gray-200">
                <div className="flex items-center mb-4">
                    <FaUsers className="text-blue-500 text-2xl mr-2" />
                    <h2 className="text-xl font-semibold text-gray-800">
                        Người dùng mượn sách nhiều nhất trong tháng
                    </h2>
                </div>
                <div className="chart-container h-[300px] w-full">
                    <Bar data={topUsersData} options={barOptions} />
                </div>
            </div>

            {/* Biểu đồ tròn */}
            <div className="mb-10 p-6 shadow-lg rounded-lg bg-white border border-gray-200">
                <div className="flex items-center mb-4">
                    <FaBook className="text-green-500 text-2xl mr-2" />
                    <h2 className="text-xl font-semibold text-gray-800">
                        Sách được mượn nhiều nhất trong tháng
                    </h2>
                </div>
                <div className="chart-container h-[300px] w-full">
                    <Pie data={topBooksData} options={{ maintainAspectRatio: false }} />
                </div>
            </div>

            {/* Biểu đồ đường */}
            <div className="p-6 shadow-lg rounded-lg bg-white border border-gray-200">
                <div className="flex items-center mb-4">
                    <FaChartLine className="text-purple-500 text-2xl mr-2" />
                    <h2 className="text-xl font-semibold text-gray-800">
                        Loại sách có nhiều sách nhất trong thư viện
                    </h2>
                </div>
                <div className="chart-container h-[300px] w-full">
                    <Line data={topCategoriesData} options={{ maintainAspectRatio: false }} />
                </div>
            </div>
        </div>
    );

};

export default Dashboard;
