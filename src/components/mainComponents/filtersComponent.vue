<template>
    <aside>
        <div>
            <h3 class="filters__subtitle">Categories</h3>
            <ul v-for="(category, index) in categories" :key="index">
                <li>
                    <label class="form__label">
                        <input type="checkbox" name="category" value="electronics">
                        {{ category }}
                    </label>
                </li>
            </ul>
        </div>
        <div class="divider__line"></div>
        <!-- Rango de Precios -->
        <div>
            <h3 class="filters__subtitle">Price Range</h3>
            <div class="ranges">
                <input class="form__input" type="number" name="min-price" placeholder="Mín">
                <span>-</span>
                <input class="form__input" type="number" name="max-price" placeholder="Máx">
            </div>
        </div>
        <!-- Calificación -->
        <div class="divider__line"></div>
        <div>
            <h3 class="filters__subtitle">Rating</h3>
            <ul>
                <li>
                    <label class="form__label">
                        <input type="radio" name="rating" value="5">
                        ★★★★★
                    </label>
                </li>
                <li>
                    <label class="form__label">
                        <input type="radio" name="rating" value="4">
                        ★★★★☆
                    </label>
                </li>
                <li>
                    <label class="form__label">
                        <input type="radio" name="rating" value="3">
                        ★★★☆☆
                    </label>
                </li>
                <li>
                    <label class="form__label">
                        <input type="radio" name="rating" value="3">
                        ★★☆☆☆
                    </label>
                </li>
                <li>
                    <label class="form__label">
                        <input type="radio" name="rating" value="3">
                        ★☆☆☆☆
                    </label>
                </li>
            </ul>
        </div>
        <div class="divider__line"></div>

        <!-- Otras opciones -->
        <div>
            <h3 class="filters__subtitle">Others</h3>
            <ul>
                <li>
                    <label class="form__label">
                        <input type="checkbox" name="option" value="on-sale">
                        On Offer
                    </label>
                </li>
                <li>
                    <label class="form__label">
                        <input type="checkbox" name="option" value="free-shipping">
                        Free shipping
                    </label>
                </li>
            </ul>
        </div>
        <!-- Botón de Aplicar -->
        <div class="actions">
            <button class="actions__apply">Apply Filters</button>
            <button class="actions__clear">Clear Filters</button>
        </div>
    </aside>

</template>
<script>
export default {
    name: "filtersComponent",
    data() {
        return {
            categories: []
        }
    },
    methods: {
        getCategoriesNames() {
            const categoriesData = JSON.parse(localStorage.getItem('categoryData') || '[]')
            this.categories = categoriesData.map(category => category.nombre)
            console.log(this.categories)
        }
    },
    created() {
        this.getCategoriesNames()
    }
}
</script>
<style scoped>
.ranges {
    display: flex;
    align-items: center;
    gap: 1rem;

}

.ranges span {
    color: var(--text-color-body);
}

.divider__line {
    margin: 1rem 0;
}

.form__input {
    width: 50%;
    padding: .5rem 1rem;
}


.actions {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 1rem;
}

.actions__apply,
.actions__clear {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    margin-top: 2rem;
    margin-bottom: 0;
    border-radius: .7rem;
    background-color: var(--primary-color);
    color: var(--text-color-base);
    font-size: var(--font-size-small);
    transition: all .3s ease-in-out;
    cursor: pointer;
}

.actions__clear {
    background-color: transparent;
    color: var(--primary-color);
}

.actions__apply:hover {
    background-color: var(--text-color-hover-buttons);
}
</style>