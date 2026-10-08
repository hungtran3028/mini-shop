'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout } = useAuth();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMobileOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClass = isScrolled ? "site-header scrolled" : "site-header";

  return (
    <>
      <header className={headerClass}>
        <div className="container header-container">
          <Link href="/" className="brand-logo" title="Mini Shop Decor">
            <span>🌿 MINISHOP <span className="logo-accent">DECOR</span></span>
          </Link>
          
          <nav className="main-nav">
            <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>Trang Chủ</Link>
            <Link href="/products" className={`nav-link ${pathname === "/products" ? "active" : ""}`}>Tất Cả Sản Phẩm</Link>
            <Link href="/products?category=do-thu-cong" className="nav-link">Đồ Thủ Công</Link>
            <Link href="/products?category=do-my-nghe" className="nav-link">Đồ Mỹ Nghệ</Link>
            <Link href="/products?category=noi-that-gia-dung" className="nav-link">Nội Thất Decor</Link>
          </nav>
          
          <div className="header-actions">
            {/* Elegant Search Bar */}
            <form onSubmit={handleSearchSubmit} style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}>
              <input 
                type="text" 
                className={`header-search-input ${isSearchOpen ? "open" : ""}`}
                placeholder="Tìm đồ decor..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: isSearchOpen ? "180px" : "0px",
                  opacity: isSearchOpen ? 1 : 0,
                  padding: isSearchOpen ? "8px 36px 8px 12px" : "0px",
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  outline: "none",
                  border: isSearchOpen ? "1px solid #cbd5e1" : "none",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              />
              <button 
                type="button" 
                className="action-btn" 
                title="Tìm kiếm"
                onClick={() => {
                  if (isSearchOpen) {
                    if (searchQuery.trim()) {
                      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
                      setSearchQuery("");
                      setIsSearchOpen(false);
                    } else {
                      setIsSearchOpen(false);
                    }
                  } else {
                    setIsSearchOpen(true);
                  }
                }}
                style={{
                  position: isSearchOpen ? "absolute" : "static",
                  right: isSearchOpen ? "2px" : "auto",
                  zIndex: 2,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </form>

            {/* Wishlist Link */}
            <Link href="/wishlist" className="action-btn" title="Yêu thích">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
            </Link>

            {/* Cart Link */}
            <Link href="/cart" className="action-btn" title="Giỏ hàng">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cartCount > 0 && <span className="action-badge cart-badge">{cartCount}</span>}
            </Link>

            {/* User Account / Admin */}
            <div style={{ position: "relative" }}>
              {user ? (
                <button
                  type="button"
                  className="action-btn"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: user.role === "admin" ? "#f59e0b" : "#2563eb",
                    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, fontSize: "0.8rem"
                  }}>
                    {user.fullname ? user.fullname.charAt(0).toUpperCase() : "U"}
                  </div>
                </button>
              ) : (
                <Link href="/login" className="action-btn" title="Đăng nhập">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </Link>
              )}

              {/* User Dropdown */}
              {showUserDropdown && user && (
                <div style={{
                  position: "absolute", right: 0, top: "calc(100% + 10px)",
                  background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)", minWidth: 200, zIndex: 100,
                  padding: "10px 0"
                }}>
                  <div style={{ padding: "8px 16px", borderBottom: "1px solid #f1f5f9" }}>
                    <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a" }}>{user.fullname}</p>
                    <p style={{ fontSize: "0.75rem", color: "#64748b" }}>{user.email}</p>
                  </div>
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setShowUserDropdown(false)}
                      style={{ display: "block", padding: "8px 16px", fontSize: "0.85rem", color: "#d97706", fontWeight: 600 }}
                    >
                      ⚙️ Khu Vực Quản Trị
                    </Link>
                  )}
                  <button
                    onClick={() => { logout(); setShowUserDropdown(false); }}
                    style={{
                      width: "100%", textAlign: "left", padding: "8px 16px",
                      fontSize: "0.85rem", color: "#ef4444", background: "none", border: "none",
                      cursor: "pointer", fontWeight: 500
                    }}
                  >
                    🚪 Đăng xuất
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button 
              className="action-btn mobile-menu-toggle" 
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              title="Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isMobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {isMobileOpen && (
          <div className="mobile-nav-panel">
            <Link href="/" className="mobile-nav-link" onClick={() => setIsMobileOpen(false)}>Trang Chủ</Link>
            <Link href="/products" className="mobile-nav-link" onClick={() => setIsMobileOpen(false)}>Tất Cả Sản Phẩm</Link>
            <Link href="/products?category=do-thu-cong" className="mobile-nav-link" onClick={() => setIsMobileOpen(false)}>Đồ Thủ Công</Link>
            <Link href="/products?category=do-my-nghe" className="mobile-nav-link" onClick={() => setIsMobileOpen(false)}>Đồ Mỹ Nghệ</Link>
            <Link href="/products?category=noi-that-gia-dung" className="mobile-nav-link" onClick={() => setIsMobileOpen(false)}>Nội Thất Decor</Link>
            <Link href="/admin" className="mobile-nav-link" onClick={() => setIsMobileOpen(false)} style={{ color: "#f59e0b" }}>Khu Quản Trị</Link>
          </div>
        )}
      </header>
    </>
  );
};
