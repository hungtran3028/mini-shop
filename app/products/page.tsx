'use client';

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { INITIAL_PRODUCTS_DATA } from "@/lib/products-data";
import { fetchProductsFromSupabase } from "@/lib/supabase";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";

function ProductsContent() {
  const [productsList, setProductsList] = useState<Product[]>(INITIAL_PRODUCTS_DATA);
  const searchParams = useSearchParams();
  const initialSearch = searchParams?.get("search") || "";
  const initialCategory = searchParams?.get("category") || "all";
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState("all");
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    fetchProductsFromSupabase().then((data) => {
      if (data && data.length > 0) setProductsList(data);
    });
  }, []);

  let filtered = [...productsList];

  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  if (search.trim()) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  }

  if (priceRange === "under-300k") {
    filtered = filtered.filter(p => p.priceNum < 300000);
  } else if (priceRange === "300k-1m") {
    filtered = filtered.filter(p => p.priceNum >= 300000 && p.priceNum <= 1000000);
  } else if (priceRange === "over-1m") {
    filtered = filtered.filter(p => p.priceNum > 1000000);
  }

  if (sortOption === "price-asc") filtered.sort((a, b) => a.priceNum - b.priceNum);
  if (sortOption === "price-desc") filtered.sort((a, b) => b.priceNum - a.priceNum);
  if (sortOption === "name-asc") filtered.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <section className="page-banner products-page-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Trang Chủ</Link>
            <span>&rsaquo;</span>
            <span>Sản Phẩm</span>
          </div>
          <h1 className="page-title">BỘ SƯU TẬP MINI SHOP</h1>
        </div>
      </section>

      <section className="products-page-section">
        <div className="container">
          <div className="products-page-layout">
            
            <aside className="filters-sidebar">
              <div className="filter-group">
                <h3 className="filter-group-title">Danh Mục</h3>
                <ul className="filter-list">
                  {[
                    { id: "all", label: "Tất Cả Sản Phẩm", count: productsList.length },
                    { id: "do-thu-cong", label: "Đồ Thủ Công", count: productsList.filter(p => p.category === "do-thu-cong").length },
                    { id: "do-my-nghe", label: "Đồ Mỹ Nghệ", count: productsList.filter(p => p.category === "do-my-nghe").length },
                    { id: "noi-that-gia-dung", label: "Nội Thất Decor", count: productsList.filter(p => p.category === "noi-that-gia-dung").length },
                  ].map(cat => (
                    <li key={cat.id}>
                      <button 
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`filter-item-link ${selectedCategory === cat.id ? "active" : ""}`}
                        style={{ border: "none", width: "100%", background: "transparent", cursor: "pointer", textAlign: "left" }}
                      >
                        <span>{cat.label}</span>
                        <span className="filter-count">{cat.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="filter-group">
                <h3 className="filter-group-title">Khoảng Giá</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { id: "all", label: "Tất cả mức giá" },
                    { id: "under-300k", label: "Dưới 300.000đ" },
                    { id: "300k-1m", label: "300.000đ - 1.000.000đ" },
                    { id: "over-1m", label: "Trên 1.000.000đ" },
                  ].map(p => (
                    <label key={p.id} className="price-checkbox-label">
                      <input 
                        type="radio" 
                        name="priceRange" 
                        value={p.id} 
                        checked={priceRange === p.id}
                        onChange={() => setPriceRange(p.id)}
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            <main className="products-main-content">
              <div className="products-toolbar">
                <div className="toolbar-info">
                  Hiển thị <strong>{filtered.length}</strong> sản phẩm
                  {selectedCategory !== "all" && <span style={{ color: "#2563eb", marginLeft: 6 }}>({selectedCategory})</span>}
                </div>

                <div className="toolbar-sort">
                  <label htmlFor="sort-select">Sắp xếp theo:</label>
                  <select 
                    id="sort-select" 
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="sort-dropdown"
                  >
                    <option value="newest">Mới nhất</option>
                    <option value="price-asc">Giá tăng dần</option>
                    <option value="price-desc">Giá giảm dần</option>
                    <option value="name-asc">Tên A-Z</option>
                  </select>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div style={{ padding: "60px 0", textAlign: "center", color: "#64748b" }}>
                  <p style={{ fontSize: "1.1rem", marginBottom: 12 }}>Không tìm thấy sản phẩm nào phù hợp.</p>
                  <button 
                    onClick={() => { setSelectedCategory("all"); setSearch(""); setPriceRange("all"); }}
                    className="btn-primary"
                    style={{ background: "#0f172a", color: "#fff", padding: "10px 24px", borderRadius: 8, cursor: "pointer" }}
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              ) : (
                <div className="products-grid">
                  {filtered.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </main>

          </div>
        </div>
      </section>
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: "80px 0", textAlign: "center" }}>Đang tải sản phẩm...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
