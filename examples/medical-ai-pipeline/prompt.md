# 调用提示词

```text
使用PPT REPLICA SKILL重新绘制本地图，使用IMAGE GEN提取透明素材，不要自己画矢量图，保持最小语义可编辑
```

说明：

- IMAGE GEN/imagegen 是默认语义素材生成路径。
- 其他生图 API 只有在能接受 reference/crop/residual 图像输入时才适合用于参考图匹配素材。
- 用户也可以先准备透明 PNG 素材，再让 agent 按语义单元替换并记录为 `provided_asset`。

