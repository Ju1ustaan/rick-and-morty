<template>
    <div class="loader">
        <img src="../../assets/portal.jpg" alt="portal loader">
    </div>
</template>
<script>
export default {
    name: 'LoaderPortal'
}
</script>
<style scoped>
.loader {
    width: 100px;
    aspect-ratio: 1;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: loading infinite linear 2s;
    border-radius: 50%;
    overflow: hidden;
    z-index: 98;
}

.loader img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

@keyframes loading {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
    
}
</style>