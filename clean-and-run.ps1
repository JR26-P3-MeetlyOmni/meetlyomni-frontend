# 彻底清理并运行Next.js项目
Write-Host "正在彻底清理项目..." -ForegroundColor Green

# 1. 停止所有Node.js进程
Write-Host "停止所有Node.js进程..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# 2. 删除.next目录
Write-Host "删除.next目录..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
    Write-Host ".next目录已删除" -ForegroundColor Green
}

# 3. 删除node_modules/.cache目录
Write-Host "清理缓存..." -ForegroundColor Yellow
if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force "node_modules\.cache" -ErrorAction SilentlyContinue
    Write-Host "缓存已清理" -ForegroundColor Green
}

# 4. 清理npm缓存
Write-Host "清理npm缓存..." -ForegroundColor Yellow
npm cache clean --force

# 5. 重新安装依赖
Write-Host "重新安装依赖..." -ForegroundColor Yellow
npm install

Write-Host "清理完成！现在运行项目..." -ForegroundColor Green
npm run dev
