# itkaine.github.io

Portfolio cá nhân, chạy trên **GitHub Pages** tại https://itkaine.github.io.
HTML, CSS và JS thuần: không build, không thư viện, không API key.

## Cấu trúc

| File | Dùng để |
|---|---|
| `config.js` | **Toàn bộ nội dung**: tên, vai trò, câu chạy chữ, giới thiệu, tech stack, repo nổi bật, mạng xã hội. Thường chỉ cần sửa file này |
| `index.html` | Khung trang và thẻ SEO (`<title>`, `og:*`) |
| `style.css` | Giao diện. Màu chính nằm trong `:root` ở đầu file |
| `main.js` | Đổ dữ liệu từ `config.js` vào trang, lấy danh sách repo từ GitHub API, hiệu ứng |
| `404.html` | Trang khi gõ sai đường dẫn |
| `.nojekyll` | Báo GitHub Pages không chạy Jekyll, phục vụ file nguyên trạng |

## Đưa lên lần đầu

1. Mở **GitHub Desktop** → `File` → `Add local repository` → chọn thư mục `~/Project/itkaine.github.io`.
2. Bấm **Publish repository**:
   - Name: `itkaine.github.io` (phải đúng y tên này)
   - **Bỏ tick** "Keep this code private"
   - Account: `itkaine`
3. Vào https://github.com/itkaine/itkaine.github.io/settings/pages và kiểm tra:
   - Source: **Deploy from a branch**
   - Branch: **main** / **(root)** → Save
4. Đợi 1–2 phút (xem tiến độ ở tab **Actions**), rồi mở https://itkaine.github.io.

## Cập nhật nội dung

1. Sửa `config.js` (hoặc file khác).
2. Xem thử ở máy (bên dưới).
3. Commit và push bằng GitHub Desktop. Trang tự cập nhật sau khoảng 1 phút.
   Nếu chưa thấy thay đổi: tải lại bằng `Cmd + Shift + R`.

### Các chỉnh sửa hay dùng (trong `config.js`)

| Muốn | Sửa |
|---|---|
| Đổi câu chạy chữ | `typing` |
| Đổi đoạn giới thiệu | `about` (mỗi phần tử là 1 đoạn) |
| Thêm/bớt icon công nghệ | `stack`, dùng ID trên [skillicons.dev](https://skillicons.dev) |
| Ghim repo lên đầu | thêm tên repo vào `featured` |
| Ẩn một repo | thêm tên repo vào `hidden` |
| Thêm mạng xã hội | thêm `{ label, url }` vào `socials` |

### Mục Projects tự cập nhật

Danh sách lấy trực tiếp từ GitHub: mọi repo **public, không phải fork** của `itkaine`.
Để một project hiện đẹp, vào trang repo đó → ⚙️ cạnh **About**:
- **Description**: thành dòng mô tả trên thẻ.
- **Website**: hiện thêm nút **Live ↗**.

## Xem thử ở máy

```bash
cd ~/Project/itkaine.github.io && bunx serve .
```

Rồi mở http://localhost:3000. Không mở trực tiếp file `index.html`, vì khi đó trang 404 và một số đường dẫn sẽ sai.

## Tên miền riêng (tuỳ chọn)

1. Mua domain, ví dụ `kai.dev`.
2. Settings → Pages → **Custom domain** → nhập domain → Save. GitHub sẽ tạo file `CNAME`.
3. Ở nhà cung cấp domain, trỏ DNS theo [hướng dẫn của GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
4. Bật **Enforce HTTPS**.

## Lưu ý

- Repo này **public**: chỉ để project cá nhân. Không đưa code, ảnh chụp hay demo của dự án công ty (HappySkin, Emmie, Cogni, IBP) lên đây.
- GitHub API không cần đăng nhập, giới hạn 60 lượt/giờ cho mỗi IP người xem. Nếu vượt, trang hiện link sang GitHub thay cho danh sách.
