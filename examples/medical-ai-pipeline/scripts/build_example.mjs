import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const __filename = fileURLToPath(import.meta.url);
const srcDir = path.dirname(__filename);
const workspaceDir = path.resolve(srcDir, "..");
const rootDir = path.resolve(srcDir, "../..");
const assetDir = path.join(rootDir, "assets");
const scratchDir = path.join(rootDir, "scratch");
const outputDir = path.join(rootDir, "output");
const pptOutputDir = path.join(workspaceDir, "output");
const W = 1672;
const H = 941;

for (const dir of [scratchDir, outputDir, pptOutputDir, path.join(rootDir, "prompts"), path.join(rootDir, "reference_crops")]) {
  fs.mkdirSync(dir, { recursive: true });
}

const colors = {
  navy: "#06166D",
  blue: "#156EEA",
  cyan: "#0AA9C8",
  teal: "#008B86",
  green: "#10A66A",
  lightBlue: "#DDEEFF",
  lightGreen: "#DDF5E9",
  panelBlue: "#ECF7FF",
  panelGreen: "#ECFFF6",
  textBlue: "#0647B3",
  muted: "#4B6B94",
};

const assets = [
  ["database_orbit", "database_orbit.png", [42, 174, 176, 128]],
  ["icon_ct_magnifier", "icon_ct_magnifier.png", [300, 124, 50, 44]],
  ["ct_scan_screen", "ct_scan_screen.png", [275, 170, 260, 120]],
  ["icon_microscope_header", "icon_microscope_header.png", [608, 122, 46, 48]],
  ["pathology_slide", "pathology_slide.png", [579, 169, 262, 122]],
  ["icon_emr_clipboard", "icon_emr_clipboard.png", [939, 122, 48, 48]],
  ["emr_panel", "emr_panel.png", [888, 168, 318, 124]],
  ["icon_lab_flask_green", "icon_flask_feature.png", [1300, 122, 52, 48]],
  ["lab_panel", "lab_panel.png", [1252, 168, 356, 125]],
  ["brain_network", "brain_network.png", [52, 438, 170, 150]],
  ["knowledge_graph", "knowledge_graph.png", [252, 397, 232, 184]],
  ["encoder_cube", "encoder_cube.png", [536, 407, 332, 150]],
  ["icon_cube_feature", "icon_cube_feature.png", [548, 565, 43, 43]],
  ["icon_microscope_feature", "icon_microscope_feature.png", [625, 565, 43, 43]],
  ["icon_document_feature", "icon_document_feature.png", [700, 565, 43, 43]],
  ["icon_flask_feature", "icon_flask_feature.png", [774, 565, 43, 43]],
  ["risk_gauge", "risk_gauge.png", [946, 412, 186, 125]],
  ["roc_curve", "roc_curve.png", [944, 516, 170, 106]],
  ["risk_scale", "risk_scale.png", [1127, 554, 132, 38]],
  ["explainability_heatmap", "explainability_heatmap.png", [1365, 421, 180, 84]],
  ["feature_bars", "feature_bars.png", [1362, 536, 212, 85]],
  ["medical_cross", "medical_cross.png", [56, 739, 150, 132]],
  ["icon_diagnosis_clipboard", "icon_diagnosis_clipboard.png", [254, 682, 38, 38]],
  ["diagnosis_panel", "diagnosis_panel.png", [237, 720, 244, 168]],
  ["icon_calendar", "icon_calendar.png", [566, 682, 42, 38]],
  ["followup_panel", "followup_panel.png", [504, 722, 332, 150]],
  ["icon_workstation_monitor", "icon_workstation_monitor.png", [897, 682, 50, 38]],
  ["doctor_workstation", "doctor_workstation.png", [862, 710, 350, 178]],
  ["icon_quality_shield", "icon_quality_shield.png", [1265, 682, 44, 42]],
  ["quality_panel", "quality_panel.png", [1240, 718, 370, 170]],
];

const panelSpecs = [
  ["outer-input", [27, 105, 1618, 229], colors.lightBlue, "#79AFFF", 1.2],
  ["outer-model", [27, 360, 1618, 282], "#EEF9FF", "#57A7FF", 1.2],
  ["outer-output", [27, 667, 1618, 245], colors.lightGreen, "#44C7A0", 1.2],
  ["card-ct", [257, 121, 293, 205], "#FBFEFF", "#96BFFF", 1],
  ["card-pathology", [560, 121, 297, 205], "#FBFEFF", "#96BFFF", 1],
  ["card-emr", [869, 121, 356, 205], "#FBFEFF", "#96BFFF", 1],
  ["card-lab", [1237, 121, 386, 205], "#FBFEFF", "#96BFFF", 1],
  ["card-kg", [242, 371, 243, 262], "#FBFEFF", "#39A3FF", 1.4],
  ["card-encoder", [527, 371, 355, 262], "#FBFEFF", "#39A3FF", 1.4],
  ["card-risk", [925, 371, 367, 262], "#FBFEFF", "#39A3FF", 1.4],
  ["card-explain", [1335, 371, 298, 262], "#FBFEFF", "#39A3FF", 1.4],
  ["card-diagnosis", [226, 678, 266, 223], "#FBFEFF", "#59C99D", 1.2],
  ["card-followup", [504, 678, 331, 223], "#FBFEFF", "#59C99D", 1.2],
  ["card-workstation", [847, 678, 370, 223], "#FBFEFF", "#59C99D", 1.2],
  ["card-quality", [1220, 678, 410, 223], "#FBFEFF", "#59C99D", 1.2],
];

const textBlocks = [];

function pos([left, top, width, height]) {
  return { left, top, width, height };
}

function addShape(slide, name, geometry, box, fill, line = undefined) {
  return slide.shapes.add({
    name,
    geometry,
    position: pos(box),
    fill,
    line,
  });
}

function addText(slide, name, value, box, fontSize, color = colors.navy, opts = {}) {
  const sh = slide.shapes.add({
    name,
    geometry: "textbox",
    position: pos(box),
  });
  sh.text.set(value);
  sh.text.fontSize = fontSize;
  sh.text.color = color;
  sh.text.bold = Boolean(opts.bold);
  sh.text.wrap = opts.wrap ?? true;
  sh.text.alignment = opts.align ?? "left";
  sh.text.verticalAlignment = opts.valign ?? "top";
  sh.text.insets = opts.insets ?? { left: 0, right: 0, top: 0, bottom: 0 };
  textBlocks.push({ id: name, class: "text", text: value, bbox: box, fontSize, color, bold: Boolean(opts.bold) });
  return sh;
}

function addImage(slide, id, file, box) {
  const fullPath = path.join(assetDir, file);
  const dataUrl = `data:image/png;base64,${fs.readFileSync(fullPath).toString("base64")}`;
  const image = slide.images.add({
    name: id,
    dataUrl,
    position: pos(box),
    fit: "contain",
    alt: id,
  });
  return image;
}

function addArrow(slide, name, geometry, box, fill) {
  return addShape(slide, name, geometry, box, fill, { fill, width: 0 });
}

async function saveExported(value, outPath) {
  if (value && typeof value.save === "function") {
    await value.save(outPath);
    return;
  }
  if (Buffer.isBuffer(value) || value instanceof Uint8Array) {
    fs.writeFileSync(outPath, Buffer.from(value));
    return;
  }
  if (value && typeof value.arrayBuffer === "function") {
    fs.writeFileSync(outPath, Buffer.from(await value.arrayBuffer()));
    return;
  }
  if (value && value.data instanceof Uint8Array) {
    fs.writeFileSync(outPath, Buffer.from(value.data));
    return;
  }
  fs.writeFileSync(outPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function addBadge(slide, name, text, box, fill, fontSize = 13) {
  addShape(slide, `${name}-bg`, "roundRect", box, fill, { fill: "#FFFFFF", width: 0.4 });
  addText(slide, `${name}-text`, text, [box[0] + 4, box[1] + 3, box[2] - 8, box[3] - 6], fontSize, "#FFFFFF", {
    bold: true,
    align: "center",
    valign: "mid",
    wrap: false,
  });
}

const presentation = Presentation.create({ slideSize: { width: W, height: H } });
const slide = presentation.slides.add();

addShape(slide, "background", "rect", [0, 0, W, H], "#F6FBFF", { fill: "#F6FBFF", width: 0 });
for (let x = 0; x <= W; x += 42) addShape(slide, `grid-v-${x}`, "rect", [x, 0, 1, H], "#EAF3FD", { fill: "#EAF3FD", width: 0 });
for (let y = 0; y <= H; y += 42) addShape(slide, `grid-h-${y}`, "rect", [0, y, W, 1], "#EAF3FD", { fill: "#EAF3FD", width: 0 });

addText(slide, "title", "多模态医学 AI 辅助诊疗流程架构", [410, 8, 865, 62], 44, colors.navy, {
  bold: true,
  align: "center",
  wrap: false,
});
addText(slide, "subtitle", "面向智能诊断、风险评估与临床决策支持的多源信息融合流程", [500, 80, 680, 28], 22, colors.textBlue, {
  bold: true,
  align: "center",
  wrap: false,
});
addShape(slide, "subtitle-rule-left", "rect", [360, 96, 130, 2], colors.textBlue, { fill: colors.textBlue, width: 0 });
addShape(slide, "subtitle-rule-right", "rect", [1184, 96, 130, 2], colors.textBlue, { fill: colors.textBlue, width: 0 });

for (const [name, box, fill, stroke, weight] of panelSpecs) {
  addShape(slide, name, "roundRect", box, fill, { fill: stroke, width: weight });
}

addText(slide, "layer-input", "数据输入层", [47, 119, 170, 40], 30, colors.textBlue, { bold: true, wrap: false });
addText(slide, "layer-model", "模型分析层", [45, 374, 170, 40], 30, colors.textBlue, { bold: true, wrap: false });
addText(slide, "layer-output", "临床输出层", [42, 679, 170, 40], 30, "#007B65", { bold: true, wrap: false });

for (const [id, file, box] of assets) addImage(slide, id, file, box);

const topTitles = [
  ["ct-title", "CT 影像", [374, 135, 110, 24]],
  ["path-title", "病理切片", [676, 135, 130, 24]],
  ["emr-title", "电子病历", [997, 135, 150, 24]],
  ["lab-title", "检验指标", [1360, 135, 150, 24]],
];
for (const [id, text, box] of topTitles) addText(slide, id, text, box, 21, colors.textBlue, { bold: true, wrap: false });
addText(slide, "ct-caption", "影像数据", [358, 300, 100, 22], 15, colors.textBlue, { bold: true, align: "center", wrap: false });
addText(slide, "path-caption", "组织学信息", [662, 300, 130, 22], 15, colors.textBlue, { bold: true, align: "center", wrap: false });
addText(slide, "emr-caption", "结构化/非结构化文本", [958, 300, 220, 22], 15, colors.textBlue, { bold: true, align: "center", wrap: false });
addText(slide, "lab-caption", "实验室指标", [1365, 300, 140, 22], 15, "#22945C", { bold: true, align: "center", wrap: false });

addText(slide, "kg-title", "知识图谱", [327, 385, 84, 24], 18, colors.textBlue, { bold: true, align: "center", wrap: false });
addText(slide, "kg-label-disease", "疾病", [260, 442, 40, 16], 11, colors.textBlue, { bold: true, wrap: false });
addText(slide, "kg-label-drug", "药物", [433, 442, 40, 16], 11, colors.textBlue, { bold: true, wrap: false });
addText(slide, "kg-label-check", "检查", [402, 414, 40, 16], 11, colors.textBlue, { bold: true, wrap: false });
addText(slide, "kg-label-symptom", "症状", [340, 416, 40, 16], 11, colors.textBlue, { bold: true, wrap: false });
addText(slide, "kg-label-treatment", "治疗", [350, 588, 40, 16], 11, colors.textBlue, { bold: true, wrap: false });
addText(slide, "kg-label-lab", "实验室", [423, 548, 50, 16], 11, colors.textBlue, { bold: true, wrap: false });
addText(slide, "encoder-title", "多模态编码器", [634, 382, 145, 28], 22, colors.textBlue, { bold: true, align: "center", wrap: false });
addText(slide, "encoder-feature-labels", "影像特征          病理特征          文本特征          检验特征", [548, 610, 276, 18], 12, colors.textBlue, {
  bold: true,
  align: "center",
  wrap: false,
});
addText(slide, "encoder-more", "...", [846, 578, 28, 22], 18, colors.textBlue, { bold: true, wrap: false });

addText(slide, "risk-title", "风险预测", [1038, 382, 100, 24], 19, colors.textBlue, { bold: true, align: "center", wrap: false });
addText(slide, "risk-score", "中高风险\n0.72", [993, 488, 90, 48], 18, colors.navy, { bold: true, align: "center" });
addText(slide, "risk-levels", "风险分层\n低风险     < 0.30\n中风险     0.30-0.60\n高风险     > 0.60", [1118, 413, 145, 92], 13, "#11835F", { bold: true });
addText(slide, "roc-title", "ROC 曲线（示例）", [981, 530, 105, 18], 12, colors.textBlue, { bold: true, align: "center", wrap: false });
addText(slide, "risk-alarm-title", "风险报警条", [1168, 528, 90, 18], 12, "#11835F", { bold: true, align: "center", wrap: false });
addText(slide, "risk-alarm-score", "0.72", [1215, 548, 42, 22], 16, "#E31B1B", { bold: true, align: "center", wrap: false });

addText(slide, "explain-title", "可解释性模块", [1416, 382, 140, 24], 18, colors.textBlue, { bold: true, align: "center", wrap: false });
addText(slide, "explain-heat-caption", "注意力热力图（示例）", [1392, 397, 150, 18], 11, colors.textBlue, { bold: true, align: "center", wrap: false });
addText(slide, "explain-bars-caption", "特征贡献度（示例）", [1398, 516, 150, 18], 11, colors.textBlue, { bold: true, align: "center", wrap: false });
addText(slide, "explain-bar-labels", "病理特征\n影像特征\n检验特征\n文本特征\n其他", [1368, 544, 58, 72], 10, colors.textBlue, { bold: true });

addText(slide, "diagnosis-title", "诊断建议", [324, 690, 110, 24], 20, "#007B65", { bold: true, wrap: false });
addText(slide, "diagnosis-body", "综合分析结论（示例）\n✓ 倾向：肺腺癌\n✓ 分期：T2aN1M0 IIA期\n✓ 基因检测：EGFR/ALK", [284, 735, 154, 88], 9.5, "#005A69", {
  bold: true,
});
addText(slide, "followup-title", "随访计划", [652, 690, 110, 24], 20, "#007B65", { bold: true, wrap: false });
addText(slide, "followup-timeline", "基线\n(当前)        1个月        3个月        6个月        12个月", [526, 728, 280, 37], 12, "#005A69", {
  bold: true,
});
addText(slide, "followup-items", "随访内容\n影像复查        实验室检查        症状评估        治疗评估\n(胸部CT)        (肿瘤标志物)      (问卷)          (疗效)", [527, 805, 285, 58], 10, "#005A69", {
  bold: true,
});
addText(slide, "workstation-title", "医生工作站", [986, 690, 125, 24], 20, "#007B65", { bold: true, wrap: false });
addText(slide, "quality-title", "质量评估", [1375, 690, 110, 24], 20, "#007B65", { bold: true, wrap: false });
addText(slide, "quality-labels", "模型性能（示例）\n准确率\n0.88\nF1 值\n0.87\n精确率\n0.87\n召回率\n0.85\n特异度\n0.89", [1240, 724, 130, 135], 11, "#005A69", {
  bold: true,
  align: "center",
});
addText(slide, "quality-line-label", "校准曲线（示例）", [1440, 724, 130, 18], 11, "#007B65", { bold: true, align: "center", wrap: false });

addText(slide, "footer", "示意图（Synthetic Example）", [660, 913, 350, 24], 16, colors.textBlue, { align: "center", wrap: false });

const blueArrow = "#2C98EA";
const greenArrow = "#5EBE44";
addArrow(slide, "arrow-ct-down", "downArrow", [390, 324, 27, 34], blueArrow);
addArrow(slide, "arrow-path-down", "downArrow", [684, 324, 27, 34], blueArrow);
addArrow(slide, "arrow-emr-down", "downArrow", [1030, 324, 27, 34], "#1FB6C3");
addArrow(slide, "arrow-lab-down", "downArrow", [1404, 324, 27, 34], greenArrow);
addArrow(slide, "arrow-kg-encoder", "leftRightArrow", [486, 482, 40, 24], blueArrow);
addArrow(slide, "arrow-encoder-risk", "leftRightArrow", [884, 482, 40, 24], blueArrow);
addArrow(slide, "arrow-risk-explain", "leftRightArrow", [1294, 482, 40, 24], blueArrow);
addArrow(slide, "arrow-kg-output", "downArrow", [362, 636, 26, 32], "#5CC184");
addArrow(slide, "arrow-encoder-output", "downArrow", [682, 636, 26, 32], "#5CC184");
addArrow(slide, "arrow-risk-output", "downArrow", [1028, 636, 26, 32], "#5CC184");
addArrow(slide, "arrow-explain-output", "downArrow", [1412, 636, 26, 32], "#5CC184");

// Small native tabs are structural text containers; semantic icons themselves are separate generated PNGs.
addBadge(slide, "emr-tab-structured", "结构化信息", [1056, 181, 88, 25], "#51C4C6", 10);
addBadge(slide, "emr-tab-free", "非结构化文本", [1146, 181, 96, 25], "#69A8E8", 10);

const visualInventory = {
  reference: "reference.png",
  slide_size_px: [W, H],
  minimum_semantic_unit_policy: "text and structural layout are PPT-native; every semantic non-text visual is an independent generated image asset placement",
  items: [
    ...assets.map(([id, file, box]) => ({
      id,
      class: "imagegen_asset",
      source: `assets/${file}`,
      bbox: box,
      semantic_unit_count: 1,
    })),
    ...panelSpecs.map(([id, box]) => ({
      id,
      class: "layout_native",
      bbox: box,
      semantic_unit_count: 0,
    })),
    ...textBlocks,
  ],
};

const assetManifest = {
  imagegen_mode: "built-in image_gen with chroma-key extraction",
  source_grids: [
    "generated/asset_grid_cycle_1.png",
    "generated/icon_grid_cycle_1.png",
  ],
  assets: assets.map(([id, file, box]) => ({
    id,
    path: `assets/${file}`,
    placement_bbox: box,
    semantic_unit_count: 1,
    scaling: "uniform contain",
    source_record: id.startsWith("icon_") ? "generated/icon_grid_cycle_1_manifest.json" : "generated/asset_grid_cycle_1_manifest.json",
  })),
};

const redboxes = {
  cycle: 1,
  redboxes: assets.map(([id, file, box]) => ({
    id,
    anchor_id: id,
    bbox: box,
    assigned_asset: `assets/${file}`,
  })),
};

const layoutRules = {
  slide_size_px: [W, H],
  coordinate_source: "reference red-box coordinates in original 1672x941 image",
  image_scaling: "fit contain, preserve aspect ratio",
  native_allowed: ["background", "panels", "frames", "connectors", "structural arrows", "text boxes", "layout tabs"],
  semantic_visuals: "all medical icons, screenshots, charts, diagrams, brain/network/device visuals are imagegen_asset",
  text_policy: "major labels and annotations are editable PPT text boxes with fixed line counts where needed",
};

fs.writeFileSync(path.join(rootDir, "visual_inventory.json"), `${JSON.stringify(visualInventory, null, 2)}\n`, "utf8");
fs.writeFileSync(path.join(rootDir, "asset_manifest.json"), `${JSON.stringify(assetManifest, null, 2)}\n`, "utf8");
fs.writeFileSync(path.join(rootDir, "residual_cycle_1_redboxes.json"), `${JSON.stringify(redboxes, null, 2)}\n`, "utf8");
fs.writeFileSync(path.join(rootDir, "asset_match_cycle_1.json"), `${JSON.stringify({ matches: redboxes.redboxes }, null, 2)}\n`, "utf8");
fs.writeFileSync(path.join(rootDir, "layout_rules.json"), `${JSON.stringify(layoutRules, null, 2)}\n`, "utf8");
fs.writeFileSync(
  path.join(rootDir, "prompts", "assets_cycle_1.jsonl"),
  [
    JSON.stringify({ cycle: 1, type: "main_visual_grid", prompt: "Create isolated chroma-key asset grid for database, CT, pathology, EMR, lab panel, brain, knowledge graph, encoder cube, risk gauge, ROC, risk scale, heatmap, feature bars, cross, diagnosis panel, follow-up panel, workstation, quality panel." }),
    JSON.stringify({ cycle: 1, type: "small_icon_grid", prompt: "Create isolated chroma-key icon grid for CT, microscope, EMR, lab flask, feature cube, pathology, document, flask, diagnosis, calendar, workstation, quality shield icons." }),
  ].join("\n") + "\n",
  "utf8",
);

const preview = await slide.export({ format: "png" });
await saveExported(preview, path.join(scratchDir, "replica_preview.png"));
const layout = await slide.export({ format: "layout" });
await saveExported(layout, path.join(scratchDir, "replica_layout.json"));

const pptxBlob = await PresentationFile.exportPptx(presentation);
const workspacePptx = path.join(pptOutputDir, "output.pptx");
const finalPptx = path.join(outputDir, "medical_ai_pipeline_replica.pptx");
await pptxBlob.save(workspacePptx);
fs.copyFileSync(workspacePptx, finalPptx);

const validationReport = {
  status: "built",
  pptx: path.relative(rootDir, finalPptx).replaceAll("\\", "/"),
  preview: "scratch/replica_preview.png",
  asset_count: assets.length,
  text_object_count: textBlocks.length,
  layout_native_count: panelSpecs.length + 1 + 8,
  semantic_visual_rule: "no hand-drawn semantic vector visuals; all semantic non-text visuals are generated PNG assets",
  pending_external_checks: ["pptx_package_quality_check", "visual_preview_inspection"],
};
fs.writeFileSync(path.join(rootDir, "validation_report.json"), `${JSON.stringify(validationReport, null, 2)}\n`, "utf8");

console.log(JSON.stringify({
  pptx: finalPptx,
  workspace_pptx: workspacePptx,
  preview: path.join(scratchDir, "replica_preview.png"),
  layout: path.join(scratchDir, "replica_layout.json"),
  assets: assets.length,
  texts: textBlocks.length,
}, null, 2));
