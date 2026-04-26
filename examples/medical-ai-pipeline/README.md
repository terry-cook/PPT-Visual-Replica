# 医学 AI 流程黄金示例

[English README](README.en.md)

本示例归档了一次完整的 `ppt-visual-replica` 运行，用于将一张中文多模态医学 AI 辅助诊疗流程图重绘为可编辑 PowerPoint。

这是一次 Pass@1 的结果；为便于理解和复用，只对生成文件的路径做了归档重整。

## 调用提示词

```text
使用PPT REPLICA SKILL重新绘制本地图，使用IMAGE GEN提取透明素材，不要自己画矢量图，保持最小语义可编辑
```

## 已归档的生成素材提示词记录

生成素材提示词记录见 `imagegen/prompts/assets_cycle_1.jsonl`，内容如下：

| 类型 | 提示词 |
| --- | --- |
| `main_visual_grid` | `Create isolated chroma-key asset grid for database, CT, pathology, EMR, lab panel, brain, knowledge graph, encoder cube, risk gauge, ROC, risk scale, heatmap, feature bars, cross, diagnosis panel, follow-up panel, workstation, quality panel.` |
| `small_icon_grid` | `Create isolated chroma-key icon grid for CT, microscope, EMR, lab flask, feature cube, pathology, document, flask, diagnosis, calendar, workstation, quality shield icons.` |

## 真实中间结果

| 阶段 | 文件 | 说明 |
| --- | --- | --- |
| 参考图 | `reference/reference.png` | 原始扁平参考图，尺寸 1672x941。 |
| 素材提示词记录 | `imagegen/prompts/assets_cycle_1.jsonl` | 保存了两组生成素材提示词。 |
| 生成素材网格 | `imagegen/generated/asset_grid_cycle_1.png` | 大型语义视觉元素的生成网格。 |
| 生成小图标网格 | `imagegen/generated/icon_grid_cycle_1.png` | 小型语义图标的生成网格。 |
| 透明素材 | `imagegen/transparent-assets/` | 30 个透明 PNG 语义素材。 |
| 参考裁剪 | `audit/reference_crops/` | 31 个参考裁剪文件和 manifest。 |
| 覆盖后的残差/丢失图 | `audit/residual_cycle_1.png` | 覆盖已匹配语义素材锚点后的 residual 图。 |
| 红框定位 | `audit/residual_cycle_1_redboxes.json` | 语义素材锚点的 JSON 坐标记录。 |
| 素材匹配 | `audit/asset_match_cycle_1.json` | 素材锚点和已分配 PNG 文件记录。 |
| 联系表 | `audit/asset_contact_sheet.png` | 透明素材联系表。 |
| 最终 PPT | `output/replica.pptx` | 可编辑 PowerPoint 复刻结果。 |
| 预览图 | `output/preview.png` | 脚本渲染的预览图。 |
| 验证报告 | `output/validation_report.json` | 验证项和已知限制。 |

## 结果预览

![医学 AI 流程预览](output/preview.png)

## 生成来源图

![大型素材生成网格](imagegen/generated/asset_grid_cycle_1.png)

![小图标生成网格](imagegen/generated/icon_grid_cycle_1.png)

## 残差/丢失图

![覆盖后的残差图](audit/residual_cycle_1.png)

## 红框定位

以下坐标直接来自 `audit/residual_cycle_1_redboxes.json`，格式为 `[x, y, width, height]`。

| # | semantic_unit_id | bbox |
| --- | --- | --- |
| 1 | `database_orbit` | `[42, 174, 176, 128]` |
| 2 | `icon_ct_magnifier` | `[300, 124, 50, 44]` |
| 3 | `ct_scan_screen` | `[275, 170, 260, 120]` |
| 4 | `icon_microscope_header` | `[608, 122, 46, 48]` |
| 5 | `pathology_slide` | `[579, 169, 262, 122]` |
| 6 | `icon_emr_clipboard` | `[939, 122, 48, 48]` |
| 7 | `emr_panel` | `[888, 168, 318, 124]` |
| 8 | `icon_lab_flask_green` | `[1300, 122, 52, 48]` |
| 9 | `lab_panel` | `[1252, 168, 356, 125]` |
| 10 | `brain_network` | `[52, 438, 170, 150]` |
| 11 | `knowledge_graph` | `[252, 397, 232, 184]` |
| 12 | `encoder_cube` | `[536, 407, 332, 150]` |
| 13 | `icon_cube_feature` | `[548, 565, 43, 43]` |
| 14 | `icon_microscope_feature` | `[625, 565, 43, 43]` |
| 15 | `icon_document_feature` | `[700, 565, 43, 43]` |
| 16 | `icon_flask_feature` | `[774, 565, 43, 43]` |
| 17 | `risk_gauge` | `[946, 412, 186, 125]` |
| 18 | `roc_curve` | `[944, 516, 170, 106]` |
| 19 | `risk_scale` | `[1127, 554, 132, 38]` |
| 20 | `explainability_heatmap` | `[1365, 421, 180, 84]` |
| 21 | `feature_bars` | `[1362, 536, 212, 85]` |
| 22 | `medical_cross` | `[56, 739, 150, 132]` |
| 23 | `icon_diagnosis_clipboard` | `[254, 682, 38, 38]` |
| 24 | `diagnosis_panel` | `[237, 720, 244, 168]` |
| 25 | `icon_calendar` | `[566, 682, 42, 38]` |
| 26 | `followup_panel` | `[504, 722, 332, 150]` |
| 27 | `icon_workstation_monitor` | `[897, 682, 50, 38]` |
| 28 | `doctor_workstation` | `[862, 710, 350, 178]` |
| 29 | `icon_quality_shield` | `[1265, 682, 44, 42]` |
| 30 | `quality_panel` | `[1240, 718, 370, 170]` |

## 已知限制

验证报告记录的是包级 OpenXML/media 检查和脚本预览检查，没有启动桌面 PowerPoint 做渲染校验。生成图标匹配的是语义角色和整体配色，不追求像素级一致。

