#!/bin/bash
# ==============================================
# 📦 Script: อัพเดท Submodule ให้เป็นเวอร์ชันล่าสุด
# วิธีใช้: bash update-config.sh
# ==============================================

echo "🔄 กำลังอัพเดท Config จาก Mother Repo..."
echo ""

# ดึง Submodule เวอร์ชันล่าสุด
git submodule update --remote --merge

echo ""
echo "✅ อัพเดทเสร็จแล้ว!"
echo ""

# แสดงเวอร์ชันปัจจุบัน
echo "📌 Submodule ตอนนี้อยู่ที่ commit:"
git submodule status

echo ""
echo "💡 อย่าลืมสั่ง commit เพื่อบันทึกการเปลี่ยนแปลง:"
echo "   git add ."
echo "   git commit -m \"chore: update config to latest\""
echo "   git push"
