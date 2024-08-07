<template>
    <div class="episodes">
        <div class="container">
            <h2 class="episodes__titlte">Эпизоды</h2>
            <Loader v-if="loading" />
            <div v-else-if="error">{{ error }}</div>
            <div v-else v-for="episode in episodes" :key="episode.id">
                <p class="episodes__subtitle">Сезон {{ episode.season }}</p>
                <EpisodeTable :item="episode.episodes" @open-modal="openModal" />
            </div>

            <Detail :category="route.path" :id="episodeId" :isVisible="showModal" @close="showModal = false">
                <template #episode="{ detail }">
                    <table>
                        <table class="detail-taible">
                            <thead class="">
                                <tr>
                                    <th>Эпизод</th>
                                    <th>Название</th>
                                    <th>Дата выхода</th>
                                    <th>Персонажи</th>
                                </tr>
                            </thead>
                            <tbody class="">
                                <tr>
                                    <td>{{ detail.episode }}</td>
                                    <td>{{ detail.name }}</td>
                                    <td>{{ detail.air_date }}</td>
                                    <td style="display: flex; flex-wrap: wrap; column-gap: 10px;">
                                    <div v-for="character in characters" :key="character.id">
                                        {{ `${character.name},` }}
                                    </div>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </table>
                </template>
            </Detail>
            <Pagination :next="next" :pages="pages" :prev="prev" :currentPage="currentPage"
                @page-changed="fetchEpisodes" />
        </div>
    </div>
</template>
<script>
import { ref, onMounted, defineComponent, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getDataList, getCharacters, getEpisodeById } from '../api';
import { Seasons } from '../helper.js';

import EpisodeTable from '../components/EpisodeTable.vue';
import Detail from '@/shared/components/Detail.vue';
import Pagination from '@/shared/components/Pagination.vue';
import Loader from '@/shared/components/Loader.vue';

export default defineComponent({
    name: 'EpisodePage',
    components: {
        EpisodeTable,
        Detail,
        Pagination,
        Loader
    },
    setup() {
        const route = useRoute()
        const episodes = ref([]);
        const loading = ref(true);
        const error = ref(null);
        const next = ref(null);
        const prev = ref(null);
        const pages = ref(1);
        const currentPage = ref(1);
        const showModal = ref(false)
        const episodeId = ref(0)
        const characters = ref([])

        const openModal = (id) => {
            showModal.value = true
            episodeId.value = id
        }

        const fetchCharacters = async (urls) => {
            try {
                const results = await Promise.all(urls.map(url => getCharacters(url)));
                characters.value = results.flat();
            } catch (err) {
                error.value = 'Failed to load episodes';
            } finally {
                loading.value = false;
            }
        }


        const fetchEpisodes = async (page) => {
            try {
                const data = await getDataList(page);
                episodes.value = Seasons(data.results);
                next.value = data.info.next;
                prev.value = data.info.prev;
                pages.value = data.info.pages;
            } catch (err) {
                error.value = 'Failed to load episodes';
            } finally {
                loading.value = false;
            }
        };

        onMounted(() => {
            fetchEpisodes();
        });

        watch(showModal, async (newVal) => {            
            if (newVal && episodeId.value) {
                const episodeDetail = await getEpisodeById(episodeId.value);
                if (episodeDetail.characters) {
                    await fetchCharacters(episodeDetail.characters);
                }
            }
        });

        return {
            episodes,
            loading,
            error,
            next,
            prev,
            pages,
            currentPage,
            characters,
            fetchEpisodes,
            fetchCharacters,
            route, showModal, openModal, episodeId
        };
    }
})
</script>
<style scoped>
.episodes {
    padding: 100px 0;
    background-color: #212838;
    min-height: 100vh;
}

.episodes__titlte {
    font-size: clamp(16px, 5vw, 36px);
    font-weight: 700;
    color: #fff;
    margin-bottom: 20px;
}

.episodes__subtitle {
    font-size: clamp(14px, 5vw, 24px);
    font-weight: 700;
    color: #fff;
    margin-bottom: 20px;
}

</style>