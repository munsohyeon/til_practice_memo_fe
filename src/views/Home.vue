<script setup>
import httpService from '@/services/httpService';
import { reactive, onMounted } from 'vue';

const state = reactive({
  memos: [],
});

onMounted(() => {
  console.log('Home.vue - onMounted 보낸 함수 호출!');
  findAll({});
});

const findAll = async (params) => {
  const data = await httpService.findAll(params);
  state.memos = data.resultData;
};

// 검색 버튼을 누르면 findAll을 호출할 때
// 파라미터로 {search_text: '검색 키워드에 적힌 내용을 보내주시면 된다.'}

const model = {
  searchText: ''
}

const search = () => {
  const params = {
    search_text: model.searchText
  }
  findAll(params);
}



</script>

<template>
   <div class="mb-3 mt-d d-flex">
      <label for="title" class="form-label"></label>
      <input type="text" id="title" class="form-control p-3 me-1" v-model="model.searchText" @keyup.enter="search"
              placeholder="검색어를 입력해 주세요."/>
      <button class="btn" style="font-size: 33px" @click="search">🔍</button>
    </div>
  <div class="memo-list">
  	<router-link to="/memo/add" class="add btn btn-light">
      + add
    </router-link>
    <router-link v-for="m in state.memos" :to="`/memos/${m.id}`" class="item" :key="m.id">
      <div class="d-flex pt-3">
        <div class="pb-3 mb-0 w-100">
          <div class="d-flex justify-content-between">
            <b>{{ m.title }}</b>
            <div>
              <span role="button" @click.prevent="remove(m.id)">삭제</span>
            </div>
          </div>
          <div class="mt-2">{{ m.content }}</div>
        </div>
      </div>
    </router-link>    
  </div>
</template>

<style lang="scss" scoped>
.memo-list {
  .item {
    background-color: #f8f9fa;
    border: 1px solid #eee;
    display: block;
    color: #000;
    text-decoration: none;
    padding: 20px 30px;
    margin: 15px 0;

    &:hover {
      border-color: #aaa;
    }
  }
}

.add {
  display: block;
  padding: 25px;
  border: 1px solid #eee;
}
</style>