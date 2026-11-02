"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Users, 
  Settings, 
  Timer, 
  Trophy, 
  TrendingUp,
  Plus,
  Minus,
  RefreshCcw,
  ArrowRight,
  LogOut,
  Skull,
  ChevronLeft,
  CheckCircle2,
  Zap,
  Star,
  Layers,
  XCircle,
  ShieldCheck,
  ShoppingBag,
  Briefcase,
  Sprout,
  Trash2,
  Waves,
  Wind,
  ZapOff,
  Car,
  MapPin,
  Box,
  Landmark,
  Heart,
  MessageSquare,
  FileText,
  ShieldAlert,
  BrainCircuit,
  HelpCircle,
  ChevronRight,
  Activity,
  Target,
  Rocket,
  UserCheck,
  UserPlus,
  UserMinus,
  BookOpen,
  Wifi,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';

// --- CONSOLIDATED TACTICAL CONSTANTS ---
const MISSION_SLOTS = [
  { id: 1, label: "โซนเศรษฐกิจอัจฉริยะ" },
  { id: 2, label: "โซนสิ่งแวดล้อมและพลังงานอัจฉริยะ" },
  { id: 3, label: "โซนขนส่งคมนาคมอัจฉริยะ" },
  { id: 4, label: "โซนที่อยู่อาศัยและพลเมือง" },
  { id: 5, label: "โซนบริหารภาครัฐอัจฉริยะ" },
];

const INNOVATIONS = [
  { id: "inn-0", title: "AI คัดกรองและบล็อกลิงก์อันตราย", description: "ระบบตรวจจับลิงก์ปลอมและข้อความหลอกลวง", image: "https://drive.google.com/uc?export=view&id=1Uoss_M6a5zi13YURQB0J2Op-lzL2RY6n" },
  { id: "inn-1", title: "ศูนย์แจ้งเหตุและอายัดบัญชีฉับพลัน", description: "แพลตฟอร์มยืนยันตัวตนดิจิทัลความปลอดภัยสูง", image: "https://drive.google.com/uc?export=view&id=1nHeQnAID8jlwDcRLtJ14cVwT4EFY4oHc" },
  { id: "inn-2", title: "รัฐบาลควบคุมราคาสินค้าและบริการ", description: "แอปเปรียบเทียบราคาสินค้าและแจ้งเบาะแสโก่งราคา", image: "https://drive.google.com/uc?export=view&id=1vf3SmFCq-lcaId41Jv-jnnScrEacZtZb" },
  { id: "inn-3", title: "แอพจับคู่งานออนไลน์", description: "ระบบจับคู่คนว่างงานกับตำแหน่งงานที่เหมาะสม", image: "https://drive.google.com/uc?export=view&id=1Za6WgsB_NsUS8_XqZQb51wZ-akeuvUTv" },
  { id: "inn-4", title: "พัฒนาทักษะแรงงานศักยภาพสูง", description: "แพลตฟอร์มเรียนรู้ทักษะใหม่เพื่อตลาดแรงงานยุคหน้า", image: "https://drive.google.com/uc?export=view&id=1tp1XzGHaq-jyv-CwNVFpI_n2fJkNoOm-" },
  { id: "inn-5", title: "แพลตฟอร์มตลาดสินค้าเกษตรออนไลน์", description: "ตลาดออนไลน์ตรงจากเกษตรกรสู่ผู้บริโวน", image: "https://drive.google.com/uc?export=view&id=1-q1u1mzlZzSerizM4VjnGCo_yD0bF72M" },
  { id: "inn-6", title: "เพิ่มตลาดส่งออกสินค้าเกษตร", description: "ระบบซื้อขายทางการตลาดสำหรับเกษตรกร", image: "https://drive.google.com/uc?export=view&id=1LNBbukkDxS9gl4YPaZ7KCVyF-7AABKPg" },
  { id: "inn-7", title: "ถังชยะอัจฉริยะที่มีเซนเซอร์วัดปริมาณขยะ", description: "เซนเซอร์แจ้งเตือนถังขยะเต็มแบบเรียลไลม์", image: "https://drive.google.com/uc?export=view&id=1I0Po3ZB9fRmK2ZH5rp1hV4gFMzA5vQQg" },
  { id: "inn-8", title: "ถังขยะบีบอัดอัจฉริยะ", description: "ระบบบีบอัดขยะพลังงานสะอาดลดปริมาณขยะ", image: "https://drive.google.com/uc?export=view&id=1aBKbByX6xL_Tjy2hSsOHHGIzx4ugflSz" },
  { id: "inn-9", title: "ระบบเซนเซอร์วัดระดับน้ำ", description: "เซนเซอร์วัดระดับน้ำและระบบแจ้งเตือนภัยน้ำท่วม", image: "https://drive.google.com/uc?export=view&id=1WdedNiP5IFgyGCwftBVfqtu4HEQ3cU_L" },
  { id: "inn-10", title: "การใช้รถยนต์ไฟฟ้าลดควันพิษ", description: "สถานีชาร์จรถไฟฟ้าอัจฉริยะครอบคลุมทั่วเมือง", image: "https://drive.google.com/uc?export=view&id=1fF9n_Foy_akwWQpn2L9mUeuu-UdKO2ti" },
  { id: "inn-11", title: "การเพิ่มพื้นที่สีเขียวปล่งป่า", description: "ระบบรรดน้ำสวนสาธารณะประหยัดพลังงานและน้ำ", image: "https://drive.google.com/uc?export=view&id=1OwmSiwmCd1pbxo2CPoy-sO2BW0tEjRXH" },
  { id: "inn-12", title: "โรงไฟฟ้าชีวมวล", description: "ระบบผลิตพลังงานสะอาดจากวัสดุเหลือใช้ทางการเกษตร", image: "https://drive.google.com/uc?export=view&id=1qXUDwJgjRwA1nA5n-2ciWzI2S1Luk05Y" },
  { id: "inn-13", title: "เครื่องอัดฟางอัจฉริยะ", description: "เพิ่มความสะดวกสบายในการขนส่งฟาง", image: "https://drive.google.com/uc?export=view&id=1mzctXgri4_Snok-IGgOqg9w2Y0CvBEY7" },
  { id: "inn-14", title: "เซนเซอร์ตรวจจับขนาดรถอัจฉริยะ", description: "กล้อง AI ตรวจจับและแจ้งเตือนการจอดรถผิดที่", image: "https://drive.google.com/uc?export=view&id=1wja3xWv7dQ5_XpBPsxCnqvxYoDba_hH0" },
  { id: "inn-15", title: "การติดตั้งเสากั้นรถยนต์", description: "ป้ายแจ้งเตือนที่จอดรถว่างแบบดิจิทัล", image: "https://drive.google.com/uc?export=view&id=1IZ9e3Rh5tIi2vPeIENn_reVp4WKIxDiD" },
  { id: "inn-16", title: "ระบบเซนเซอร์ควบคุมไฟจราจร", description: "ระบบ AI วิเคราะห์และปรับสัญญาณไฟจราจรตามเวลาจริง", image: "https://drive.google.com/uc?export=view&id=1ZApUp7DUiGXyHZMePw2S5ZcTpsQtsovn" },
  { id: "inn-17", title: "แอปเช็คปริมาณรถในถนน", description: "เซนเซอร์ตรวจสอบความหนาแน่นของรถบนท้องถนน", image: "https://drive.google.com/uc?export=view&id=1aW5yUwy_mRYVyMAO40s7E2X1YFEDdWLY" },
  { id: "inn-18", title: "แอปหาพิกัดที่จอดรถว่างพื้นที่ใกล้เคียง", description: "แอปพลิเคชันค้นหาและจองที่จอดรถว่าง", image: "https://drive.google.com/uc?export=view&id=1iwWLd-roGoCSY5wAJtf9S7eNoKbpEVjD" },
  { id: "inn-19", title: "ระบบเคลมประกันสินค้า", description: "ระบบติดตามตู้คอนเทนเนอร์อัจฉริยะผ่านดาวเทียน", image: "https://drive.google.com/uc?export=view&id=1en4rXzRnwzgPmro8Sj6iY2lRa_B9BiXW" },
  { id: "inn-20", title: "แอปตรวจสินค้าออนไลน์", description: "ระบบตรวจสอบความปลอดภัยและความถูกต้องของสินค้า", image: "https://drive.google.com/uc?export=view&id=1b-VhwFS41kIzJ1xGyw0pDYFxJ0MH1cZX" },
  { id: "inn-21", title: "ตู้บริการภาครัฐอัจฉริยะ", description: "ตู้บริการภาครัฐอัจฉริยะ 24 ชั่วโมง", image: "https://drive.google.com/uc?export=view&id=1Yz2uKTRmAy_1qXtuq-s4WiqrJDVlw_TU" },
  { id: "inn-22", title: "ระบบอาสาสมัครลงทะเบียน", description: "แอปพลิเคชันรวมสวัสดิการรัฐไว้ในที่เดียว", image: "https://drive.google.com/uc?export=view&id=1-w-OENHgVQirAFfSIgbNmNJJ13BlzDSV" },
  { id: "inn-23", title: "สร้างศูนย์กิจกรรมชุมชน", description: "ระบบปรึกษาแพทย์และติดตามสุขภาพทางไกล", image: "https://drive.google.com/uc?export=view&id=1_FYki-UsQPv9lNomgu-wUQZiBZwBY2hZ" },
  { id: "inn-24", title: "ระบบตรวจจับการล้ม", description: "แอปพลิเคชันหาอาสาสมัครดูแลผู้สูงอายุ", image: "https://drive.google.com/uc?export=view&id=1XGXJjn735ZuGEV87zSPNMSx4h981ECBY" },
  { id: "inn-25", title: "ติดตั้งโคมไฟอัจฉ่อิยะ", description: "ระบบไฟถนนอัจฉริยะปรับความสว่างอัตโนมัติ", image: "https://drive.google.com/uc?export=view&id=18pakzSeaq_102db1tgl5LOyZYXbTqxNJ" },
  { id: "inn-26", title: "เสาไฟมีปุ่มกดเรียกตำรวจ", description: "โครงข่ายปุ่มแจ้งเหตุฉุกเฉินในที่สาธารณะ", image: "https://drive.google.com/uc?export=view&id=1RXAWB5xyz7iSNRiJwuXo9T4mwd8Wd1_W" },
  { id: "inn-27", title: "แพลตฟอร์มแจ้งปัญหาพลเมือง", description: "แพลตฟอร์มแจ้งปัญหาเมืองและติดตามสถานะ", image: "https://drive.google.com/uc?export=view&id=10yZdSao0P4IxmDZ1eG6QJW7t20ASK15l" },
  { id: "inn-28", title: "แจ้งเตือนปัญาไฟดับ", description: "ระบบแจ้งเตือนไฟดับและแผนซ่อมบำรุง", image: "https://drive.google.com/uc?export=view&id=1txUaYGvZRLq5bs_ZZbpXf_i1c7-zKlf9" },
  { id: "inn-29", title: "แสดงข้อมูลแบบ Real-time", description: "แพลตฟอร์มเปิดเผยข้อมูลเมืองโปร่งใส", image: "https://drive.google.com/uc?export=view&id=1eh6kGYLztwd1-I882fsCFR6rTjfHPi3k" },
  { id: "inn-30", title: "แอปพลิเคชันตอบคำถาม", description: "แชทบอท AI ตอบคำถามบริการภาครัฐ", image: "https://drive.google.com/uc?export=view&id=1mp7cauj_KzT6YrvF19nOmdnP4Bt5ngr7" },
  { id: "inn-31", title: "เบิกจ่ายงบประมาณดิจิทัล", description: "ระบบเบิกจ่ายงบประมาณดิจิทัลตรวจสอบได้", image: "https://drive.google.com/uc?export=view&id=1n4kundoLqYqEBPChDOZU9A8PYzpwnu3A" },
  { id: "inn-32", title: "ทีมที่ปรึกษาด้านการคลัง", description: "แดชบอร์ดติดตามความคืบหน้าใช้งบประมาณ", image: "https://drive.google.com/uc?export=view&id=1JmBKq2kGvBm_YRUK_0BkwYCZmiHrdYlK" },
  { id: "inn-33", title: "ระบบให้เช็คข้อมูลตนเอง", description: "ระบบปกป้องและรักษาความลับข้อมูลส่วนบุคคล", image: "https://drive.google.com/uc?export=view&id=1mUlTeG0CreW23hjVnhIatmEjUq5PwlRf" },
  { id: "inn-34", title: "ยืนยันตัวตนแบบสแกนใบหน้า", description: "ระบบยืนยันตัวตนไบโอเมตริกซ์ขั้นสูง", image: "https://drive.google.com/uc?export=view&id=1yRhNK7e9XM2L-56Yr0GIrUg3OuKi1Ong" },
];

const EXPERTS = [
  { id: "exp-0", title: "นักสืบไซเบอร์", role: "ผู้เชี่ยวชาญด้านความปลอดภัยไซเบอร์", image: "https://drive.google.com/uc?export=view&id=1EJmkM-moNDLGYOHaOgQAuxVejpk3ehVq" },
  { id: "exp-1", title: "กูรูอัปสกิล", role: "ผู้เชี่ยวชาญด้านการศึกษาและแรงงาน", image: "https://drive.google.com/uc?export=view&id=1gNe7YLBdr-jDy5K1vSNLo2lk6ufnN16q" },
  { id: "exp-2", title: "ทนายคุ้มครองผู้บริโภค", role: "ผู้เชี่ยวชาญด้านเศรษฐกิจและการค้า", image: "https://drive.google.com/uc?export=view&id=1-wkS6B43fXEOAek3v1KfxqjOh6kb9AXt" },
  { id: "exp-3", title: "ผู้เชี่ยวชาญมลพิษ", role: "ผู้เชี่ยวชาญด้านพลังงาน", image: "https://drive.google.com/uc?export=view&id=1p9c032G2p5DdUjS1U-kMf57aHji-Of8q" },
  { id: "exp-4", title: "วิศวกรพลังงานสะอาด", role: "ผู้เชี่ยวชาญด้านสิ่งแวดล้อม", image: "https://drive.google.com/uc?export=view&id=1RlIldu4N6rUk1AAoEdA_b18mFy7OzwGW" },
  { id: "exp-5", title: "นักวางผังจราจร AI", role: "ผู้เชี่ยวชาญการขนส่งและคมนาคม", image: "https://drive.google.com/uc?export=view&id=1rQinaHtCn4u6tqxsopO8KF81Us6RfZqH" },
  { id: "exp-6", title: "วิศวกรระบบราง", role: "ผู้เชี่ยวชาญความปลอดภัยสาธารณะ", image: "https://drive.google.com/uc?export=view&id=1NZtCxoxgDzhdNn1eUz8Os_y_jJ-7FGnx" },
  { id: "exp-7", title: "ผู้เชี่ยวชาญ EV", role: "ผู้เชี่ยวชาญด้านผังเมือง", image: "https://drive.google.com/uc?export=view&id=1emXrt4JR8_UpgvHqRrPVnLRdRLdHsM0h" },
  { id: "exp-8", title: "อาสากู้ภัยไฮเทค", role: "ผู้เชี่ยวชาญด้านพลเมือง", image: "https://drive.google.com/uc?export=view&id=10OhazMX72_O8nBh8te1QXntBEZSA5JLa" },
  { id: "exp-9", title: "สถาปนิกเมืองปลอดภัย", role: "ผู้เชี่ยวชาญวิศวกรรมไฟฟ้า", image: "https://drive.google.com/uc?export=view&id=1WDn_SgnMPxzcfGAZuo0hziJ2On0qjYQS" },
  { id: "exp-10", title: "นักวิเคราะห์ข้อมูลเมือง", role: "ผู้เชี่ยวชาญการจัดการขยะ", image: "https://drive.google.com/uc?export=view&id=1S18_JeygQhxXQGx7RSkf8QhvNNsEF-MC" },
  { id: "exp-11", title: "ที่ปรึกษา E-Gov", role: "ผู้เชี่ยวชาญรัฐประศาสนศาสตร์", image: "https://drive.google.com/uc?export=view&id=10FnGTd794dfzSblL-Eg_VHTi4HDQP81c" },
  { id: "exp-12", title: "ผู้เชี่ยวชาญคาร์บอน", role: "ผู้เชี่ยวชาญเกษตรสมัยใหม่", image: "https://drive.google.com/uc?export=view&id=16L40zCY1cO2D_k-zbj4Hah9yLHKXS00y" },
  { id: "exp-13", title: "หมอทางไกล", role: "ผู้เชี่ยวชาญสังคมสงเคราะห์", image: "https://drive.google.com/uc?export=view&id=1c7OT2cS6d9amFhXgLPMmG2J9BGqIAtO9" },
  { id: "exp-14", title: "ผู้ตรวจสอบโปร่งใส", role: "ผู้เชี่ยวชาญคลังและงบประมาณ", image: "https://drive.google.com/uc?export=view&id=1uKH28MoRcjKT3oA94C3pICgs1ux2bW1V" },
];

const MISSIONS = [
  { id: 1, title: "ภัยคอลเซ็นเตอร์", description: "รับมือภัยคุกคามออนไลน์ ลิงก์ปลอม", icon: ShieldCheck, videoUrl: "https://www.youtube.com/embed/NJFeQaf7ZmU", zoneId: 1, correctInnovationIds: ["inn-0", "inn-1"], correctExpertIds: ["exp-0"], rewardCP: 20, rewardLP: 10, penaltyCP: 20, penaltyLP: 10 },
  { id: 2, title: "กักตุนโก่งราคา", description: "จัดการราคาสินค้าแพงและเอาเปรียบ", icon: ShoppingBag, videoUrl: "https://www.youtube.com/embed/L1Ep8cV_0Po", zoneId: 1, correctInnovationIds: ["inn-2"], correctExpertIds: ["exp-2"], rewardCP: 15, rewardLP: 15, penaltyCP: 15, penaltyLP: 15 },
  { id: 3, title: "คนว่างงาน", description: "แก้ปัญหาว่างงาน เพิ่มทักษะดิจิทัล", icon: Briefcase, videoUrl: "https://www.youtube.com/embed/wh_rRiXRy5U", zoneId: 1, correctInnovationIds: ["inn-3", "inn-4"], correctExpertIds: ["exp-1"], rewardCP: 25, rewardLP: 10, penaltyCP: 25, penaltyLP: 10 },
  { id: 4, title: "พืชผลราคาตก", description: "ยกระดับสินค้าเกษตรด้วยตลาดออนไลน์", icon: Sprout, videoUrl: "https://www.youtube.com/embed/ivxrSyzIItw", zoneId: 1, correctInnovationIds: ["inn-5", "inn-6"], correctExpertIds: ["exp-12"], rewardCP: 20, rewardLP: 20, penaltyCP: 20, penaltyLP: 20 },
  { id: 5, title: "ขยะล้น", description: "จัดการขยะด้วยเซนเซอร์และระบบบีบอัด", icon: Trash2, videoUrl: "https://www.youtube.com/embed/d0GLKk2Lu0M", zoneId: 2, correctInnovationIds: ["inn-7", "inn-8"], correctExpertIds: ["exp-10"], rewardCP: 10, rewardLP: 10, penaltyCP: 10, penaltyLP: 10 },
  { id: 6, title: "น้ำท่วมเมือง", description: "เฝ้าระวังระดับน้ำ ป้องกันภัยพิบัติ", icon: Waves, videoUrl: "https://www.youtube.com/embed/mTKfxMAXp4c", zoneId: 2, correctInnovationIds: ["inn-9"], correctExpertIds: ["exp-9"], rewardCP: 20, rewardLP: 15, penaltyCP: 20, penaltyLP: 15 },
  { id: 7, title: "ภาวะโลกร้อน", description: "ลดควันพิษด้วย EV และพื้นที่สีเขียว", icon: Wind, videoUrl: "https://www.youtube.com/embed/9SiVKnuTuXo", zoneId: 2, correctInnovationIds: ["inn-10", "inn-11"], correctExpertIds: ["exp-4"], rewardCP: 25, rewardLP: 20, penaltyCP: 25, penaltyLP: 20 },
  { id: 8, title: "มลพิษทางการเกษตร", description: "เปลี่ยนวัสดุเกษตรเป็นพลังงานสะอาด", icon: ZapOff, videoUrl: "https://www.youtube.com/embed/ZVzIVQdnMek", zoneId: 2, correctInnovationIds: ["inn-12", "inn-13"], correctExpertIds: ["exp-12"], rewardCP: 20, rewardLP: 20, penaltyCP: 20, penaltyLP: 20 },
  { id: 9, title: "การจอดรถไม่ถูกต้อง", description: "จัดการจราจรเพื่อความคล่องตัวปลอดภัย", icon: Car, videoUrl: "https://www.youtube.com/embed/caVX9bNfOf0", zoneId: 3, correctInnovationIds: ["inn-14", "inn-15"], correctExpertIds: ["exp-5"], rewardCP: 20, rewardLP: 15, penaltyCP: 20, penaltyLP: 15 },
  { id: 10, title: "จราจรติดขัด", description: "ระบบไฟจราจรและตรวจสอบปริมาณรถ", icon: Car, videoUrl: "https://www.youtube.com/embed/U4GCyF56gv4", zoneId: 3, correctInnovationIds: ["inn-16", "inn-17"], correctExpertIds: ["exp-5"], rewardCP: 20, rewardLP: 10, penaltyCP: 20, penaltyLP: 10 },
  { id: 11, title: "ไม่มีที่จอดรถ", description: "หาพิกัดที่จอดรถว่างลดความแออัด", icon: MapPin, videoUrl: "https://www.youtube.com/embed/ks-6iqxQoHM", zoneId: 3, correctInnovationIds: ["inn-18"], correctExpertIds: ["exp-5"], rewardCP: 15, rewardLP: 20, penaltyCP: 15, penaltyLP: 20 },
  { id: 12, title: "คุ้งครองสินค้า", description: "ติดตามตู้สินค้าและตรวจสอบความปลอดภัย", icon: Box, videoUrl: "https://www.youtube.com/embed/HEPF2aUTlJs", zoneId: 3, correctInnovationIds: ["inn-19", "inn-20"], correctExpertIds: ["exp-6"], rewardCP: 10, rewardLP: 20, penaltyCP: 10, penaltyLP: 20 },
  { id: 13, title: "เข้าไม่ถึงสวัสดิการ", description: "ตู้บริการอัจฉริยะและอาสาสมัครลงพื้นที่", icon: Landmark, videoUrl: "https://www.youtube.com/embed/FgNS3-fex0c", zoneId: 4, correctInnovationIds: ["inn-21", "inn-22"], correctExpertIds: ["exp-11"], rewardCP: 20, rewardLP: 20, penaltyCP: 20, penaltyLP: 20 },
  { id: 14, title: "ผู้สูงอายุถูกทอดทิ้ง", description: "ศูนย์กิจกรรมชุมชนและติดตามสุขภาพไกล", icon: Heart, videoUrl: "https://www.youtube.com/embed/fpDB-sRucvw", zoneId: 4, correctInnovationIds: ["inn-23", "inn-24"], correctExpertIds: ["exp-13"], rewardCP: 15, rewardLP: 15, penaltyCP: 15, penaltyLP: 15 },
  { id: 15, title: "ไฟไม่สว่างพอ", description: "ระบบรักษาความปลอดภัย แสงสว่าง AI", icon: ShieldCheck, videoUrl: "https://www.youtube.com/embed/62tKtV5y6rk", zoneId: 4, correctInnovationIds: ["inn-25", "inn-26"], correctExpertIds: ["exp-8"], rewardCP: 25, rewardLP: 25, penaltyCP: 25, penaltyLP: 25 },
  { id: 16, title: "ร้องเรียนล่าช้า", description: "แพลตฟอร์มแจ้งปัญหาพลเมืองติดตามเรียลไทม์", icon: Users, videoUrl: "https://www.youtube.com/embed/JTrFeCxJf-Y", zoneId: 4, correctInnovationIds: ["inn-27"], correctExpertIds: ["exp-8"], rewardCP: 20, rewardLP: 15, penaltyCP: 20, penaltyLP: 15 },
  { id: 17, title: "พลังงานไฟฟ้า", description: "แจ้งเตือนและแก้ไขไฟขัดข้องผ่าน SMS", icon: Zap, videoUrl: "https://www.youtube.com/embed/pHRraMBBA8U", zoneId: 5, correctInnovationIds: ["inn-28"], correctExpertIds: ["exp-9"], rewardCP: 20, rewardLP: 20, penaltyCP: 20, penaltyLP: 20 },
  { id: 18, title: "ความล่าช้าภาครัฐ", description: "ข้อมูลเรียลไทม์และแอปตอบคำถามร้องเรียน", icon: MessageSquare, videoUrl: "https://www.youtube.com/embed/3IstHjB75ag", zoneId: 5, correctInnovationIds: ["inn-29", "inn-30"], correctExpertIds: ["exp-11"], rewardCP: 15, rewardLP: 20, penaltyCP: 15, penaltyLP: 20 },
  { id: 19, title: "เบิกงบประมาณล่าช้า", description: "เบิกจ่ายงบดิจิทัล รวดเร็ว โปร่งใส", icon: FileText, videoUrl: "https://www.youtube.com/embed/k9HA1dy-t2E", zoneId: 5, correctInnovationIds: ["inn-31", "inn-32"], correctExpertIds: ["exp-14"], rewardCP: 20, rewardLP: 15, penaltyCP: 20, penaltyLP: 15 },
  { id: 20, title: "ข้อมูลรั่วไหล", description: "ตรวจสอบข้อมูลปลอดภัย ยืนยันตัวตนสูง", icon: ShieldAlert, videoUrl: "https://www.youtube.com/embed/wDHLAGMztuE", zoneId: 5, correctInnovationIds: ["inn-33", "inn-34"], correctExpertIds: ["exp-0"], rewardCP: 25, rewardLP: 25, penaltyCP: 25, penaltyLP: 25 }
];

const QUIZ_DATA: Record<number, any[]> = {
  1: [
    { id: 1, question: "หากได้รับ SMS ว่า \"บัญชีของคุณมีปัญหา ให้กดลิงก์เพื่อยืนยันตัวตน\" ข้อใดคือการปฏิบัติที่ถูกต้องที่สุด?", options: ["ก. รีบกดลิงก์เพื่อป้องกันบัญชีถูกล็อก", "ข. แคปหน้าจอส่งต่อให้เพื่อนระวัง", "ค. ลบทิ้งและติดต่อธนาคารผ่านช่องทางหลัก", "ง. ลองกรอกข้อมูลปลอมเพื่อหลอกมิจฉาชีพกลับ"], correctAnswer: 2 },
    { id: 2, question: "บัญชีม้า ส่งผลกระทบต่อระบบเศรษฐกิจอย่างไรมากที่สุด", options: ["ก. ทำให้ธนาคารมีลูกค้าเยอะขึ้น", "ข. เป็นช่องทางฟอกเงินและยักย้ายเงินจากอาชญากรรม", "ค. ช่วยให้คนจนมีรายได้เสริม", "ง. ทำให้การโอนเงินรวดเร็วขึ้น"], correctAnswer: 1 },
    { id: 3, question: "การส่งเสริม \"Social Enterprise\" (วิสาหกิจเพื่อสังคม) มีเป้าหมายหลักคืออะไร?", options: ["ก. ทำกำไรสูงสุดให้ผู้ถือหุ้น", "ข. แก้ปัญสังคมโดยใช้โมเดลธุรกิจที่พึ่งพาตัวเองได้", "ค. รอรับเงินบริจาคจากรัฐบาลเท่านั้น", "ง. การขายสินค้าราคาถูกกว่าท้องตลาด"], correctAnswer: 1 },
    { id: 4, question: "ในยุค \"โลกเดือด\" ธุรกิจประเภทใดที่มีความเสี่ยงสูงที่สุดหากไม่ปรับตัว?", options: ["ก. เกษตรกรรมที่พึ่งพาฟ้าฝนแบบเดิม", "ข. เป็นความรู้พื้นฐาน", "ค. ธุรกิจนวดสปา", "ง. ร้านขายของชำ"], correctAnswer: 1 },
    { id: 5, question: "ข้อใดคือหัวใจสำคัญของ \"Gig Economy\" (เศรษฐกิจแรงงานอิสระ)", options: ["ก. การรับจ้างงานเป็นชิ้นผ่านแพลตฟอร์ม", "ข. การได้รับการเยียวยาเรื่องเงิน", "ค. การได้รับสวัสดิการเต็มรูปแบบจากรัฐ", "ง. การห้ามทำงานเกิน 8 ชั่วโมงต่อวัน"], correctAnswer: 0 }
  ],
  2: [
    { id: 1, question: "สาเหตุหลักที่ทำให้ฝุ่น PM 2.5 ในเขตเมืองพุ่งสูงในช่วงเช้าคืออะไร", options: ["ก. การเปิดแอร์ในบ้าน", "ข. การทำอาหารตามสั่ง", "ค. การเผาหญ้าในพื้นที่ป่า", "ง. สภาพอากาศปิดและการจราจรหนาแน่น"], correctAnswer: 3 },
    { id: 2, question: "\"Carbon Credit\" คืออะไรในบริบทของการช่วยลดโลกร้อน", options: ["ก. บัตรเครดิตที่ใช้ซื้อต้นไม้", "ข. สิทธิ์ในการปล่อยก๊าซเรือนกระจกที่สามารถซื้อขายได้", "ค. เงินกู้สำหรับสร้างโรงไฟฟ้า", "ง. คะแนนสะสมเมื่อลดการใช้พลาสติก"], correctAnswer: 1 },
    { id: 3, question: "หากเมืองต้องการลด \"เกาะความร้อน\" (Urban Heat Island) วิธีใดยั่งยืนที่สุด", options: ["ก. ติดตั้งเครื่องปรับอากาศในสวนสาธารณะ", "ข. พ่นละอองน้ำบนถนนตลอดวัน", "ค. เพิ่มพื้นที่สีเขียวและป่าแนวตั้งบนตึก", "ง. ทาสีถนนทุกเส้นเป็นสีขาว"], correctAnswer: 2 },
    { id: 4, question: "ข้อใดคือการจัดการขยะตามหลัก \"Circular Economy\" (เศรษฐกิจหมุนเวียน)?", options: ["ก. การนำขยะพลาสติกกลับมาแปรรูปเป็นผลิตภัณฑ์", "ข. การนำขยะไปฝังกลบให้มิดชิด", "ค. การเผาขยะเพื่อผลิตความร้อน", "ง. การแยกขยะแล้วนำไปเทรวมกัน"], correctAnswer: 0 },
    { id: 5, question: "การติดตั้ง \"Smart Grid\" ในเมืองช่วยเรื่องพลังงานได้อย่างไร?", options: ["ก. ทำให้ไฟสว่างขึ้น 2 ท่า", "ข. บริหารจัดการการจ่ายไฟตามความต้องการใช้งานจริง", "ค. ทำให้ไม่ต้องจ่ายค่าไฟ", "ง. ป้องกันไฟฟ้าช็อตได้ 100%"], correctAnswer: 1 }
  ],
  3: [
    { id: 1, question: "เมื่อเราขับรถถึง \"ทางม้าลาย\" กฎหมายจราจรฉบับปรับปรุงใหม่กำหนดให้เราปฏิบัติอย่างไร", options: ["ก. บีบแตรเตือนคนข้ามให้รีบเดิน หรือวิ่งข้ามไปเร็ว ๆ", "ข. ชะลอรถและเตรียมหยุดให้คนข้าม หากฝ่าฝืนมีโทษปรับสูงสุดถึง 4,000 บาท", "ค. ถ้าไม่มีกล้องวงจรปิดหรือเตำรวจ ก็สามารถขับผ่านไปได้เลย", "ง. เปิดไฟฉุกเฉินเพื่อให้รถคันหลังรู้ว่าเราจะไม่หยุด"], correctAnswer: 1 },
    { id: 2, question: "ปัญหารถติดหน้าปากซอย เพราะคนต่อคิวรอพี่วินหรือรถเมล์นานมาก เทคโนโลยีใดช่วยแก้ปัญหานี้ได้ตรงจุดที่สุด", options: ["ก. ติดลำโพงประกาศให้คนรีบขึ้นรถเร็วๆ", "ข. แอปพลิเคชันเช็กตำแหน่งรถเมล์/รถสาธารณะแบบเรียลไทม์ จะได้กะเวลาออกจากบ้านได้พอดี", "ค. การเพิ่มจำนวนที่จอดรถส่วนตัวให้มากขึ้น", "ง. การห้ามคนเดินเท้าออกมาออหน้าปากซอย"], correctAnswer: 1 },
    { id: 3, question: "การขี่มอเตอร์ไซค์ \"ย้อนศร\" หรือ \"ขึ้นไปวิ่งบนฟุตบาท\" นอกจากจะผิดกฎหมายแล้ว ในเมืองอัจฉริยะจะโดนจัดการอย่างไร?", options: ["ก. ระบบ AI จากกล้องวงจรปิดจะตรวจจับทะเบียนรถและส่งใบสั่งไปถึงบ้านโดยไม่ต้องมีตำรวจยืนเฝ้า", "ข. เจ้าหน้าที่จะโทรศัพท์มาเตือนทันทีที่ล้อแตะฟุตบาท", "ค. ระบบจะสั่งตัดน้ำตัดไฟที่บ้านผู้กระทำผิด", "ง. รถจะถูกล็อกล้ออัตโนมัติด้วยระบบแม่เหล็ก"], correctAnswer: 0 },
    { id: 4, question: "ในช่วงที่ \"ฝนตกหนักน้ำท่วมขัง\" จนมองไม่เห็นเส้นแบ่งเลนจราจร สิ่งใดจะช่วยให้เราเดินทางปลอดภัยที่สุด?", options: ["ก. ป้ายจราจรอัจฉริยะที่แจ้งเตือนระดับน้ำและบอกทางเลี่ยงที่ปลอดภัยให้ทันที", "ข. ขับตามคันหน้าไปเรื่อยๆ ไม่ว่าเขาจะไปไหน", "ค. การเปิดไฟสูงใส่รถที่ขับสวนมาเพื่อดูทาง", "ง. การจอดรถแช่ไว้กลางถนนจนกว่าน้ำจะลด"], correctAnswer: 0 },
    { id: 5, question: "คาร์ซีท (Car Seat)\" สำหรับเด็กเล็ก มีความสำคัญอย่างไรตามกฎหมายจราจรปัจจุบัน?", options: ["ก. มีไว้เพื่อให้เด็กนอนหลับสบายระหว่างเดินทาง", "ข. เป็นอุปกรณ์บังคับตามกฎหมายเพื่อความปลอดภัยของเด็ก หากไม่ใช้มีโทษปรับ", "ค. มีไว้สำหรับประดับรถให้ดูทันสมัย", "ง. ใช้เฉพาะเวลาขับรถออกต่างจังหวัดเท่านั้น ในเมืองไม่ต้องใช้ก็ได้"], correctAnswer: 1 }
  ],
  4: [
    { id: 1, question: "หากมีคนแปลกหน้าแอบถ่ายรูปเราในที่สาธารณะแล้วเอาไปโพสต์ประจานในโซเชียล กฎหมายใดที่คุ้มครองเราโดยตรง?", options: ["ก. กฎหมายคุ้มครองผู้บริโภค", "ข. กฎหมายคุ้มครองข้อมูลส่วนบุคคล (PDPA)", "ค. กฎหมายลิขสิทธิ์และทรัพย์สินทางปัญญา", "ง. กฎหมายว่าด้วยการกระทำความผิดทางคอมพิวเตอร์ (พ.ร.บ. คอมฯ) เท่านั้น"], correctAnswer: 1 },
    { id: 2, question: "การ \"แจ้งเบาะแส\" เช่น เจอคนทิ้งขยะลงคลอง หรือเจอรถจอดบนฟุตบาท แล้วได้รับส่วนแบ่งเงินรางวัลนำจับ ถือเป็นบทบาทพลเมืองแบบใด?", options: ["ก. การสอดรู้สอดเห็นเรื่องของผู้อื่น", "ข. การทำหน้าที่แทนเจ้าหน้าที่ตำรวจ 100%", "ค. การทำหน้าที่พลเมืองเพื่อผลประโยชน์ส่วนตน", "ง. การมีส่วนร่วมในการตรวจสอบและสร้างระเบียบให้สังคม"], correctAnswer: 3 },
    { id: 3, question: "\"พินัยกรรม (Living Will)\" ตามกฎหมายไทย คือสิทธิในการเลือกสิ่งใดในวาระสุดท้ายของชีวิต?", options: ["ก. สิทธิในการเลือกมรดกให้ลูกหลาน", "ข. สิทธิในการเลือกสถานที่จัดงานศพของตนเอง", "ค. สิทธิในการปฏิเสธการรักษาที่เพียงเพื่อยื้อความตายในวาระสุดท้าย", "ง. สิทธิในการโอนทรัพย์สินให้รัฐบาล"], correctAnswer: 2 },
    { id: 4, question: "เมื่อพบเห็น \"การทุจริต\" ในโครงการก่อสร้างของเขตหรือชุมชน ประชาชนควรใช้ช่องทางใดตรวจสอบข้อมูลที่ง่ายและโปร่งใสที่สุด?", options: ["ก. เข้าไปขโมยเอกสารในสำนักงานเขต", "ข. ตรวจสอบผ่านระบบ \"ภาษีไปไหน\" หรือระบบข้อมูลเปิด (Open Data) ของรัฐ", "ค. นั่งรอให้สื่อมวลชนมาทำข่าวเอง", "ง. โพสต์ด่าทอเจ้าหน้าที่ในเฟซบุ๊กส่วนตัวโดยไม่มีหลักฐาน"], correctAnswer: 1 },
    { id: 5, question: "กฎหมาย \"การไกล่เกลี่ยข้อพิพาท\" ในชุมชน มีประโยชน์อย่างไรต่อการดำเนินชีวิตประจำวัน?", options: ["ก. ช่วยให้เราไม่ต้องเสียเวลาและค่าใช้จ่ายไปฟ้องศาลเมื่อมีเรื่องทะเลาะกับเพื่อนบ้าน", "ข. ช่วยให้คนทำผิดไม่ต้องรับโทษตามกฎหมายเลย", "ค. ช่วยให้เราสามารถสั่งปรับเงินคู่กรณีได้ตามใจชอบ", "ง. ช่วยให้เราสามารถยึดทรัพย์คู่กรณีมาเป็นของเราได้ทันที"], correctAnswer: 0 }
  ],
  5: [
    { id: 1, question: "\"Open Data\" ของภาครัฐมีวัตถุประสงค์หลักเพื่ออะไร?", options: ["ก. เพื่อโชว์ผลงานของรัฐบาล", "ข. เพื่อความโปร่งใสและให้ประชาชนนำข้อมูลไปต่อยอด", "ค. เพื่อเก็บข้อมูลส่วนตัวของประชาชน", "ง. เพื่อขายข้อมูลให้บริษัทเอกชน"], correctAnswer: 1 },
    { id: 2, question: "ข้อใดคือการ \"มีส่วนร่วมทางการเมือง\" ในระดับท้องถิ่นที่ทำได้ง่ายที่สุดในยุคดิจิทัล?", options: ["ก. การไปประท้วงที่หน้าสำนักงานเขต", "ข. การเขียนจดหมายร้องเรียนส่งไปรษณีย์", "ค. การโหวตหรือเสนอแนะความต้องการผ่านแอปพลิเคชันเมือง", "ง. การโหวตหรือเสนอแนะความต้องการผ่านแอปพลิเคชันเมือง", "ง. การโพสต์ด่าเจ้าหน้าที่ในโซเชียลส่วนตัว"], correctAnswer: 2 },
    { id: 3, question: "\"E-Government\" ช่วยลดปัญาคอร์รัปชันได้อย่างไร?", options: ["ก. ลดการใช้ดุลพินิจ of เจ้าหน้าที่และบันทึกข้อมูลในระบบที่ตรวจสอบได้", "ข. ทำให้ข้าราชการมีรายได้เพิ่ม", "ค. ทำให้ประชาชนไม่ต้องเสียภาษี", "ง. เพิ่มขั้นตอนการอนุมัติให้มากขึ้น"], correctAnswer: 0 },
    { id: 4, question: "การบริหารแบบ \"Decentralization\" (การกระจายอำนาจ) สำคัญต่อเมืองอย่างไร?", options: ["ก. ทำให้รัฐบาลกลางทำงานสบายขึ้น", "ข. ทำให้งบประมาณกระจุกตัวอยู่ที่เดียว", "ค. ให้คนในท้องถิ่นที่มีความเข้าใจปัญหาตัดสินใจแก้ปัญหาเองได้ตรงจุด", "ง. ทำให้ไม่ต้องมีกฎหมายส่วนกลาง"], correctAnswer: 2 },
    { id: 5, question: "หากเมืองมีงบประมาณจำกัด \"Participatory Budgeting\" (งบประมาณแบบมีส่วนร่วม) จะถูกนำมาใช้เพื่ออะไร?", options: ["ก. ให้ข้าราชการแบ่งงบกันเอง", "ข. ให้ประชาชนร่วมตัดสินใจว่าควรใช้งบในโครงการใดที่จำเป็นที่สุด", "ค. การสุ่มจับฉลากว่าเขตไหนจะได้เงิน", "ง. การเก็บงบไว้ใช้ในปีถัดไป"], correctAnswer: 1 }
  ]
};

const VALID_NFC_IDS = [
  "04:41:f4:aa:7e:26:81", "04:57:fa:aa:7e:26:81", "04:29:13:ab:7e:26:81",
  "04:3c:19:ab:7e:26:81", "04:51:1f:ab:7e:26:81", "04:39:a4:aa:7e:26:81",
  "04:6b:9b:aa:7e:26:81", "04:d8:95:aa:7e:26:81", "04:28:8e:aa:7e:26:81"
].map(id => id.toLowerCase());

const MISSION_NFC_MAP: Record<string, number> = {
  "04:49:e3:aa:7e:26:81": 1, 
  "04:3b:dc:aa:7e:26:81": 2, 
  "04:b5:d1:aa:7e:26:81": 3,
  "04:1a:c9:aa:7e:26:81": 4, 
  "04:23:c3:aa:7e:26:81": 5, 
  "04:d2:b7:aa:7e:26:81": 6,
  "04:f6:b1:aa:7e:26:81": 7, 
  "04:4b:63:aa:7e:26:81": 8, 
  "04:bb:5a:aa:7e:26:81": 9,
  "04:de:56:aa:7e:26:81": 10, 
  "04:cd:52:aa:7e:26:81": 11, 
  "04:85:4e:aa:7e:26:81": 12,
  "04:78:4b:aa:7e:26:81": 13, 
  "04:be:4e:aa:7e:26:81": 14, 
  "04:3b:53:aa:7e:26:81": 15,
  "04:2e:5a:aa:7e:26:81": 16, 
  "04:26:5e:aa:7e:26:81": 17, 
  "04:a5:74:aa:7e:26:81": 18, 
  "04:8e:67:aa:7e:26:81": 19, 
  "04:fb:6e:aa:7e:26:81": 20, 
};

// --- MAIN COMPONENT ---
export default function SmartCityHeroes() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"REGISTRATION" | "SETUP" | "PLAYING" | "RESULTS">("REGISTRATION");
  const [players, setPlayers] = useState<any[]>([
    { id: 1, name: "", lp: 0, individualContributionCP: 0, solvedCount: 0, solvedQuizCount: 0, stats: { missions: {}, quizzes: {} } },
    { id: 2, name: "", lp: 0, individualContributionCP: 0, solvedCount: 0, solvedQuizCount: 0, stats: { missions: {}, quizzes: {} } },
  ]);
  const [cityCP, setCityCP] = useState(20);
  const [targetCP] = useState(200);
  const [gameTimeMinutes, setGameTimeMinutes] = useState(20);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activePlayerId, setActivePlayerId] = useState<number | null>(null);
  const [turnMode, setTurnMode] = useState<"PROBLEM" | "QUESTION" | null>(null);
  const [problemSubPhase, setProblemSubPhase] = useState<string>("PLAYER_SELECTION");
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [selectedMission, setSelectedMission] = useState<any | null>(null);
  const [selectedQuizQuestion, setSelectedQuizQuestion] = useState<any | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [viewingPlayerId, setViewingPlayerId] = useState<number | null>(null);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isNfcActive, setIsNfcActive] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);

    const handleWindowError = (event: ErrorEvent) => {
      console.error("Unhandled runtime error:", event.error || event.message);
    };
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);
    };

    window.addEventListener("error", handleWindowError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleWindowError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  const handleEndGame = useCallback(() => {
    setIsTimerRunning(false);
    setPhase("RESULTS");
    setActivePlayerId(null);
  }, []);

  useEffect(() => {
    if (phase === "PLAYING" && (cityCP <= 0 || cityCP >= targetCP)) {
      handleEndGame();
    }
  }, [cityCP, targetCP, phase, handleEndGame]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      handleEndGame();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, handleEndGame]);

  useEffect(() => {
    if (typeof window === "undefined" || !("NDEFReader" in window) || phase !== "PLAYING") return;
    let ndef: any;
    const startNfc = async () => {
      try {
        ndef = new (window as any).NDEFReader();
        ndef.onreadingerror = (event: any) => {
          console.error("NFC tag reading error:", event);
        };
        await ndef.scan();
        setIsNfcActive(true);
        ndef.onreading = (event: any) => {
          try {
            const serialNumber = (event.serialNumber || "").toLowerCase();
            if (VALID_NFC_IDS.includes(serialNumber)) {
              toast({ title: "IDENTITY VERIFIED", description: "Interface Locked to Knowledge Stream.", className: "bg-primary text-primary-foreground" });
              setTurnMode("QUESTION");
              setProblemSubPhase("PLAYER_SELECTION");
              setActivePlayerId(null); setSelectedSlot(null); setSelectedMission(null); setSelectedQuizQuestion(null); setIsCorrect(null);
            } else if (MISSION_NFC_MAP[serialNumber]) {
              const missionId = MISSION_NFC_MAP[serialNumber];
              const mission = MISSIONS.find(m => m.id === missionId);
              if (mission) {
                toast({ title: "MISSION IDENTIFIED", description: `Sector: ${mission.title}`, className: "bg-accent text-accent-foreground" });
                setTurnMode("PROBLEM");
                setSelectedMission(mission);
                setProblemSubPhase("PLAYER_SELECTION");
                setActivePlayerId(null); setSelectedSlot(mission.zoneId); setSelectedQuizQuestion(null); setIsCorrect(null);
              }
            }
          } catch (readError) {
            console.error("Error processing NFC reading event:", readError);
          }
        };
      } catch (error) {
        console.error("Failed to initialize NFC scanner:", error);
        setIsNfcActive(false);
      }
    };
    startNfc().catch((error) => {
      console.error("Unexpected NFC startup error:", error);
      setIsNfcActive(false);
    });
    return () => { setIsNfcActive(false); };
  }, [phase, toast]);

  const updateScores = useCallback((id: number, cpChange: number, lpChange: number, incMissions = false, incQuiz = false) => {
    setCityCP(prev => Math.max(0, Math.min(targetCP, prev + cpChange)));
    setPlayers(prev => prev.map(p => p.id === id ? {
      ...p, lp: Math.max(0, p.lp + lpChange), individualContributionCP: p.individualContributionCP + cpChange,
      solvedCount: incMissions ? p.solvedCount + 1 : p.solvedCount, solvedQuizCount: incQuiz ? p.solvedQuizCount + 1 : p.solvedQuizCount
    } : p));
  }, [targetCP]);

  const updateStats = useCallback((playerId: number, type: 'mission' | 'quiz', zoneId: number, isCorrect: boolean) => {
    setPlayers(prev => prev.map(p => {
      if (p.id !== playerId) return p;
      const cat = type === 'mission' ? 'missions' : 'quizzes';
      const stats = p.stats[cat][zoneId] || { correct: 0, incorrect: 0 };
      return {
        ...p, stats: { ...p.stats, [cat]: { ...p.stats[cat], [zoneId]: {
          correct: isCorrect ? stats.correct + 1 : stats.correct,
          incorrect: !isCorrect ? stats.incorrect + 1 : stats.incorrect,
        }}}
      };
    }));
  }, []);

  const handleSolve = (type: 'innovation' | 'expert', cardId: string) => {
    if (!selectedMission || !activePlayerId) return;
    const correct = type === 'innovation' ? selectedMission.correctInnovationIds.includes(cardId) : selectedMission.correctExpertIds.includes(cardId);
    setIsCorrect(correct);
    if (correct) { updateScores(activePlayerId, selectedMission.rewardCP, selectedMission.rewardLP, true); updateStats(activePlayerId, 'mission', selectedMission.zoneId, true); }
    else { updateScores(activePlayerId, -selectedMission.penaltyCP, -selectedMission.penaltyLP); updateStats(activePlayerId, 'mission', selectedMission.zoneId, false); }
    setProblemSubPhase("FEEDBACK");
  };

  const handleQuizAnswer = (answerIndex: number) => {
    if (!selectedQuizQuestion || !activePlayerId || selectedSlot === null) return;
    const correct = selectedQuizQuestion.correctAnswer === answerIndex;
    setIsCorrect(correct);
    if (correct) { updateScores(activePlayerId, 20, 20, false, true); updateStats(activePlayerId, 'quiz', selectedSlot, true); }
    else { updateScores(activePlayerId, -20, -20); updateStats(activePlayerId, 'quiz', selectedSlot, false); }
    setProblemSubPhase("QUIZ_RESULT");
  };

  const addPlayer = () => {
    if (players.length >= 5) return;
    const nextId = Math.max(...players.map(p => p.id)) + 1;
    setPlayers(prev => [...prev, { id: nextId, name: "", lp: 0, individualContributionCP: 0, solvedCount: 0, solvedQuizCount: 0, stats: { missions: {}, quizzes: {} } }]);
  };

  const removePlayer = (id: number) => {
    if (players.length <= 2) return;
    setPlayers(prev => prev.filter(p => p.id !== id));
  };

  const resetTurnState = () => {
    setActivePlayerId(null); setTurnMode(null); setSelectedSlot(null); setSelectedMission(null); setSelectedQuizQuestion(null);
    setProblemSubPhase("PLAYER_SELECTION"); setIsCorrect(null);
  };

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const rotationCount = 8 + Math.random() * 5;
    const finalRotation = wheelRotation + (rotationCount * 360) + Math.floor(Math.random() * 360);
    setWheelRotation(finalRotation);
    setTimeout(() => setIsSpinning(false), 5000);
  };

  const getRadarData = useMemo(() => {
    const p = players.find(player => player.id === viewingPlayerId);
    if (!p) return [];
    return MISSION_SLOTS.map(slot => {
      const missionCorrect = p.stats.missions[slot.id]?.correct || 0;
      const quizCorrect = p.stats.quizzes[slot.id]?.correct || 0;
      const totalCorrect = missionCorrect + quizCorrect;
      return { subject: slot.label, individual: Math.round((totalCorrect / 9) * 100), benchmark: 80, fullMark: 100 };
    });
  }, [players, viewingPlayerId]);

  const getAccomplishments = useMemo(() => {
    const p = players.find(player => player.id === viewingPlayerId);
    if (!p) return [];
    return MISSION_SLOTS.map(slot => {
      const missionCorrect = p.stats.missions[slot.id]?.correct || 0;
      const quizCorrect = p.stats.quizzes[slot.id]?.correct || 0;
      const totalCorrect = missionCorrect + quizCorrect;
      const percentage = (totalCorrect / 9) * 100;
      let stars = percentage >= 71 ? 3 : (percentage >= 41 ? 2 : (totalCorrect > 0 ? 1 : 0));
      let tier = stars === 3 ? "Mastery" : (stars === 2 ? "Proficient" : (stars === 1 ? "Apprentice" : "NO DATA"));
      let feedback = stars === 3 ? "SPECIAL TALENT DEMONSTRATED." : (stars === 2 ? "HIGH POTENTIAL." : (stars === 1 ? "GROWING COMPETENCY." : "NO PARTICIPATION RECORDED."));
      return { label: slot.label, stars, tier, feedback };
    }).sort((a,b) => b.stars - a.stars);
  }, [players, viewingPlayerId]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-primary/20 transition-all duration-700">
      <div className="relative z-10 grid grid-cols-12 gap-4 sm:gap-6 p-3 sm:p-6 min-h-screen max-w-[1920px] mx-auto">
        {(phase === "REGISTRATION" || phase === "SETUP") && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-background/80 backdrop-blur-md overflow-y-auto transition-all duration-500">
            {phase === "REGISTRATION" ? (
              <Card className="w-full max-w-2xl border-none rounded-[2.5rem] overflow-hidden shadow-2xl my-4 glass-card">
                <CardHeader className="text-center pb-6 sm:pb-10 pt-6 sm:pt-12">
                  <div className="w-28 h-28 sm:w-48 sm:h-48 mx-auto relative mb-4 sm:mb-6 rounded-3xl overflow-hidden bg-white shadow-2xl ring-1 ring-white/10 hover:scale-105 transition-transform duration-500">
                    <Image src="/assets/aistudio/S__9388035_07fd2a38.jpg" alt="Logo" fill className="object-contain" priority referrerPolicy="no-referrer" onError={(e) => console.error("Failed to load Logo image:", e)} />
                  </div>
                  <CardTitle className="text-2xl sm:text-5xl font-black tracking-widest text-primary uppercase italic text-glow truncate px-2">THE SHIFTER</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-8 p-4 sm:p-10">
                  <div className="grid gap-3 sm:gap-6">
                    {players.map((p, idx) => (
                      <div key={p.id} className="space-y-1.5 sm:space-y-2 relative group">
                        <div className="flex justify-between items-center ml-1 sm:ml-2">
                          <Label className="font-black text-primary/70 uppercase text-[8px] sm:text-xs tracking-[0.2em] truncate flex-1">ผู้เล่น {idx + 1}</Label>
                          {players.length > 2 && (
                            <Button variant="ghost" size="icon" className="h-5 w-5 sm:h-6 sm:w-6 text-destructive/40 hover:text-destructive hover:bg-destructive/10 transition-all" onClick={() => removePlayer(p.id)}>
                              <UserMinus className="w-3 h-3 sm:w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <Input placeholder="กรุณาใส่ชื่อของคุณ" value={p.name} className="h-10 sm:h-14 bg-secondary/30 border-white/5 font-bold text-sm sm:text-lg rounded-xl sm:rounded-2xl focus:ring-primary/50 transition-all text-foreground" onChange={(e) => {
                          const next = [...players];
                          const index = next.findIndex(player => player.id === p.id);
                          next[index].name = e.target.value;
                          setPlayers(next);
                        }} />
                      </div>
                    ))}
                    {players.length < 5 && (
                      <Button variant="outline" className="w-full h-10 sm:h-14 border-dashed border-2 border-primary/10 bg-primary/5 hover:bg-primary/10 text-primary font-bold rounded-xl sm:rounded-2xl transition-all" onClick={addPlayer}>
                        <UserPlus className="mr-2 w-4 h-4 sm:w-5 sm:h-5" /> เพิ่มผู้เล่น
                      </Button>
                    )}
                  </div>
                  <Button className="w-full h-12 sm:h-16 text-lg sm:text-2xl font-black uppercase italic tracking-widest rounded-xl sm:rounded-2xl shadow-xl transition-all hover:scale-[1.02] neon-glow-primary" onClick={() => setPhase("SETUP")} disabled={players.some(p => !p.name.trim())}>ถัดไป <ChevronRight className="ml-1 sm:ml-2 w-5 h-5 sm:w-8 sm:h-8" /></Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="w-full max-w-lg border-none rounded-[2.5rem] shadow-2xl glass-card">
                <CardHeader className="text-center pb-6 sm:pb-10 pt-6 sm:pt-12">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-primary/10">
                    <Settings className="w-8 h-8 sm:w-12 sm:h-12 text-primary animate-spin-slow" />
                  </div>
                  <CardTitle className="text-2xl sm:text-4xl font-black uppercase italic text-primary text-glow truncate px-2">ตั้งค่าภารกิจ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 sm:space-y-10 p-6 sm:p-10">
                  <div className="space-y-3 sm:space-y-6 text-center">
                    <Label className="text-base sm:text-xl font-bold uppercase tracking-[0.2em] text-primary flex items-center justify-center gap-2 sm:gap-3 truncate"><Timer className="w-4 h-4 sm:w-6 sm:h-6 shrink-0" /> เวลาเกม (นาที)</Label>
                    <div className="flex items-center gap-3 sm:gap-6 justify-center">
                      <Button variant="outline" className="h-12 w-12 sm:h-20 sm:w-20 rounded-2xl border-white/5 bg-secondary/30 hover:bg-secondary/50 transition-all" onClick={() => setGameTimeMinutes(Math.max(5, gameTimeMinutes - 5))}><Minus className="w-5 h-5 sm:w-8 sm:h-8" /></Button>
                      <div className="text-4xl sm:text-7xl font-black text-primary min-w-[70px] sm:min-w-[140px] text-glow tabular-nums">{gameTimeMinutes}</div>
                      <Button variant="outline" className="h-12 w-12 sm:h-20 sm:w-20 rounded-2xl border-white/5 bg-secondary/30 hover:bg-secondary/50 transition-all" onClick={() => setGameTimeMinutes(gameTimeMinutes + 5)}><Plus className="w-5 h-5 sm:w-8 sm:h-8" /></Button>
                    </div>
                  </div>
                  <Button className="w-full h-14 sm:h-20 text-xl sm:text-3xl font-black uppercase italic rounded-2xl shadow-2xl hover:scale-[1.02] transition-all neon-glow-primary" onClick={() => { setTimeLeft(gameTimeMinutes * 60); setIsTimerRunning(true); setPhase("PLAYING"); }}>เริ่มเกม <Zap className="ml-1 sm:ml-2 w-5 h-5 sm:w-8 sm:h-8 fill-current" /></Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {phase === "PLAYING" && (
          <>
            <aside className="col-span-12 lg:col-span-2 space-y-4 sm:space-y-6 order-2 lg:order-none animate-in fade-in duration-700">
              <div className="flex items-center justify-between px-2 mb-1 sm:mb-2">
                <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                  <Users className="w-5 h-5 sm:w-7 sm:h-7 text-primary/70 shrink-0" />
                  <h2 className="text-lg sm:text-2xl font-black text-primary/80 italic uppercase tracking-tight truncate">ผู้เล่น</h2>
                </div>
                {isNfcActive && <Badge className="bg-secondary/40 text-accent border-accent/20 flex items-center gap-1 px-2 py-0.5 text-[7px] sm:text-[10px] shrink-0"><Wifi className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> NFC</Badge>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-6">
                {players.map((p) => (
                  <Card key={p.id} className={cn("transition-all duration-500 border rounded-[2rem] glass-card", activePlayerId === p.id ? "ring-2 ring-primary border-primary shadow-2xl scale-[1.01] neon-glow-primary" : "border-white/5 opacity-70 hover:opacity-100")}>
                    <CardContent className="p-3 sm:p-5 space-y-3 sm:space-y-5">
                      <div className="flex justify-between items-start gap-2 overflow-hidden">
                        <div className="space-y-0.5 sm:space-y-1 flex-1 min-w-0">
                          <span className="text-[7px] sm:text-[10px] font-black text-primary/50 uppercase tracking-[0.2em] truncate block">Pilot ID: {p.id}</span>
                          <div className={cn("text-sm sm:text-xl font-black uppercase italic tracking-tight truncate drop-shadow-sm transition-all text-white", activePlayerId === p.id && "text-primary text-glow")}>{p.name}</div>
                        </div>
                        <Badge variant={activePlayerId === p.id ? "default" : "outline"} className={cn("px-1.5 sm:px-3 py-0.5 sm:py-1 font-black uppercase text-[7px] sm:text-[10px] tracking-widest transition-all shrink-0", activePlayerId === p.id && "bg-primary text-primary-foreground")}>{activePlayerId === p.id ? "ACTIVE" : "READY"}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 sm:gap-4 py-2 sm:py-4 border-y border-white/5">
                        <div className="space-y-1.5 min-w-0">
                          <div className="text-[7px] sm:text-[9px] font-black uppercase text-primary/70 tracking-widest flex items-center gap-1 truncate"><Activity className="w-2 h-2 sm:w-2.5 sm:h-2.5" /> CP</div>
                          <div className="flex items-center justify-between bg-secondary/30 rounded-xl px-1 py-0.5">
                            <Button size="icon" variant="ghost" className="h-5 w-5 sm:h-7 sm:w-7 rounded-lg hover:bg-destructive/10 text-destructive/60 hover:text-destructive transition-all" onClick={() => updateScores(p.id, -5, 0)}><Minus className="w-2.5 h-2.5" /></Button>
                            <span className="text-[10px] sm:text-base font-black tabular-nums text-white mx-1 truncate">{p.individualContributionCP}</span>
                            <Button size="icon" variant="ghost" className="h-5 w-5 sm:h-7 sm:w-7 rounded-lg hover:bg-primary/10 text-primary/60 hover:text-primary transition-all" onClick={() => updateScores(p.id, 5, 0)}><Plus className="w-2.5 h-2.5" /></Button>
                          </div>
                        </div>
                        <div className="space-y-1.5 min-w-0">
                          <div className="text-[7px] sm:text-[9px] font-black uppercase text-accent/70 tracking-widest flex items-center gap-1 truncate"><Target className="w-2 h-2 sm:w-2.5 sm:h-2.5" /> LP</div>
                          <div className="flex items-center justify-between bg-secondary/30 rounded-xl px-1 py-0.5">
                            <Button size="icon" variant="ghost" className="h-5 w-5 sm:h-7 sm:w-7 rounded-lg hover:bg-destructive/10 text-destructive/60 hover:text-destructive transition-all" onClick={() => updateScores(p.id, 0, -5)}><Minus className="w-2.5 h-2.5" /></Button>
                            <span className="text-[10px] sm:text-base font-black tabular-nums text-white mx-1 truncate">{p.lp}</span>
                            <Button size="icon" variant="ghost" className="h-5 w-5 sm:h-7 sm:w-7 rounded-lg hover:bg-accent/10 text-accent/60 hover:text-accent transition-all" onClick={() => updateScores(p.id, 0, 5)}><Plus className="w-2.5 h-2.5" /></Button>
                          </div>
                        </div>
                      </div>
                      <div className="bg-primary/5 p-2 sm:p-4 rounded-2xl border border-primary/10 relative overflow-hidden transition-all hover:bg-primary/10">
                        <div className="absolute top-0 right-0 p-1 sm:p-2 opacity-10"><Trophy className="w-4 h-4 sm:w-8 sm:h-8" /></div>
                        <div className="text-[7px] sm:text-[9px] font-black text-primary/60 uppercase tracking-[0.3em] mb-0.5 truncate">Loyalty Yield</div>
                        <div className="text-base sm:text-2xl font-black text-primary tabular-nums text-glow truncate">{p.lp}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </aside>

            <main className="col-span-12 lg:col-span-8 space-y-4 sm:space-y-6 order-1 lg:order-none px-0 sm:px-4 transition-all duration-500">
              <Card className="sticky top-0 z-50 glass-card rounded-[2rem] border-white/5 shadow-xl overflow-hidden neon-glow-secondary">
                <CardContent className="p-1.5 sm:p-3 flex items-center justify-between gap-2 sm:gap-6">
                  <div className="flex-1 space-y-1 sm:space-y-1.5 ml-1 sm:ml-0 min-w-0">
                    <div className="flex justify-between text-[6px] sm:text-[10px] font-black italic uppercase tracking-[0.1em] text-primary/80 gap-2">
                      <span className="flex items-center gap-1 sm:gap-2 truncate"><Activity className="w-2 h-2 sm:w-3.5 sm:h-3.5 shrink-0" /> Sector Stability Score</span>
                      <span className="text-glow whitespace-nowrap shrink-0">{cityCP} / {targetCP} CP</span>
                    </div>
                    <div className="relative h-1.5 sm:h-3 w-full bg-secondary/40 rounded-full overflow-hidden border border-white/5">
                      <div className="absolute h-full bg-primary transition-all duration-1000 ease-out rounded-full shadow-[0_0_15px_hsla(var(--primary),0.5)]" style={{ width: `${(cityCP / targetCP) * 100}%` }} />
                    </div>
                  </div>
                  <div className="bg-primary/5 border border-primary/10 px-2 sm:px-4 py-1 sm:py-1.5 rounded-2xl text-center min-w-[55px] sm:min-w-[100px] transition-all hover:bg-primary/10 shrink-0">
                    <div className="text-[5px] sm:text-[8px] font-black uppercase text-primary/60 tracking-widest truncate">MISSION TIME</div>
                    <div className="text-[10px] sm:text-xl font-black tabular-nums text-primary text-glow">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon" className="h-8 w-8 sm:h-12 sm:w-12 rounded-2xl shadow-xl hover:scale-110 hover:bg-destructive transition-all flex-shrink-0">
                        <LogOut className="h-4 w-4 sm:h-6 sm:h-6" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="glass-card border-white/10 rounded-3xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-black uppercase italic text-primary">ABORT MISSION?</AlertDialogTitle>
                        <AlertDialogDescription className="text-muted-foreground">
                          Are you sure you want to end the current mission and proceed to results?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl font-bold">Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl font-bold" onClick={handleEndGame}>
                          Abort Mission
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>

              {!turnMode ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 py-4 sm:py-10 animate-in slide-in-from-bottom-10 duration-700">
                  <Card className="flex flex-col items-center justify-center p-6 sm:p-12 border-2 border-dashed border-primary/20 bg-primary/5 rounded-[3rem] hover:border-primary/50 hover:bg-primary/10 transition-all cursor-pointer group shadow-lg" onClick={() => { setTurnMode("PROBLEM"); setProblemSubPhase("PLAYER_SELECTION"); }}>
                    <div className="bg-secondary/40 p-5 sm:p-10 rounded-full shadow-2xl mb-4 sm:mb-8 border border-white/5 group-hover:scale-110 transition-all duration-500 group-hover:bg-primary/20">
                      <ShieldCheck className="w-12 h-12 sm:w-24 sm:h-24 text-primary transition-all group-hover:text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl sm:text-4xl font-black text-primary uppercase italic tracking-tight text-center text-glow transition-all group-hover:scale-105">ดูคลิปเพื่อทำภารกิจ</CardTitle>
                    <p className="mt-2 sm:mt-6 text-muted-foreground font-medium text-center text-[10px] sm:text-lg opacity-60 group-hover:opacity-100 transition-opacity">Deploy tactical solutions to stabilize urban sectors.</p>
                  </Card>
                  <Card className="flex flex-col items-center justify-center p-6 sm:p-12 border-2 border-dashed border-accent/20 bg-accent/5 rounded-[3rem] hover:border-accent/50 hover:bg-accent/10 transition-all cursor-pointer group shadow-lg" onClick={() => { setTurnMode("QUESTION"); setProblemSubPhase("PLAYER_SELECTION"); }}>
                    <div className="bg-secondary/40 p-5 sm:p-10 rounded-full shadow-2xl mb-4 sm:mb-8 border border-white/5 group-hover:scale-110 transition-all duration-500 group-hover:bg-accent/20">
                      <HelpCircle className="w-12 h-12 sm:w-24 sm:h-24 text-accent transition-all group-hover:text-accent-foreground" />
                    </div>
                    <CardTitle className="text-xl sm:text-4xl font-black text-accent uppercase italic tracking-tight text-center text-glow transition-all group-hover:scale-105">ตอบคำถาม</CardTitle>
                    <p className="mt-2 sm:mt-6 text-muted-foreground font-medium text-center text-[10px] sm:text-lg opacity-60 group-hover:opacity-100 transition-opacity">Verify strategic intelligence to yield LP rewards.</p>
                  </Card>
                </div>
              ) : (
                <Card className="border-none rounded-[3rem] glass-card shadow-2xl overflow-hidden min-h-[450px] sm:min-h-[850px] animate-in fade-in zoom-in duration-500">
                  <CardHeader className="bg-primary/5 border-b border-white/5 p-4 sm:p-10">
                    <div className="flex justify-between items-center gap-3">
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <span className="text-[6px] sm:text-[10px] font-black text-primary/60 uppercase tracking-[0.4em] block truncate">Tactical Interface v2.5</span>
                        <h3 className="text-xl sm:text-4xl font-black uppercase italic tracking-tight text-glow truncate">{turnMode === "PROBLEM" ? "Carry out a mission" : "Answering Questions"}</h3>
                      </div>
                      <Badge className="px-3 sm:px-8 py-1.5 sm:py-3 font-black uppercase tracking-widest text-[10px] sm:text-base bg-primary shadow-lg hover:scale-105 transition-all text-primary-foreground max-w-[150px] sm:max-w-[300px] shrink-0">
                        <span className="truncate block">{activePlayerId ? players.find(p => p.id === activePlayerId)?.name : "STANDBY"}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-12">
                    <div className="space-y-6 sm:space-y-10">
                      {!activePlayerId ? (
                        <div className="space-y-8 sm:space-y-12 text-center py-6 sm:py-16 animate-in zoom-in duration-500">
                          <div className="space-y-4 sm:space-y-6">
                            <div className="w-14 h-14 sm:w-28 sm:h-28 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-6 border border-primary/10 shadow-xl transition-all hover:scale-110 hover:bg-primary/10">
                              <UserCheck className="w-7 h-7 sm:w-14 sm:h-14 text-primary" />
                            </div>
                            <h2 className="text-2xl sm:text-6xl font-black text-primary uppercase italic tracking-tight text-glow leading-tight px-4 truncate">เลือกผู้เล่น</h2>
                            <p className="text-muted-foreground text-xs sm:text-2xl opacity-60">Authorize a pilot to execute this strategic operation.</p>
                          </div>
                          <div className="grid gap-4 sm:gap-10 max-w-xl mx-auto px-6">
                            {players.map(p => (
                              <Button key={p.id} className="h-14 sm:h-28 text-lg sm:text-3xl font-black uppercase italic rounded-[2rem] bg-secondary/30 border border-white/5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all group relative overflow-hidden shadow-md text-white" onClick={() => { setActivePlayerId(p.id); if (!selectedMission && turnMode === "PROBLEM") { setProblemSubPhase("MISSION_SELECTION"); } else if (turnMode === "QUESTION") { setProblemSubPhase("QUIZ_LIST"); } else if (selectedMission && turnMode === "PROBLEM") { setProblemSubPhase("VIDEO_MISSION"); } }}>
                                <span className="truncate px-4 flex-1">{p.name}</span>
                                <ArrowRight className="ml-auto mr-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all shrink-0 w-5 h-5 sm:w-10 sm:h-10" />
                              </Button>
                            ))}
                          </div>
                          <Button variant="ghost" onClick={resetTurnState} className="font-black text-muted-foreground/60 hover:text-primary mt-2 text-xs sm:text-lg transition-colors"><ChevronLeft className="mr-2 w-4 h-4 sm:w-8 sm:h-8" /> ย้อนกลับ</Button>
                        </div>
                      ) : (
                        <>
                          {turnMode === "PROBLEM" && (
                            <div className="space-y-6 sm:space-y-10">
                              {problemSubPhase === "MISSION_SELECTION" && (
                                <div className="space-y-8 sm:space-y-12 animate-in slide-in-from-bottom-10 duration-700">
                                  <div className="text-center space-y-3 sm:space-y-6">
                                    <div className="w-14 h-14 sm:w-28 sm:h-28 bg-primary/5 rounded-3xl flex items-center justify-center mx-auto mb-2 sm:mb-6 border border-primary/10 shadow-lg hover:scale-110 transition-transform"><Layers className="w-7 h-7 sm:w-14 sm:h-14 text-primary" /></div>
                                    <h4 className="text-xl sm:text-5xl font-black text-primary italic uppercase text-glow truncate px-4">เลือกโซน</h4>
                                    <p className="text-muted-foreground text-xs sm:text-2xl opacity-60">Identify the urban sector requiring immediate stabilization.</p>
                                  </div>
                                  <div className="grid gap-3 sm:gap-6 max-w-2xl mx-auto px-4">
                                    {MISSION_SLOTS.map(slot => (
                                      <Button key={slot.id} variant="outline" className="h-14 sm:h-24 text-base sm:text-3xl font-black italic uppercase border border-white/5 bg-secondary/30 hover:bg-primary hover:text-primary-foreground transition-all rounded-2xl group text-left justify-start px-6 sm:px-10 shadow-sm text-white" onClick={() => { setSelectedSlot(slot.id); setProblemSubPhase("MAIN_CHOICE"); }}>
                                        <span className="truncate flex-1">{slot.label}</span>
                                        <ChevronRight className="ml-auto opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 shrink-0" />
                                      </Button>
                                    ))}
                                  </div>
                                  <Button variant="ghost" className="w-full text-muted-foreground/50 font-black hover:text-destructive transition-colors mt-2 sm:mt-6 text-xs sm:text-lg" onClick={() => { setActivePlayerId(null); setProblemSubPhase("PLAYER_SELECTION"); }}>เลือกผู้เล่นใหม่</Button>
                                </div>
                              )}
                              {problemSubPhase === "MAIN_CHOICE" && (
                                <div className="space-y-6 sm:space-y-10 animate-in slide-in-from-right-10 duration-500">
                                  <Button variant="ghost" onClick={() => setProblemSubPhase("MISSION_SELECTION")} className="font-black text-primary/70 hover:text-primary hover:bg-primary/5 mb-2 p-0 h-auto transition-all"><ChevronLeft className="mr-2 w-5 h-5 sm:w-8 sm:h-8" /> <span className="text-xs sm:text-xl">ย้อนกลับ</span></Button>
                                  <h4 className="text-xl sm:text-5xl font-black text-primary italic uppercase text-center text-glow truncate px-4">ภารกิจ</h4>
                                  <ScrollArea className="h-[350px] sm:h-[650px] pr-4 sm:pr-8 rounded-[2rem] border border-white/5 bg-secondary/20">
                                    <div className="grid gap-4 sm:gap-8 p-4 sm:p-8">
                                      {MISSIONS.filter(m => m.zoneId === selectedSlot).map(mission => (
                                        <Card key={mission.id} className="cursor-pointer border border-white/5 bg-secondary/30 hover:bg-primary/5 transition-all group rounded-[2rem] overflow-hidden shadow-sm hover:shadow-lg" onClick={() => { setSelectedMission(mission); setProblemSubPhase("VIDEO_MISSION"); }}>
                                          <CardContent className="p-4 sm:p-10 flex items-center gap-4 sm:gap-12">
                                            <div className="p-3 sm:p-8 bg-primary/5 rounded-[2rem] text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0 shadow-inner"><mission.icon className="w-6 h-6 sm:w-14 sm:h-14" /></div>
                                            <div className="flex-1 space-y-1.5 overflow-hidden">
                                              <div className="text-lg sm:text-4xl font-black italic uppercase tracking-tight group-hover:text-primary transition-colors truncate text-glow text-white px-1">{mission.title}</div>
                                              <p className="text-[9px] sm:text-xl text-muted-foreground group-hover:text-white transition-colors leading-relaxed line-clamp-1 sm:line-clamp-2 opacity-70 group-hover:opacity-100">{mission.description}</p>
                                            </div>
                                            <ChevronRight className="text-primary/30 group-hover:text-primary transition-all translate-x-2 group-hover:translate-x-0 shrink-0 w-6 h-6 sm:w-12 sm:h-12" />
                                          </CardContent>
                                        </Card>
                                      ))}
                                    </div>
                                  </ScrollArea>
                                </div>
                              )}
                              {problemSubPhase === "VIDEO_MISSION" && selectedMission && (
                                <div className="space-y-6 sm:space-y-10 animate-in zoom-in duration-500">
                                  <Button variant="ghost" onClick={() => setProblemSubPhase("MAIN_CHOICE")} className="font-black text-primary/70 hover:text-primary hover:bg-primary/5 mb-2 p-0 h-auto transition-all">
                                    <ChevronLeft className="mr-2 w-5 h-5 sm:w-8 sm:h-8" /> 
                                    <span className="text-xs sm:text-xl">ย้อนกลับ</span>
                                  </Button>
                                  <div className="relative w-full max-w-2xl mx-auto aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-black transition-all hover:scale-[1.01]">
                                    <iframe 
                                      src={`${selectedMission.videoUrl}${selectedMission.videoUrl.includes('?') ? '&' : '?'}autoplay=1&controls=1`} 
                                      className="absolute inset-0 w-full h-full"
                                      allow="autoplay; encrypted-media; fullscreen"
                                    />
                                  </div>
                                  <div className="space-y-3 text-center px-4">
                                    <h4 className="text-xl sm:text-5xl font-black text-primary italic uppercase text-glow leading-tight truncate px-1">{selectedMission.title}</h4>
                                    <p className="text-xs sm:text-2xl text-muted-foreground opacity-80 leading-relaxed line-clamp-2">{selectedMission.description}</p>
                                  </div>
                                  <Button className="w-full h-14 sm:h-28 text-base sm:text-3xl font-black italic uppercase rounded-[2.5rem] shadow-2xl transition-all hover:scale-[1.02] neon-glow-primary" onClick={() => setProblemSubPhase("CONFIRMATION")}>เริ่มแก้ไขปัญหา<ArrowRight className="ml-3 w-5 h-5 sm:w-10 sm:h-10" /></Button>
                                </div>
                              )}
                              {problemSubPhase === "CONFIRMATION" && (
                                <div className="space-y-8 sm:space-y-16 text-center py-10 sm:py-24 animate-in slide-in-from-bottom-10 duration-700">
                                  <ShieldAlert className="w-16 h-16 sm:w-40 sm:h-40 text-primary mx-auto animate-pulse" />
                                  <div className="space-y-2 sm:space-y-6 px-6">
                                    <h4 className="text-2xl sm:text-7xl font-black text-primary italic uppercase text-glow leading-tight truncate px-2">ยืนยันหรือไม่</h4>
                                    <p className="text-muted-foreground text-xs sm:text-2xl max-w-2xl mx-auto opacity-70">Deployment requires confirmation. Unauthorized aborts will result in significant Sector Stability penalties.</p>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-12 max-w-2xl mx-auto px-8">
                                    <Button className="h-14 sm:h-28 text-lg sm:text-3xl font-black uppercase italic rounded-3xl shadow-2xl transition-all hover:scale-105 neon-glow-primary" onClick={() => setProblemSubPhase("MISSION_DECISION")}>ยืนยัน</Button>
                                    <Button variant="outline" className="h-14 sm:h-28 text-lg sm:text-3xl font-black uppercase italic border-destructive/30 text-destructive bg-destructive/5 hover:bg-destructive hover:text-white rounded-3xl transition-all hover:scale-105" onClick={() => { updateScores(activePlayerId!, -10, -10); resetTurnState(); }}>ยกเลิกการทำภารกิจ (-10)</Button>
                                  </div>
                                </div>
                              )}
                              {problemSubPhase === "MISSION_DECISION" && (
                                <div className="space-y-10 sm:space-y-16 text-center py-6 sm:py-16 animate-in zoom-in duration-700">
                                  <div className="w-16 h-16 sm:w-36 sm:h-36 bg-primary/5 rounded-full flex items-center justify-center mx-auto border border-primary/10 shadow-xl transition-all hover:rotate-12"><BrainCircuit className="w-8 h-8 sm:w-18 sm:h-18 text-primary" /></div>
                                  <h4 className="text-2xl sm:text-6xl font-black text-primary italic uppercase text-glow truncate px-4">เลือกการ์ดที่ต้องการใช้งาน</h4>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 px-6 sm:px-12">
                                    <Button className="h-28 sm:h-80 flex flex-col items-center justify-center gap-3 sm:gap-8 rounded-[3.5rem] bg-secondary/30 border border-white/5 text-accent shadow-2xl group hover:scale-[1.03] hover:bg-accent hover:text-white transition-all duration-500" onClick={() => setProblemSubPhase("INNOVATION")}>
                                      <div className="p-3 sm:p-10 bg-accent/10 rounded-[2.5rem] group-hover:bg-white/20 transition-all duration-500 shadow-inner"><Zap className="w-8 h-8 sm:w-24 sm:h-24 transition-transform group-hover:scale-110 group-hover:rotate-6" /></div>
                                      <div className="text-base sm:text-4xl font-black italic uppercase tracking-tight text-glow truncate px-2">การ์ดนวัฒกรรม</div>
                                    </Button>
                                    <Button className="h-28 sm:h-80 flex flex-col items-center justify-center gap-3 sm:gap-8 rounded-[3.5rem] bg-secondary/30 border border-white/5 text-primary shadow-2xl group hover:scale-[1.03] hover:bg-primary hover:text-white transition-all duration-500" onClick={() => setProblemSubPhase("EXPERT")}>
                                      <div className="p-3 sm:p-10 bg-primary/10 rounded-[2.5rem] group-hover:bg-white/20 transition-all duration-500 shadow-inner"><Star className="w-8 h-8 sm:w-24 sm:h-24 transition-transform group-hover:scale-110 group-hover:-rotate-6" /></div>
                                      <div className="text-base sm:text-4xl font-black italic uppercase tracking-tight text-glow truncate px-2">การ์ดผู้เชี่ยวชาญ</div>
                                    </Button>
                                  </div>
                                </div>
                              )}
                              {(problemSubPhase === "INNOVATION" || problemSubPhase === "EXPERT") && (
                                <div className="space-y-6 sm:space-y-10 animate-in slide-in-from-right-10 duration-500">
                                  <div className="flex justify-between items-center px-2 gap-4">
                                    <Button variant="ghost" onClick={() => setProblemSubPhase("MISSION_DECISION")} className="font-black text-primary/70 hover:text-primary hover:bg-primary/5 p-0 h-auto transition-all shrink-0"><ChevronLeft className="mr-2 w-5 h-5 sm:w-8 sm:h-8" /> <span className="text-xs sm:text-xl">Back</span></Button>
                                    <Badge className={cn("px-4 sm:px-8 py-1.5 sm:py-2.5 font-black text-[9px] sm:text-sm uppercase tracking-widest shadow-lg text-white truncate", problemSubPhase === "INNOVATION" ? "bg-accent" : "bg-primary")}>{problemSubPhase === "INNOVATION" ? "Advanced Tech" : "Specialized Personnel"}</Badge>
                                  </div>
                                  <ScrollArea className="h-[400px] sm:h-[750px] pr-2 sm:pr-8 rounded-[3rem] border border-white/5 bg-secondary/20">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10 p-4 sm:p-10">
                                      {problemSubPhase === "INNOVATION" ? (
                                        INNOVATIONS.filter((_, i) => Math.floor(i / 7) + 1 === selectedSlot).map(inn => (
                                          <Card key={inn.id} className="cursor-pointer border border-white/5 bg-secondary/30 hover:bg-accent/10 transition-all duration-500 group overflow-hidden rounded-[2.5rem] shadow-md hover:shadow-accent/20" onClick={() => handleSolve('innovation', inn.id)}>
                                            <div className="aspect-[4/3] relative bg-black/40 p-3 sm:p-10 transition-all group-hover:bg-accent/20"><Image src={inn.image} alt={inn.title} fill className="object-contain p-4 sm:p-10 group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" onError={(e) => console.error(`Failed to load innovation image (${inn.id}):`, e)} /></div>
                                            <CardContent className="p-4 sm:p-8">
                                              <div className="font-black text-accent italic uppercase text-base sm:text-3xl leading-tight text-glow transition-colors group-hover:text-white line-clamp-2 px-1">{inn.title}</div>
                                              <p className="text-[8px] sm:text-lg text-muted-foreground mt-2 leading-relaxed line-clamp-2 opacity-70 group-hover:opacity-100 group-hover:text-white">{inn.description}</p>
                                            </CardContent>
                                          </Card>))
                                      ) : (
                                        EXPERTS.map(exp => (
                                          <Card key={exp.id} className="cursor-pointer border border-white/5 bg-secondary/30 hover:bg-primary/10 transition-all duration-500 group overflow-hidden rounded-[2.5rem] shadow-md hover:shadow-primary/20" onClick={() => handleSolve('expert', exp.id)}>
                                            <div className="aspect-[4/3] relative bg-black/40 p-3 sm:p-10 transition-all group-hover:bg-primary/20"><Image src={exp.image} alt={exp.title} fill className="object-contain p-4 sm:p-10 group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" onError={(e) => console.error(`Failed to load expert image (${exp.id}):`, e)} /></div>
                                            <CardContent className="p-4 sm:p-8">
                                              <div className="font-black text-primary italic uppercase text-base sm:text-3xl leading-tight text-glow transition-colors group-hover:text-white truncate px-1">{exp.title}</div>
                                              <p className="text-[8px] sm:text-lg text-muted-foreground mt-2 leading-relaxed line-clamp-1 opacity-70 group-hover:opacity-100 group-hover:text-white">{exp.role}</p>
                                            </CardContent>
                                          </Card>))
                                      )}
                                    </div>
                                  </ScrollArea>
                                </div>
                              )}
                              {problemSubPhase === "FEEDBACK" && (
                                <div className="space-y-10 sm:space-y-16 text-center py-12 sm:py-24 animate-in zoom-in duration-700">
                                  <div className={cn("w-24 h-24 sm:w-56 sm:h-56 rounded-full mx-auto flex items-center justify-center border-4 shadow-2xl transition-all duration-1000", isCorrect ? "bg-accent border-white animate-bounce" : "bg-destructive border-white animate-shake")}>{isCorrect ? <CheckCircle2 className="w-14 h-14 sm:w-32 sm:h-32 text-white" /> : <XCircle className="w-14 h-14 sm:w-32 sm:h-32 text-white" />}</div>
                                  <div className="space-y-3 sm:space-y-6 px-6"><h4 className={cn("text-3xl sm:text-8xl font-black uppercase italic tracking-tight text-glow leading-tight truncate px-2", isCorrect ? "text-accent" : "text-destructive")}>{isCorrect ? "MISSION SUCCESS" : "MISSION FAILURE"}</h4><p className="text-xs sm:text-3xl font-bold text-muted-foreground opacity-80">{isCorrect ? "Strategic objective achieved. Sector stability increased." : "Operation compromised. Sector integrity degraded."}</p></div>
                                  <div className="px-8 w-full"><Button className="w-full max-w-2xl mx-auto h-16 sm:h-32 text-xl sm:text-5xl font-black uppercase italic rounded-3xl shadow-2xl transition-all hover:scale-[1.05] neon-glow-primary" onClick={resetTurnState}>Terminate Interface <Rocket className="ml-3 sm:ml-6 w-6 h-6 sm:w-16 sm:h-16 shrink-0" /></Button></div>
                                </div>
                              )}
                            </div>
                          )}
                          {turnMode === "QUESTION" && (
                             <div className="space-y-6 sm:space-y-12 animate-in zoom-in duration-500">
                               <div className="space-y-6 sm:space-y-10">
                                 {problemSubPhase === "QUIZ_LIST" && (
                                   <div className="space-y-10 sm:space-y-16 animate-in slide-in-from-bottom-10 duration-700">
                                     <div className="text-center space-y-3 sm:space-y-6">
                                       <div className="w-14 h-14 sm:w-28 sm:h-28 bg-accent/5 rounded-3xl flex items-center justify-center mx-auto mb-2 sm:mb-6 border border-accent/10 shadow-lg hover:scale-110 transition-transform"><HelpCircle className="w-7 h-7 sm:w-14 sm:h-14 text-accent" /></div>
                                       <h4 className="text-xl sm:text-5xl font-black text-accent italic uppercase text-glow truncate px-4">เลือกโซนปัญหา</h4>
                                       <p className="text-muted-foreground text-xs sm:text-2xl opacity-60">Select a knowledge sector to verify strategic intelligence.</p>
                                     </div>
                                     <div className="grid gap-3 sm:gap-6 max-w-2xl mx-auto px-4">
                                       {MISSION_SLOTS.map(slot => (
                                         <Button key={slot.id} variant="outline" className="h-14 sm:h-24 text-base sm:text-3xl font-black italic uppercase border border-white/5 bg-secondary/30 hover:bg-accent hover:text-white transition-all rounded-2xl group text-left justify-start px-6 sm:px-10 shadow-sm text-white" onClick={() => { setSelectedSlot(slot.id); setProblemSubPhase("QUIZ_SELECT_QUESTION"); }}><span className="truncate flex-1">{slot.label}</span><ChevronRight className="ml-auto opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 shrink-0" /></Button>
                                       ))}
                                     </div>
                                     <Button variant="ghost" className="w-full text-muted-foreground/50 font-black hover:text-destructive transition-colors mt-2 sm:mt-6 text-xs sm:text-lg" onClick={() => { setActivePlayerId(null); setProblemSubPhase("PLAYER_SELECTION"); }}>ย้อนกลับ</Button>
                                   </div>
                                 )}
                                 {problemSubPhase === "QUIZ_SELECT_QUESTION" && selectedSlot && (
                                   <div className="space-y-8 sm:space-y-16 animate-in slide-in-from-right-10 duration-500">
                                     <div className="text-center space-y-3 sm:space-y-6 px-4 overflow-hidden">
                                       <div className="w-14 h-14 sm:w-28 sm:h-28 bg-accent/5 rounded-3xl flex items-center justify-center mx-auto mb-2 sm:mb-6 border border-accent/10 shadow-lg"><BookOpen className="w-7 h-7 sm:w-14 sm:h-14 text-accent" /></div>
                                       <Badge className="bg-accent/10 text-accent border-accent/20 px-4 py-1.5 uppercase tracking-widest text-[8px] sm:text-lg shadow-sm max-w-full"><span className="truncate block">{MISSION_SLOTS.find(s => s.id === selectedSlot)?.label}</span></Badge>
                                       <h4 className="text-xl sm:text-5xl font-black text-accent italic uppercase text-glow truncate">เลือกปัญหาที่ต้องการแก้ไข</h4>
                                     </div>
                                     <div className="grid gap-4 sm:gap-8 max-w-4xl mx-auto px-6">
                                       {QUIZ_DATA[selectedSlot].map((q, idx) => (
                                         <Button key={q.id} variant="outline" className="h-auto py-5 sm:py-10 px-6 sm:px-12 text-[10px] sm:text-2xl font-bold border border-white/5 bg-secondary/30 hover:bg-accent/5 transition-all rounded-[2rem] text-left justify-start group shadow-sm hover:shadow-md text-white overflow-hidden" onClick={() => { setSelectedQuizQuestion(q); setProblemSubPhase("QUIZ_QUESTION"); }}>
                                           <div className="flex items-center gap-4 sm:gap-10 w-full min-w-0">
                                             <div className="w-8 h-8 sm:w-16 sm:h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent font-black group-hover:bg-accent group-hover:text-white transition-all shrink-0 text-xs sm:text-2xl shadow-inner">{idx + 1}</div>
                                             <div className="line-clamp-2 leading-snug flex-1 opacity-80 group-hover:opacity-100">{q.question}</div>
                                             <ChevronRight className="ml-auto text-accent/30 group-hover:text-accent transition-all translate-x-2 group-hover:translate-x-0 shrink-0 w-6 h-6 sm:w-12 sm:h-12" />
                                           </div>
                                         </Button>
                                       ))}
                                     </div>
                                     <Button variant="ghost" onClick={() => setProblemSubPhase("QUIZ_LIST")} className="w-full font-black text-primary/70 hover:text-primary hover:bg-primary/5 text-xs sm:text-xl transition-all duration-300"><ChevronLeft className="mr-2 w-6 h-6 sm:w-10 sm:h-10" />ย้อนกลับ</Button>
                                   </div>
                                 )}
                                 {problemSubPhase === "QUIZ_QUESTION" && selectedQuizQuestion && (
                                   <div className="space-y-8 sm:space-y-16 animate-in zoom-in duration-500">
                                      <div className="text-center space-y-4 px-6"><Badge className="bg-accent text-white font-black uppercase tracking-widest px-4 sm:px-10 py-1.5 sm:py-3 text-[10px] sm:text-xl shadow-lg truncate max-w-full">Intelligence Uplink Verified</Badge><h4 className="text-lg sm:text-5xl font-black text-white italic uppercase leading-tight mt-6 sm:mt-12 text-glow line-clamp-3">{selectedQuizQuestion.question}</h4></div>
                                      <div className="grid gap-4 sm:gap-10 max-w-4xl mx-auto px-8">{selectedQuizQuestion.options.map((opt, idx) => (<Button key={idx} variant="outline" className="h-auto py-5 sm:py-10 px-8 sm:px-14 text-xs sm:text-3xl font-bold border border-white/5 bg-secondary/30 hover:bg-accent/10 transition-all duration-500 rounded-[2.5rem] text-left justify-start whitespace-normal shadow-md hover:scale-[1.02] text-white" onClick={() => handleQuizAnswer(idx)}>{opt}</Button>))}</div>
                                   </div>
                                 )}
                                 {problemSubPhase === "QUIZ_RESULT" && (
                                   <div className="space-y-10 sm:space-y-16 text-center py-12 sm:py-24 animate-in zoom-in duration-700">
                                     <div className={cn("w-24 h-24 sm:w-56 sm:h-56 rounded-full mx-auto flex items-center justify-center border-4 shadow-2xl transition-all duration-1000", isCorrect ? "bg-accent border-white animate-bounce" : "bg-destructive border-white animate-shake")}>{isCorrect ? <CheckCircle2 className="w-14 h-14 sm:w-32 sm:h-32 text-white" /> : <XCircle className="w-14 h-14 sm:w-32 sm:h-32 text-white" />}</div>
                                     <div className="space-y-3 sm:space-y-6 px-6"><h4 className={cn("text-3xl sm:text-8xl font-black uppercase italic tracking-tight text-glow leading-tight truncate px-2", isCorrect ? "text-accent" : "text-destructive")}>{isCorrect ? "คุณเก่งมาก" : "UPLINK FAILURE"}</h4><p className="text-xs sm:text-3xl font-bold text-muted-foreground opacity-80">{isCorrect ? "Strategic intelligence verified. LP yields distributed." : "Incorrect intelligence assessment. System penalty applied."}</p></div>
                                     <div className="px-8 w-full"><Button className="w-full max-w-2xl mx-auto h-16 sm:h-32 text-xl sm:text-5xl font-black uppercase italic rounded-3xl shadow-2xl transition-all hover:scale-[1.05] neon-glow-primary" onClick={resetTurnState}>ต่อไป <Rocket className="ml-3 sm:ml-6 w-6 h-6 sm:w-16 sm:h-16 shrink-0" /></Button></div>
                                   </div>
                                 )}
                               </div>
                             </div>
                          )}
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </main>

            <aside className="col-span-12 lg:col-span-2 space-y-4 sm:space-y-8 order-3 lg:order-none animate-in fade-in duration-700 delay-300">
              <div className="flex items-center gap-2 sm:gap-3 px-2 mb-1 sm:mb-2"><TrendingUp className="w-5 h-5 sm:w-7 sm:h-7 text-primary/70 shrink-0" /><h2 className="text-lg sm:text-xl font-black text-primary/80 italic uppercase tracking-tight truncate">Tactical RNG</h2></div>
              <Card className="p-5 sm:p-8 space-y-6 sm:space-y-10 border-none glass-card rounded-[2.5rem] shadow-2xl relative overflow-hidden transition-all hover:bg-card/60">
                <div className="absolute top-0 left-0 w-full h-1 bg-accent/20" />
                <div className="text-center">
                  <div className="relative mx-auto w-32 h-32 sm:w-52 sm:h-52 mb-4 sm:mb-8 transition-all hover:scale-105">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 sm:-translate-y-4 z-20"><div className="w-0 h-0 border-l-[10px] sm:border-l-[18px] border-l-transparent border-r-[10px] sm:border-r-[18px] border-r-transparent border-t-[16px] sm:border-t-[30px] border-t-accent shadow-xl" /></div>
                    <div className="w-full h-full rounded-full border-2 border-white/5 shadow-2xl relative transition-transform will-change-transform overflow-hidden neon-glow-secondary" style={{ transform: `rotate(${wheelRotation}deg)`, transitionDuration: '5s', transitionTimingFunction: 'cubic-bezier(0.15, 0, 0.15, 1)', background: 'conic-gradient(from 0deg, hsl(var(--primary)) 0deg 90deg, hsl(var(--background)) 90deg 180deg, hsl(var(--primary)) 180deg 270deg, hsl(var(--background)) 270deg 360deg)' }}>
                      {[1, 2, 3, 4].map((n, i) => (<div key={n} className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotate(${i * 90 + 45}deg)` }}><div className="relative h-full w-full flex items-start justify-center pt-3 sm:pt-8"><span className="text-2xl sm:text-5xl font-black text-foreground italic drop-shadow-lg tracking-tight" style={{ transform: `rotate(${-(i * 90 + 45 + wheelRotation)}deg)`, transition: 'transform 5s cubic-bezier(0.15, 0, 0.15, 1)' }}>{n}</span></div></div>))}
                    </div>
                  </div>
                </div>
                <div className="text-center space-y-4"><Button className="w-full h-12 sm:h-20 text-sm sm:text-2xl font-black uppercase italic rounded-2xl shadow-xl bg-accent text-accent-foreground hover:scale-105 transition-all neon-glow-secondary" onClick={spinWheel} disabled={isSpinning}>{isSpinning ? "SYNCING..." : "สุ่มเลข"} <RefreshCcw className={cn("ml-3 w-5 h-5 sm:w-8 sm:h-8", isSpinning && "animate-spin")} /></Button></div>
              </Card>
              <Card className="p-5 sm:p-8 space-y-4 sm:space-y-8 border-none glass-card rounded-[2.5rem] shadow-2xl relative overflow-hidden transition-all hover:bg-card/60">
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/20" />
                <div className="text-center space-y-1 sm:space-y-2"><div className="text-[7px] sm:text-[10px] font-black uppercase text-primary/50 tracking-[0.3em] mb-1 truncate">CITY STABILITY CP</div><div className="text-4xl sm:text-7xl font-black text-primary tracking-tight text-glow leading-none truncate">{cityCP}</div></div>
                <div className="grid grid-cols-2 gap-3 sm:gap-6"><Button variant="outline" className="h-12 sm:h-20 flex flex-col items-center justify-center border border-destructive/20 text-destructive/60 bg-destructive/5 hover:bg-destructive hover:text-white rounded-2xl transition-all hover:scale-105" onClick={() => setCityCP(prev => Math.max(0, prev - 5))}><Minus className="w-5 h-5 sm:w-8 sm:h-8" /></Button><Button variant="outline" className="h-12 sm:h-20 flex flex-col items-center justify-center border border-primary/20 text-primary/60 bg-primary/5 hover:bg-primary hover:text-white rounded-2xl transition-all hover:scale-105" onClick={() => setCityCP(prev => Math.min(targetCP, prev + 5))}><Plus className="w-5 h-5 sm:w-8 sm:h-8" /></Button></div>
              </Card>
            </aside>
          </>
        )}

        {phase === "RESULTS" && (
          <div className="col-span-12 max-w-6xl mx-auto space-y-12 sm:space-y-24 py-12 sm:py-28 animate-in fade-in zoom-in duration-1000 px-4 sm:px-8 overflow-hidden">
            <header className="text-center space-y-4 sm:space-y-10">
              <div className="w-24 h-24 sm:w-56 sm:h-56 bg-secondary/40 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(0,0,0,0.1)] border border-white/5 mb-6 sm:mb-12 relative transition-all hover:scale-110">{cityCP >= targetCP ? <Trophy className="w-12 h-12 sm:w-32 sm:h-32 text-accent animate-bounce" /> : <Skull className="w-12 h-12 sm:w-32 sm:h-32 text-destructive animate-pulse" />}</div>
              <h1 className="text-4xl sm:text-9xl font-black text-primary italic uppercase tracking-tight text-glow leading-tight truncate px-4">บทสรุป</h1>
              <p className="text-base sm:text-5xl font-black text-muted-foreground uppercase tracking-widest opacity-60 truncate px-4">{cityCP >= targetCP ? "STRATEGIC DOMINANCE ACHIEVED" : "ภารกิจล้มเหลวเมืองล้มสลาย"}</p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-16">
              <Card className={cn("p-8 sm:p-16 text-white rounded-[3.5rem] shadow-2xl border-none relative overflow-hidden transition-all hover:scale-105 duration-500", cityCP >= targetCP ? "bg-accent neon-glow-secondary" : "bg-destructive shadow-destructive/20")}>
                <div className="absolute top-0 right-0 p-6 sm:p-12 opacity-10"><Activity className="w-20 h-20 sm:w-48 sm:h-48" /></div>
                <h4 className="text-xl sm:text-4xl font-black italic uppercase mb-4 sm:mb-10 tracking-tight opacity-90 truncate">CP</h4>
                <div className="text-5xl sm:text-[10rem] font-black mb-6 sm:mb-12 leading-none truncate">{cityCP} <span className="text-lg sm:text-5xl opacity-40">/ {targetCP}</span></div>
                <Progress value={(cityCP / targetCP) * 100} className="h-4 sm:h-10 bg-white/20 rounded-full shadow-inner" />
              </Card>
              <Card className="p-8 sm:p-16 border-none rounded-[3.5rem] shadow-2xl glass-card relative overflow-hidden transition-all hover:scale-105 duration-500 hover:bg-card/60">
                <div className="absolute top-0 right-0 p-6 sm:p-12 opacity-5 text-accent"><Trophy className="w-20 h-20 sm:w-48 sm:h-48" /></div>
                <h4 className="text-xl sm:text-4xl font-black italic uppercase mb-4 sm:mb-10 text-primary tracking-tight truncate">MVP</h4>
                <div className="text-3xl sm:text-8xl font-black text-accent italic mb-2 sm:mb-6 text-glow tracking-tight truncate">{[...players].sort((a,b) => b.lp - a.lp)[0]?.name}</div>
                <div className="text-sm sm:text-3xl font-black text-muted-foreground uppercase tracking-widest opacity-60 truncate">{[...players].sort((a,b) => b.lp - a.lp)[0]?.lp} Yield points</div>
              </Card>
            </div>
            
            <Card className="rounded-[3.5rem] shadow-2xl border-none overflow-hidden glass-card transition-all hover:bg-card/50">
              <CardHeader className="p-6 sm:p-16 border-b border-white/5 bg-primary/5"><div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><h4 className="text-2xl sm:text-6xl font-black italic uppercase text-primary tracking-tight text-glow truncate flex-1">Hero Hall of Fame</h4><Badge className="px-5 sm:px-10 py-2 sm:py-4 font-black uppercase bg-primary/10 text-primary border-primary/20 text-[10px] sm:text-lg shadow-sm shrink-0">Ranked by Loyalty Yield</Badge></div></CardHeader>
              <CardContent className="p-6 sm:p-16 space-y-4 sm:space-y-8">
                {[...players].sort((a,b) => b.lp - a.lp).map((p, i) => (
                  <Button key={p.id} variant="ghost" className="w-full h-auto p-5 sm:p-12 rounded-[2.5rem] border border-white/5 hover:bg-primary/10 transition-all group shadow-sm hover:shadow-lg overflow-hidden" onClick={() => setViewingPlayerId(p.id)}>
                    <div className="flex items-center justify-between w-full gap-4 min-w-0">
                      <div className="flex items-center gap-4 sm:gap-12 overflow-hidden flex-1"><div className="w-10 h-10 sm:w-24 h-24 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-xl sm:text-5xl font-black text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0 shadow-inner">{i + 1}</div><div className="text-xl sm:text-6xl font-black italic uppercase text-white text-glow group-hover:text-primary transition-colors truncate">{p.name}</div></div>
                      <div className="flex items-center gap-3 sm:gap-12 shrink-0"><div className="text-xl sm:text-7xl font-black text-accent tabular-nums">{p.lp} <span className="text-[10px] sm:text-3xl opacity-50">LP</span></div><ChevronRight className="w-6 h-6 sm:w-16 sm:h-16 text-muted-foreground/30 group-hover:translate-x-4 transition-all group-hover:text-primary" /></div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Button variant="outline" className="w-full h-16 sm:h-32 text-xl sm:text-6xl font-black uppercase italic rounded-[4rem] border-2 border-white/5 glass-card hover:bg-primary hover:text-white transition-all shadow-2xl hover:scale-[1.02] neon-glow-primary overflow-hidden" onClick={() => window.location.reload()}><span className="truncate flex-1">เริ่มใหม่</span> <RefreshCcw className="ml-3 sm:ml-10 w-6 h-6 sm:w-20 sm:h-20 shrink-0" /></Button>
            
            <Dialog open={!!viewingPlayerId} onOpenChange={o => !o && setViewingPlayerId(null)}>
              <DialogContent className="max-w-5xl rounded-[4rem] border-none bg-background p-6 sm:p-16 shadow-[0_0_100px_rgba(0,0,0,0.1)] overflow-y-auto max-h-[95vh] transition-all duration-500">
                <DialogHeader className="mb-6 sm:mb-16"><DialogTitle className="text-2xl sm:text-6xl font-black italic uppercase tracking-tight text-glow text-center text-primary truncate px-4">Pilot Profile: {players.find(p => p.id === viewingPlayerId)?.name}</DialogTitle></DialogHeader>
                <div className="grid grid-cols-3 gap-3 sm:gap-10 mb-8 sm:mb-20">
                  <div className="bg-secondary/30 p-4 sm:p-10 rounded-3xl border border-white/5 text-center flex flex-col items-center justify-center transition-all hover:bg-secondary/50 shadow-md min-w-0"><div className="text-[7px] sm:text-lg font-black uppercase text-muted-foreground/60 tracking-widest mb-2 truncate">ภารกิจ</div><div className="text-2xl sm:text-7xl font-black text-primary text-glow truncate">{players.find(p => p.id === viewingPlayerId)?.solvedCount}</div></div>
                  <div className="bg-secondary/30 p-4 sm:p-10 rounded-3xl border border-white/5 text-center flex flex-col items-center justify-center transition-all hover:bg-secondary/50 shadow-md min-w-0"><div className="text-[7px] sm:text-lg font-black uppercase text-muted-foreground/60 tracking-widest mb-2 truncate">คำถาม</div><div className="text-2xl sm:text-7xl font-black text-accent text-glow truncate">{players.find(p => p.id === viewingPlayerId)?.solvedQuizCount}</div></div>
                  <div className="bg-secondary/30 p-4 sm:p-10 rounded-3xl border border-white/5 text-center flex flex-col items-center justify-center transition-all hover:bg-secondary/50 shadow-md min-w-0"><div className="text-[7px] sm:text-lg font-black uppercase text-muted-foreground/60 tracking-widest mb-2 truncate">TOTAL</div><div className="text-2xl sm:text-7xl font-black text-white truncate">{players.find(p => p.id === viewingPlayerId)?.lp}</div></div>
                </div>
                <div className="space-y-10 sm:space-y-20">
                  <div className="flex items-center justify-center gap-4"><div className="w-3 h-3 sm:w-5 sm:h-5 bg-accent rounded-full animate-pulse shrink-0" /><h5 className="text-lg sm:text-4xl font-black italic uppercase text-accent tracking-widest text-glow truncate">แผนภาพ</h5></div>
                  <div className="h-[250px] sm:h-[500px] w-full flex items-center justify-center relative"><ResponsiveContainer width="100%" height="100%"><RadarChart cx="50%" cy="50%" outerRadius="75%" data={getRadarData}><PolarGrid stroke="#ffffff10" /><PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--foreground))', fontSize: 10, fontWeight: 700, opacity: 0.6 }} /><PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} /><Radar name="Pilot Score" dataKey="individual" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.25} /><Radar name="Target Threshold" dataKey="benchmark" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.05} /></RadarChart></ResponsiveContainer></div>
                  <div className="flex flex-wrap justify-center gap-6 sm:gap-16 text-[8px] sm:text-xl font-black uppercase tracking-widest mb-8"><div className="flex items-center gap-2"><div className="w-3 h-3 sm:w-5 sm:h-5 bg-primary rounded-full shadow-lg shrink-0" /><span className="text-primary truncate">Pilot Performance</span></div><div className="flex items-center gap-2"><div className="w-3 h-3 sm:w-5 sm:h-5 bg-accent rounded-full shadow-lg shrink-0" /><span className="text-accent truncate">Sector Benchmark</span></div></div>
                  <div className="space-y-6 sm:space-y-12">
                    <div className="flex items-center gap-3 px-2"><Trophy className="w-5 h-5 sm:w-10 sm:h-10 text-accent/70 shrink-0" /><h6 className="text-base sm:text-3xl font-black italic uppercase text-accent tracking-widest truncate">ความถนัด</h6></div>
                    <div className="grid gap-4 sm:gap-8">{getAccomplishments.map((acc, i) => (<div key={i} className="flex items-center justify-between bg-secondary/30 p-5 sm:p-10 rounded-3xl border border-white/5 group transition-all hover:bg-secondary/50 shadow-sm gap-4"><div className="flex flex-col gap-2 sm:gap-4 flex-1 min-w-0"><div className="flex items-center gap-3 sm:gap-6"><span className="text-xs sm:text-3xl font-black text-white truncate">{acc.label}</span><Badge className="bg-primary/10 text-primary border-primary/20 text-[7px] sm:text-lg uppercase font-bold tracking-widest px-2 sm:px-4 py-1 shadow-sm shrink-0">{acc.tier}</Badge></div>{acc.stars > 0 && (<div className="flex gap-1 sm:gap-2">{[...Array(3)].map((_, starIdx) => (<Star key={starIdx} className={cn("w-4 h-4 sm:w-10 sm:h-10 shrink-0", starIdx < acc.stars ? "text-primary fill-primary drop-shadow-lg" : "text-foreground/5")} />))}</div>)}</div><span className="text-[9px] sm:text-xl font-black text-accent tracking-widest text-glow max-w-[120px] sm:max-w-none text-right uppercase leading-tight opacity-80 group-hover:opacity-100 flex-1 truncate">{acc.feedback}</span></div>))}</div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"><div className="absolute top-1/4 left-1/4 w-64 sm:w-[800px] h-64 sm:h-[800px] bg-primary/5 rounded-full blur-[60px] sm:blur-[180px] animate-pulse" /><div className="absolute bottom-1/4 right-1/4 w-80 sm:w-[900px] h-80 sm:h-[900px] bg-accent/5 rounded-full blur-[80px] sm:blur-[220px] animate-pulse delay-700" /></div>
    </div>
  );
}
