<template>
    <div 
    class="card" 
    @click="showModal = true">
        <div class="card__wrapper">
            <p class="card__name">{{ item.name }}</p>
            <div class="card__img">
                <img 
                :src="item.image" 
                :alt="item.name">
            </div>
        </div>
        <slot name="character">
            <Detail 
            :category="route.path" 
            :id="item.id" 
            :isVisible="showModal" 
            @close="showModal = false">
                <template #character="{ detail }">
                    <div class="dflex character">
                        <div class="detail__info">
                            <div class="dflex">
                                <p>Имя:</p>
                                <p>{{ detail.name ? detail.name : '???' }}</p>
                            </div>
                            <div class="dflex">
                                <p>Пол:</p>
                                <p>{{ detail.gender ? detail.gender : '???' }}</p>
                            </div>
                            <div class="dflex">
                                <p>Разновидность:</p>
                                <p>{{ detail.species ? detail.species : '???' }}</p>
                            </div>
                            <div class="dflex">
                                <p>Статус:</p>
                                <p>{{ detail.status ? detail.status : '???' }}</p>
                            </div>
                            <div class="dflex">
                                <p>Тип:</p>
                                <p>{{ detail.type ? detail.type : '???' }}</p>
                            </div>
                            <div class="dflex">
                                <p>Локация:</p>
                                <p>{{ detail.location?.name ? detail.location?.name : '???' }}</p>
                            </div>
                            <div class="dflex">
                                <p>Планета:</p>
                                <p>{{ detail.origin?.name ? detail.origin?.name : '???' }}</p>
                            </div>
                        </div>
                        <div :class="{ 'detail__img': true, 'detail__img-dead': detail.status === 'Dead' }">
                            <img :src="detail.image" :alt="detail.name">
                        </div>
                    </div>
                </template>
            </Detail>
        </slot>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import Detail from '@/shared/components/Detail.vue';
export default defineComponent({
    name: 'CharacterCard',
    components: {
        Detail,
    },
    props: {
        item: {
            type: Object,
        }
    },
    setup() {
        const route = useRoute()
        const showModal = ref(false);

        return { route, showModal }
    }

})
</script>

<style scoped>
.card {
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
}

.card__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
    background-color: #71d1cf;
    border-radius: 5px;
    clip-path: polygon(10% 0%, 100% 0%, 100% 80%, 95% 100%, 0% 100%, 0% 40%);
}

.card:hover {
    background-color: #fff;
}

.card__img {
    width: 100px;
    aspect-ratio: 1;
    border-radius: 50%;
    overflow: hidden;
}

.card__img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.detail__info {
    width: 60%;
}

.detail__info p {
    font-size: clamp(14px, 5vw, 28px);
    margin-bottom: 5px;
}

.dflex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    border-bottom: 1px solid black;
}

.dflex:last-child {
    border-bottom: none;
}

.detail__img {
    position: relative;
    width: 40%;
    border-radius: 5px;
    overflow: hidden;
}

.detail__img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.detail__img-dead::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 0, 0, 0.459);
}

.detail__img-dead::before {
    content: 'DEAD';
    position: absolute;
    font-size: 48px;
    font-weight: 700;
    border: 3px solid red;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    color: red;
}
</style>