# itkaine.github.io

Portfolio cá nhân tại https://itkaine.github.io.
Dùng **React + Vite**, animation bằng **Motion** (Framer Motion), khối 3D bằng **Three.js** (@react-three/fiber).
Mỗi lần push lên `main`, **GitHub Actions** tự build và deploy.

## Hiệu ứng có trong trang

- Khối 3D biến dạng ở đầu trang, nghiêng theo chuột, có hạt sáng bay quanh.
- Tên chạy từng chữ, chữ gradient đổi màu liên tục, dòng giới thiệu đổi lần lượt.
- Quầng sáng và vòng tròn đi theo chuột (tự tắt trên điện thoại).
- Nút "hút" theo chuột, thanh tiến độ cuộn ở mép trên.
- Thanh menu dạng viên thuốc: tự ẩn khi cuộn xuống, có vệt sáng chạy theo mục đang xem.
- Băng icon chạy vô tận, icon nảy lên khi cuộn tới.
- Thẻ project nghiêng 3D theo chuột, có vệt phản chiếu ánh sáng.
- Màn intro đếm 0 → 100 khi mở trang lần đầu, cuộn mượt kiểu Apple (Lenis).
- Tiêu đề mục xáo chữ khi rê chuột, băng chữ lớn chạy ngang theo tốc độ cuộn.
- Mục About dạng bento: đồng hồ giờ VN, vị trí, số liệu GitHub đếm chạy.
- Thẻ project có ảnh bìa gradient tự tạo; Timeline tự vẽ đường khi cuộn.
- Người dùng bật "Reduce motion" trong hệ điều hành thì hiệu ứng tự giảm.

## Cấu trúc

| File | Dùng để |
|---|---|
| `src/config.js` | **Toàn bộ nội dung**: tên, câu chạy chữ, giới thiệu, stack, repo nổi bật/ẩn, mạng xã hội. Thường chỉ sửa file này |
| `src/components/` | Từng phần của trang: `Hero`, `Scene` (3D), `About`, `Stack`, `Projects`, `Contact`, `Nav`, `Cursor`… |
| `src/styles.css` | Giao diện. Màu chính trong `:root` ở đầu file |
| `index.html` | Thẻ `<title>` và SEO |
| `public/404.html` | Trang khi gõ sai đường dẫn |
| `.github/workflows/deploy.yml` | Tự build và deploy lên Pages |

## Bật deploy bằng GitHub Actions (làm 1 lần)

1. Commit và push bằng GitHub Desktop.
2. Vào https://github.com/itkaine/itkaine.github.io/settings/pages
3. **Source**: đổi từ "Deploy from a branch" sang **GitHub Actions**.
4. Vào tab **Actions**, đợi workflow "Deploy to GitHub Pages" xanh (~1 phút), rồi mở https://itkaine.github.io.
   Nếu workflow chạy trước khi bạn đổi Source mà bị đỏ: bấm vào nó → **Re-run all jobs**.

## Chạy ở máy

```bash
cd ~/Project/itkaine.github.io && bun install
```

```bash
bun run dev
```

Mở http://localhost:5173, sửa code là trang tự cập nhật.
Kiểm tra bản build giống trên mạng: `bun run build` rồi `bun run preview`.

> Script dùng `bunx --bun vite` vì Node trên máy là v18, Vite mới cần Node 20+. Chạy bằng Bun thì không bị lỗi này.

## Cập nhật nội dung

Sửa `src/config.js` → xem thử bằng `bun run dev` → commit, push. Khoảng 1 phút sau trang tự cập nhật.

| Muốn | Sửa trong `src/config.js` |
|---|---|
| Đổi câu chạy chữ | `typing` |
| Đổi đoạn giới thiệu | `about` |
| Đổi stack trong khối code | `mainStack` |
| Thêm/bớt icon công nghệ | `stack`, ID trên [skillicons.dev](https://skillicons.dev) |
| Ghim / ẩn repo | `featured` / `hidden` |
| Ảnh bìa project thật | bỏ ảnh vào `public/projects/`, khai báo trong `projectImages` |
| Thêm kinh nghiệm | `experience` (để `[]` thì mục Experience tự ẩn) |
| Chữ lớn chạy ngang | `marquee` |
| Thêm mạng xã hội | `socials` |

Đổi màu khối 3D: sửa `color`, `emissive` trong `src/components/Scene.jsx`.

### Mục Projects tự cập nhật

Lấy trực tiếp từ GitHub: mọi repo **public, không phải fork**. Trên trang repo → ⚙️ cạnh **About**:
- **Description** → dòng mô tả trên thẻ
- **Website** → nút **Live ↗**
- **Topics** → các tag `#...` trên thẻ

## Lưu ý

- Repo **public**: chỉ để project cá nhân, không đưa code/ảnh/demo dự án công ty (HappySkin, Emmie, Cogni, IBP).
- Không commit thư mục `dist/` và `node_modules/` (đã có trong `.gitignore`).
- GitHub API không đăng nhập giới hạn 60 lượt/giờ mỗi IP người xem; vượt thì trang hiện link sang GitHub.
