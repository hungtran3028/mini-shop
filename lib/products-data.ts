import { Product } from "./types";

export const INITIAL_PRODUCTS_DATA: Product[] = [
  {
    id: "gio-may-dan",
    name: "Giỏ Mây Đan Thủ Công",
    category: "do-thu-cong",
    categoryName: "Đồ thủ công",
    price: "290.000đ",
    priceNum: 290000,
    badge: "Bán chạy",
    img: "/assets/images/products/do-thu-cong/gio-may-dan.webp",
    desc: "Giỏ mây đan tỉ mỉ từ những sợi mây tre tự nhiên đã qua xử lý chống mối mọt. Thích hợp đựng đồ trang trí, trái cây, quần áo hoặc làm phụ kiện chụp ảnh mộc mạc.",
    specs: {
      brand: "Mini Shop Decor",
      model: "GMD-01",
      material: "Mây tự nhiên 100%",
      origin: "Làng nghề mây tre đan Phú Vinh, Hà Nội",
      warranty: "12 tháng"
    }
  },
  {
    id: "tranh-treo-macrame",
    name: "Tranh Treo Macrame BoHo",
    category: "do-thu-cong",
    categoryName: "Đồ thủ công",
    price: "350.000đ",
    priceNum: 350000,
    badge: "Mới",
    img: "/assets/images/products/do-thu-cong/tranh-treo-macrame.webp",
    desc: "Tranh thừng đan nghệ thuật Macrame phong cách Bohemian lãng mạn. Tạo điểm nhấn ấm cúng, tinh tế cho phòng ngủ, góc đọc sách hoặc quán cà phê.",
    specs: {
      brand: "Mini Shop Decor",
      model: "TTM-02",
      material: "Sợi cotton tự nhiên & cành gỗ mộc",
      origin: "Việt Nam",
      warranty: "6 tháng"
    }
  },
  {
    id: "khay-go-hoa-van",
    name: "Khay Gỗ Hoa Văn Chạm Khắc",
    category: "do-thu-cong",
    categoryName: "Đồ thủ công",
    price: "220.000đ",
    priceNum: 220000,
    badge: "Yêu thích",
    img: "/assets/images/products/do-thu-cong/khay-go-hoa-van.webp",
    desc: "Khay gỗ tiện thủ công chạm khắc hoa văn tinh xảo, sơn phủ mộc an toàn cho thực phẩm. Phù hợp bày chén trà, bánh mứt hoặc nến thơm trang trí.",
    specs: {
      brand: "Mini Shop Decor",
      model: "KGH-03",
      material: "Gỗ sồi nguyên khối",
      origin: "Làng nghề mộc Đồng Kỵ",
      warranty: "12 tháng"
    }
  },
  {
    id: "khay-go-trang-tri",
    name: "Khay Gỗ Trang Trí Tối Giản",
    category: "do-thu-cong",
    categoryName: "Đồ thủ công",
    price: "180.000đ",
    priceNum: 180000,
    badge: "",
    img: "/assets/images/products/do-thu-cong/khay-go-trang-tri.webp",
    desc: "Thiết kế vuông vắn, đường vân gỗ tự nhiên rõ nét. Thích hợp để bàn làm việc, góc thưởng trà hoặc để chìa khóa, đồ phụ kiện cá nhân.",
    specs: {
      brand: "Mini Shop Decor",
      model: "KGT-04",
      material: "Gỗ tần bì cao cấp",
      origin: "Việt Nam",
      warranty: "12 tháng"
    }
  },
  {
    id: "den-tre-thu-cong",
    name: "Đèn Tre Thủ Công Kiểu Nón",
    category: "do-my-nghe",
    categoryName: "Đồ mỹ nghệ",
    price: "390.000đ",
    priceNum: 390000,
    badge: "Nổi bật",
    img: "/assets/images/products/do-my-nghe/den-tre-thu-cong.webp",
    desc: "Chao đèn đan bằng cật tre dẻo dai, ánh sáng xuyên qua kẽ đan tạo hiệu ứng bóng đổ ấm áp. Rất thích hợp thả trần bàn ăn, quầy bar hoặc phòng khách.",
    specs: {
      brand: "Mini Shop Decor",
      model: "DTC-05",
      material: "Tre tự nhiên hun khói",
      origin: "Làng tre Chương Mỹ",
      warranty: "12 tháng"
    }
  },
  {
    id: "den-long-tre",
    name: "Đèn Lồng Tre Thả Trần",
    category: "do-my-nghe",
    categoryName: "Đồ mỹ nghệ",
    price: "260.000đ",
    priceNum: 260000,
    badge: "",
    img: "/assets/images/products/do-my-nghe/den-long-tre.webp",
    desc: "Đèn lồng nan tre thanh mảnh, tôn vinh nét đẹp văn hóa truyền thống đan xen hơi thở hiện đại. Tạo không gian thiền định, an yên.",
    specs: {
      brand: "Mini Shop Decor",
      model: "DLT-06",
      material: "Nan tre uốn nhiệt",
      origin: "Hội An, Việt Nam",
      warranty: "12 tháng"
    }
  },
  {
    id: "binh-gom-trang-tri",
    name: "Bình Gốm Trang Trí Nghệ Thuật",
    category: "do-my-nghe",
    categoryName: "Đồ mỹ nghệ",
    price: "320.000đ",
    priceNum: 320000,
    badge: "Mới",
    img: "/assets/images/products/do-my-nghe/binh-gom-trang-tri.webp",
    desc: "Bình gốm nung củi phủ men hỏa biến độc bản, mỗi sản phẩm đều có những vệt loang màu riêng biệt không trùng lặp. Cắm cành khô hay hoa tươi đều đẹp.",
    specs: {
      brand: "Gốm Bát Tràng",
      model: "BGT-07",
      material: "Đất sét nung nhiệt cao, Men hỏa biến",
      origin: "Bát Tràng, Hà Nội",
      warranty: "12 tháng"
    }
  },
  {
    id: "bo-binh-gom-minimal",
    name: "Bộ Bình Gốm Minimalist",
    category: "do-my-nghe",
    categoryName: "Đồ mỹ nghệ",
    price: "480.000đ",
    priceNum: 480000,
    badge: "Bán chạy",
    img: "/assets/images/products/do-my-nghe/bo-binh-gom-minimal.webp",
    desc: "Set 2 bình gốm đường nét tối giản, màu trắng ngà nhám mờ thanh lịch. Điểm tô phong cách Japandi và Bắc Âu cho mọi không gian sống.",
    specs: {
      brand: "Gốm Bát Tràng",
      model: "BGM-08",
      material: "Gốm sứ tráng men mờ",
      origin: "Bát Tràng, Hà Nội",
      warranty: "12 tháng"
    }
  },
  {
    id: "chau-cay-de-ban",
    name: "Chậu Cây Để Bàn Men Mờ",
    category: "noi-that-gia-dung",
    categoryName: "Nội thất gia dụng",
    price: "150.000đ",
    priceNum: 150000,
    badge: "",
    img: "/assets/images/products/noi-that-gia-dung/chau-cay-de-ban.webp",
    desc: "Chậu gốm mini có lỗ thoát nước và đĩa lót gỗ, chuyên trồng sen đá, trầu bà hoặc cây phong thủy để bàn làm việc.",
    specs: {
      brand: "Mini Shop Decor",
      model: "CCD-09",
      material: "Gốm sứ & đĩa gỗ lót",
      origin: "Việt Nam",
      warranty: "6 tháng"
    }
  },
  {
    id: "ke-go-trang-tri",
    name: "Kệ Gỗ Trang Trí Đa Năng",
    category: "noi-that-gia-dung",
    categoryName: "Nội thất gia dụng",
    price: "750.000đ",
    priceNum: 750000,
    badge: "Mới",
    img: "/assets/images/products/noi-that-gia-dung/ke-go-trang-tri.webp",
    desc: "Kệ gắn tường khung sắt sơn tĩnh điện kết hợp đợt gỗ tự nhiên. Tối ưu không gian lưu trữ sách báo, chậu hoa nhỏ và đồ lưu niệm.",
    specs: {
      brand: "Mini Shop Decor",
      model: "KGT-10",
      material: "Gỗ thông ghép thanh & Thép sơn tĩnh điện",
      origin: "Việt Nam",
      warranty: "24 tháng"
    }
  },
  {
    id: "bo-ban-an-go",
    name: "Bộ Bàn Ăn Gỗ Tự Nhiên",
    category: "noi-that-gia-dung",
    categoryName: "Nội thất gia dụng",
    price: "4.500.000đ",
    priceNum: 4500000,
    badge: "Cao cấp",
    img: "/assets/images/products/noi-that-gia-dung/bo-ban-an-go.webp",
    desc: "Bộ bàn ăn 4 ghế gỗ sồi tự nhiên bo tròn các góc cạnh an toàn cho gia đình có trẻ nhỏ. Ghế bọc đệm êm ái, màu nâu ấm cúng.",
    specs: {
      brand: "Mini Shop Decor",
      model: "BAG-11",
      material: "Gỗ sồi Nga tự nhiên 100%",
      origin: "Việt Nam",
      warranty: "36 tháng"
    }
  },
  {
    id: "sofa-phong-khach",
    name: "Sofa Phòng Khách Phong Cách Bắc Âu",
    category: "noi-that-gia-dung",
    categoryName: "Nội thất gia dụng",
    price: "6.800.000đ",
    priceNum: 6800000,
    badge: "Sang trọng",
    img: "/assets/images/products/noi-that-gia-dung/sofa-phong-khach.webp",
    desc: "Sofa văng bọc vải nỉ cao cấp thoáng khí, đệm mút D40 chống xẹp lún. Thiết kế tinh giản, trẻ trung phù hợp căn hộ chung cư hiện đại.",
    specs: {
      brand: "Mini Shop Decor",
      model: "SPK-12",
      material: "Khung gỗ dầu, Vải nỉ Hàn Quốc, Nệm D40",
      origin: "Việt Nam",
      warranty: "36 tháng"
    }
  }
];

export function formatCurrencyVND(amount: number): string {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount).replace("₫", "đ");
}
