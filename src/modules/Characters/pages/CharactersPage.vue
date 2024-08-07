<template>
  <div class="characters">
    <div class="container">
      <h2 class="characters__titlte">Персонажи</h2>
      <Loader  v-if="loading"/>
      <div v-else-if="error">{{ error }}</div>
      <div v-else class="characters__wrapper">
        <div v-for="character in characters" :key="character.id">
          <CharacterCard :item="character" :key="character.id" />
        </div>
      </div>
      <Pagination :next="next" :pages="pages" :prev="prev" :currentPage="currentPage"
        @page-changed="fetchCharacters" />

    </div>
  </div>
</template>
<script>
import { ref, onMounted, defineComponent } from 'vue';
import { getDataList } from '../api';

import CharacterCard from '../components/CharacterCard.vue';

import Pagination from '@/shared/components/Pagination.vue';
import Loader from '@/shared/components/Loader.vue';

export default defineComponent({
  name: 'CharactersPage',
  components: {
    CharacterCard,
    Pagination,
    Loader
  },
  setup() {

    const characters = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const next = ref(null);
    const prev = ref(null);
    const pages = ref(1);
    const currentPage = ref(1);

    const fetchCharacters = async (page) => {
      try {
        const data = await getDataList(page);
        characters.value = data.results;
        next.value = data.info.next;
        prev.value = data.info.prev;
        pages.value = data.info.pages;
      } catch (err) {
        error.value = 'Failed to load characters';
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchCharacters();
    });

    return {
      characters,
      loading,
      error,
      next,
      prev,
      pages,
      currentPage,
      fetchCharacters
    };
  }
})
</script>
<style>
.characters {
  padding: 100px 0;
  background-color: #212838;
  min-height: 100vh;
}

.characters__titlte {
  font-size: clamp(16px, 5vw, 36px);
  font-weight: 700;
  color: #fff;
  margin-bottom: 20px;
}

.characters__wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
</style>