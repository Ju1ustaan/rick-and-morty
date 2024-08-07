<template>
    <div class="header">
        <div class="container">
            <div class="header__wrapper">
                <div class="header__logo">
                    <a href="#/"> <img
                            src="https://repository-images.githubusercontent.com/120371205/b6740400-92d4-11ea-8a13-d5f6e0558e9b"
                            alt="rick and morty icon"></a>
                </div>
                <nav class="header__nav">
                    <a href="#/character" class="header__link">Персонажи</a>
                    <a href="#/episode" class="header__link">Эпизоды</a>
                    <a href="#/location" class="header__link">Локации</a>
                </nav>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Header-component',
    setup() {

    }
}
</script>
<style scoped>
.header {
    position: fixed;
    width: 100%;
    top: 0;
    padding: 10px 0;
    background-color: #212838;
    z-index: 99;
}
.header__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header__logo {
    width: 48px;
    aspect-ratio: 1;
    border-radius: 50%;
    overflow: hidden;
}

.header__logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.header__link {
    text-decoration: none;
    font-weight: 600;
    margin-left: 50px;
    color: greenyellow;
    text-transform: uppercase;
    text-shadow: 4px 4px 2px rgba(0, 238, 159, 0.979);
}
</style>