'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { INITIAL_PRODUCTS_DATA } from "@/lib/products-data";
import { fetchProductsFromSupabase } from "@/lib/supabase";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";

export default function CollectionPage() {
  const [productsList, setProductsList] = useState<Product[]>(
    INITIAL_PRODUCTS_DATA.filter(p => p.category === "do-my-nghe")
  );

  useEffect(() => {
    fetchProductsFromSupabase().then(data => {
      if (data && data.length > 0) {
        setProductsList(data.filter(p => p.category === "do-my-nghe"));
      }
    });
  }, []);

  return (
    <>
      <section className="collection-hero">
        <div className="container">
          <div className="breadcrumb" style={{ marginBottom: 16 }}>
            <Link href="/" style={{ color: "#cbd5e1" }}>Trang Chủ</Link>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>&rsaquo;</span>
            <Link href="/products" style={{ color: "#cbd5e1" }}>Sản Phẩm</Link>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>&rsaquo;</span>
            <span style={{ color: "var(--color-accent)", fontWeight: 700 }}>GỐM SỨ & ĐỒ MỸ NGHỆ</span>
          </div>

          <div style={{ width: "100%" }}>
            <span style={{ display: "inline-block", background: "rgba(37, 99, 235, 0.2)", color: "#93c5fd", border: "1px solid #60a5fa", padding: "4px 14px", borderRadius: 30, fontSize: "0.75rem", fontWeight: 700, letterSpacing: 1.5, marginBottom: 10 }}>
              🏺 GỐM BÁT TRÀNG & ĐÈN TRE
            </span>
            <h1 style={{ fontSize: "2.1rem", fontWeight: 800, marginBottom: 8, color: "#fff" }}>
              GỐM SỨ & ĐỒ MỸ NGHỆ
            </h1>
            <p style={{ fontSize: "0.95rem", color: "#cbd5e1", lineHeight: 1.5, margin: 0 }}>
              Bộ sưu tập bình gốm hỏa biến độc bản, đèn lồng nan tre mang ánh sáng thiền định ấm áp.
            </p>
          </div>
        </div>
      </section>

      <section className="products-page-section" style={{ padding: "60px 0 90px", background: "var(--color-bg-secondary)" }}>
        <div className="container">
          <div className="products-top-bar" style={{ marginBottom: 30 }}>
            <div className="products-result-count">
              Hiển thị <strong>{productsList.length}</strong> sản phẩm trong danh mục
            </div>
          </div>

          <div className="products-grid">
            {productsList.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
