# GEO训练营落地页 - 目录重组指南

## 📋 新目录结构（方案A：先展示价值，再教育认知）

### ✅ 已完成
- ✅ 在index.html顶部添加了完整的新结构注释标记

### 🎯 新结构概览

```
1. Hero首屏                    [已在正确位置]
2. 痛点共鸣                    [已在正确位置]

3. 【训练营内容板块】⭐ 核心前置
   3.1 训练营介绍              [需要移动] 当前在 #camp-intro (line ~552)
   3.2 价值礼包                [需要移动] 当前在 #value-package (line ~592)
   3.3 课程安排                [需要移动] 当前在 #course-schedule (line ~649)
   3.4 讲师介绍                [需要移动] 当前在 #instructors (line ~715)
   3.5 目标人群                [需要移动] 当前在 #target-audience (line ~485)
   3.6 为什么跟我们学          [需要移动] 当前在 #why-us (line ~770)
   3.7 必火AI成功案例          [需要移动] 当前在 #success-cases (line ~817)

4. 价格 ⭐ 前置                [需要移动] 当前在 #pricing (line ~888)

5. 【GEO科普教育板块】⭐ 深度认知
   5.1 什么是GEO              [需要移动] 当前在 #what-is-geo (line ~93)
   5.2 客户证言                [需要移动] 当前在 #testimonials (line ~191)
   5.3 GEO核心价值            [需要移动] 当前在 #core-value (line ~248)
   5.4 消费者习惯转移          [已在位置] 当前在 #consumer-shift (line ~287)
   5.5 流量趋势                [已在位置] 当前在 #traffic-trend (line ~373)

6. 行业领袖背书              [已在位置] 当前在 #industry-leaders (line ~441)
7. 最终CTA                    [已在位置] 当前在 #contact (line ~944)
8. Footer                      [已在位置]
```

## 🔧 重组步骤

### 方式1：手动重组（推荐 - 最安全）

1. **备份当前文件**
   ```bash
   cp index.html index_before_restructure.html
   ```

2. **使用代码编辑器的折叠功能**
   - 在VS Code或其他编辑器中打开index.html
   - 折叠所有sections（使用快捷键）
   - 按照上述顺序，剪切粘贴每个section

3. **按顺序移动sections**
   - 先移动"训练营内容板块"的7个sections到Pain Points之后
   - 再移动Pricing到这7个sections之后
   - 最后移动"GEO科普教育板块"的5个sections到Pricing之后

### 方式2：使用查找替换（需谨慎）

由于sections之间有复杂的依赖关系，建议使用手动方式。

## 📊 预期效果

重组后的用户体验路径：

```
用户进入页面
    ↓
看到Hero + 痛点（情绪激活）
    ↓
立即看到训练营能提供什么（7个子板块）
    ↓
看到价格优惠（¥2980早鸟价）
    ↓
深入了解GEO是什么、为什么重要（5个教育板块）
    ↓
行业背书 + 最终CTA
    ↓
转化！
```

## ⚠️ 注意事项

1. **保持section的完整性**：每个section的开始和结束标签必须完整匹配
2. **检查内部链接**：移动后需要检查`<a href="#section-id">`等链接是否仍然有效
3. **测试响应式布局**：移动后在不同设备上测试
4. **JavaScript兼容性**：确保js/main.js中的选择器仍然有效

## ✅ 当前状态

- **结构注释**：已添加到index.html顶部
- **实际重组**：待手动执行
- **建议**：使用支持代码折叠的编辑器（VS Code、Sublime Text等）进行重组

## 🎯 下一步

如果您需要我帮助完成实际的section移动，请确认，我将逐个section进行精确的剪切粘贴操作。

**预计工作量**：需要移动约12个sections，每个section平均50-100行代码。
