@echo off
echo 正在彻底清理项目...
echo.

echo 1. 停止所有Node.js进程...
taskkill /f /im node.exe >nul 2>&1

echo 2. 删除.next目录...
if exist ".next" (
    rmdir /s /q ".next" >nul 2>&1
    echo .next目录已删除
) else (
    echo .next目录不存在
)

echo 3. 清理缓存...
if exist "node_modules\.cache" (
    rmdir /s /q "node_modules\.cache" >nul 2>&1
    echo 缓存已清理
)

echo 4. 清理npm缓存...
npm cache clean --force

echo 5. 重新安装依赖...
npm install

echo.
echo 清理完成！现在运行项目...
npm run dev

pause
