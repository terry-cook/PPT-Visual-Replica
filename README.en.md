# PPT Visual Replica

[中文 README](README.md)

Precisely transform flat infographics into fully editable PowerPoint slides: text and layouts remain native PPT elements; semantic icons, devices, charts, screens, and other visual components are decomposed into independent transparent PNG assets as minimal semantic units.

## Recommended Prompt

```text
Use PPT REPLICA SKILL to recreate local images and IMAGE GEN to extract transparent assets. Avoid manually creating vector graphics, ensuring editability at minimal semantic units.
```

## Project Main Visual

![Hero visual placeholder](assets/readme/hero-visual.png)

## Quick Start

The core feature of this project is intelligently reconstructing the page through an AI agent based on these guidelines:

* **Text Content:** Utilize native PPT text boxes for easy future edits.
* **Layout:** Employ native PPT elements such as panels, separators, arrows, and connectors.
* **Semantic Visual Elements:** Extracted as transparent PNG files using IMAGE GEN or other image-capable APIs.
* **Minimal Semantic Units:** Icons, screens, charts, and devices correspond individually selectable PPT objects.

## Workflow Visualization

![Workflow visual placeholder](assets/readme/workflow-visual.png)

## Example Showcase: Satellite Network Diagram

Below is a representative primary example. The left image is the original reference, while the right shows the fully selected editable elements in the PPT replica. Shown results represent the first-pass generation (Pass@1), accurately capturing the overall structure but may require slight adjustments in icons, details, and text alignment.

| Original Reference                                                         | Editable PPT Objects Selected                                                 |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| ![Satellite reference](examples/satellite-network/reference/reference.png) | ![Satellite selected elements](assets/readme/satellite-selected-elements.png) |

## Additional Examples

| Example                                                        | Description                                                              |
| -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [`satellite-network`](examples/satellite-network/)             | Heterogeneous satellite network architecture, typical academic use case. |
| [`medical-ai-pipeline`](examples/medical-ai-pipeline/)         | Multimodal medical AI-assisted diagnostic workflow.                      |
| [`manufacturing-scheduler`](examples/manufacturing-scheduler/) | Intelligent manufacturing multi-robot scheduling example.                |

## Known Issues and Recommendations

* If the original image contains numerous small icons, automated cropping and chroma-key processing may cause minor edge defects, cropping inaccuracies, or semantic mismatches. We recommend preparing transparent icon assets from authorized sources such as [iconfont.cn](https://www.iconfont.cn/) in advance, then instructing the Agent to perform replacements.
* Slight alignment discrepancies may occur in Chinese text rendering, primarily due to font, size, line spacing differences, and PowerPoint rendering mechanisms. For higher fidelity, manual adjustments in PPT are recommended, or clearly specifying font sizes and line spacing for further agent optimization.

Suggested replacement prompt:

```text
I have placed replacement icons in the assets/user-icons/ folder. Use these transparent PNGs to replace the corresponding semantic units: database_stack, server_rack, monitor_dashboard. Ensure original bounding boxes, dimensions, and minimal semantic editability within PPT are maintained, and record in asset_manifest.json as provided_asset.
```

## Skill Installation

Recommended installation through Codex Skill Installer from the GitHub repository path:

```text
$skill-installer install https://github.com/ZhiweiWei-NAMI/PPT-Visual-Replica/tree/main/skill/ppt-visual-replica
```

Manual clone-and-copy installation is also supported:

**Windows:**

```powershell
git clone https://github.com/ZhiweiWei-NAMI/PPT-Visual-Replica.git
Copy-Item -Recurse .\PPT-Visual-Replica\skill\ppt-visual-replica "$env:USERPROFILE\.codex\skills\"
```

**macOS/Linux:**

```bash
git clone https://github.com/ZhiweiWei-NAMI/PPT-Visual-Replica.git
mkdir -p ~/.codex/skills
cp -R PPT-Visual-Replica/skill/ppt-visual-replica ~/.codex/skills/
```

Restart Codex after installation so the new skill is loaded.

---
