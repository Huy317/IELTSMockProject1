# --- Stage 1: Build bằng Node.js ---
FROM node:20-alpine AS build-stage
WORKDIR /app

# Copy package.json trước để tận dụng cache
COPY package*.json ./
RUN npm install

# Copy toàn bộ code và Build
COPY . .
COPY .env.production .env
RUN npm run build

# --- Stage 2: Chạy bằng Nginx ---
FROM nginx:alpine AS production-stage

# Copy file build từ Stage 1 sang thư mục của Nginx
# LƯU Ý: Nếu bạn dùng Vite (React mới), folder ra là /app/dist
# Nếu bạn dùng Create-React-App (Cũ), folder ra là /app/build
# Hãy kiểm tra kỹ folder của bạn! Dưới đây tôi giả định là Vite (dist)
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy file cấu hình Nginx ta vừa tạo ở Bước 1
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]