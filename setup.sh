#!/bin/bash
# ==============================================
# 🚀 Script: Setup โปรเจกต์ใหม่ (ครั้งแรกหลัง Clone)
# วิธีใช้: bash setup.sh
# ==============================================

echo "🚀 กำลัง Setup โปรเจกต์..."
echo ""

# 1. ดึง Submodule
echo "📦 Step 1: ดึง Config จาก Submodule..."
git submodule update --init --recursive
echo ""

# 2. ติดตั้ง Dependencies (Biome, etc.)
echo "📥 Step 2: ติดตั้ง Dependencies..."
npm install
echo ""

echo "✅ Setup เสร็จสมบูรณ์! พร้อมเขียนโค้ดได้เลย"
echo ""
echo "📌 Submodule ตอนนี้อยู่ที่ commit:"
git submodule status
