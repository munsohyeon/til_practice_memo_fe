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

// 삭제 버튼 클릭시 "삭제하시겠습니까?"
// confirm 띄어주시고 "예" 클릭했을 때 삭제 처리 후 리스트를 새로 받아와야한다.

const remove = async (params) => {
  if (confirm("삭제하시겠습니까?")) {
    const data = await httpService.deleteById(params);

    if (data.resultData === 1) {
      alert("삭제 되었습니다.");
      // findAll(); findAll로 하면 검색시 삭제를 할 경우 검색이 풀리기 때문에
      search();
    } else {
      alert(data.resultMessage || "삭제에 실패하였습니다.");
    }
  }
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
              <span role="button" @click.prevent="remove(m)">삭제</span>
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
<!-- const remove = async (id) => {
  const isConfirmed = confirm("삭제하시겠습니까?");
  if (!isConfirmed) return; // "아니오" 클릭 시 종료

  const data = await httpService.deleteById(id); // id 전달

  if (data.resultData === 1) {
    alert("삭제되었습니다.");
    await fetchList(); // 리스트 갱신 함수 (존재해야 함)
  } else {
    alert(data.resultMessage || "삭제에 실패했습니다.");
  }
};
 -->