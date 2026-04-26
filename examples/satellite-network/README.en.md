# Satellite Network Golden Example

[中文说明](README.md)

This example archives a complete `ppt-visual-replica` run for a Chinese research architecture infographic about heterogeneous satellite-network multi-agent offloading and resource scheduling.

This is a Pass@1 result. The generated file paths were reorganized only to make the artifact bundle easier to understand and reuse.

## Invocation Prompt

```text
使用PPT REPLICA SKILL重新绘制本地图，使用IMAGE GEN提取透明素材，不要自己画矢量图，保持最小语义可编辑
```

## Archived Asset-Generation Prompt Record

The asset-generation prompt record is available at `imagegen/prompts/assets_cycle_1.jsonl` and contains:

| Field | Archived value |
| --- | --- |
| cycle | `1` |
| prompt_summary | `Generated 18 isolated infographic icons on #00ff00 chroma-key background using the reference slide for style and identity.` |
| grid | `3x6, margin 80 px, gap 48 px, no text` |
| objects_in_order | `satellite_node`, `ground_station`, `database_stack`, `bar_chart`, `line_pie_chart`, `network_graph`, `shield_check`, `robot_agent`, `server_rack`, `document_check`, `monitor_dashboard`, `target`, `circular_arrows`, `wireless_status`, `collaboration_group`, `brain_head`, `server_gear`, `task_cube` |

## Real Intermediate Artifacts

| Stage | File | Notes |
| --- | --- | --- |
| Reference | `reference/reference.png` | Flat source image. |
| Asset prompt record | `imagegen/prompts/assets_cycle_1.jsonl` | Preserved prompt summary, grid rule, and object order. |
| Generated icon grid | `imagegen/generated/imagegen_asset_grid_cycle_1.png` | Source grid for 18 generated semantic icon assets. |
| Generated background | `imagegen/generated/imagegen_space_background.png` | Source generated space/Earth background. |
| Transparent assets | `imagegen/transparent-assets/` | 23 PNG files cut/chroma-keyed from generated sources, including color variants and background crop. |
| Initial residual | `audit/residual_cycle_0.png` | Initial residual image. |
| Residual after coverage | `audit/residual_cycle_1.png` | Residual image after matched semantic asset slots were covered. |
| Red-box locations | `audit/residual_cycle_1_redboxes.json` | JSON coordinates for semantic visual anchors. |
| Asset matching | `audit/asset_match_cycle_1.json` | Grid source, cut rule, and matched asset IDs. |
| Final PPTX | `output/replica.pptx` | Editable PowerPoint replica. |
| PowerPoint preview | `output/preview.png` | Exported from PowerPoint. |
| Validation | `output/validation_report.json` | Validation report and known limits. |

## Preview

![PowerPoint preview](output/preview.png)

## Generated Sources

![Generated icon grid](imagegen/generated/imagegen_asset_grid_cycle_1.png)

![Generated space background](imagegen/generated/imagegen_space_background.png)

## Residual Images

Initial residual:

![Initial residual](audit/residual_cycle_0.png)

Residual after coverage:

![Residual after coverage](audit/residual_cycle_1.png)

## Red-Box Locations

These coordinates are copied from `audit/residual_cycle_1_redboxes.json`.

| # | semantic_unit_id | bbox_px |
| --- | --- | --- |
| 1 | `satellite_node` | `[292, 664, 350, 720]` |
| 2 | `ground_station` | `[215, 215, 260, 255]` |
| 3 | `database_stack` | `[420, 340, 470, 390]` |
| 4 | `bar_chart` | `[1015, 722, 1080, 770]` |
| 5 | `line_pie_chart` | `[605, 335, 720, 390]` |
| 6 | `network_graph` | `[835, 345, 968, 390]` |
| 7 | `shield_check` | `[1425, 350, 1470, 395]` |
| 8 | `robot_agent` | `[710, 505, 750, 552]` |
| 9 | `server_rack` | `[363, 508, 390, 558]` |
| 10 | `document_check` | `[1225, 492, 1272, 536]` |
| 11 | `monitor_dashboard` | `[1320, 655, 1510, 775]` |
| 12 | `target` | `[182, 842, 244, 905]` |
| 13 | `circular_arrows` | `[1296, 858, 1338, 898]` |
| 14 | `wireless_status` | `[365, 555, 395, 588]` |
| 15 | `collaboration_group` | `[85, 560, 170, 612]` |
| 16 | `brain_head` | `[316, 858, 355, 896]` |
| 17 | `server_gear` | `[965, 858, 1010, 896]` |
| 18 | `task_cube` | `[384, 214, 404, 234]` |

## Known Limit

Generated icons match the semantic role and visual palette of the reference, but they are not intended to be pixel-identical copies of the original glyphs. The final PPT keeps text, layout structure, and semantic assets at the minimum editable granularity.
