const docx=require('docx');const fs=require('fs');
const {Document,Packer,Paragraph,TextRun,Table,TableRow,TableCell,HeadingLevel,AlignmentType,WidthType,BorderStyle,ShadingType,PageBreak,Header,Footer,PageNumber}=docx;
const R='CC0000',O='E68A00',Y='CC9900',G='339933',GY='666666',DB='1A3A5C',MB='2B5797',WH='FFFFFF',LGR='F5F5F5',LR='FFF0F0';

function hr(c){
  return new TableRow({tableHeader:true,children:c.map(x=>new TableCell({children:[new Paragraph({children:[new TextRun({text:x,bold:true,color:WH,size:18,font:'Microsoft YaHei'})],alignment:AlignmentType.CENTER})],shading:{type:ShadingType.SOLID,color:DB},verticalAlign:'center'}))});
}
function dr(c){
  return new TableRow({children:c.map((x,i)=>new TableCell({children:[new Paragraph({children:[new TextRun({text:String(x),size:18,font:'Microsoft YaHei',color:'333333'})],alignment:i===0?AlignmentType.LEFT:AlignmentType.CENTER})],shading:i===0?{type:ShadingType.SOLID,color:LGR}:void 0,verticalAlign:'center'}))});
}
function st(n){return'⭐'.repeat(n)+'☆'.repeat(Math.max(0,5-n));}
function p(t,o={}){
  const r={text:t,size:o.s||22,font:'Microsoft YaHei'};
  if(o.b)r.bold=true;if(o.c)r.color=o.c;
  return new Paragraph({children:[new TextRun(r)],spacing:o.sp||{after:100},alignment:o.a,bullet:o.bul});
}
// Modified p function for interpretation paragraphs (italic, distinct style)
function ip(t,o={}){
  const r={text:t,size:o.s||22,font:'Microsoft YaHei',italics:true};
  if(o.b)r.bold=true;if(o.c)r.color=o.c||'444444';
  return new Paragraph({children:[new TextRun(r)],spacing:{before:o.bef||120,after:o.aft||200},indent:{left:360},bullet:o.bul});
}
function H1(t){return new Paragraph({text:t,heading:HeadingLevel.HEADING_1,spacing:{before:300,after:150},border:{bottom:{color:DB,size:6,style:BorderStyle.SINGLE}}});}
function H2(t){return new Paragraph({text:t,heading:HeadingLevel.HEADING_2,spacing:{before:240,after:120}});}
function H3(t){return new Paragraph({text:t,heading:HeadingLevel.HEADING_3,spacing:{before:200,after:100}});}
function sp(n){return new Paragraph({spacing:{after:n||200},children:[]});}
function cov(){
  return[sp(1200),
    new Paragraph({a:AlignmentType.CENTER,spacing:{after:500},children:[new TextRun({text:'HDMEA 项目',size:52,bold:true,color:DB,font:'Microsoft YaHei'})]}),
    new Paragraph({a:AlignmentType.CENTER,spacing:{after:200},children:[new TextRun({text:'技术研判初评报告',size:40,bold:true,color:MB,font:'Microsoft YaHei'})]}),
    new Paragraph({a:AlignmentType.CENTER,spacing:{after:100},children:[new TextRun({text:'v5 终版 — Deeptechnic 7+4 框架 + 完整解读',size:26,color:O,font:'Microsoft YaHei'})]}),
    sp(300),
    p('评估对象：伽伐尼有限公司 — CMOS HD-MEA 芯片',{a:AlignmentType.CENTER,c:'444444'}),
    p('对标竞品：MaxWell Biosystems · 3Brain · 索尼半导体',{a:AlignmentType.CENTER,c:'444444'}),
    p('评估日期：2026-06-02 | 类型：初步技术研判 Pre-Screening',{a:AlignmentType.CENTER,c:'444444'}),
    p('框架：Deeptechnic 7+4 框架（技术先进性/成熟度/完整性/可替代性/IP + 产业/商业化/竞争/供应链）',{a:AlignmentType.CENTER,c:'666666',s:20}),
    p('输出原则：证据驱动 · 结论清晰 · 风险前置 · 问题导向 · 迭代开放',{a:AlignmentType.CENTER,c:'666666',s:20}),
    p('⚠ 本报告为初步技术研判，不构成投资建议',{a:AlignmentType.CENTER,c:R,sp:{before:80,after:0}}),
    new PageBreak()];
}

// Chapter 1
function c1(){
  return[
    H1('第一章 片上脑的基本概念'),
    H2('1.1 什么是片上脑'),
    p('片上脑（Organoid Intelligence, OI）将 iPSC 来源的大脑类器官培养在 CMOS HD-MEA 芯片上，通过电极阵列实时读取电活动。它与 Neuralink 的植入式 BCI 完全不是同一赛道——in-vitro vs in-vivo。'),

    H2('1.2 解决的四大问题'),
    new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
      hr(['问题','传统局限','片上脑方案']),
      dr(['伦理限制','动物活体+人体临床试验，审批周期长','完全离体，iPSC 来源于成人血液/皮肤']),
      dr(['样本瓶颈','人脑组织只能手术获得，极端稀缺','iPSC 无限扩增，可高通量患者特异性建模']),
      dr(['数据规模','patch-clamp 同时记 1-2 个细胞','HD-MEA 同时记数千个神经元']),
      dr(['药物筛选效率','动物→临床，周期长成本高','类器官先筛后临床，减少动物实验']),
    ]}),
    ip('解读：这四张"饼"背后有真实需求支撑。神经药物开发中超过 90% 在临床试验阶段失败，主因是动物模型的预测性不足。片上脑的核心是用人源(human-relevant)模型替代动物模型——这是产业共识。BP 选对了故事，但讲故事和做成产品之间差了一个银河系。'),

    H3('1.3 HD-MEA 与单细胞组学的互补关系'),
    p('2010s 最重大的技术革命是 scRNA-seq(单细胞转录组)，但它有根本局限：转录组告诉你细胞表达了什么基因，但没告诉你细胞真正在做什么——是否放电、放电模式如何、对药物如何响应。'),
    new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
      hr(['scRNA-seq 告诉你','HD-MEA 告诉你']),
      dr(['这个细胞表达了 GABA 受体','这个细胞是否真正对 GABA 有功能响应']),
      dr(['这是一个兴奋性神经元(基因标注)','这个神经元的实际放电频率和模式']),
      dr(['疾病组与对照组的基因差异','这种基因差异是否导致真正的功能变化']),
    ]}),
    ip('解读：HD-MEA 填补的是 scRNA-seq 留下的功能表型学(functional phenomics)空白。从单细胞层面将基因型+转录组+功能表型关联起来，是神经科学下一个十年方法论。BP 完全没有从这个角度叙事。'),

    H2('1.4 学术验证现状'),
    new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
      hr(['时间','论文/期刊','关键结论','验证层次']),
      dr(['2023','Hartung et al. ALTEX','系统性提出 OI 概念框架','概念奠基']),
      dr(['2024','El Din et al. bioRxiv','类器官具备突触形成/受体表达/可塑性；药物可阻断','分子+功能']),
      dr(['2024','Alam El Din Front Cell Neurosci','首次将 OI 与神经发育毒性测试关联','药筛应用提案']),
      dr(['2026','Robbins et al. Cell Reports','类器官执行 cartpole 任务，闭环反馈实现学习','概念验证成立']),
      dr(['2026','Mohapatra et al. Front Toxicol','建立用类器官评估记忆风险的框架','药筛应用框架']),
    ]}),
    ip('解读：这张表回答了"是否已被证明有效"——答案是分层的。学术概念验证 ✅ 已成立（2026 Cell Reports 的 cartpole 实验是目前最强证据）。但商用/临床药筛 ❌ 尚未被 FDA/EMA 认证。保守估计从概念到药筛还需 5-10 年。片上脑作为 BP 愿景合理且有支撑，但不应该作为短期商业价值的核心依据。'),
    new PageBreak()];
}

// Chapter 2
function c2(){
  return[
    H1('第二章 HD-MEA 芯片的作用、挑战与国外格局'),
    H2('2.1 HD-MEA 角色'),
    p('HD-MEA 是片上脑的"读取硬件"(readout infrastructure)。没有它，类器官的电活动就无人能"听"到。BP 的定位描述准确，但致命问题是：它将裸芯片当成了产品，完全忽略从芯片到可交付系统的工程鸿沟。'),
    H2('2.2 六大技术难点'),
    new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
      hr(['难点','严重度','技术本质','HDMEA 覆盖']),
      dr(['封装','极高','CMOS 泡在 37°C 培养液会短路；需钝化层+侧壁密封+培养井','BP 完全未提及']),
      dr(['面积权衡','高','芯片面积有限，三种需求冲突','CTIA 优先动态范围，代价通道数少']),
      dr(['细胞界面','中高','细胞球形、电极平面，无高阻密封；3D 测不到','马标柔性电极经验，但与 CMOS 不同']),
      dr(['刺激伪迹','中高','刺激脉冲 >> 神经信号，需 <1ms 恢复','只说有 STIM，没提恢复时间']),
      dr(['数据软件','中','40MB/s；需 spike sorting+network analysis','完全空白']),
      dr(['重复性','中','类器官变异性大；需标准化+批次验证','完全空白']),
    ]}),
    ip('解读：六道坎中有两道（封装、软件）BP 完全未触及，另两道（刺激伪迹、重复性）只字未提。团队技术叙事集中在前端电参数上，但决定芯片能不能用的工程问题全部被忽略。封装是业内心照不宣的最大挑战——MaxWell 为此与封装经验丰富的 Sensirion 合作——BP 却一个字没写。这是最重要的危险信号。'),

    H3('2.3 被 BP 忽略的生物学挑战'),

    H3('2.3.1 类器官本身的生物学局限性'),
    p('BP 说"片上脑可突破伦理限制"——这没错。但 BP 完全没提类器官本身的生物学质量问题，这可能是比芯片更大的瓶颈：'),
    new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
      hr(['局限性','生物学本质','对HD-MEA项目影响']),
      dr(['无血管化→坏死核','>500um即缺氧坏死,表面200-300um才有活细胞','只能记录表面,3D优势被削弱']),
      dr(['成熟周期长','iPSC→成熟神经元需60-200+天','验证周期长,迭代慢']),
      dr(['批次变异性>30%','同一方案不同批次功能差异大','抵销高通量优势']),
      dr(['胶质细胞缺失','早期少星形胶质细胞,活动不成熟','与真实人脑差距大']),
    ]}),
    ip('解读：这些不是HDMEA团队能解决的——这是整个类器官领域的普遍挑战。不要以为片上脑的ready for drug screening只是插上芯片就行。类器官本身的生物质量才是更大瓶颈。'),

    H3('2.3.2 钙成像——隐形竞争对手'),
    new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
      hr(['方法','分辨率','通量','用户习惯']),
      dr(['HD-MEA(电生理)','单细胞','数千通道','需买特殊硬件+培训']),
      dr(['钙成像(GCaMP/荧光)','单细胞','全视野百万','学术主流,显微镜已有']),
      dr(['patch-clamp','单细胞+胞内','1-2个','金标准但低通量']),
    ]}),
    ip('解读：HD-MEA信号质量更高,但钙成像的易用性护城河更强。MaxWell/3Brain能卖系统靠的不是参数,是软件+标准试剂盒+技术支持。HDMEA在这些方面全空白。'),

    H3('2.3.3 类器官 vs 脑片——两种不同场景'),
    new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
      hr(['','类器官','脑片(急性切片)']),
      dr(['来源','iPSC分化(数周-数月)','动物处死后切片(当天)']),
      dr(['变异性','高','中']),
      dr(['伦理','无','涉及动物实验']),
      dr(['商业路径','长期→药筛替代','短期→学术工具销售']),
      dr(['密封要求','高(长期>=7天)','中(数小时)']),
    ]}),
    ip('解读：脑片市场的真实商业路径更清晰——MaxWell/3Brain已验证。BP主要讲类器官几乎不提脑片,可能是刻意回避"脑片要用动物→与不需要动物叙事矛盾"。建议HDMEA优先从脑片/切片市场获取短期收入。'),

    H2('2.4 国外竞品'),
    H3('MaxWell Biosystems（瑞士，2016）'),
    new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
      hr(['维度','详情']),
      dr(['起源','ETH 苏黎世 Prof. Hierlemann 实验室 spin-off（Henry Baltes 微电子传统）']),
      dr(['融资','A 轮 CHF 400 万(2020.12)，Sensirion 领投；Dr. Matthias Streiff 入董事会']),
      dr(['芯片','26,400 电极/17.5µm/1,020 通道/2.2 µVrms/20 kHz/PEDOT']),
      dr(['架构','Switch-Matrix（官网对比 APS 噪声更低，因放大器与电极物理分离）']),
      dr(['产品','MaxOne(单孔)/MaxTwo(96 孔)/PSM+PLM 双格式']),
      dr(['中国布局','完整中文官网(mxwbio.com/zh-cn)；标注 Biocomputing；Sensirion 渠道']),
      dr(['状态','已量产 TRL 9，全球销售']),
    ]}),
    ip('解读：MaxWell 的 A 轮只有 CHF 400 万（约 3200 万 RMB），与 HDMEA 的 3000 万差不多，但做成了量产产品。说明 HD-MEA 芯片并非烧钱无底洞。但 MaxWell 的中文官网+中国渠道意味着 HDMEA 面对的"进口替代"不是一个遥远的瑞士公司，而是一个可以在中国买到的竞品。'),

    H3('3Brain AG（瑞士，2004）'),
    new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
      hr(['维度','详情']),
      dr(['历史','20+ 年：Gen 0(2004)→Khíron Gen 3(2019)→Gen 4(在研)']),
      dr(['产品','BioCAM X(4,096)/DupleX(全双向)/CorePlate 96 孔/µNeedle 3D']),
      dr(['架构','APS Active Pixel，4,096 全并行，自研 BioSPU 芯片']),
      dr(['软件','BrainWave 6（三代迭代，自研壁垒）']),
      dr(['团队','4 位博士管理层；招聘 Analog ASIC Design Engineer']),
      dr(['状态','已量产 TRL 9，全球销售']),
    ]}),
    ip('解读：3Brain 是对 HDMEA 威胁更强的竞品——不是电极数多（4,096 更少），而是 20 年迭代史+自研芯片+自有软件+µNeedle 3D 构成了完整护城河。3Brain 是 BP 竞品分析中完全遗漏的——这本身就是团队认知不足的有力证据。'),

    H3('索尼半导体（日本，2025 入局）'),
    new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
      hr(['维度','详情']),
      dr(['发布','2025.06.03 索尼中国官网']),
      dr(['电极数','~237,000（HDMEA 的 10 倍、MaxWell 的 9 倍、3Brain 的 58 倍）']),
      dr(['技术','基于 CMOS 图像传感器(CIS)高速 ADC 派生']),
      dr(['合作方','SCREEN(设备)+VitroVo(算法)+东北工业大学(验证)']),
      dr(['状态','已启动试供服务']),
      dr(['局限','未见片上刺激/多孔板/3D 类器官']),
    ]}),
    ip('解读：索尼入局是 2025-2026 年最重大的行业事件。当一家拥有完整半导体产业链的巨头进入小而美的赛道，创业公司的生存空间被急剧压缩。但索尼也有盲区——未见刺激、多孔板、3D。HDMEA 的唯一生存机会是押注索尼未覆盖的功能维度（电化学双模、刺激、定制工艺）做差异化，而不是在电极数上硬碰硬。'),

    H2('2.5 BP 竞争格局的认知偏差'),
    new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
      hr(['BP 说了什么','实际漏掉了什么','影响']),
      dr(['列出国际竞品(名称红码)','完全遗漏 3Brain（20年历史瑞士公司）','严重']),
      dr(['"核心芯片被国外垄断"','完全遗漏索尼（2025年入局）','严重']),
      dr(['全部对标 MaxWell 一家','品类错位——MaxWell 不做电化学','叙事混淆']),
    ]}),
    ip('解读：三个遗漏/错误放在一起，说明团队没有做过认真的竞争格局分析，或者做了但选择性地隐瞒了信息。无论哪种情况，对投资尽调都是重大警示。'),
    new PageBreak()];
}

// Chapter 3
function c3(){
  return[
    H1('第三章 本项目技术路线分析'),
    H2('3.1 架构：CTIA 电流模'),
    p('核心架构：CTIA（Capacitive Transimpedance Amplifier）——电极微弱电流在反馈电容上积分转换为电压。通过切换反馈电容实现多量程（130dB 的物理基础）。'),

    H2('3.2 三种架构核心差异'),
    new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
      hr(['维度','CTIA 电流模(HDMEA)','Switch-Matrix(MaxWell)','APS(3Brain)']),
      dr(['测量对象','电流(fA-nA)','电压(µV)','电压(µV)']),
      dr(['每通道面积','大(50-100µm²)','小(10-20µm²)','中(30-50µm²)']),
      dr(['并行通道','受限(1,024)','较高(20,000+)','最高(4,096 全并行)']),
      dr(['动态范围','极宽 130dB','窄 60-80dB','窄 60-80dB']),
      dr(['电化学','天然适合','不适合','不适合']),
      dr(['学界验证','少(电化学为主)','较多(ETH)','最多(20 年)']),
    ]}),
    ip('解读：CTIA 的真正优势不是"噪声更低"——fA/√Hz 与 µVrms 不可比。它的真正优势是双模测量能力：同一架构可记录动作电位和神经递质浓度。这是 Switch-Matrix 和 APS 做不到的——一个真实存在的蓝海需求。但代价同样真实：CTIA 面积大，1,024 通道 vs 3Brain 4,096，在纯电生理场景下 HDMEA 的实际记录能力只有 1/4。'),

    H2('3.3 三颗芯片关系'),
    new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
      hr(['芯片','测量对象','信息价值','定位']),
      dr(['HD-MEA 主芯片','动作电位(细胞放电)','网络功能连接','核心技术壁垒']),
      dr(['pA 电化学模块','神经递质(释放量)','突触传递机制','配套辅助']),
      dr(['fA 源表模块','阻抗/漏电流','电极界面质量','配套辅助']),
    ]}),
    ip('解读：三颗芯片不是等价的。fA 源表使用 0.6µm 老工艺，成本极低。把三颗放在一起讲给投资人制造了"产品线丰富"的假象，实际只有 HD-MEA 主芯片有价值评估意义。BP "利润 10000%" 未经核算，不可信。'),

    H2('3.4 团队特点 vs 六大难点'),
    new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
      hr(['团队特点','对应难点','程度','分析']),
      dr(['24,576 电极/10µm','面积取舍','部分','间距最优但通道数<3Brain']),
      dr(['CTIA(130dB/180dBΩ)','面积取舍','部分','架构正确但以面积效率为代价']),
      dr(['片上刺激(STIM)','刺激伪迹','未覆盖','有 STIM 但没提恢复时间/双向能力']),
      dr(['pA 电化学检测','细胞界面','间接','递质检测相关但与界面对不同']),
      dr(['柔性电极(马标)','细胞界面','间接','柔性电极经验来自植入式 BCI']),
      dr(['"量产经验"','封装','未覆盖','柔性电子≠CMOS 封装']),
      dr(['三芯片方案','数据软件','未覆盖','三芯片=三倍软件复杂度']),
      dr(['—','重复性','未覆盖','完全没提标准化/批次验证']),
    ]}),
    ip('解读：6 大难点中 0 个完全解决、2 个部分覆盖、4 个未触及。团队技术叙事集中在前端芯片电参数上，但决定芯片能不能用的工程问题（封装、伪迹、软件、标准化）完全没有覆盖。'),

    H2('3.5 竞品全面对比'),
    new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
      hr(['指标','HDMEA','MaxWell','3Brain','索尼']),
      dr(['成立','2025?','2016','2004','2025涉足']),
      dr(['电极数','24,576','26,400','4,096','~237,000']),
      dr(['间距','10µm','17.5µm','~21/50µm','未公开']),
      dr(['并行通道','1,024','1,020','4,096','大规模']),
      dr(['架构','CTIA 电流模','Switch-Matrix','APS','CIS派生']),
      dr(['电化学','天然适合','不适合','不适合','不适合']),
      dr(['片上刺激','有(STIM)','32路','全双向','未见']),
      dr(['多孔板','未见','96孔','96孔','未见']),
      dr(['3D类器官','未提及','平面','µNeedle 独有','平面']),
      dr(['软件','无','MaxLab Live','BrainWave 6','VitroVo']),
      dr(['商用','TRL3-4','TRL9量产','TRL9量产','试供TRL8']),
      dr(['中国','本地','中文官网+渠道','经销商','全球渠道']),
      dr(['工艺','0.18/0.6µm','0.18µm','自研BioSPU','自有产线']),
    ]}),
    ip('解读：HDMEA 在个别参数有亮点(CTIA 电化学、10µm)，但整体系统完整性全面落后。唯一站得住脚的差异化是电化学+电生理双模能力。如果在一年内能证实这个能力在真实生物样本上有效，仍有自己的细分市场——但这是一个大写的"如果"。'),

    H2('3.6 BP 声称可信度分级'),
    new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
      hr(['BP 声称','可信度','理由']),
      dr(['电化学+电生理双模(CTIA)','中高','架构决定，需独立验证']),
      dr(['10µm 电极间距','中','光刻能做，但信号质量需验证']),
      dr(['130dB 动态范围','中','CTIA 理论上可达，需实测']),
      dr(['片上刺激','中','有较好，没提恢复时间']),
      dr(['噪声低于竞品(1.4 fA/√Hz)','低','fA/√Hz 与 µVrms 不可比']),
      dr(['通道数领先','低','1,024 < 3Brain 4,096']),
      dr(['国内唯一万级通量','低','Sony/MCS 已入华']),
      dr(['量产经验','极低','马标方向非 CMOS']),
      dr(['利润 10000%','极低','未经核算']),
      dr(['三年 610→1300→2500 万','极低','远超 8+年公司的实际收入']),
    ]}),
    ip('解读：10 条核心主张中仅 2-3 条可信度在"中"以上。关键数据（噪声、通道数、量产经验、收入预测）存在方法学问题或不可验证。这是比"信息缺失"更危险的信源失真问题。'),
    new PageBreak()];
}

// Chapter 4
function c4(){
  return[
    H1('第四章 综合判断与当面沟通建议'),

    H2('4.1 BP 核查'),
    new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
      hr(['#','BP 主张','核查结论','置信度']),
      dr(['1','24,576 电极/10µm/1,024 通道','参数合理，无测试报告/流片证明','低']),
      dr(['2','噪声 1.4 fA/√Hz / 130dB','需验证；CTIA 下合理但噪声不可比','中']),
      dr(['3','"国内唯一万级通量"','❌ Sony/MCS 已入华','高']),
      dr(['4','"端到端量产经验"','❌ 马标方向为柔性电子非 CMOS','高']),
      dr(['5','pA 模块"对标 MaxWell"','❌ MaxWell 不做电化学','高']),
      dr(['6','fA 源表"利润 10000%"','❌ 未经核算','高']),
      dr(['7','性能达商用/竞品','⚠️ MEA vs patch-clamp 品类不同','中']),
      dr(['8','"片上脑机接口"','✅ 概念正确，学术已验证','高']),
      dr(['9','获部长/诺奖调研','✅ 可验证，关注度良好','高']),
      dr(['10','"较大竞争优势"','❌ 对手全红码无法审核','低']),
      dr(['11','三年收入预测','❌ 远超 8+年公司实际收入','极低']),
    ]}),
    ip('解读：11 条中仅 2 条完全可验证、7 条存疑或错误。超过 60% 核心主张无法独立验证或存在明显问题——这已越过了"信息不足"的边界，进入"叙事可靠性存疑"范畴。'),

    H2('4.2-4.8 Deeptechnic 七维技术研判'),
    new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
      hr(['维度','评级','判断依据']),
      dr(['技术先进性',st(2),'CTIA 双模独有+10µm+130dB，但索尼改写基准；封装/软件空白']),
      dr(['技术成熟度',st(2),'TRL 3-4 vs TRL 9；无流片证据；核心成员方向错配']),
      dr(['系统完整性',st(2),'裸芯片为主；封装/多孔板/3D/软件均为空白']),
      dr(['可替代性',st(2),'电化学双模有壁垒，纯电生理可替代性极高']),
      dr(['知识产权',st(1),'零专利信息；FTO 风险极高']),
      dr(['团队胜任',st(2),'马标优秀但错配；赵超未知；结构和短板明显']),
      dr(['商业化',st(1)+' ⚠️','索尼入局改变格局；收入预测不可信；3000万仅够一次流片；神经MEA无FDA监管路径（vs心脏CiPA已获批）']),
      dr(['综合',st(2),'方向合理，执行存疑，竞争恶化。不建议当前推进'],true),
    ]}),
    ip('解读：综合评级⭐⭐中低。风险显著——最主要的结构性风险是索尼入局的不可逆性和团队竞争认知的严重不足。但技术方向本身（CTIA 双模 MEA）是有合理性的，如果团队能澄清赵超的身份和芯片实物状态，可以重新评估。'),

    H2('4.9 风险排序'),
    new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
      hr(['风险','等级','缓释路径']),
      dr(['索尼入局改写赛道','极高','需明确差异化定位(电化学双模/刺激/定制工艺)']),
      dr(['IC 设计能力存疑','极高','核查赵超背景/CTIA 来源/流片证明']),
      dr(['封装被严重低估','极高','3 个月内需明确封装方案和合作方']),
      dr(['竞争格局误判','极高','要求含 3Brain+Sony+国内的完整分析']),
      dr(['专利/IP 完全缺失','高','提供专利列表+FTO 分析']),
      dr(['无真实生物数据','高','要求 >3 次独立重复的记录数据']),
      dr(['团队角色缺失','中高','提供完整人员名单和招聘计划']),
      dr(['系统完整性不足','中高','要求系统级路线图(硬件+软件+耗材)']),
      dr(['软件栈空白','中','spike sorting/network 是竞品护城河']),
      dr(['收入预测失实','中','对标竞品做现实场景测算']),
    ]}),
    ip('解读：前四项中，只有 IC 设计能力可能通过面谈澄清，其余三项（赛道改变、封装遗漏、竞争认知）都是结构性的——即使面谈结果积极，也很难短期解决。'),

    H2('4.10 当面沟通质询'),
    H3('P0 组：项目真实性'),
    new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
      hr(['#','问题','为什么重要','问到了什么']),
      dr(['1','赵超是谁？什么背景？','署名第一人但零信息','若是 IC 设计师则报告需重写']),
      dr(['2','芯片在哪流片？流几次？展示照片和波形','确认是实物而非仿真','有流片=TRL上调；无流片=维持']),
      dr(['3','CTIA 自研还是买 IP？版图谁做的？','确认技术来源','买 IP 则壁垒降低但可接受']),
      dr(['4','封装方案？谁在做？','BP完全未覆盖的最大瓶颈','有方案则信心大增；没有则致命']),
      dr(['5','1,024 通道同时读还是分时？','24576/24=1024暗示分时','分时则实际读出能力降低']),
    ]}),
    H3('P1 组：技术参数'),
    new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
      hr(['#','问题','为什么重要']),
      dr(['6','有生物信号 demo 吗？','确认能真正记录神经信号']),
      dr(['7','PEDOT/Pt 自己还是外包？阻抗和稳定性？','确认生物兼容性方案']),
      dr(['8','刺激后放大器多久恢复？有消隐电路？','确认 STIM 是否可用']),
      dr(['9','数据处理软件栈？spike sorting 算法？','确认系统完整性——最大空白之一']),
      dr(['10','1.4 fA/√Hz 测试条件和重复性(≥3次)？','确认数据可信度']),
    ]}),
    H3('P2 组：商业化'),
    new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[
      hr(['#','问题','为什么重要']),
      dr(['11','注意到索尼入局？怎么理解格局？','最重要的问题之一']),
      dr(['12','瑞士对手是哪家？为什么没提 3Brain？','验证竞品分析完整性']),
      dr(['13','pA/fA 模块什么阶段？独立还是集成？','明确三芯片真实进度']),
      dr(['14','首批客户？有 LOI/意向书吗？','验证商业通路']),
      dr(['15','3000万一次流片失败，备份方案？','验证风控意识']),
    ]}),
    ip('解读：15 个问题的设计是漏斗式。P0(1-5)决定项目真伪——如果赵超不是 IC 设计师、芯片没流片、封装没方案，项目基本不成立。建议从 P0 开始，前 5 个中有 3 个以上否定/含糊时礼貌收尾，不必进入 P1/P2。'),

    H2('4.11 投资建议'),
    new Paragraph({children:[new TextRun({text:'不建议在当前信息状态下继续推进。',bold:true,color:R,size:24,font:'Microsoft YaHei'}),new TextRun({text:'但尚不构成彻底放弃——一次面谈可快速澄清两个最关键问题。',size:22,font:'Microsoft YaHei'})],spacing:{before:120,after:120}}),
    p('1. 赵超的身份——若是有流片经验的 CMOS 模拟 IC 设计师，团队评估需重写'),
    p('2. 芯片实物状态——若已成功流片并取得可用神经信号，成熟度评估需上调'),
    sp(),
    p('肯定答（有实质证据）：补充专利+FTO+竞品分析+系统路线图+客户LOI后重新评估。',{c:G}),
    p('否定答（无流片/无IC设计师/无封装）：建议直接终止。在三个结构性不利条件（索尼入局、封装空白、竞争认知不足）面前，单一优势（CTIA双模）不足以支撑高风险回报判断。',{c:R}),

    sp(400),
    new Paragraph({a:AlignmentType.CENTER,children:[new TextRun({text:'— 报告完 —',size:24,color:GY,font:'Microsoft YaHei'})]}),
    new Paragraph({a:AlignmentType.CENTER,children:[new TextRun({text:'本报告为初步技术研判(Pre-Screening)，不构成投资建议。评级基于公开信息和 BP，需面谈后修正。',size:18,color:GY,font:'Microsoft YaHei',italics:true})]}),
    new Paragraph({a:AlignmentType.CENTER,children:[new TextRun({text:'数据截止：2026-06-02 | Deeptechnic 技研助手 | 来源：BP + 竞品官网 + PubMed 28篇 OI 论文 + Cell Reports 2026 + Google Patents + 索尼新闻稿 + Sensirion 新闻稿',size:18,color:GY,font:'Microsoft YaHei',italics:true})]}),
  ];
}

async function main(){
  const doc=new Document({
    styles:{default:{document:{run:{font:'Microsoft YaHei',size:22},paragraph:{spacing:{after:100}}}}},
    sections:[{
      properties:{page:{margin:{top:1440,bottom:1440,left:1440,right:1440}}},
      headers:{default:new Header({children:[new Paragraph({a:AlignmentType.RIGHT,children:[new TextRun({text:'HDMEA 初评报告 v5 | 机密',size:16,color:'999999',font:'Microsoft YaHei'})]})]})},
      footers:{default:new Footer({children:[new Paragraph({a:AlignmentType.CENTER,children:[new TextRun({text:'第 ',size:16,color:'999999',font:'Microsoft YaHei'}),new TextRun({children:[PageNumber.CURRENT],size:16,color:'999999',font:'Microsoft YaHei'}),new TextRun({text:' 页',size:16,color:'999999',font:'Microsoft YaHei'})]})]})},
      children:[...cov(),...c1(),...c2(),...c3(),...c4()],
    }]
  });
  const buf=await Packer.toBuffer(doc);
  fs.writeFileSync('/Users/ackiles/Documents/AI-Space/专家/reports/2026-06-01-hdmea-7283/HDMEA技术研判初评报告.docx',buf);
  console.log('Generated:',(buf.length/1024).toFixed(1),'KB');
}
main().catch(console.error);
