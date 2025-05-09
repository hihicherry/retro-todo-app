# 待辦事項應用

一款像素風格的待辦事項應用，支援任務管理、拖放排序、本地儲存和愛心動畫，專為中文使用者設計，採用 React 和 Tailwind CSS 構建。

## 功能

-   任務管理：新增、編輯、刪除任務，支援工作和個人類別。
-   篩選與搜尋：按完成狀態篩選（全部/已完成/未完成）或關鍵字搜尋。
-   拖放排序：使用 `react-dnd` 實現任務重新排序。
-   愛心動畫：任務完成時觸發粉色愛心動畫，提升互動性。
-   本地儲存：使用 `LocalStorage` 持久化任務數據。
-   無障礙性：支援鍵盤導航和 ARIA 屬性，適配螢幕閱讀器。
-   響應式設計：適配手機和桌面端，確保小螢幕無溢出。

## 技術棧

-   前端：React, Vite, Tailwind CSS (3.3.5)
-   拖放：react-dnd, react-dnd-html5-backend
-   樣式：像素風格（俐方體字型，紫藍色調）
-   部署：Git Page
-   其他：LocalStorage, React Context, React.memo

## 部署

-   Demo: [https://hihicherry.github.io/movie-search-app/](#)
-   GitHub: [https://github.com/hihicherry/retro-todo-app](#)

## 安裝與運行

1. 克隆 Repository：
    ```bash
    git clone https://github.com/hihicherry/retro-todo-app.git
    ```
