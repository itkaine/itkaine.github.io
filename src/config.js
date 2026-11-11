// ============================================================
//  Sửa nội dung trang ở đây. Không cần đụng vào file khác.
// ============================================================
export const SITE = {
  githubUser: "itkaine",
  name: "Kai",
  role: "Frontend Developer",
  location: "Vietnam 🇻🇳",
  // Các dòng chạy chữ ở đầu trang
  typing: [
    "Building pixel-perfect interfaces ✨",
    "React · Vue · Angular · Ionic",
    "Turning coffee into clean UI ☕",
  ],
  // Hiện trong khối code ở mục About
  mainStack: ["React", "Vue", "Angular", "Ionic", "TypeScript"],
  about: [
    "I'm a frontend developer who cares about the small details: spacing, motion and how an interface feels in the hand.",
    "I design in Figma before I code 🎨",
  ],

  // Icon ID lấy từ https://skillicons.dev
  stack: {
    "Frontend": ["html", "css", "sass", "tailwind", "bootstrap", "js", "ts", "jquery"],
    "Frameworks": ["react", "vue", "angular", "ionic", "vite", "wordpress"],
    "Tools & design": ["git", "github", "vscode", "postman", "bun", "npm", "figma", "ps", "ai"],
  },

  // Repo ghim lên đầu (tên repo). Các repo public khác (không phải fork) tự hiện bên dưới.
  featured: ["github-profile-readme-kit", "dns-changer-pro"],
  // Ảnh bìa riêng cho project (đặt file vào public/projects/). Không có thì tự tạo ảnh gradient.
  // Ví dụ: "dns-changer-pro": "/projects/dns-changer-pro.png"
  projectImages: {},
  // Repo không muốn hiện
  hidden: ["itkaine", "itkaine.github.io"],

  // Múi giờ cho ô đồng hồ ở mục About
  timezone: "Asia/Ho_Chi_Minh",

  // Kinh nghiệm / học tập. Để trống [] thì mục Experience tự ẩn.
  // Mẫu: { time: "2023 — Now", title: "Frontend Developer", place: "Tên công ty", desc: "Làm gì, dùng công nghệ gì." }
  experience: [],

  // Chữ lớn chạy ngang giữa các mục
  marquee: ["React", "Vue", "Angular", "Ionic", "TypeScript", "Figma"],

  socials: [
    { label: "GitHub", url: "https://github.com/itkaine" },
    { label: "LinkedIn", url: "https://linkedin.com/in/i-m-kai-8976251b4" },
    { label: "Facebook", url: "https://fb.com/voducmanh.kai" },
    { label: "Instagram", url: "https://instagram.com/voducmanh99" },
    { label: "X", url: "https://x.com/voducmanh1999" },
  ],
};
