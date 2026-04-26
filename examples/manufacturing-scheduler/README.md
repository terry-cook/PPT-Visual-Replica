# 智能制造调度黄金示例

[English README](README.en.md)

本示例归档了一次完整的 `ppt-visual-replica` 运行，用于将一张中文智能制造多机器人协同调度架构图重绘为可编辑 PowerPoint。

这是一次 Pass@1 的结果；为便于理解和复用，只对生成文件的路径做了归档重整。

## 调用提示词

```text
使用PPT REPLICA SKILL重新绘制本地图，使用IMAGE GEN提取透明素材，不要自己画矢量图，保持最小语义可编辑
```

## 已归档的生成素材提示词记录

生成素材提示词记录见 `imagegen/prompts/`。

| 文件 | 提示词 |
| --- | --- |
| `assets_cycle_1.jsonl` | `3x4 grid: AMR, robot arm, AGV, server, database, digital twin screen, clipboard, brain scheduler, alarm, energy leaves and battery, route pins, KPI dashboard; flat #00ff00 chroma-key; no text.` |
| `assets_cycle_2.jsonl` | `4x4 grid: sensing/status/environment/factory/chip/output/task/resource/energy/constraint/anomaly/collaboration/status/resource pool/device pool/dispatch icons; flat #00ff00 chroma-key; no text.` |
| `assets_cycle_3.jsonl` | `2x3 grid: KPI mini chart icons and blank KPI card; flat #00ff00 chroma-key; no text or numbers.` |
| `assets_cycle_4.jsonl` | `1x2 grid: green energy leaf battery and green energy-down KPI chart; flat #ff00ff chroma-key; no text or numbers.` |
| `scene_background.jsonl` | `Wide pale intelligent manufacturing workshop background, no foreground semantic objects, no text, suitable for overlay.` |

## 真实中间结果

| 阶段 | 文件 | 说明 |
| --- | --- | --- |
| 参考图 | `reference/reference.png` | 原始扁平参考图，尺寸 1672x941。 |
| 素材提示词记录 | `imagegen/prompts/` | 保存了四组素材网格提示词和一组背景提示词。 |
| 生成素材网格 | `imagegen/generated/` | 四张生成素材网格和对应 cut manifest。 |
| 透明素材 | `imagegen/transparent-assets/` | 36 个透明 PNG 语义素材。 |
| 参考裁剪 | `audit/reference_crops/` | 36 个参考裁剪文件。 |
| 覆盖后的残差/丢失图 | `audit/residual_cycle_1.png` | 覆盖已匹配语义素材锚点后的 residual 图。 |
| 红框定位 | `audit/residual_cycle_1_redboxes.json` | 语义素材锚点的 JSON 坐标记录。 |
| 素材匹配 | `audit/asset_match_cycle_1.json` | 素材锚点和已分配 PNG 文件记录。 |
| 联系表 | `audit/asset_contact_sheet.png` | 透明素材联系表。 |
| 最终 PPT | `output/replica.pptx` | 可编辑 PowerPoint 复刻结果。 |
| 预览图 | `output/preview.png` | 脚本渲染的预览图。 |
| 验证报告 | `output/validation_report.json` | 验证项和已知限制。 |

## 结果预览

![智能制造调度预览](output/preview.png)

## 生成来源图

![生成素材网格 1](imagegen/generated/assets_cycle_1_grid.png)

![生成素材网格 2](imagegen/generated/assets_cycle_2_grid.png)

![生成素材网格 3](imagegen/generated/assets_cycle_3_grid.png)

![生成素材网格 4](imagegen/generated/assets_cycle_4_grid.png)

## 残差/丢失图

![覆盖后的残差图](audit/residual_cycle_1.png)

## 红框定位

以下坐标直接来自 `audit/residual_cycle_1_redboxes.json`，格式为 `[x, y, width, height]`。

| # | semantic_unit_id | bbox |
| --- | --- | --- |
| 1 | `scene_layer_icon` | `[36, 176, 62, 62]` |
| 2 | `sensor_icon` | `[263, 140, 45, 42]` |
| 3 | `status_icon` | `[367, 141, 48, 42]` |
| 4 | `environment_icon` | `[468, 140, 50, 42]` |
| 5 | `amr_1` | `[165, 246, 126, 74]` |
| 6 | `robot_arm_1` | `[360, 219, 134, 94]` |
| 7 | `amr_2` | `[618, 247, 126, 74]` |
| 8 | `agv_1` | `[760, 250, 134, 73]` |
| 9 | `robot_arm_2` | `[980, 218, 134, 94]` |
| 10 | `server_1` | `[1128, 190, 88, 126]` |
| 11 | `database_1` | `[1250, 206, 93, 112]` |
| 12 | `twin_screen_1` | `[1358, 159, 248, 153]` |
| 13 | `algorithm_layer_icon` | `[36, 500, 64, 64]` |
| 14 | `order_clipboard` | `[223, 492, 72, 86]` |
| 15 | `task_assign_icon` | `[507, 441, 36, 36]` |
| 16 | `resource_icon` | `[506, 519, 38, 38]` |
| 17 | `energy_icon` | `[506, 592, 38, 38]` |
| 18 | `constraint_icon` | `[706, 434, 32, 32]` |
| 19 | `brain_scheduler_icon` | `[801, 496, 78, 65]` |
| 20 | `policy_update_icon` | `[742, 614, 32, 32]` |
| 21 | `anomaly_icon` | `[1045, 443, 44, 36]` |
| 22 | `collab_icon` | `[1046, 512, 44, 42]` |
| 23 | `status_eval_icon` | `[1046, 591, 44, 42]` |
| 24 | `resource_pool_group_icon` | `[1306, 492, 126, 40]` |
| 25 | `device_pool_group_icon` | `[1306, 574, 126, 44]` |
| 26 | `output_layer_icon` | `[36, 788, 62, 62]` |
| 27 | `decision_graph_icon` | `[184, 782, 114, 60]` |
| 28 | `execution_doc_icon` | `[407, 791, 58, 70]` |
| 29 | `route_icon` | `[560, 790, 96, 63]` |
| 30 | `alarm_output_icon` | `[738, 788, 78, 62]` |
| 31 | `energy_output_icon` | `[884, 788, 80, 65]` |
| 32 | `kpi_bar_completion` | `[1026, 820, 78, 42]` |
| 33 | `kpi_bar_utilization` | `[1140, 820, 78, 42]` |
| 34 | `kpi_line_response` | `[1261, 820, 78, 42]` |
| 35 | `kpi_line_energy` | `[1375, 820, 78, 42]` |
| 36 | `kpi_line_anomaly` | `[1489, 820, 78, 42]` |

## 已知限制

验证报告记录脚本预览用于视觉检查，没有使用 PowerPoint/LibreOffice 做渲染一致性校验。生成图标匹配的是语义角色和整体配色，不追求像素级一致。

