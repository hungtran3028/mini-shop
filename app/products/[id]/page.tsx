'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { INITIAL_PRODUCTS_DATA } from '@/lib/products-data';
import { fetchProductByIdFromSupabase } from '@/lib/supabase';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const id = params?.id as string;
  const initialProduct = INITIAL_PRODUCTS_DATA.find(p => p.id === id) || INITIAL_PRODUCTS_DATA[0];

  const [product, setProduct] = useState<Product>(initialProduct);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'guide' | 'reviews'>('desc');
  const [activeThumbMode, setActiveThumbMode] = useState<string>('full');
  const [selectedImgSrc, setSelectedImgSrc] = useState<string>(initialProduct.img);

  useEffect(() => {
    if (id) {
      fetchProductByIdFromSupabase(id).then(data => {
        if (data) {
          setProduct(data);
          setSelectedImgSrc(data.img);
        }
      });
    }
  }, [id]);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  const getMainImgTransform = (mode: string): React.CSSProperties => {
    let transform = 'scale(1) translateY(0) rotate(0deg)';
    if (mode === 'zoom-body' || mode === 'zoom') {
      transform = 'scale(1.85) translateY(-5%) rotate(0deg)';
    } else if (mode === 'texture-detail') {
      transform = 'scale(2.25) translateY(10%) rotate(0deg)';
    } else if (mode === 'bottom-detail') {
      transform = 'scale(2.4) translateY(-15%) rotate(0deg)';
    } else if (mode === 'craft-pattern') {
      transform = 'scale(2.3) translateY(5%) rotate(15deg)';
    } else if (mode === 'macro-texture') {
      transform = 'scale(2.8) translateY(0) rotate(-10deg)';
    }
    return {
      transform,
      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      transformOrigin: 'center center',
    };
  };

  const thumbnails = [
    { mode: 'full', title: 'Góc 1: Toàn cảnh sản phẩm' },
    { mode: 'zoom-body', title: 'Góc 2: Cận cảnh kiểu dáng & kích thước' },
    { mode: 'texture-detail', title: 'Góc 3: Cận cảnh thớ gỗ & đường đan tỉ mỉ' },
    { mode: 'bottom-detail', title: 'Góc 4: Cận cảnh phần chân đế & mặt đáy' },
    { mode: 'craft-pattern', title: 'Góc 5: Chi tiết hoa văn thủ công mỹ nghệ' },
    { mode: 'macro-texture', title: 'Góc 6: Siêu phóng to chất liệu tự nhiên' },
  ];

  return (
    <>
      {/* Page Banner Section */}
      <section className="page-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Trang Chủ</Link>
            <span>&rsaquo;</span>
            <Link href="/products">Sản Phẩm</Link>
            <span>&rsaquo;</span>
            <span>{product.categoryName}</span>
            <span>&rsaquo;</span>
            <span className="active-crumb">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Detail Core Section */}
      <section className="product-detail-section">
        <div className="container">
          <div className="product-detail-layout">
            
            {/* Left Column: Image Gallery Showcase */}
            <div className="detail-gallery-column">
              <div className="detail-main-img-wrapper" style={{ overflow: 'hidden', position: 'relative' }}>
                <span className="detail-badge">{product.badge || 'Bán Chạy'}</span>
                <img 
                  src={selectedImgSrc} 
                  alt={product.name} 
                  className={`detail-main-img mode-${activeThumbMode}`}
                  style={getMainImgTransform(activeThumbMode)}
                />
                <div className="zoom-hint">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                  Rê chuột để phóng to
                </div>
              </div>

              {/* Gallery Thumbnails (6 Preview Angles) */}
              <div className="detail-thumbnails-row">
                {thumbnails.map((thumb) => (
                  <div 
                    key={thumb.mode} 
                    className={`thumb-item ${activeThumbMode === thumb.mode ? 'active' : ''}`}
                    data-mode={thumb.mode}
                    title={thumb.title}
                    onClick={() => {
                      setActiveThumbMode(thumb.mode);
                    }}
                  >
                    <img src={product.img} alt={thumb.title} />
                  </div>
                ))}
              </div>

              {/* Quality Guarantee Box */}
              <div className="detail-guarantee-box">
                <div className="guarantee-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <div>
                  <h4 className="guarantee-title">CAM KẾT CHẤT LƯỢNG MINI SHOP</h4>
                  <p className="guarantee-text">100% chế tác thủ công tinh xảo • Kiểm tra hàng trước khi thanh toán • Đổi trả linh hoạt trong 7 ngày.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Product Meta & Purchase Actions */}
            <div className="detail-meta-column">
              <span className="detail-category-tag">{product.categoryName}</span>
              <h1 className="detail-product-title">{product.name}</h1>
              
              {/* Rating & Status */}
              <div className="detail-rating-row">
                <div className="stars-gold">★★★★★</div>
                <span className="rating-text">5.0 / 5.0 (38 đánh giá)</span>
                <span className="status-divider">•</span>
                <span className="in-stock-badge">✓ Còn hàng tại showroom</span>
              </div>

              {/* Price Display */}
              <div className="detail-price-box">
                <span className="detail-current-price">{product.price}</span>
                <span className="detail-vat-tag">Đã bao gồm VAT & Đóng gói mộc mạc an toàn</span>
              </div>

              {/* Short Description */}
              <p className="detail-short-desc">
                {product.desc}
              </p>

              {/* Specifications Highlights Grid */}
              <div className="detail-specs-highlights">
                <div className="spec-highlight-item">
                  <span className="spec-label">Thương hiệu:</span>
                  <strong className="spec-val">{product.specs.brand || 'Mini Shop Decor'}</strong>
                </div>
                <div className="spec-highlight-item">
                  <span className="spec-label">Chất liệu:</span>
                  <strong className="spec-val">{product.specs.material}</strong>
                </div>
                <div className="spec-highlight-item">
                  <span className="spec-label">Phong cách:</span>
                  <strong className="spec-val">Thủ công Vintage & Scandinavian</strong>
                </div>
                <div className="spec-highlight-item">
                  <span className="spec-label">Xuất xứ:</span>
                  <strong className="spec-val">{product.specs.origin || 'Việt Nam'}</strong>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="detail-quantity-row">
                <span className="qty-label">Số lượng:</span>
                <div className="quantity-control">
                  <button className="qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                  <input type="number" value={quantity} readOnly />
                  <button className="qty-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="detail-action-buttons">
                <button className="btn-add-to-cart" onClick={() => addToCart(product, quantity)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                  THÊM VÀO GIỎ HÀNG
                </button>
                
                <button className="btn-buy-now" onClick={handleBuyNow}>
                  MUA NGAY (GIAO TẬN NƠI)
                </button>

                <button 
                  className={`btn-wishlist ${isInWishlist(product.id) ? 'active' : ''}`}
                  onClick={() => toggleWishlist(product.id)}
                  title="Thêm vào danh sách yêu thích"
                  style={{ color: isInWishlist(product.id) ? '#ef4444' : 'inherit' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
              </div>

              {/* Trust Badges List */}
              <div className="detail-trust-list">
                <div className="trust-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                  <span>Miễn phí giao hàng toàn quốc (Hỏa tốc 2h tại TP.HCM & Hà Nội)</span>
                </div>
                <div className="trust-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  <span>Mở hộp kiểm tra sản phẩm & cảm nhận chất liệu trước khi thanh toán</span>
                </div>
                <div className="trust-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                  <span>Bảo hành kết cấu 12 tháng, hỗ trợ tư vấn bảo quản & làm mới trọn đời</span>
                </div>
              </div>

            </div>

          </div>

          {/* Information Tabs Section */}
          <div className="detail-tabs-wrapper" style={{ marginTop: 50 }}>
            <div className="tabs-header">
              <button className={`tab-btn ${activeTab === 'desc' ? 'active' : ''}`} onClick={() => setActiveTab('desc')}>MÔ TẢ CHI TIẾT</button>
              <button className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`} onClick={() => setActiveTab('specs')}>THÔNG SỐ NGHỆ THUẬT</button>
              <button className={`tab-btn ${activeTab === 'guide' ? 'active' : ''}`} onClick={() => setActiveTab('guide')}>HƯỚNG DẪN BẢO QUẢN & SỬ DỤNG</button>
              <button className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>ĐÁNH GIÁ (38)</button>
            </div>

            <div className="tabs-content">
              {/* Tab 1: Description */}
              {activeTab === 'desc' && (
                <div className="tab-pane active">
                  <h3 className="tab-title">Nghệ Thuật Chế Tác Thủ Công Bản Địa</h3>
                  <p>{product.desc}</p>
                  <p style={{ marginTop: 12 }}>
                    Từng sản phẩm tại Mini Shop Decor là kết tinh của hàng chục giờ lao động tỉ mỉ từ các nghệ nhân làng nghề truyền thống Việt Nam. Chất liệu tự nhiên thân thiện với môi trường, mang lại năng lượng an lành và vẻ đẹp mộc mạc cho tổ ấm của bạn.
                  </p>
                </div>
              )}

              {/* Tab 2: Specs */}
              {activeTab === 'specs' && (
                <div className="tab-pane active">
                  <table className="specs-table">
                    <tbody>
                      <tr>
                        <td>Thương hiệu</td>
                        <td>{product.specs.brand || 'Mini Shop Decor'}</td>
                      </tr>
                      <tr>
                        <td>Dòng sản phẩm</td>
                        <td>{product.categoryName || 'Đồ thủ công'}</td>
                      </tr>
                      <tr>
                        <td>Chất liệu chính</td>
                        <td>{product.specs.material || 'Mây tre đan / Gỗ tự nhiên / Gốm sứ'}</td>
                      </tr>
                      <tr>
                        <td>Phương pháp chế tác</td>
                        <td>Đan tay thủ công 100% & xử lý chống mối mọt tự nhiên</td>
                      </tr>
                      <tr>
                        <td>Phong cách kiến trúc</td>
                        <td>Wabi-Sabi, BoHo, Tối giản Scandinavian & Vintage</td>
                      </tr>
                      <tr>
                        <td>Xuất xứ làng nghề</td>
                        <td>{product.specs.origin || 'Làng nghề truyền thống Việt Nam'}</td>
                      </tr>
                      <tr>
                        <td>Chính sách bảo hành</td>
                        <td>{product.specs.warranty || 'Bảo hành 12 tháng kết cấu'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab 3: Guide */}
              {activeTab === 'guide' && (
                <div className="tab-pane active">
                  <h3 className="tab-title">Hướng Dẫn Bảo Quản & Vệ Sinh Đồ Thủ Công Decor</h3>
                  <p style={{ lineHeight: 1.8 }}>
                    <strong>1. Đặt nơi khô ráo, thoáng mát:</strong> Tránh để sản phẩm mây tre và gỗ tại nơi có độ ẩm cao kéo dài hoặc tiếp xúc trực tiếp dưới ánh nắng gắt nhiệt độ cao.
                  </p>
                  <p style={{ marginTop: 12, lineHeight: 1.8 }}>
                    <strong>2. Vệ sinh định kỳ:</strong> Dùng chổi cọ mềm hoặc khăn ẩm vắt khô để lau sạch bụi bẩn bám trên kẽ đan. Nếu sản phẩm bị ướt, hãy phơi gió nơi bóng râm cho khô hoàn toàn trước khi sử dụng tiếp.
                  </p>
                </div>
              )}

              {/* Tab 4: Reviews */}
              {activeTab === 'reviews' && (
                <div className="tab-pane active">
                  <h3 className="tab-title">Đánh Giá Từ Khách Hàng (38 Đánh giá)</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ padding: 16, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <strong>Nguyễn Văn Hùng</strong>
                        <span style={{ color: '#ffc107' }}>★★★★★</span>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#475569' }}>"Đường đan rất chắc chắn và đều đẹp! Màu mây tự nhiên phối với phòng khách tông gỗ tạo cảm giác ấm áp tuyệt vời. Giao hàng nhanh và đóng gói kỹ càng."</p>
                    </div>
                    <div style={{ padding: 16, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <strong>Trần Thị Minh Anh</strong>
                        <span style={{ color: '#ffc107' }}>★★★★★</span>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#475569' }}>"Mua làm quà tặng tân gia bạn mình khen tấm tắc. Sản phẩm hoàn thiện tỉ mỉ hơn cả hình ảnh chụp trên web. Sẽ ủng hộ shop thêm nhiều món nữa!"</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
