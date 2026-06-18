const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
        WidthType, ShadingType, VerticalAlign, PageBreak } = require('docx');

const REPORT_DIR = "/Users/ackiles/Documents/AI-Space/专家/reports/2026-05-26-低空巡航无人机-芜湖广土科技-初评-feee";
const OUTPUT = "/Users/ackiles/Documents/【6-4】对接项目/安徽节目录制项目/初评报告_低空巡航无人机_芜湖广土科技.docx";

function tb(text, opts = {}) { return new TextRun({ text, font: "Arial", size: 24, ...opts }); }
function tt(text, opts = {}) { return new TextRun({ text, font: "Times New Roman", size: 24, ...opts }); }

function heading1(text) { return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text, bold: true, size: 32, font: "Arial" })] }); }
function heading2(text) { return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text, bold: true, size: 28, font: "Arial" })] }); }
function heading3(text) { return new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text, bold: true, size: 26, font: "Arial" })] }); }

function para(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120, line: 360 },
    ...opts,
    children: [tb(text, opts.textOpts || {})]
  });
}

function paraRuns(runs, opts = {}) {
  return new Paragraph({
    spacing: { after: 120, line: 360 },
    ...opts,
    children: runs
  });
}

function spacer() { return new Paragraph({ spacing: { after: 60 }, children: [] }); }

// Table helpers
const tBorder = { style: BorderStyle.SINGLE, size: 1, color: "999999" };
const tBorders = { top: tBorder, bottom: tBorder, left: tBorder, right: tBorder };

function tCell(text, opts = {}) {
  return new TableCell({
    borders: tBorders,
    width: { size: opts.width || 3120, type: WidthType.DXA },
    verticalAlign: VerticalAlign.CENTER,
    shading: opts.shading ? { fill: opts.shading, type: ShadingType.CLEAR } : undefined,
    children: [new Paragraph({
      alignment: opts.align || AlignmentType.LEFT,
      spacing: { before: 40, after: 40 },
      children: [new TextRun({ text, bold: !!opts.bold, size: 20, font: "Arial" })]
    })]
  });
}

function tCellR(runs, opts = {}) {
  return new TableCell({
    borders: tBorders,
    width: { size: opts.width || 3120, type: WidthType.DXA },
    verticalAlign: VerticalAlign.CENTER,
    shading: opts.shading ? { fill: opts.shading, type: ShadingType.CLEAR } : undefined,
    children: [new Paragraph({
      alignment: opts.align || AlignmentType.LEFT,
      spacing: { before: 40, after: 40 },
      children: runs
    })]
  });
}

// Bullet list
function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullet-list", level: 0 },
    spacing: { after: 60 },
    children: [tb(text)]
  });
}

function numList(text, ref = "num-list-1") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 60 },
    children: [tb(text)]
  });
}

// Grading badge
function gradeText(grade) {
  const colors = { "优": "1A7D36", "良": "2B579A", "中": "D4730D", "差": "C0392B", "中-差": "B85C00" };
  return tb(`[${grade}]`, { color: colors[grade] || "333333", bold: true, size: 24 });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 44, bold: true, color: "1A3A5C", font: "Arial" },
        paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: "1A3A5C", font: "Arial" },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: "2B579A", font: "Arial" },
        paragraph: { spacing: { before: 240, after: 180 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, color: "2B579A", font: "Arial" },
        paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "num-list-1",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "num-list-2",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "num-list-3",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        size: { width: 11906, height: 16838 } // A4
      }
    },
    headers: {
      default: new Header({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "Deeptechnic 技研  |  技术初评报告", font: "Arial", size: 18, color: "999999", italics: true })]
      })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "机密文件 — 仅供内部使用  |  第 ", font: "Arial", size: 18, color: "999999" }),
                   new TextRun({ children: [require('docx').PageNumber.CURRENT], font: "Arial", size: 18, color: "999999" }),
                   new TextRun({ text: " 页", font: "Arial", size: 18, color: "999999" })]
      })] })
    },
    children: [
      // ========== TITLE PAGE ==========
      new Paragraph({ spacing: { before: 3000 }, children: [] }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new TextRun({ text: "Deeptechnic 技研", font: "Arial", size: 48, bold: true, color: "1A3A5C" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 600 },
        children: [new TextRun({ text: "技术初评报告", font: "Arial", size: 36, color: "666666" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [new TextRun({ text: "芜湖广土科技有限责任公司", font: "Arial", size: 40, bold: true, color: "1A3A5C" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [new TextRun({ text: "低空巡航无人机及配套产品线技术研判", font: "Arial", size: 28, color: "444444" })]
      }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [tb("-" + " ".repeat(40), { color: "CCCCCC" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [tb("报告编号：DT-2026-001", { color: "666666", size: 22 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [tb("报告日期：2026年5月26日", { color: "666666", size: 22 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [tb("密级：机密 — 仅限内部传阅", { color: "CC3333", size: 22 })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // ========== TABLE OF CONTENTS ==========
      heading1("目录"),
      para("一、项目概述"),
      para("二、核心产品线与技术评估"),
      para("  2.1 RemoteID 收发一体模块"),
      para("  2.2 4+1 固定翼巡航无人机平台"),
      para("  2.3 定制产品线（NPU芯片 / MicroLED / AI硬件 / IoT模块）"),
      para("三、产业化背景与政策环境"),
      para("四、市场竞争格局"),
      para("五、团队评估"),
      para("六、风险识别"),
      para("七、综合研判与结论"),
      para("八、后续尽调建议"),

      new Paragraph({ children: [new PageBreak()] }),

      // ========== SECTION 1 ==========
      heading1("一、项目概述"),
      para("本报告对芜湖广土科技有限责任公司（以下简称「广土科技」）的低空巡航无人机项目进行独立第三方技术初评。评估基于项目商业计划书（BP）内容及公开可查信息，依据 Deeptechnic（技研）技术研判框架，从技术先进性、产品完整性、市场前景、团队胜任力和风险维度展开系统分析。"),

      heading2("1.1 公司基本情况"),
      ...(() => {
        const rows = [
          ["公司名称", "芜湖广土科技有限责任公司"],
          ["公司状态", "一人公司（单一工程师主导）"],
          ["联系地址", "芜湖航空产业园"],
          ["联系人", "庄金峰"],
          ["邮箱", "jinfeng.Zhuang@aliyun.com"],
          ["手机", "15021315961"],
          ["融资需求", "100万元（12-15个月）"],
          ["盈利模式", "通过技术服务而非生产制造盈利"],
        ];
        return rows.map((r, i) => new TableRow({
          children: [
            tCell(r[0], { width: 3120, bold: true, shading: i === 0 ? "D5E8F0" : (i % 2 === 1 ? "F2F7FA" : undefined) }),
            tCell(r[1], { width: 6240, shading: i === 0 ? "D5E8F0" : (i % 2 === 1 ? "F2F7FA" : undefined) })
          ]
        }));
      })(),
      new Paragraph({
        spacing: { before: 200, after: 200 },
        children: [new TextRun({ text: "表1：公司基本概况", font: "Arial", size: 20, color: "666666", italics: true })]
      }),

      heading2("1.2 核心产品线概览"),
      paragraph("广土科技目前规划了六条产品线，呈现出「一条主线+多条辅线「的结构："),
      bullet("RemoteID 收发一体模块：首款产品，响应民航局远程识别强制要求"),
      bullet("4+1 固定翼巡航无人机平台：核心产品，3D打印，翼展2m，120km航程"),
      bullet("NPU芯片（联合研发）：提供软件方案+两个应用场景（无人机+AI硬件）"),
      bullet("MicroLED光源芯片：汽车ADB大灯控制算法（与上海公司合作）"),
      bullet("AI智能硬件：语音玩具+大模型对话+定制语音"),
      bullet("定制化物联网模块：空压机振动监测等项目式定制"),

      spacer(),
      paraRuns([
        tb("综合判断：", { bold: true }),
        gradeText("中-差"),
        tb("  产品方向定位符合行业趋势，但六条线并行远超一人公司承载能力。", { color: "555555" }),
      ]),

      new Paragraph({ children: [new PageBreak()] }),

      // ========== SECTION 2 ==========
      heading1("二、核心产品线与技术评估"),

      // 2.1 RemoteID
      heading2("2.1 RemoteID 收发一体模块"),

      heading3("方案概述"),
      para("RemoteID模块被BP定位为「首款产品」，面向中国民航局无人机远程识别强制标准。模块集成4G上云、GPS定位、气压计、WiFi等通信与感知功能，支持机载端实时广播和地面站接收解析的双向能力。"),

      heading3("技术方案评估"),
      para("方案采用"WiFi近距离广播+4G远程上云「的混合路径，这是当前Remote ID模块的主流技术路线。GPS+气压计双模定位提供了冗余设计。方案总体技术思路合理，但并无显著创新点。"),

      heading3("竞品对比"),
      ...(() => {
        const headerRow = new TableRow({
          tableHeader: true,
          children: [
            tCell("参数", { width: 1800, bold: true, shading: "1A3A5C", align: AlignmentType.CENTER }),
            tCell("广土科技", { width: 1800, bold: true, shading: "1A3A5C", align: AlignmentType.CENTER }),
            tCell("Dronetag", { width: 1800, bold: true, shading: "1A3A5C", align: AlignmentType.CENTER }),
            tCell("uAvionix", { width: 1800, bold: true, shading: "1A3A5C", align: AlignmentType.CENTER }),
          ].map(c => { c.shading = "1A3A5C"; return c; })
        });
        const data = [
          ["通信方式", "WiFi+4G", "BLE+WiFi", "WiFi"],
          ["定位方式", "GPS+气压计", "GPS+气压计", "GPS"],
          ["价格区间", "未披露", "€99-199", "$199-349"],
          ["认证状态", "未认证", "FAA/欧盟", "FAA/欧盟"],
          ["量产状态", "未量产", "已量产", "已量产"],
        ];
        return [headerRow].concat(data.map(row => new TableRow({
          children: row.map((c, i) => tCell(c, { width: 1800, bold: i === 0 }))
        })));
      })(),
      para("表2：Remote ID模块竞品对比", { textOpts: { italics: true, size: 20, color: "666666" } }),

      heading3("风险评估"),
      bullet("市场窗口期有限：DJI等主流无人机已全系预装Remote ID，独立模块市场需求集中在存量无人机改造，预计2026年后趋于饱和"),
      bullet("认证成本：民航局合规认证流程耗时耗钱（预计数万至十余万元），100万元融资中可能被大量占用"),
      bullet("竞争压价：Remote ID独立模块领域已有Dronetag、Holybro等国际品牌，国内珠三角代工厂很快会跟进低成本方案"),

      paraRuns([
        tb("技术评级：", { bold: true }),
        tb("中", { bold: true, color: "D4730D" }),
        tb("  方案合理，但差异化不足，市场窗口有限。", { color: "555555" }),
      ]),

      spacer(),
      heading2("2.2 4+1 固定翼巡航无人机平台"),

      heading3("方案概述"),
      para("广土科技的核心产品：3D打印的4+1复合翼（垂直起降固定翼）无人机，翼展2m，宣称航程120km、续航2小时。计划搭载可变焦距+NPU摄像头、红外相机和4G图传模块，用于高速/大农田/水域/边境/森林/海岸线巡检。"),

      heading3("技术方案评估"),
      para("构型选择（4+1 VTOL复合翼）合理，是当前10-50kg级工业无人机的标准构型。3D打印机身降低了起步门槛，但带来了量产一致性和结构耐久性的疑问。"),

      heading3("竞品对比"),
      ...(() => {
        const hRow = new TableRow({
          tableHeader: true,
          children: [
            tCell("指标", { width: 1560, bold: true, shading: "1A3A5C" }),
            tCell("广土科技", { width: 1560, bold: true, shading: "1A3A5C" }),
            tCell("纵横CW-15", { width: 1560, bold: true, shading: "1A3A5C" }),
            tCell("科比特插翅虎", { width: 1560, bold: true, shading: "1A3A5C" }),
            tCell("DJI M350", { width: 1560, bold: true, shading: "1A3A5C" }),
          ].map(c => { c.shading = "1A3A5C"; return c; })
        });
        const data = [
          ["类型", "4+1复合翼", "纯固定翼", "复合翼", "多旋翼"],
          ["翼展", "2m", "3.4m", "2.5m", "-"],
          ["航程", "120km", "200km", "180km", "20km"],
          ["续航", "2h", "4h", "3.5h", "55min"],
          ["载荷", "未披露", "2kg", "2kg", "2.7kg"],
          ["售价", "未披露", "~15万", "~12万", "~6万"],
          ["量产", "未量产", "已量产", "已量产", "已量产"],
        ];
        return [hRow].concat(data.map(row => new TableRow({
          children: row.map((c, i) => tCell(c, { width: 1560, bold: i === 0 }))
        })));
      })(),
      para("表3：固定翼巡航无人机竞品对比", { textOpts: { italics: true, size: 20, color: "666666" } }),

      heading3("关键风险评估"),
      bullet("核心参数未经第三方实测验证——BP中未提供试飞视频或测试报告"),
      bullet("3D打印结构在持续振动环境下的可靠性在行业中尚无大规模验证"),
      bullet("飞控系统方案未披露（自研/Pixhawk/ArduPilot？），这是衡量底层技术能力的关键"),
      bullet("载重能力未明确，严重制约了载荷配置空间"),

      paraRuns([
        tb("技术评级：", { bold: true }),
        tb("中-差", { bold: true, color: "B85C00" }),
        tb("  构型选择正确但参数偏下，缺实测数据，量产路径不清晰。", { color: "555555" }),
      ]),

      spacer(),
      heading2("2.3 定制产品线"),

      heading3("NPU芯片联合研发"),
      para("BP中描述与第三方联合研发NPU芯片，广土科技提供软件方案和两个应用场景（无人机+AI智能硬件）。此模式在行业常见，但一人公司承担NPU全套软件栈开发（编译器、驱动、算子库）可信度存疑——该工作通常需要5-10人团队。合作方身份、合作阶段、IP分配方案均未披露。"),

      heading3("MicroLED光源芯片"),
      para("与上海公司合作开发汽车大灯投影方案的底层控制算法。方向与技术趋势一致（ADB成为中高端车型标配），但车规级软件需满足ISO 26262功能安全标准，一人公司的软件质量保证能力堪忧。"),

      heading3("AI智能硬件（语音玩具）"),
      para("AI语音玩具赛道2024-2025年极度拥挤（字节、百度、科大讯飞等大厂均已入局）。技术门槛低（大模型API调用），无需硬件突破。作为被动定制接单项目可以理解，但作为主动产品线没有竞争力。"),

      heading3("IoT物联网模块"),
      para("BP中明确表示采用成熟模块部署，不自研。这一态度务实合理。"),

      paraRuns([
        tb("综合评级：", { bold: true }),
        tb("差", { bold: true, color: "C0392B" }),
        tb("  产品线高度分散，核心方向被稀释。", { color: "555555" }),
      ]),

      new Paragraph({ children: [new PageBreak()] }),

      // ========== SECTION 3 ==========
      heading1("三、产业化背景与政策环境"),

      heading2("3.1 低空经济政策大势"),
      para("低空经济已上升为国家战略。2023年中央经济工作会议首提、2024年写入政府工作报告、2025年《无人驾驶航空器飞行管理暂行条例》全面实施。民航局预测2030年低空经济对GDP贡献超2万亿元。安徽芜湖被列为低空经济试点城市，芜湖航空产业园是安徽省重点产业集聚区。"),

      heading2("3.2 对广土科技的影响"),
      bullet("政策大方向利好，行业处于高速上升期"),
      bullet("芜湖航空产业园有租金减免、人才补贴等扶持政策（实际落实程度有待创始人确认）"),
      bullet("低空经济投资热带动了资本关注，但资本更偏好已量产和有规模验证的企业"),

      paraRuns([
        tb("机遇评级：", { bold: true }),
        tb("良", { bold: true, color: "2B579A" }),
        tb("  赛道正确，但窗口期不会永远敞开。（2025-2028是关键窗口期）", { color: "555555" }),
      ]),

      // ========== SECTION 4 ==========
      heading1("四、市场竞争格局"),

      heading2("4.1 竞争层级分析"),
      bullet("第一梯队（A级）：大疆创新（全能霸主）、纵横股份（复合翼巡检龙头，上市企业）"),
      bullet("第二梯队（B级）：科比特航空、云圣智能（已获数亿融资）"),
      bullet("第三梯队（C级）：普宙飞行器、各区域型小团队"),
      bullet("广土科技潜在定位：C级以下，尚未进入竞争棋盘"),

      heading2("4.2 差异化空间"),
      para("广土科技可能的差异化路径："),
      bullet("极致成本：3D打印+精简团队，整机价格可能显著低于竞品"),
      bullet("本地化服务：芜湖航空产业园贴近长三角客户，现场响应速度快"),
      bullet("灵活定制：小批量、快速改型的能力（"2周打板+2周调试"）"),

      paraRuns([
        tb("竞争评级：", { bold: true }),
        tb("差", { bold: true, color: "C0392B" }),
        tb("  头部玩家已建立品牌/渠道/资金壁垒，差异化路径需要极强的执行力。", { color: "555555" }),
      ]),

      // ========== SECTION 5 ==========
      new Paragraph({ children: [new PageBreak()] }),
      heading1("五、团队评估"),

      heading2("5.1 创始人能力分析"),
      bullet("从BP技术描述判断：有较完整的嵌入式系统开发经验（GPS/4G/WiFi/传感器/3D打印）"),
      bullet("从BP的融资方案和五年规划描述判断：商业逻辑和产品思维有一定的成熟度"),
      bullet("从个人邮箱(aliyun.com)判断：尚未建立企业级IT基础设施"),

      heading2("5.2 一人公司模式的根本性挑战"),
      ...(() => {
        const hRow = new TableRow({
          tableHeader: true,
          children: [
            tCell("挑战维度", { width: 2400, bold: true, shading: "1A3A5C" }),
            tCell("具体描述", { width: 4800, bold: true, shading: "1A3A5C" }),
            tCell("严重度", { width: 2160, bold: true, shading: "1A3A5C" }),
          ]
        });
        const data = [
          ["技术单点", "关键技术决策无交叉验证，错误难以被及时发现", "高"],
          ["精力分散", "六条产品线同时推进，单人每周168h也不够", "极高"],
          ["供应链", "BOM采购、备货、品控全部亲力亲为", "高"],
          ["适航认证", "民航认证流程极为繁琐，单人难以应对", "高"],
          ["商务对接", "同时负责技术和商务，研发效率下行", "中"],
          ["团队替代", "创始人不可替代本身就是投资风险", "中"],
        ];
        return [hRow].concat(data.map(row => new TableRow({
          children: [
            tCell(row[0], { width: 2400, bold: true }),
            tCell(row[1], { width: 4800 }),
            tCell(row[2], { width: 2160 }),
          ]
        })));
      })(),
      para("表4：一人公司模式风险清单", { textOpts: { italics: true, size: 20, color: "666666" } }),

      paraRuns([
        tb("团队评级：", { bold: true }),
        tb("中-差", { bold: true, color: "B85C00" }),
        tb("  创始人展现出一定的技术基础和在产品思维，但一人模式在硬件赛道风险极高。", { color: "555555" }),
      ]),

      // ========== SECTION 6 ==========
      new Paragraph({ children: [new PageBreak()] }),
      heading1("六、风险识别"),

      heading2("6.1 技术风险"),
      bullet("【高】产品从未量产，技术债全部由一人承担"),
      bullet("【高】无人机的核心参数（120km/2h）是否实测达到？缺少第三方验证"),
      bullet("【中】3D打印飞机的结构耐久性和量产一致性有待验证"),
      bullet("【中】飞控系统方案不明确（自研/开源/商用？）"),

      heading2("6.2 市场风险"),
      bullet("【高】Remote ID模块市场窗口期有限，预计2026年后饱和"),
      bullet("【高】工业无人机巡检市场已被大疆/纵横/科比特等先发者占据"),
      bullet("【中】AI语音玩具属于消费电子红海，一人公司无竞争力"),
      bullet("【中】NPU芯片联合研发的场景出货量（50-100套）与芯片流片量级严重不匹配"),

      heading2("6.3 团队风险"),
      bullet("【高】关键技术全部依赖创始人一人，健康/家庭/个人风险传导至公司"),
      bullet("【高】20万元人力预算不足以支撑12-15个月的工程师薪酬"),
      bullet("【中】无法核实创始人的详细技术履历"),

      heading2("6.4 财务与融资风险"),
      bullet("【高】100万元融资在12-15个月内需覆盖认证、打样、试飞、人力、市场等全部开销，资金缺口明显"),
      bullet("【中】初创企业以个人邮箱联系客户，会降低合作伙伴的信任度"),

      // ========== SECTION 7 ==========
      new Paragraph({ children: [new PageBreak()] }),
      heading1("七、综合研判与结论"),

      heading2("7.1 综合评级"),
      ...(() => {
        const hRow = new TableRow({
          tableHeader: true,
          children: [
            tCell("评估维度", { width: 3120, bold: true, shading: "1A3A5C" }),
            tCell("评级", { width: 1560, bold: true, shading: "1A3A5C", align: AlignmentType.CENTER }),
            tCell("简要说明", { width: 4680, bold: true, shading: "1A3A5C" }),
          ]
        });
        const data = [
          ["技术先进性", "中-差", "跟随策略，无突破性创新"],
          ["技术成熟度", "中-差", "无量产经验，Remote ID未出货"],
          ["产品系统完整性", "中", "方向思路合理，但六条线分散"],
          ["市场竞争力", "差", "头部玩家已建立产业壁垒"],
          ["团队胜任力", "中-差", "创始人个人能力可，但一人模式风险极高"],
          ["商业化前景", "差", "直销+本地服务模式天花板明显"],
        ];
        return [hRow].concat(data.map(row => new TableRow({
          children: [
            tCell(row[0], { width: 3120, bold: true }),
            tCellR([gradeText(row[1])], { width: 1560, align: AlignmentType.CENTER }),
            tCell(row[2], { width: 4680 }),
          ]
        })));
      })(),
      para("表5：综合评级矩阵", { textOpts: { italics: true, size: 20, color: "666666" } }),

      spacer(),
      heading2("7.2 总体结论"),
      paraRuns([
        tb("综合评级：", { bold: true, size: 28 }),
        gradeText("中-差"),
        tb("", { size: 28 }),
      ]),
      spacer(),
      para("广土科技的项目处于极早期的种子前阶段。技术方向选择正确（Remote ID + 固定翼巡航无人机 + AI边缘计算顺应行业趋势），创始人展现出一定的嵌入式系统工程能力。但一人公司的资源极限、六条并行产品线的战略失焦、无任何量产和认证记录的核心短板、以及工业无人机赛道的激烈竞争格局，使得该项目在当前状态下技术风险显著高于可接受水平。"),
      para("结论倾向：建议保持关注，但不建议在当前阶段直接投资。可在以下里程碑达成后重新评估："),
      numList("Remote ID模块完成民航合规认证并通过第三方测试", "num-list-1"),
      numList("固定翼巡航无人机完成至少50小时无故障试飞"),
      numList("创始人完成至少1-2名关键技术人员招聘"),
      numList("聚焦为核心2-3条产品线，而非现在的6条"),

      // ========== SECTION 8 ==========
      new Paragraph({ children: [new PageBreak()] }),
      heading1("八、后续尽调建议"),

      heading2("8.1 建议尽调事项"),
      para("若决定进入正式尽调阶段，建议重点核查以下事项："),

      heading3("技术尽调"),
      bullet("【必查】创始人软件/嵌入式代码能力：要求提供GitHub/Coding等平台的代码库"),
      bullet("【必查】Remote ID模块的原理样机演示和射频测试报告"),
      bullet("【必查】无人机飞控系统的选型和底层代码来源"),
      bullet("【必查】NPU芯片联合研发的合作协议和IP归属条款"),
      bullet("【可选】MicroLED控制算法的演示和功能安全文档"),

      heading3("商业尽调"),
      bullet("【必查】芜湖广土科技的工商注册信息（注册资本、实缴、股东结构）"),
      bullet("【必查】创始人的学历证明和过往工作履历"),
      bullet("【必查】NPU和MicroLED合作方的身份和资质"),
      bullet("【必查】已有的客户意向书或合作备忘录（MOU）"),
      bullet("【可选】100万元融资的详细资金运用计划"),

      heading3("法律尽调"),
      bullet("【必查】专利/软著申请清单（BP中未提知识产权布局）"),
      bullet("【必查】技术来源的合规性（是否涉及前雇主的知识产权？）"),
      bullet("【必查】联合研发协议中已签署的合作文件"),

      spacer(),
      heading2("8.2 建议后续跟踪节点"),
      bullet("Remote ID模块通过民航认证测试（预计需3-6个月）"),
      bullet("完成至少1次公开的固定翼无人机试飞演示"),
      bullet("招聘到第1名嵌入式全职工程师"),
      bullet("获取首个Remote ID模块采购订单"),

      spacer(),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 600 },
        children: [tb("— 报告完 —", { color: "999999", italics: true, size: 22 })]
      }),
      spacer(),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200 },
        children: [tb("本报告由Deeptechnic（技研）基于BP文件及公开可查信息编制", { color: "999999", italics: true, size: 20 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [tb("所有判断均为技术研判意见，不构成投资建议", { color: "999999", italics: true, size: 20 })]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(OUTPUT, buffer);
  console.log("Report generated:", OUTPUT);
  console.log("Size:", (buffer.length / 1024).toFixed(1), "KB");
});
