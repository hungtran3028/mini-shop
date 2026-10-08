'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { INITIAL_PRODUCTS_DATA } from "@/lib/products-data";
import { fetchProductsFromSupabase } from "@/lib/supabase";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS_DATA);

  useEffect(() => {
    fetchProductsFromSupabase().then((data) => {
      if (data && data.length > 0) setProducts(data);
    });
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <>
      {/* Hero Banner Section */}
      <section className="hero-section" style={{ position: "relative", overflow: "hidden", minHeight: "520px", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}>
          <img 
            src="/assets/images/banner/banner-trang-chu-mini-shop.webp" 
            alt="Mini Shop Decor Banner" 
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.65)"
            }}
          />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2, padding: "80px 20px", color: "#ffffff" }}>
          <span style={{
            display: "inline-block",
            padding: "6px 16px",
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(8px)",
            borderRadius: "30px",
            fontSize: "0.85rem",
            fontWeight: 600,
            letterSpacing: "1px",
            marginBottom: "18px",
            textTransform: "uppercase"
          }}>
            🌿 Tinh hoa thủ công Việt Nam
          </span>
          <h1 style={{
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            maxWidth: "650px",
            marginBottom: "20px"
          }}>
            Không Gian Sống Mộc Mạc & Tinh Tế
          </h1>
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            maxWidth: "520px",
            color: "#e2e8f0",
            marginBottom: "32px",
            lineHeight: 1.6
          }}>
            Bộ sưu tập đồ thủ công mây tre đan, gốm sứ nung củi và nội thất decor phong cách tối giản cho tổ ấm hiện đại.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/products" className="btn-primary" style={{
              background: "#ffffff",
              color: "#0f172a",
              padding: "14px 32px",
              borderRadius: "9999px",
              fontWeight: 700,
              fontSize: "0.95rem"
            }}>
              Khám Phá Sản Phẩm &rarr;
            </Link>
            <Link href="/products?category=do-thu-cong" style={{
              background: "rgba(255,255,255,0.15)",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.4)",
              backdropFilter: "blur(6px)",
              padding: "14px 28px",
              borderRadius: "9999px",
              fontWeight: 600,
              fontSize: "0.95rem"
            }}>
              Đồ Mây Tre Đan
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Categories Highlights */}
      <section style={{ padding: "60px 0 30px" }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px"
          }}>
            <Link href="/products?category=do-thu-cong" style={{
              background: "#f1f5f9",
              padding: "28px",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }}>
              <span style={{ fontSize: "2rem", marginBottom: "12px" }}>🧺</span>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>Đồ Thủ Công</h3>
              <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Giỏ mây, khay gỗ sồi, tranh macrame đan tay tỉ mỉ.</p>
              <span style={{ marginTop: "16px", fontSize: "0.85rem", fontWeight: 600, color: "#2563eb" }}>Xem danh mục &rarr;</span>
            </Link>

            <Link href="/products?category=do-my-nghe" style={{
              background: "#f1f5f9",
              padding: "28px",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }}>
              <span style={{ fontSize: "2rem", marginBottom: "12px" }}>🏺</span>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>Đồ Mỹ Nghệ</h3>
              <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Bình gốm hỏa biến Bát Tràng, đèn lồng tre ánh sáng ấm.</p>
              <span style={{ marginTop: "16px", fontSize: "0.85rem", fontWeight: 600, color: "#2563eb" }}>Xem danh mục &rarr;</span>
            </Link>

            <Link href="/products?category=noi-that-gia-dung" style={{
              background: "#f1f5f9",
              padding: "28px",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }}>
              <span style={{ fontSize: "2rem", marginBottom: "12px" }}>🛋️</span>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>Nội Thất Decor</h3>
              <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Sofa Bắc Âu, bàn ghế ăn gỗ tự nhiên, kệ trang trí đa năng.</p>
              <span style={{ marginTop: "16px", fontSize: "0.85rem", fontWeight: 600, color: "#2563eb" }}>Xem danh mục &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: "40px 0 70px" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
            <div>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#2563eb", textTransform: "uppercase" }}>Tuyển chọn tuần này</span>
              <h2 style={{ fontSize: "1.85rem", fontWeight: 800, color: "#0f172a", marginTop: "4px" }}>Sản Phẩm Nổi Bật</h2>
            </div>
            <Link href="/products" style={{ fontSize: "0.95rem", fontWeight: 600, color: "#2563eb" }}>
              Xem tất cả ({products.length}) &rarr;
            </Link>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "24px"
          }}>
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Value Pillars */}
      <section style={{ background: "#ffffff", borderTop: "1px solid #e2e8f0", padding: "60px 0" }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "32px",
            textAlign: "center"
          }}>
            <div>
              <div style={{ fontSize: "2.4rem", marginBottom: "12px" }}>✨</div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "6px" }}>Thủ Công 100%</h4>
              <p style={{ fontSize: "0.88rem", color: "#64748b" }}>Chế tác từ làng nghề truyền thống Việt Nam với độ hoàn thiện cao.</p>
            </div>
            <div>
              <div style={{ fontSize: "2.4rem", marginBottom: "12px" }}>🚚</div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "6px" }}>Đóng Gói Chống Vỡ</h4>
              <p style={{ fontSize: "0.88rem", color: "#64748b" }}>Bọc xốp khí đa tầng, bảo hiểm 1-đổi-1 khi có sự cố vận chuyển.</p>
            </div>
            <div>
              <div style={{ fontSize: "2.4rem", marginBottom: "12px" }}>🛡️</div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "6px" }}>Bảo Hành 12 Tháng</h4>
              <p style={{ fontSize: "0.88rem", color: "#64748b" }}>Cam kết chất lượng vật liệu gỗ, mây tre tự nhiên và gốm nung củi.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
