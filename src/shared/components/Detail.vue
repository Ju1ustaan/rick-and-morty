<template>
    <div v-if="isVisible" class="detail" @click="closeModal">
        <div class="detail__wrapper" @click.stop>
            <button class="detail__close" @click="closeModal">&times;</button>
            <Loader v-if="loading"/>
            <div v-else-if="error">{{ error }}</div>
            <div v-else>
                <slot name="character" :detail="detail"></slot>
                <slot name="episode" :detail="detail"></slot>
                <slot name="location" :detail="detail"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { getDetail } from '../api';
import Loader from './Loader.vue';

export default defineComponent({
    name: 'DetailComponent',
    components: {
        Loader
    },
    props: {
        category: {
            type: String,
        },
        id: {
            type: Number
        },
        isVisible: {
            type: Boolean,
            required: true
        }
    },
    emits: ['close'],
    setup(props, { emit }) {
        const detail = ref({})
        const loading = ref(true);
        const error = ref(null);
        const fetchDetail = async () => {
            try {
                const data = await getDetail(props.category, props.id);
                detail.value = data;
            } catch (err) {
                error.value = 'Failed to load detail';
            } finally {
                loading.value = false;
            }
        }

        watch(
            () => props.isVisible,
            (newVal) => {
                if (newVal) {
                    fetchDetail();
                }
            }
        );


        const closeModal = () => {
            emit('close');
        };

        return {
            detail,
            closeModal
        };
    }
})
</script>

<style scoped>
.detail {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #71d1d06b;
    backdrop-filter: blur(10px);
    clip-path: polygon(10% 0%, 100% 0%, 100% 80%, 95% 100%, 0% 100%, 0% 40%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.detail__wrapper {
    background: white;
    max-width: 1230px;
    padding: 20px 50px;
    position: relative;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    width: 100%;
    border-radius: 5px;
}

.detail__close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
}


</style>