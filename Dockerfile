# Dùng image Playwright chính thức làm base (đã có Node + browsers + deps)
FROM mcr.microsoft.com/playwright:v1.57.0-noble

# Đặt thư mục làm việc
WORKDIR /app

# Copy toàn bộ dự án vào container
COPY . .

# Cài dependencies (chỉ copy package.json trước để tận dụng cache)
# COPY package*.json ./
# RUN npm ci
# Hoặc nếu dùng pnpm/yarn thì thay tương ứng
RUN npm ci   # hoặc pnpm install --frozen-lockfile, yarn install --frozen-lockfile

# (Tùy chọn) Nếu bạn muốn chạy headless mặc định
ENV CI=true

# Lệnh mặc định khi chạy container
CMD ["npx", "playwright", "test"]

#1. Build image từ máy local
# docker build -t my-playwright:2.0.0 .
#2. Tag image (Optional - Nếu cần phân biệt nhiều version)
# docker tag my-playwright:2.0.0 duyasakura/my-playwright:latest
#3. Check image when build success
# docker images
#4. Docker login (nếu cần đẩy lên Docker Hub)
# docker login
#5. Push image lên Docker Hub
# docker push duyasakura/my-playwright:latest

#------------------------------------------------------------------

#6. Login Docker Hub (nếu cần pull từ máy khác)
# docker login
#7. Pull image từ Docker Hub (nếu cần)
# docker pull duyasakura/my-playwright:latest
#8. Chạy container từ image đã build
# docker run --rm -it duyasakura/my-playwright:latest
