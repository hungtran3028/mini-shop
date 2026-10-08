'use client';

import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col-brand">
            <Link href="/" className="footer-logo">
              🌿 MINI <span>SHOP</span>
            </Link>
            <p className="footer-about">
              Thương hiệu chuyên cung cấp đồ thủ công mỹ nghệ mây tre đan, gốm sứ Bát Tràng và nội thất gỗ mộc mạc tinh tế. Tôn vinh giá trị đôi bàn tay nghệ nhân Việt Nam trong không gian sống hiện đại.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Bộ Sưu Tập Nổi Bật</h4>
            <ul className="footer-links">
              <li><Link href="/products?category=do-thu-cong">Đồ Thủ Công Mây Tre</Link></li>
              <li><Link href="/products?category=do-my-nghe">Gốm Sứ Hỏa Biến & Mỹ Nghệ</Link></li>
              <li><Link href="/products?category=noi-that-gia-dung">Nội Thất Gỗ Mộc Gia Dụng</Link></li>
              <li><Link href="/products">Tất Cả Sản Phẩm</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Chăm Sóc Khách Hàng</h4>
            <ul className="footer-links">
              <li><Link href="/products">Chính Sách Bảo Hành & Đổi Trả</Link></li>
              <li><Link href="/products">Hướng Dẫn Bảo Quản Mây Tre Đan</Link></li>
              <li><Link href="/products">Quy Trình Giao Hàng Toàn Quốc</Link></li>
              <li><Link href="/cart">Kiểm Tra Giỏ Hàng</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Xưởng & Liên Hệ</h4>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: 8 }}>
              📍 Làng Nghề Mây Tre Đan & Gốm Sứ Mỹ Nghệ
            </p>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: 8 }}>
              📞 Hotline: 093.114.4858
            </p>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
              🌐 Đào Tạo AI Sao Việt - Dự án Vibe Coding AI-03
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 MINI SHOP DECOR. Trung tâm Đào tạo AI Sao Việt. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
