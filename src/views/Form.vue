<script setup>
import httpService from '@/services/httpService';
// reactive 화면 변경 담당
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();

const state = reactive({
    memo: {
        id: 0,
        title: '',
        content: '',
        createdAt: ''
    }
});

onMounted(() => {
  const passData = history.state.data;
  console.log('passData: ', passData);
  if (history.state.data) { // 넘어온 데이터가 있따.
    state.memo = JSON.parse(passData);
}
});

// 저장 alert
// 저장 save
// 수정 modify
// 수정만 Detail.vue로 가게 해주세요.
const procSubmit = async () => {
  const jsonBody = {
    // state.memo.title (v-model 로 값을 바인딩)
    title: state.memo.title,
    content: state.memo.content,
  }
  let data = null;
  if (state.memo.id) {   
    jsonBody.id = state.memo.id;
    data = await httpService.modify(jsonBody);
    router.push({ path: `/memos/${jsonBody.id}` });
  } else {    
    data = await httpService.save(jsonBody);
      router.push({ path: '/' });
  }
};


</script>

<template>
  <form class="detail" @submit.prevent="procSubmit">
    <div class="mb-3" v-if="state.memo.createdAt">
      등록일시: {{ state.memo.createdAt }}
    </div>
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input type="text" id="title" class="form-control p-3" v-model="state.memo.title" />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea id="content" class="form-control p-3" v-model="state.memo.content"></textarea>
    </div>
    <button type="submit" class="btn btn-primary w-100 py-3">{{ state.memo.id > 0? '수정' : '저장' }}</button>
  </form>
</template>

<style scoped>
</style>
