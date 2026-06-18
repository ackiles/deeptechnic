# Learnings

技术研判助手持续改进记录

**Categories**: rule | process_optimization | knowledge_gap | best_practice

---

## [LRN-20260513-001] 分域隔离规则

**Logged**: 2026-05-13T15:06:49+08:00
**Priority**: critical
**Status**: promoted
**Area**: config

### Summary
本对话仅用于系统与流程优化，不做具体项目评判。每个项目在独立对话中进行，绝不跨对话引用上下文。

### Details
用户明确要求：1) 系统优化对话不讨论具体项目；2) 每个项目独立对话，新对话即新项目的白纸；3) 流程规则跨项目通用，不因具体项目修改。已写入 01-deeptechnic-definition.md → 四、对话规则（硬约束）。

### Promotion
- Promoted to: 01-deeptechnic-definition.md Section 4
- See Also: LRN-20260513-002

---
## [LRN-20260513-002] 信源缺口提醒规则

**Logged**: 2026-05-13T15:07:04+08:00
**Priority**: medium
**Status**: promoted
**Area**: config

### Summary
在项目尽调过程中发现关键信息缺失可能影响最终意见时，以简短摘要提示即可；用户要求再出详细建议。

### Details
不要作为强规则主动输出冗长清单。发现了类似问题时，在交流过程中做简短摘要提醒，用户要求"提出详细建议"时再输出全部问题。

### Promotion
- Promoted to: 01-deeptechnic-definition.md Section 4, Rule 4
- See Also: LRN-20260513-001

---
## [LRN-20260513-003] 初评聚焦约束——两问原则

**Logged**: 2026-05-13T15:46:20+08:00
**Priority**: high
**Status**: promoted
**Area**: process_optimization

### Summary
第一轮初评的核心目标只有两个：技术是否真正先进可行、团队是否真有能力做出来。商业前景/市场规模/供应链在初评阶段降低权重。

### Details
用户强调初评最关键的是技术方面是否有先进性、是否可行，团队是否真有能力做。已写入 02-workflow-rules.md 2.1.2 作为初评聚焦约束。技术研判9个维度围绕这两问组织。

### Promotion
- Promoted to: 02-workflow-rules.md Section 2.1.2

---
## [LRN-20260513-004] 项目评估思维导图嵌入

**Logged**: 2026-05-13T17:02:50+08:00
**Priority**: high
**Status**: promoted
**Area**: process_optimization

### Summary
团队已形成的项目评估思维导图（项目评估思维导图.md）作为评判标尺嵌入流程规则。技术先进性/可行性/适配性三个子维度参照思维导图评判；第一轮提问增加"红旗信号检测"；专家访谈增加"项目类型判定"；第四轮按项目分型给出差异化结论。

### Details
思维导图将项目分为"新技术新市场"和"存量替代场景"两类，每类有技术、市场、团队、商业模式、战略政策、风险规避六个维度的评判标准。还有一份"需规避的项目类型"清单作为红旗信号检测。

### Promotion
- Promoted to: 02-workflow-rules.md (多处嵌入)

---
## [LRN-20260514-001] 教授任CEO不是绝对红线

**Logged**: 2026-05-14T10:27:18+08:00
**Priority**: medium
**Status**: promoted
**Area**: process_optimization

### Summary
教授任CEO需判断其是否有创业经历和产业化思维，有则加分，纯学术无商业经验才视为高风险。不是一刀切规避。

### Details
修改了项目评估思维导图.md中"需规避的项目类型→团队层面"的描述，从"高校团队缺商业化人才（教授任CEO）"改为条件判断。

### Promotion
- Promoted to: 项目评估思维导图.md

---
## [LRN-20260514-002] 用户提问需即时凝炼为关注点逻辑

**Logged**: 2026-05-14T10:27:18+08:00
**Priority**: high
**Status**: pending
**Area**: process_optimization

### Summary
在初评和以后所有交流中，用户向技术研判助手提出的每一个问题，都需要进行分析、记录，即时凝炼为用户对项目关注点的核心逻辑。

### Details
这意味着：用户问什么→为什么这么问→这反映了什么判断倾向→需要补充什么信息。这些需要作为项目对话中的持续输出，而非一次性响应。

### Suggested Action
写入 01-deeptechnic-definition.md 对话规则，增加第5条。

---

## [LRN-20260514-003] 团队反馈分析需刷新整体判断而非逐题批改

**Logged**: 2026-05-14T15:09:34+08:00
**Priority**: high
**Status**: promoted
**Area**: process_optimization

### Summary
收到团队反馈后，技术研判助手不能仅仅逐个检查自己提的问题有没有回答，而是要带着新信息重新审视项目的大逻辑和技术的整体判断。

### Details
核心原则：团队反馈不是"交作业批改"，而是刷新整个项目认知模型的新信息输入。分析分三步：逐题验证（基础层）→ 认知刷新（核心层，重新评估技术先进性/可行性/团队能力的整体判断）→ 生成第二轮验证需求。

### Promotion
- Promoted to: 02-workflow-rules.md Section 2.2.1

---

## [LRN-20260515-001] 项目上下文需写入本地文件结构化管理

**Logged**: 2026-05-15T13:49:47+08:00
**Priority**: critical
**Status**: promoted
**Area**: process_optimization

### Summary
每个项目对话经历多轮沟通，会产生大量关键信息。不能仅依赖对话上下文（有长度限制，重启后丢失），必须持续写入本地文件进行结构化管理。

### Details
每个项目在 projects/&lt;项目名称&gt;/ 下建立独立上下文文件夹，按尽调轮次生成文件（轮次1-初步评估.md、轮次1-向团队提问清单.md、轮次2-团队反馈分析.md、轮次2-专家访谈提纲.md、轮次3-访谈记录汇编.md、轮次3-交叉验证.md、轮次4-综合尽调意见.md），并持续维护用户关注点记录.md。每轮输出后必须更新对应文件。跨轮次迭代时追加写入或标注修正。写入 02-workflow-rules.md 第六章。

### Promotion
- Promoted to: 02-workflow-rules.md Section 6

---

## [LRN-20260521-001] 技术研判助手是流程驱动者与记录器，具体评估需调用专业工具

**Logged**: 2026-05-21T11:17:48+08:00
**Priority**: critical
**Status**: promoted
**Area**: process_optimization

### Summary
技术研判助手的主要角色是流程驱动者、记录器与凝练者——记录多方评价、不断迭代凝练、提出风险问题和尽调建议，是一个工作留痕工具。每个阶段做具体评估时，必须调用 **sn-deep-research**（核心，利用其编排器方法论：规划→分维度取证→综合→成稿的完整链路）、**scholarclaw**、**technology-news-search** 等专业工具执行分析，而非仅凭自身知识库。注意：是 `sn-deep-research`（深度研究编排器）而不是 `deep-research`，不要混淆。

### Details
角色定位四层：流程驱动者（定流程、引导推进）、记录器（结构化记录多方评价）、凝练与迭代者（更新结论、提炼风险）、工具调度者（识别需求、调用工具）。sn-deep-research 是核心研究编排工具，提供 request.md→plan.json→sub_reports→synthesis.md→report.md 的完整研究链路，其方法论可根据需要调整优化。已写入 02-workflow-rules.md Sections 2.1-2.2。

### Promotion
- Promoted to: 02-workflow-rules.md Section 2（角色定位与工具调用架构）

---

## [LRN-20260522-001] 新项目对话必须绑定流程规则 + sn-deep-research 执行模式

**Logged**: 2026-05-22T14:00:55+08:00
**Priority**: critical
**Status**: promoted
**Area**: process_optimization

### Summary
用户在任何新项目对话中要求技术研判助手做分析时，标准模式是：遵循 02-workflow-rules.md 的流程规则 + 调用 sn-deep-research 等 skill 执行具体分析。这是一个绑定规则，不是可选项。

### Details
技术研判助手（Deeptechnic）在每一个项目对话中，收到分析需求后必须按以下方式工作：
1. 遵循 02-workflow-rules.md 所定义的四轮迭代流程（包括初评聚焦、团队反馈认知刷新、信源缺口提醒、项目上下文文件管理等）
2. 具体分析执行时，调用 sn-deep-research（编排器，提供 request.md→plan.json→sub_reports→synthesis.md→report.md 的完整研究链路）及其他 skill（scholarclaw、technology-news-search 等）
3. 研判助手负责流程驱动、记录凝练、风险提炼；sn-deep-research 负责系统化研究取证

### Promotion
- Promoted to: 02-workflow-rules.md Section 2（角色定位与工具调用架构）

---

## [LRN-20260522-002] 信息收集工具分职责确认

**Logged**: 2026-05-22T14:03:27+08:00
**Priority**: high
**Status**: promoted
**Area**: process_optimization

### Summary
工具分工明确：学术资料（论文、SOTA）→ scholarclaw；产业技术新闻（行业动态、竞品、政策）→ technology-news-search；系统化深度研究编排 → sn-deep-research。

### Details
三者不混用。scholarclaw 负责学术论文/ArXiv/PubMed/PapersWithCode 信源；technology-news-search 负责技术博客/IT媒体/行业新闻信源；sn-deep-research 作为编排器调用各子 skill 完成全链路深度研究。已写入 02-workflow-rules.md。

### Promotion
- Promoted to: 02-workflow-rules.md Section 2.2 工具调用原则

---

## [LRN-20260522-003] 任何阶段报告不得只是BP汇总，必须独立分析技术/产业链/市场逻辑

**Logged**: 2026-05-22T14:16:06+08:00
**Priority**: critical
**Status**: promoted
**Area**: process_optimization

### Summary
任何阶段的输出（初步评估、提问清单、反馈分析、尽调报告等），都不能是BP的汇总综述。必须调用一切可用工具去独立分析技术逻辑、产业链逻辑、市场逻辑，形成自己的判断，而不是转述团队的说法。

### Details
核心原则：BP是"被调查对象的陈述"，不是"事实"。技术研判助手在每个阶段的输出，必须体现独立分析的过程和结论：
- 技术逻辑：不写"团队说他们的指标领先"，而要写"通过 scholarclaw 检索XX领域论文，对比发现…"
- 产业链逻辑：不写"团队说成本可以降低50%"，而要写"通过 technology-news-search 了解上游供应情况…"
- 市场逻辑：不写"团队说市场空间100亿"，而要写"通过 sn-deep-research 系统调研行业报告…"
- 团队能力：不写"团队有多年经验"，而要写"公开信息核验发现…"
所有判断必须有工具调用取证的过程，而非转述团队说法。

### Promotion
- Promoted to: 02-workflow-rules.md Section 2.1（角色定位）和 Section 5（系统工作原则）

---

## [LRN-20260525-001] 论文检索强制使用 scholarclaw，禁止用 web_fetch

**Logged**: 2026-05-25T13:38:04+08:00
**Priority**: high
**Status**: promoted
**Area**: process_optimization

### Summary
搜索学术论文、SOTA榜单、引用分析等学术资料时，必须使用 scholarclaw skill，不能使用 web_fetch 替代。

### Details
这是对 LRN-20260522-002 的强化。scholarclaw 对接 arXiv/PubMed/PapersWithCode 等专业学术信源，检索质量远超通用 web_fetch。各轮次中需要论文检索时必须调 scholarclaw。

### Promotion
- Promoted to: 02-workflow-rules.md Section 2.2 工具调用原则

---

## [LRN-20260525-002] scholarclaw 网络不可达时的降级策略

**Logged**: 2026-05-25T13:40:05+08:00
**Priority**: medium
**Status**: promoted
**Area**: process_optimization

### Summary
如果 scholarclaw 因网络原因（如 Google Scholar 被墙）检索不到所需论文，采用其他方法替代搜索，如 web_fetch 直接抓取 arXiv/pubmed 等页面。

### Details
优先使用 scholarclaw。网络不可达时降级：用 web_fetch 直接访问 arXiv、PubMed、Semantic Scholar 等学术信源的公开页面。不因为工具不可用就放弃论文检索。

### Promotion
- Promoted to: 02-workflow-rules.md Section 2.2 工具调用原则

---

## [LRN-20260527-001] 新项目对话必须执行启动检查清单后才开始分析

**Logged**: 2026-05-27T10:36:24+08:00
**Priority**: critical
**Status**: promoted
**Area**: process_optimization

### Summary
用户反馈多次新项目对话中，我未使用指定的 sn-deep-research、scholarclaw、technology-news-search 等 skill，而是用了通用网页搜索。根因是新对话缺少强制启动协议。

### Root Cause
规则虽已写入 02-workflow-rules.md，但新对话启动时没有硬性约束要求我"先加载流程规则再分析"。持续改进机制只要求读取 LEARNINGS.md，没有明确要求读取 02-workflow-rules.md 的 Section 2（工具调用架构）。

### Fix
在 01-deeptechnic-definition.md 中新增 **Section 3：启动协议（强制）**，包含四步检查清单：
1. 加载流程规则（02-workflow-rules.md Section 2-3）
2. 加载学习记录（LEARNINGS.md promoted 条目）
3. 初始化项目上下文（创建 projects/<项目名>/ 文件夹）
4. 确认分析方式——学术→scholarclaw，产业→technology-news-search，深度研究→sn-deep-research。有专用 skill 时必须优先使用，但 web-search 仍可用于团队背景核查、公司信息查询等通用场景，不是禁用

### Promotion
- Promoted to: 01-deeptechnic-definition.md Section 3（启动协议）

---

## [LRN-20260527-002] 评估报告正文第一页必须是概述页

**Logged**: 2026-05-27T10:52:02+08:00
**Priority**: high
**Status**: promoted
**Area**: process_optimization

### Summary
所有评估报告正文的第一页必须是概述页，将核心问题和核心结论直接列出，而不是让读者翻完整篇才看到结论。

### Details
概述页包含：项目核心定位（一句话）、关键发现列表（3-5条，标注是正面还是风险）、核心结论（投资建议及原因概要）。受众可以在第一页就快速掌握全篇要点。已写入 02-workflow-rules.md 3.4.1。

### Promotion
- Promoted to: 02-workflow-rules.md Section 3.4.1

---

## [LRN-20260601-001] web-search 不是禁用，而是优先级管理

**Logged**: 2026-06-01T16:15:37+08:00
**Priority**: high
**Status**: promoted
**Area**: process_optimization

### Summary
web-search 是有效的通用搜索工具，没有被禁用。原则是优先级管理：有专用 skill 时优先用专用 skill，但 web-search 仍可用于团队背景核查、公司信息查询、专利检索等通用场景。

### Details
启动协议第四条从"不得以通用网页搜索替代专用 skill"修正为更准确的表述。修正后：有专用 skill 的先调专用 skill（学术→scholarclaw，产业新闻→technology-news-search，系统化深度研究→sn-deep-research），仅靠 web-search 做这些领域的深度分析是不对的；但 web-search 本身没有被禁用，在通用场景下可以正常使用。

### Promotion
- Promoted to: 01-deeptechnic-definition.md Section 3.1 第四步

---

## [LRN-20260601-002] web-search 是技术研判的首选搜索技能

**Logged**: 2026-06-01T16:18:08+08:00
**Priority**: high
**Status**: promoted
**Area**: process_optimization

### Summary
web-search（Google/Bing 搜索结果检索）是技术研判中第一优先级的搜索技能。opencli 作为浏览器操控工具，适合特定网站深度交互的补充场景，不作为日常搜索的首选。

### Details
对比分析：web-search 专为搜索引擎结果检索设计，简单可靠，适合 80% 以上的信息收集需求（公司背景、团队履历、技术资料、行业新闻等）。opencli 是通用浏览器操控框架，适合登录后操作、特定页面数据提取等深度场景，但复杂度高、当前机器未安装，不适合作为日常搜索主力。两者在技术研判中的角色：web-search 为"搜索发现"，opencli 为"深度交互补充"。

### Promotion
- Promoted to: 01-deeptechnic-definition.md Section 3.1 第四步

---

---

## [LRN-20260601-003] 初评报告质量检查清单 + Claim逐项验证方法论

**Logged**: 2026-06-01T23:58:00+08:00
**Priority**: critical
**Status**: promoted
**Area**: process_optimization

### Summary
对四份既有初评报告（脉冲红外、Micro-OLED、低空巡航无人机、普瑞达AI）进行质量对比分析，发现脉冲红外报告质量远超其他三份。根因在于：脉冲红外报告对所有核心技术claim做了独立的物理定量验证（公式+数值计算），而其他报告仅做了定性描述。

### Root Cause Analysis

**脉冲红外报告优秀的特质（已编码为可重复方法论）：**
1. **核心claim逐项独立验证** — 每个关键性能指标都有对应物理公式、代入实际数字做反向计算（NETD公式、读出速率计算），而非泛泛说"可能有问题"
2. **工程迁移鸿沟分析** — 明确列出从"原理验证"到"工程产品"需要跨越的每个技术环节（ROIC重新设计、混合集成、低温工作环境），每个环节给出具体难点
3. **逐人团队评估** — 不是笼统说"团队不行"，而是逐人列出姓名/title/背景，逐一匹配判断，找出"无一人有ROIC/斯特林制冷机经验"的精确结论
4. **具体到供应商级别的供应链分析** — 逐家分析具体供应商（高德、睿创、安徽光智、拓感）的能力和定位
5. **独立竞品调查** — 主动发现BP遗漏了曹汛光谱相机方案，体现了真正的独立判断
6. **评分有细粒度** — 4.5/5、2.5/5 带小数评分精确反映判断置信度
7. **P0/P1优先级区分** — 待验证问题按致命程度分级

**其他报告质量不稳定的根因：**
1. 缺少"对每个技术claim做独立物理验证"的强制检查项
2. 工程迁移鸿沟分析缺失或过于粗略
3. 团队评估偏笼统，未逐人匹配
4. 竞品分析范围窄，未主动发现BP遗漏
5. 信息缺口警示力度不足

### Fix
更新 02-workflow-rules.md v3.0：
1. 3.1.2 技术研判维度重构——新增"核心claim逐项独立验证"为第一优先级（★关键步骤），含物理公式、数值计算、判断标志
2. 3.1.2 新增"工程迁移鸿沟分析"、"逐人能力匹配度分析"为★关键步骤
3. 3.1.3 输出A重构——新增概述页（claim判断表）、供应商级别分析、P0/P1优先级
4. 3.1.4 新增10项质量检查清单，每次初评报告输出前必须逐项自查通过

### Promotion
- Promoted to: 02-workflow-rules.md Sections 3.1.2 - 3.1.4

---

## [LRN-20260602-001] 同轮次内报告迭代：问答信息必须融入更新报告

**Logged**: 2026-06-02T14:48:00+08:00
**Priority**: high
**Status**: promoted
**Area**: process_optimization

### Summary
用户指出：在技术尽调同轮次迭代中，用户提问→我回答→用户要求修改报告，生成的更新报告不能只重述原始结论，必须把问答过程中暴露的所有重要细节、分析逻辑融入报告，并附修改逻辑说明。

### Root Cause
之前的流程规则只定义了跨轮次迭代（第一轮→第二轮→第三轮），但未定义"同轮次内"的报告迭代规范。同轮次内用户可能在对话中问多个问题、获得多个回答，然后要求整合输出新版本报告。如果没有强制约束，新的报告版本可能忽略问答环节产生的关键信息。

### Fix
更新 02-workflow-rules.md v3.1：
1. Section 5 新增系统工作原则第6条「报告迭代问答信息融合」
2. Section 4 新增 4.2 节「同轮次内报告迭代规范」，包含三个强制步骤：回溯问答链条→信息融合→编写修改逻辑说明
3. 修改逻辑说明的标准化格式（修改位置/修改类型/修改内容/修改原因/新信息源）

### Promotion
- Promoted to: 02-workflow-rules.md Section 4.2 + Section 5 Rule 6
