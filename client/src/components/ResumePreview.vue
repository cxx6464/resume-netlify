<template>
  <div class="preview" ref="pdfContent">
    <h2>{{ resumeData.personalInfo.name }}</h2>
    <p>邮箱: {{ resumeData.personalInfo.email }}</p>
    <p>电话: {{ resumeData.personalInfo.phone }}</p>
    <p>地址: {{ resumeData.personalInfo.address }}</p>

    <h3>教育经历</h3>
    <div v-for="(edu, index) in resumeData.education" :key="index">
      <h4>{{ edu.school }}</h4>
      <p>{{ edu.degree }} | {{ edu.startDate }} - {{ edu.endDate }}</p>
    </div>

    <h3>工作经历</h3>
    <div v-for="(exp, index) in resumeData.experience" :key="index">
      <h4>{{ exp.company }} - {{ exp.position }}</h4>
      <p>{{ exp.startDate }} - {{ exp.endDate }}</p>
      <p>{{ exp.description }}</p>
    </div>
  </div>
  <button @click="generatePDF" class="export-button">导出PDF</button>
</template>

<script>
import html2pdf from "html2pdf.js";
export default {
  props: ["resumeData"],
  methods: {
    generatePDF() {
      const element = this.$refs.pdfContent;
      const opt = {
        margin: 10,
        filename: `${this.resumeData.personalInfo.name || "resume"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      };

      html2pdf().set(opt).from(element).save();
    },
  },
};
</script>

<style scoped>
.preview {
  padding: 20px;
  border: 1px solid #ccc;
}
@media print {
  button.export-button {
    display: none !important;
  }

  .preview {
    padding: 0 !important;
    border: none !important;
  }
}

.export-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* 优化PDF布局 */
.preview {
  width: 210mm; /* A4宽度 */
  min-height: 297mm; /* A4高度 */
  background: white;
  padding: 20mm; /* 模拟页边距 */
  box-sizing: border-box;
}

h2,
h3,
h4 {
  color: #2c3e50 !important;
}

p {
  line-height: 1.6;
}
</style>
