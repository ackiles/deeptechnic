const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel,
  BorderStyle, WidthType, ShadingType, VerticalAlign,
  PageNumber, PageBreak, TableOfContents
} = require("docx");

// Constants
const FONT = "Arial";
const SZ_BODY = 22; // 11pt
const SZ_SMALL = 20; // 10pt
const SZ_TINY = 18; // 9pt
const COLOR_DARK = "333333";
const COLOR_ACCENT = "1F4E79";
const COLOR_LIGHT_BG = "DEEAF6";
const COLOR_DANGER = "C0392B";
const COLOR_WARN = "D35400";
const COLOR_OK = "27AE60";

// Table border helper
const tborder = { style: BorderStyle.SINGLE, size: 1, color: "BBBBBB" };
const cellBorders = { top: tborder, bottom: tborder, left: tborder, right: tborder };

function hdrCell(text, width, fill) {
  return new TableCell({
    borders: cellBorders, width: { size: width, type: WidthType.DXA },
    shading: { fill: fill || COLOR_LIGHT_BG, type: ShadingType.CLEAR },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40, after: 40 },
      children: [new TextRun({ text, bold: true, size: SZ_SMALL, font: FONT, color: COLOR_DARK })] })]
  });
}
function cell(text, width, opts) {
  const pOpts = { spacing: { before: 40, after: 40 }, children: [] };
  if (opts && opts.align) pOpts.alignment = opts.align;
  if (opts && opts.bold) {
    pOpts.children.push(new TextRun({ text, bold: true, size: SZ_SMALL, font: FONT, color: COLOR_DARK }));
  } else {
    pOpts.children.push(new TextRun({ text, size: SZ_SMALL, font: FONT }));
  }
  return new TableCell({
    borders: cellBorders, width: { size: width, type: WidthType.DXA },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph(pOpts)]
  });
}
function multiLineCell(lines, width) {
  return new TableCell({
    borders: cellBorders, width: { size: width, type: WidthType.DXA },
    verticalAlign: VerticalAlign.CENTER,
    children: lines.map(l => new Paragraph({
      spacing: { before: 20, after: 20 },
      children: [new TextRun({ text: l, size: SZ_SMALL, font: FONT })]
    }))
  });
}

// Helper for risk labels
function riskLabel(level) {
  const m = { "极高": { bg: "FADBD8", c: "C0392B" }, "高": { bg: "F5CBA7", c: "D35400" }, "中高": { bg: "F9E79F", c: "B7950B" }, "中": { bg: "D5F5E3", c: "1E8449" }, "低": { bg: "D6EAF8", c: "2471A3" }, "极低": { bg: "E8E8E8", c: "666666" } };
  const v = m[level] || { bg: "EEEEEE", c: "333333" };
  return new TextRun({ text: level, bold: true, size: SZ_TINY, font: FONT, color: v.c, highlight: "none", shading: { fill: v.bg, type: "clear" } });
}

function spacer(h) { return new Paragraph({ spacing: { before: h || 100, after: 0 }, children: [] }); }

function starRating(n) {
  const filled = "★".repeat(n);
  const empty = "☆".repeat(5 - n);
  return filled + empty;
}

// ========== Build Document Content ==========

const numbering = {
  config: [
    { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: "num-p1", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: "num-p2", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: "num-p3", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: "num-p4", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: "num-p5", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: "num-p6", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
  ]
};

const children = [];

// ===== COVER PAGE =====
children.push(spacer(600));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
  children: [new TextRun({ text: "Micro-OLED 项目初评", bold: true, size: 52, font: FONT, color: COLOR_ACCENT })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
  children: [new TextRun({ text: "奥视新一代显示半导体工艺的产业化", size: 36, font: FONT, color: "666666" })] }));

// Divider line
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR_ACCENT, space: 1 } }, children: [] }));

children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
  children: [new TextRun({ text: "技术尽调初评报告（预审级）", size: 28, font: FONT, color: "555555" })] }));
children.push(spacer(200));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
  children: [new TextRun({ text: "报告编号：2026-05-20-micro-oled-初评-eb80", size: SZ_BODY, font: FONT, color: "777777" })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
  children: [new TextRun({ text: "报告日期：2026年5月20日", size: SZ_BODY, font: FONT, color: "777777" })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
  children: [new TextRun({ text: "目标读者：投资机构 / 投资决策团队", size: SZ_BODY, font: FONT, color: "777777" })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
  children: [new TextRun({ text: "报告形态：技术尽调初评（预审级）", size: SZ_BODY, font: FONT, color: "777777" })] }));
children.push(spacer(400));
children.push(new Paragraph({ alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Deeptechnic（技研）", size: 26, font: FONT, color: COLOR_ACCENT, italics: true })] }));

// ===== PAGE BREAK =====
children.push(new Paragraph({ children: [new PageBreak()] }));

// ===== TABLE OF CONTENTS =====
children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "目录", bold: true, size: 32, font: FONT })] }));
children.push(new TableOfContents("目录", { hyperlink: true, headingStyleRange: "1-3" }));
children.push(new Paragraph({ children: [new PageBreak()] }));

// ===== CHAPTER 1: 项目基本判断概述 =====
children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "一、项目基本判断概述", bold: true, size: 32, font: FONT, color: COLOR_ACCENT })] }));

// Comprehensive rating
children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "1.1 综合评级", bold: true, size: 28, font: FONT, color: COLOR_DARK })] }));
children.push(new Paragraph({ spacing: { before: 100, after: 100 },
  children: [new TextRun({ text: "综合评级：", bold: true, size: SZ_BODY + 4, font: FONT, color: COLOR_DANGER }),
    new TextRun({ text: "高风险 / 高不确定性", bold: true, size: SZ_BODY + 4, font: FONT, color: COLOR_DANGER })] }));
children.push(new Paragraph({ spacing: { before: 60, after: 200 },
  children: [new TextRun({ text: "核心判断：", bold: true, size: SZ_BODY, font: FONT }),
    new TextRun({ text: "这是一个典型的高风险前沿硬科技项目。技术方向（光刻RGB Micro OLED）有行业前瞻性，但团队信息严重不透明、融资阶段与资金需求量级严重错配、产线建设进度不明，整体风险大于机会。", size: SZ_BODY, font: FONT })] }));

// Rating table
const ratingWidths = [2200, 800, 6360];
children.push(new Table({
  columnWidths: ratingWidths,
  rows: [
    new TableRow({ tableHeader: true, children: [
      hdrCell("评估维度", ratingWidths[0]), hdrCell("评分", ratingWidths[1]), hdrCell("简述", ratingWidths[2])
    ] }),
    new TableRow({ children: [cell("技术路线合理性", ratingWidths[0], { bold: true }), cell(starRating(3), ratingWidths[1]), cell("光刻RGB方向正确，但初创实现难度极高", ratingWidths[2])] }),
    new TableRow({ children: [cell("技术可行性", ratingWidths[0], { bold: true }), cell(starRating(2), ratingWidths[1]), cell("直接挑战三星/SEL级别的难题", ratingWidths[2])] }),
    new TableRow({ children: [cell("团队胜任度", ratingWidths[0], { bold: true }), cell(starRating(1), ratingWidths[1]), cell("核心成员信息完全不可查", ratingWidths[2])] }),
    new TableRow({ children: [cell("产业基础", ratingWidths[0], { bold: true }), cell(starRating(1), ratingWidths[1]), cell("A轮阶段与20亿级产线需求差距太大", ratingWidths[2])] }),
    new TableRow({ children: [cell("市场前景", ratingWidths[0], { bold: true }), cell(starRating(3), ratingWidths[1]), cell("AI眼镜驱动，行业在拐点但仍有不确定性", ratingWidths[2])] }),
    new TableRow({ children: [cell("竞争壁垒", ratingWidths[0], { bold: true }), cell(starRating(1), ratingWidths[1]), cell("视涯/Sony/三星已筑起高墙", ratingWidths[2])] }),
    new TableRow({ children: [cell("融资节奏", ratingWidths[0], { bold: true }), cell(starRating(1), ratingWidths[1]), cell("资金需求与融资阶段严重错配", ratingWidths[2])] }),
  ]
}));

children.push(spacer(200));

// Risk highlights
children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "1.2 重点关注风险", bold: true, size: 28, font: FONT, color: COLOR_DARK })] }));
[
  "团队信息不透明 — 关键决策人履历不可查",
  "融资阶段远低于产线建设所需资金量级",
  "光刻RGB路线全球仅三星/SEL宣布突破在即",
  "存量对手（视涯/Sony/三星）的先发优势不可忽视"
].forEach((item, i) => {
  children.push(new Paragraph({ numbering: { reference: "num-p1", level: 0 }, spacing: { before: 40, after: 40 },
    children: [new TextRun({ text: `⚠️ ${item}`, size: SZ_BODY, font: FONT })] }));
});

// ===== CHAPTER 2: 核心技术面 =====
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "二、核心技术面分析", bold: true, size: 32, font: FONT, color: COLOR_ACCENT })] }));

children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "2.1 Micro-OLED 技术路线分类", bold: true, size: 28, font: FONT, color: COLOR_DARK })] }));
children.push(new Paragraph({ spacing: { before: 60, after: 100 },
  children: [new TextRun({ text: "Micro-OLED（硅基OLED）在单晶硅CMOS背板上制造OLED像素阵列。共有两条主要技术路线：", size: SZ_BODY, font: FONT })] }));

// Route comparison table
const rw = [2200, 2200, 4960];
children.push(new Table({
  columnWidths: rw,
  rows: [
    new TableRow({ tableHeader: true, children: [
      hdrCell("路线", rw[0]), hdrCell("代表厂商", rw[1]), hdrCell("核心特征", rw[2])
    ] }),
    new TableRow({ children: [
      cell("第一代：WOLED+CF", rw[0], { bold: true }),
      cell("Sony、视涯", rw[1]),
      multiLineCell(["工艺成熟，已验证量产", "~75%光效损失", "驱动电压~12V（需tandem结构）"], rw[2])
    ] }),
    new TableRow({ children: [
      cell("第二代：RGB光刻", rw[0], { bold: true }),
      cell("三星、SEL、奥视", rw[1]),
      multiLineCell(["理论光效高，色域更优", "工艺精度极高，对准困难", "量产良率挑战巨大"], rw[2])
    ] })
  ]
}));

children.push(spacer(200));

// Tech bottlenecks
children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "2.2 核心技术瓶颈", bold: true, size: 28, font: FONT, color: COLOR_DARK })] }));
const bw = [1800, 1200, 6360];
children.push(new Table({
  columnWidths: bw,
  rows: [
    new TableRow({ tableHeader: true, children: [
      hdrCell("瓶颈", bw[0]), hdrCell("严重程度", bw[1]), hdrCell("说明", bw[2])
    ] }),
    new TableRow({ children: [
      cell("发光效率", bw[0], { bold: true }), cell("核心", bw[1]),
      cell("WOLED+CF仅利用~25%光；光刻RGB虽能突破但工艺成熟度不足", bw[2])
    ] }),
    new TableRow({ children: [
      cell("良率", bw[0], { bold: true }), cell("核心", bw[1]),
      cell("行业常态40-60%，光刻RGB方案预估更低", bw[2])
    ] }),
    new TableRow({ children: [
      cell("亮度", bw[0], { bold: true }), cell("较高", bw[1]),
      cell("户外AR需>5000nit，现有方案需tandem+高电压", bw[2])
    ] }),
    new TableRow({ children: [
      cell("寿命", bw[0], { bold: true }), cell("中", bw[1]),
      cell("蓝色发光材料寿命不足，高亮度下加速老化", bw[2])
    ] }),
    new TableRow({ children: [
      cell("成本", bw[0], { bold: true }), cell("高", bw[1]),
      cell("硅基背板+精密制造+低良率，单片成本居高不下", bw[2])
    ] })
  ]
}));

children.push(spacer(200));

// Oshi positioning
children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "2.3 奥视的技术路线定位", bold: true, size: 28, font: FONT, color: COLOR_DARK })] }));
[
  "宣称采用“有机光刻工艺”（organic lithography）实现RGB直接彩色发光硅基Micro OLED",
  "方向与三星/SEL一致，是行业公认的第二代方案",
  "但全球范围内，只有三星（收购eMagin后整合）和日本SEL在2024年展示样片，计划2026年量产",
  "初创团队直接挑战最难的技术路线，容错空间极小"
].forEach(t => {
  children.push(new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { before: 40, after: 40 },
    children: [new TextRun({ text: t, size: SZ_BODY, font: FONT })] }));
});
children.push(spacer(60));
children.push(new Paragraph({ spacing: { before: 80, after: 80 },
  children: [new TextRun({ text: "信心指数：40%（低）", bold: true, size: SZ_BODY, font: FONT, color: COLOR_DANGER }),
    new TextRun({ text: " — 方向正确但执行难度超乎常规。", size: SZ_BODY, font: FONT })] }));

// ===== CHAPTER 3: 产业链与产业化 =====
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "三、产业链与产业化分析", bold: true, size: 32, font: FONT, color: COLOR_ACCENT })] }));

// Investment comparison
children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "3.1 产线投资门槛", bold: true, size: 28, font: FONT, color: COLOR_DARK })] }));
const iw = [2200, 2000, 2200, 2960];
children.push(new Table({
  columnWidths: iw,
  rows: [
    new TableRow({ tableHeader: true, children: [
      hdrCell("玩家", iw[0]), hdrCell("投资规模", iw[1]), hdrCell("产线类型", iw[2]), hdrCell("当前状态", iw[3])
    ] }),
    new TableRow({ children: [cell("视涯科技", iw[0]), cell("20亿元（一期）", iw[1]), cell("12英寸WOLED+CF", iw[2]), cell("已量产，再募20亿扩产", iw[3])] }),
    new TableRow({ children: [cell("宏禧科技", iw[0]), cell("20亿元（一期）", iw[1]), cell("12英寸WOLED+CF", iw[2]), cell("建设中", iw[3])] }),
    new TableRow({ children: [cell("清越科技", iw[0]), cell("—", iw[1]), cell("—", iw[2]), cell("已因技术不确定性推迟", iw[3])] }),
    new TableRow({ children: [cell("奥视技术", iw[0]), cell("A轮（金额未知）", iw[1]), cell("光刻RGB OLED", iw[2]), cell("建设预期2026年投产", iw[3])] }),
  ]
}));
children.push(spacer(80));
children.push(new Paragraph({ spacing: { before: 40, after: 100 },
  children: [new TextRun({ text: "结论：", bold: true, size: SZ_BODY, font: FONT, color: COLOR_DANGER }),
    new TextRun({ text: "15-25亿元是硅基OLED产线的入门门槛。奥视目前仅A轮，与这一量级差距极大。", size: SZ_BODY, font: FONT })] }));

// Yield analysis
children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "3.2 良率困境", bold: true, size: 28, font: FONT, color: COLOR_DARK })] }));
const yw = [2800, 2000, 4560];
children.push(new Table({
  columnWidths: yw,
  rows: [
    new TableRow({ tableHeader: true, children: [
      hdrCell("工序", yw[0]), hdrCell("典型良率", yw[1]), hdrCell("复合影响", yw[2])
    ] }),
    new TableRow({ children: [cell("CMOS制造", yw[0]), cell("~95%", yw[1]), cell("基板损失可控", yw[2])] }),
    new TableRow({ children: [cell("OLED蒸镀", yw[0]), cell("70-80%", yw[1]), cell("均匀性控制难", yw[2])] }),
    new TableRow({ children: [cell("彩色滤光片", yw[0]), cell("80-90%", yw[1]), cell("对准精度要求高", yw[2])] }),
    new TableRow({ children: [cell("封装", yw[0]), cell("80-90%", yw[1]), cell("水氧入侵导致退化", yw[2])] }),
    new TableRow({ children: [cell("复合良率", yw[0], { bold: true }), cell("~40-60%", yw[1], { bold: true }), cell("这是行业常态", yw[2])] }),
  ]
}));
children.push(spacer(100));

// Equipment
children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "3.3 核心设备受制于人", bold: true, size: 28, font: FONT, color: COLOR_DARK })] }));
const ew = [2800, 3000, 3560];
children.push(new Table({
  columnWidths: ew,
  rows: [
    new TableRow({ tableHeader: true, children: [
      hdrCell("关键设备", ew[0]), hdrCell("供应格局", ew[1]), hdrCell("国产替代", ew[2])
    ] }),
    new TableRow({ children: [cell("OLED蒸镀机", ew[0]), cell("Canon Tokki垄断（交期>12月）", ew[1]), cell("合肥欣奕华等验证中", ew[2])] }),
    new TableRow({ children: [cell("高精度光刻机", ew[0]), cell("ASML/Nikon", ew[1]), cell("受限", ew[2])] }),
    new TableRow({ children: [cell("封装设备", ew[0]), cell("日韩为主", ew[1]), cell("起步阶段", ew[2])] }),
  ]
}));

children.push(spacer(200));

// Root causes
children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "3.4 为什么此前大量micro-OLED项目没做起来？", bold: true, size: 28, font: FONT, color: COLOR_DARK })] }));
const roots = [
  { title: "资金门槛与回报周期严重错配", desc: "15-25亿投入，3-5年烧钱期，普通财务投资人不愿/不能承受" },
  { title: "良率爬坡远超预期", desc: "40-60%良率意味着成本是理论值2倍，每提升10%需6-12个月" },
  { title: "先有鸡还是先有蛋的死循环", desc: "先建产能才能拿大客户订单，但建产能需要巨资；大客户要求先验证产能和良率" },
  { title: "核心设备/材料被卡脖子", desc: "Canon Tokki蒸镀机、UDC磷光材料专利，国产替代进展缓慢" },
  { title: "市场爆发时间不断推迟", desc: "VR泡沫破灭、Vision Pro不及预期，只有AI眼镜这一新变量" },
  { title: "已有寡头锁定头部客户", desc: "Sony+视涯占据>85%份额，客户验证周期12-18个月" }
];
roots.forEach((r, i) => {
  children.push(new Paragraph({ numbering: { reference: "num-p2", level: 0 }, spacing: { before: 60, after: 40 },
    children: [new TextRun({ text: r.title + " — ", bold: true, size: SZ_BODY, font: FONT }),
      new TextRun({ text: r.desc, size: SZ_BODY, font: FONT })] }));
});

children.push(spacer(100));
children.push(new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: "案例证据", bold: true, size: 24, font: FONT, color: COLOR_DARK })] }));
[
  "eMagin（行业先驱）耕耘20+年仍长期亏损，被Samsung以2.18亿美元收购",
  "清越科技（上市公司）因技术和市场不确定性主动延期硅基OLED项目",
  "多数初创企业进入“融第一轮→建小试线→良率上不去→资金烧完”的死亡循环"
].forEach(t => {
  children.push(new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { before: 40, after: 40 },
    children: [new TextRun({ text: t, size: SZ_BODY, font: FONT })] }));
});

// ===== CHAPTER 4: 市场面 =====
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "四、市场面分析", bold: true, size: 32, font: FONT, color: COLOR_ACCENT })] }));

children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "4.1 市场规模与场景", bold: true, size: 28, font: FONT, color: COLOR_DARK })] }));
const mw = [1600, 1600, 2800, 3360];
children.push(new Table({
  columnWidths: mw,
  rows: [
    new TableRow({ tableHeader: true, children: [
      hdrCell("场景", mw[0]), hdrCell("当前规模", mw[1]), hdrCell("2026-2027预期", mw[2]), hdrCell("增长驱动", mw[3])
    ] }),
    new TableRow({ children: [cell("AI智能眼镜", mw[0]), cell("~1-2亿美元", mw[1]), cell("成长至5-10亿美元", mw[2]), cell("华为/Meta/XREAL", mw[3])] }),
    new TableRow({ children: [cell("VR/MR（高端）", mw[0]), cell("~2亿美元", mw[1]), cell("波动（Vision Pro退出风险）", mw[2]), cell("新MR产品发布", mw[3])] }),
    new TableRow({ children: [cell("军工/特种", mw[0]), cell("~2亿美元", mw[1]), cell("稳定~2亿美元", mw[2]), cell("国防采购", mw[3])] }),
    new TableRow({ children: [cell("工业/医疗", mw[0]), cell("~1亿美元", mw[1]), cell("缓慢增长", mw[2]), cell("定制化方案", mw[3])] }),
  ]
}));
children.push(spacer(100));
children.push(new Paragraph({ spacing: { before: 60, after: 100 },
  children: [new TextRun({ text: "趋势判断：", bold: true, size: SZ_BODY, font: FONT }),
    new TextRun({ text: "近眼显示屏收入从2024年7.17亿美元降至2025年3.92亿美元（-45%），但视涯2026Q1营收同比+247%，预示AI眼镜驱动的行业拐点可能已至。", size: SZ_BODY, font: FONT })] }));

// Vision Pro impact
children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "4.2 Apple Vision Pro 的行业冲击", bold: true, size: 28, font: FONT, color: COLOR_DARK })] }));
[
  "正面：验证了micro-OLED在高端XR中的可用性",
  "负面：3,499美元定价，销量<50万台，传闻可能取消产品线",
  "对行业：消费级市场对micro-OLED的溢价接受度重新评估",
  "更多品牌转向Fast-LCD/LCoS控制成本"
].forEach(t => {
  children.push(new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { before: 40, after: 40 },
    children: [new TextRun({ text: t, size: SZ_BODY, font: FONT })] }));
});

// Micro-LED threat
children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "4.3 Micro-LED 的替代威胁", bold: true, size: 28, font: FONT, color: COLOR_DARK })] }));
children.push(new Paragraph({ spacing: { before: 60, after: 60 },
  children: [new TextRun({ text: "关键判断：", bold: true, size: SZ_BODY, font: FONT, color: COLOR_DANGER }),
    new TextRun({ text: "micro-OLED有3-5年的产业窗口期。若Micro-LED突破量产瓶颈，micro-OLED面临巨大颠覆风险。", size: SZ_BODY, font: FONT })] }));

// Military market
children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "4.4 军工市场评估", bold: true, size: 28, font: FONT, color: COLOR_DARK })] }));
children.push(new Paragraph({ spacing: { before: 60, after: 60 },
  children: [new TextRun({ text: '"JG"标签暗示军工定位。中国军工微显示器市场估计年规模10-20亿元人民币，高利润、小批量、认证周期长（2-5年）。需验证是否已有军工供货资质和渠道。', size: SZ_BODY, font: FONT })] }));

// ===== CHAPTER 5: 提问清单 =====
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "五、首次交流提问质询清单", bold: true, size: 32, font: FONT, color: COLOR_ACCENT })] }));
children.push(new Paragraph({ spacing: { before: 60, after: 200 },
  children: [new TextRun({ text: "以下18个问题按优先级排序，🔴为最高优先级、🟠为重要、🟡为参考。首次交流应优先覆盖🔴级问题。", size: SZ_BODY, font: FONT, italics: true })] }));

// Question tables
function qSection(title, questions, color) {
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: title, bold: true, size: 28, font: FONT, color })] }));
  const qw = [600, 5000, 3760];
  questions.forEach((q, i) => {
    children.push(new Paragraph({ numbering: { reference: i < 4 ? "num-p3" : i < 8 ? "num-p4" : i < 12 ? "num-p5" : "num-p6", level: 0 }, spacing: { before: 80, after: 40 },
      children: [new TextRun({ text: q.q, bold: true, size: SZ_BODY, font: FONT }),
        new TextRun({ text: "\n" }),
        new TextRun({ text: q.r, size: SZ_SMALL, font: FONT, color: "888888", italics: true })] }));
  });
}

qSection("🔴 优先级：团队核实（必须问清楚）", [
  { q: "请介绍核心团队每位成员的技术背景、过往在Micro-OLED/半导体显示领域的具体经历和成果", r: "团队信息完全不可查，是第一道过滤" },
  { q: "核心团队中谁有12英寸晶圆厂量产经验？哪位成员操盘过从0到1的显示产线建设？", r: "量产经验是技术成功的关键" },
  { q: "当前团队有多少人？技术/工艺/设备/质量各有多少人？关键岗位是否有行业资深人才？", r: "评估团队完整度" },
  { q: "核心技术人员是否全时投入？是否有外部兼职或顾问？关键技术是否依赖于个别人？", r: "评估团队稳定性" }
], COLOR_DANGER);

qSection("🔴 优先级：技术与知识产权", [
  { q: "请展示核心专利布局（申请号/公开号），尤其在光刻RGB方向的具体专利覆盖", r: "核心技术独立性和保护力度" },
  { q: "贵司的“有机光刻”方案与三星/SEL的技术方案相比，差异化和核心优势在哪里？", r: "验证技术真实性" },
  { q: "光刻RGB Micro OLED的各工序良率目前各是多少？复合良率达到多少？", r: "量产可行性验证" },
  { q: "现有试产线还是直接建量产线？已投入的设备清单和投资金额？", r: "验证产线建设实际进展" }
], COLOR_DANGER);

qSection("🟠 优先级：产业化进度", [
  { q: "产线建设的具体时间表：设备已采购否？预计何时完成安装和工艺调试？", r: "验证时间表真实性" },
  { q: "从投产到良率爬坡达到盈亏平衡，预计还需多少额外资金？当前融资金额？", r: "评估资金缺口" },
  { q: "贵司的蒸镀设备是Canon Tokki还是国产替代？交期和价格？", r: "核心设备自主性" },
  { q: "硅基背板的CMOS代工选择了哪家Foundry？工艺节点和PDK支持情况？", r: "供应链可行性" }
], COLOR_WARN);

qSection("🟠 优先级：客户与市场", [
  { q: "“JG”是否代表军工？已有军工资质？是否有在谈的军工客户或订单？", r: "验证市场切入点" },
  { q: "除军工外，是否已有消费电子客户的验证意向或合作备忘录？", r: "评估商业拓展进展" },
  { q: "对目标客户是直销还是通过模组集成商？销售团队或渠道资源配置？", r: "商业模式验证" }
], COLOR_WARN);

qSection("🟡 优先级：竞争与融资", [
  { q: "视涯已量产、已积累数亿营收并即将IPO募资20亿扩产，贵司与之竞争的核心壁垒是什么？", r: "正面竞争可行性" },
  { q: "如果三星或Sony在2026年率先量产光刻Micro OLED并开放供货，贵司如何应对？", r: "技术路线被先行者封堵的风险" },
  { q: "“六合简纯图”在本项目中的角色是什么？团队与BP文档编写方的关系？", r: "确认项目归属与控制权" }
], "B7950B");

// ===== CHAPTER 6: 不确定性声明 =====
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "六、不确定性声明与待验证事项", bold: true, size: 32, font: FONT, color: COLOR_ACCENT })] }));

children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "6.1 高不确定性（需首次交流解决）", bold: true, size: 28, font: FONT, color: COLOR_DARK })] }));
const uw = [2400, 3200, 3760];
children.push(new Table({
  columnWidths: uw,
  rows: [
    new TableRow({ tableHeader: true, children: [
      hdrCell("事项", uw[0]), hdrCell("不确定性来源", uw[1]), hdrCell("需要验证的方式", uw[2])
    ] }),
    new TableRow({ children: [cell("团队履历与胜任度", uw[0]), cell("公开信息完全不可查", uw[1]), cell("首次交流直接提问、背调", uw[2])] }),
    new TableRow({ children: [cell("专利/IP状态", uw[0]), cell("未在公开数据库找到", uw[1]), cell("要求展示专利号，后续检索", uw[2])] }),
    new TableRow({ children: [cell("产线建设进度", uw[0]), cell("2026年投产缺乏佐证", uw[1]), cell("现场走访或设备采购合同", uw[2])] }),
    new TableRow({ children: [cell("军工资质与渠道", uw[0]), cell("JG含义不清", uw[1]), cell("直接询问并验证资质文件", uw[2])] }),
  ]
}));

children.push(spacer(200));
children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "6.2 中等不确定性（可在首次交流后补充）", bold: true, size: 28, font: FONT, color: COLOR_DARK })] }));
[
  "目标市场规模预测的精确性 — AI眼镜爆发时间点有多种情景，建议独立做市场测算",
  "Micro-LED突破时间线 — 持续跟踪JDI eLEAP、三星、AUO等企业进展",
  "视涯IPO后的竞争格局演变 — 视涯若成功IPO募资20亿+，产能壁垒进一步加高",
  "政策与资本环境 — 半导体显示产业的政策支持和资本风向变化"
].forEach(t => {
  children.push(new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { before: 40, after: 40 },
    children: [new TextRun({ text: t, size: SZ_BODY, font: FONT })] }));
});

// ===== DISCLAIMER =====
children.push(spacer(400));
children.push(new Paragraph({ spacing: { before: 200 }, border: { top: { style: BorderStyle.SINGLE, size: 2, color: "CCCCCC", space: 8 } },
  children: [new TextRun({ text: "免责声明", bold: true, size: SZ_SMALL, font: FONT, color: "999999" })] }));
children.push(new Paragraph({ spacing: { before: 40, after: 40 },
  children: [new TextRun({ text: "本报告基于公开可查信息编制，仅供参考，不构成投资建议。所有判断、评级和推荐仅为技术视角的技术研判意见，最终投资决策权归属投资决策委员会。", size: SZ_SMALL, font: FONT, color: "999999", italics: true })] }));
children.push(new Paragraph({
  children: [new TextRun({ text: "报告编制：Deeptechnic（技研）", size: SZ_SMALL, font: FONT, color: "888888" })] }));

// ========== CREATE DOCUMENT ==========
const doc = new Document({
  styles: {
    default: { document: { run: { font: FONT, size: SZ_BODY } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: COLOR_ACCENT, font: FONT },
        paragraph: { spacing: { before: 360, after: 240 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: COLOR_DARK, font: FONT },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: COLOR_DARK, font: FONT },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ]
  },
  numbering,
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1260, bottom: 1260, left: 1260 },
        size: {}, pageNumbers: { start: 1 } }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "Deeptechnic（技研）— Micro-OLED 项目初评", size: 16, font: FONT, color: "BBBBBB", italics: true })]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "第 ", size: 18, font: FONT, color: "999999" }),
            new TextRun({ children: [PageNumber.CURRENT], size: 18, font: FONT, color: "999999" }),
            new TextRun({ text: " 页 共 ", size: 18, font: FONT, color: "999999" }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, font: FONT, color: "999999" }),
            new TextRun({ text: " 页", size: 18, font: FONT, color: "999999" })]
        })]
      })
    },
    children
  }]
});

Packer.toBuffer(doc).then(buf => {
  const outPath = "/Users/ackiles/Documents/AI-Space/专家/reports/2026-05-20-micro-oled-初评-eb80/Micro-OLED项目初评报告.docx";
  fs.writeFileSync(outPath, buf);
  console.log("Document generated successfully:", outPath);
});
