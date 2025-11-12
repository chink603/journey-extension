#!/bin/bash

# ติดตั้ง dependencies
#npm install

# ติดตั้งเครื่องมือแพ็ก
#npm i -g @vscode/vsce

# สร้างโฟลเดอร์ vsix หากไม่มี
mkdir -p vsix

echo "สร้างไฟล์ .vsix ในโฟลเดอร์ ./vsix/"

# Build โปรเจคก่อน
echo "🔨 Building project..."
npm run build

# สร้าง .vsix ไฟล์ไปยังโฟลเดอร์ vsix
echo "📦 Creating .vsix package..."
vsce package --out ./vsix/

echo "✅ สำเร็จ! ไฟล์ .vsix ถูกสร้างใน ./vsix/"
echo ""
echo "📂 ไฟล์ในโฟลเดอร์ vsix:"
ls -la ./vsix/
