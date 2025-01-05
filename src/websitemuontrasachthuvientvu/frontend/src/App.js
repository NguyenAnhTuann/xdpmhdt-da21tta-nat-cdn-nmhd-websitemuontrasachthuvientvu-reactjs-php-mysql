import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookList from "./components/BookList";
import Register from "./components/Register";
import Login from "./components/Login";
import EditProfile from "./components/EditProfile";
import BookDetail from "./components/BookDetail";
import BorrowRequest from "./components/BorrowRequest";
import { BorrowProvider } from "./components/BorrowContext";
import Users from "./components/admin/Users";
import Books from "./components/admin/Books";
import Categories from "./components/admin/Categories";
import Publishers from "./components/admin/Publishers";
import AdminDashboard from "./components/admin/AdminDashboard";
import BorrowRequests from "./components/admin/BorrowRequests";
import ForgotPassword from "./components/ForgotPassword";
import BorrowList from "./components/admin/BorrowList";



function App() {
    const [user, setUser] = useState(null);

    // Kiểm tra localStorage khi load trang
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <BorrowProvider>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Header user={user} setUser={setUser} />
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<BookList />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login setUser={setUser} />} />
                            <Route path="/edit-profile" element={<EditProfile />} />
                            <Route path="/book/:id" element={<BookDetail />} />
                            <Route path="/borrow-request" element={<BorrowRequest />} />
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/admin/books" element={<Books />} />
                            <Route path="/admin/users" element={<Users />} />
                            <Route path="/admin/publishers" element={<Publishers />} />
                            <Route path="/admin/categories" element={<Categories />} />
                            <Route path="/admin/borrow-requests" element={<BorrowRequests />} />
                            <Route path="/admin/borrow-list" element={<BorrowList />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />


                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </BorrowProvider>
    );
}

export default App;
