import React, { createContext, useState, useEffect } from "react";

// Tạo Context
export const BorrowContext = createContext();

export const BorrowProvider = ({ children }) => {
    // Lấy thông tin người dùng từ localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // Khởi tạo danh sách mượn
    const [borrowList, setBorrowList] = useState(() => {
        if (!user || !user.id) return []; // Trả về danh sách rỗng nếu không có user
        const storedBorrowLists = localStorage.getItem("borrowLists");
        const allBorrowLists = storedBorrowLists ? JSON.parse(storedBorrowLists) : {};
        return allBorrowLists[user.id] || []; // Trả về danh sách riêng của user hiện tại
    });

    // Lưu danh sách mượn theo từng user vào localStorage
    useEffect(() => {
        if (user && user.id) {
            const storedBorrowLists = localStorage.getItem("borrowLists");
            const allBorrowLists = storedBorrowLists ? JSON.parse(storedBorrowLists) : {};
            allBorrowLists[user.id] = borrowList; // Lưu danh sách riêng cho user hiện tại
            localStorage.setItem("borrowLists", JSON.stringify(allBorrowLists));
        }
    }, [borrowList, user]);

    // Hàm thêm sách vào danh sách mượn
    const addToBorrowList = (book) => {
        if (!user || !user.id) return; // Không thực hiện nếu không có thông tin user
        setBorrowList((prevList) => {
            const existingBook = prevList.find((item) => item.id === book.id);
            if (existingBook) {
                // Nếu sách đã tồn tại, chỉ cập nhật số lượng
                return prevList.map((item) =>
                    item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevList, { ...book, quantity: 1 }]; // Thêm quantity mặc định là 1
        });
    };

    // Hàm cập nhật số lượng sách
    const updateBookQuantity = (bookId, quantity) => {
        if (!user || !user.id) return; // Không thực hiện nếu không có thông tin user
        setBorrowList((prevList) =>
            prevList.map((item) =>
                item.id === bookId ? { ...item, quantity: quantity } : item
            )
        );
    };

    // Hàm xóa toàn bộ danh sách mượn
    const clearBorrowList = () => {
        if (!user || !user.id) return; // Không thực hiện nếu không có thông tin user
        setBorrowList([]);
    };

    return (
        <BorrowContext.Provider value={{ borrowList, setBorrowList, addToBorrowList, updateBookQuantity, clearBorrowList }}>
            {children}
        </BorrowContext.Provider>
    );
};
