<template>
  <div class="form-container">
    <h2>个人信息</h2>
    <input v-model="localData.personalInfo.name" placeholder="姓名" />
    <input v-model="localData.personalInfo.email" placeholder="邮箱" />
    <input v-model="localData.personalInfo.phone" placeholder="电话" />
    <input v-model="localData.personalInfo.address" placeholder="地址" />

    <h2>教育经历</h2>
    <div v-for="(edu, index) in localData.education" :key="index">
      <input v-model="edu.school" placeholder="学校名称" />
      <input v-model="edu.degree" placeholder="学位" />
      <input v-model="edu.startDate" placeholder="开始日期" />
      <input v-model="edu.endDate" placeholder="结束日期" />
      <button @click="removeEducation(index)">删除</button>
    </div>
    <button @click="addEducation">添加教育经历</button>

    <h2>工作经历</h2>
    <div v-for="(exp, index) in localData.experience" :key="index">
      <input v-model="exp.company" placeholder="公司名称" />
      <input v-model="exp.position" placeholder="职位" />
      <input v-model="exp.startDate" placeholder="开始日期" />
      <input v-model="exp.endDate" placeholder="结束日期" />
      <textarea v-model="exp.description" placeholder="工作描述"></textarea>
      <button @click="removeExperience(index)">删除</button>
    </div>
    <button @click="addExperience">添加工作经历</button>

    <button @click="$emit('save')">保存简历</button>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  props: ["resumeData"],
  emits: ["update", "save"],
  setup(props, { emit }) {
    const localData = ref(JSON.parse(JSON.stringify(props.resumeData)));

    watch(
      localData,
      (newVal) => {
        emit("update", newVal);
      },
      { deep: true }
    );

    const addEducation = () => {
      localData.value.education.push({
        school: "",
        degree: "",
        startDate: "",
        endDate: "",
      });
    };

    const removeEducation = (index) => {
      localData.value.education.splice(index, 1);
    };

    const addExperience = () => {
      localData.value.experience.push({
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    };

    const removeExperience = (index) => {
      localData.value.experience.splice(index, 1);
    };

    return {
      localData,
      addEducation,
      removeEducation,
      addExperience,
      removeExperience,
    };
  },
};
</script>
