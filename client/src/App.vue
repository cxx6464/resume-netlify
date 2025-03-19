<template>
  <div class="container">
    <h1>在线简历生成器</h1>
    <button @click="toggleView">
      {{ showPreview ? "编辑简历" : "预览简历" }}
    </button>

    <ResumeForm
      v-if="!showPreview"
      :resume-data="resumeData"
      @update="handleUpdate"
      @save="saveResume"
    />

    <ResumePreview v-else :resume-data="resumeData" />
  </div>
</template>

<script>
import ResumeForm from "./components/ResumeForm.vue";
import ResumePreview from "./components/ResumePreview.vue";
import { ref } from "vue";
import axios from "axios";

export default {
  components: {
    ResumeForm,
    ResumePreview,
  },
  setup() {
    const resumeData = ref({
      personalInfo: {
        name: "",
        email: "",
        phone: "",
        address: "",
      },
      education: [],
      experience: [],
    });
    const showPreview = ref(false);

    const toggleView = () => {
      showPreview.value = !showPreview.value;
    };

    const handleUpdate = (updatedData) => {
      resumeData.value = updatedData;
    };

    const saveResume = async () => {
      try {
        await axios.post("/.netlify/functions/api/save", resumeData.value);
        // 修改为本地API地址
        // await axios.post("http://localhost:3000/api/save", resumeData.value);
        alert("简历保存成功！");
      } catch (error) {
        console.error("保存失败:", error);
      }
    };

    return { resumeData, showPreview, toggleView, handleUpdate, saveResume };
  },
};
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
} /* 确保所有字体在PDF中可用 */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif !important;
}

/* 防止内容分页截断 */
.education-item,
.experience-item {
  page-break-inside: avoid;
}
</style>
