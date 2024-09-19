<template>
    <div class="addProducto">
        <h1 class="addProducto___title">Add Product</h1>
        <form action="#" class="form">
            <fieldset class="form__column">
                <h2 class="form__subtitle">Product Details</h2>
                <label for="product_name" class="form__label">
                    Product Name <span class="form__required">*</span></label>
                <input type="text" id="product_name" name="producto_name" placeholder="Enter product name"
                    class="form__input">
                <span class="form__input-helps">Do not exceed 50 characters when entering the product name.
                </span>
                <label for="categories" class="form__label">
                    Category <span class="form__required">*</span>
                </label>
                <select name="categories" id="categories" class="form__select">
                    <option value="option1">option 1</option>
                    <option value="option2">option 2</option>
                    <option value="option3">option 3</option>
                    <option value="option4">option 4</option>
                    <option value="option5">option 5</option>
                    <option value="option6">option 6</option>
                    <option value="option7">option 7</option>
                    <option value="option8">option 8</option>
                    <option value="option9">option 9</option>
                    <option value="option10">option 10</option>
                </select>
                <div class="form__column--inline">
                    <div class="form__column-block">
                        <label for="sizes" class="form__label">
                            Sizes <span class="form__input-helps toggle">disabled</span>
                        </label>
                        <select name="sizes" id="sizes" class="form__select" disabled>
                            <option value="option1">option 1</option>
                            <option value="option2">option 2</option>
                            <option value="option3">option 3</option>
                            <option value="option4">option 4</option>
                            <option value="option5">option 5</option>
                            <option value="option6">option 6</option>
                            <option value="option7">option 7</option>
                            <option value="option8">option 8</option>
                            <option value="option9">option 9</option>
                            <option value="option10">option 10</option>
                        </select>
                    </div>
                    <div class="form__column-block">
                        <label for=" sizes" class="form__label">
                            Sizes <span class="form__input-helps toggle">disabled</span>
                        </label>
                        <select name="colors" id="colors" class="form__select" disabled>
                            <option value="option1">option 1</option>
                            <option value="option2">option 2</option>
                            <option value="option3">option 3</option>
                            <option value="option4">option 4</option>
                            <option value="option5">option 5</option>
                            <option value="option6">option 6</option>
                            <option value="option7">option 7</option>
                            <option value="option8">option 8</option>
                            <option value="option9">option 9</option>
                            <option value="option10">option 10</option>
                        </select>
                    </div>
                </div>
                <label for="description" class="form__label">
                    Description <span class="form__required">*</span>
                </label>
                <textarea name="description" id="description" cols="30" rows="12"
                    placeholder="Enter product description" class="form__textarea"></textarea>
                <span class="form__input-helps">Do not exceed 100 characters when entering the product description.
                </span>
            </fieldset>
            <fieldset class="form__column">
                <h2 class="form__subtitle">Product Extras</h2>
                <h3 class="form__label">Upload Images</h3>
                <div class="form__images">
                    <div class="form__image"></div>
                    <div class="form__image"></div>
                    <!-- <div class="form__image"></div> -->
                    <!-- <div class="form__image"></div> -->
                    <!-- <div class="form__image"></div> -->
                    <div class="form__image form__image--border">
                        <label for="upload_images" class="form__label--file">
                            <uploadImageIcon />
                            <span class="form__upload-text">Drop your images here or select <span
                                    class="form__upload-text--bold">click to browse</span></span>
                        </label>
                        <input type="file" id="upload_images" name="upload_images" accept="/images/*"
                            class="form__input form__input--file">
                    </div>
                </div>
                <span class="form__input-helps">You need to add at least 4 images. Pay attention to the quality of the
                    pictures you add, comply with the background color standards. Pictures must be in certain
                    dimensions. Notice that the product shows all the details
                </span>
                <div class="form__column--inline">
                    <div class="form__column-block">
                        <label for="price" class="form__label">
                            Price <span class="form__required">*</span>
                        </label>
                        <input type="number" id="price" name="price" placeholder="Enter product price"
                            class="form__input">
                    </div>
                    <div class="form__column-block">
                        <label for="carbon_footprint" class="form__label">
                            Carbon Footprint <span class="form__required">*</span>
                        </label>
                        <input type="number" id="carbon_footprint" name="carbon_footprint"
                            placeholder="Enter carbon footprint" class="form__input">
                    </div>
                </div>
                <div class="form__column--inline">
                    <div class="form__column-block">
                        <label for="stoke" class="form__label">
                            Stoke <span class="form__required">*</span>
                        </label>
                        <input type="number" id="stoke" name="stoke" placeholder="Enter product stoke"
                            class="form__input">
                    </div>
                    <div class="form__column-block">
                        <label for="reward_points" class="form__label">
                            Rewards Points <span class="form__required">*</span>
                        </label>
                        <input type="number" id="reward_points" name="reward_points" placeholder="Enter rewards points"
                            class="form__input">
                    </div>
                </div>

                <button type="submit" class="form__submit">
                    <plusIcon />
                    Add Product
                </button>
            </fieldset>
        </form>
    </div>
</template>
<script>
import plusIcon from '../../icons/plusIcon.vue';
import uploadImageIcon from '../../icons/uploadImageIcon.vue'
export default {
    components: {
        plusIcon,
        uploadImageIcon
    }
}
</script>
<style scoped>
.addProducto {
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 150rem;
    height: auto;
}

.addProducto___title {
    font-size: var(--font-size-big);
    color: var(--text-color-title);
    padding: 4rem 0rem;
    text-align: left;
    font-weight: 600;
}

.form {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 2rem;
}

.form__column {
    display: flex;
    flex-direction: column;
    width: 50%;
    background-color: var(--primary-background-color);
    padding: 2rem 3rem;
    border-radius: 1.5rem;
    box-shadow: 0px 4px 24px 2px var(--box-shadow-color);

}

.form__column--inline {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    width: 100%;
}

.form__column-block {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.form__subtitle {
    font-size: var(--font-size-medium);
    color: var(--text-color-title);
    font-weight: 600;
    padding: 1rem 0 0 0;
}

.form__label {
    font-size: var(--font-size-small);
    font-weight: 500;
    padding: 1rem 0;
    color: var(--text-color-body);
    margin-top: 1rem;
}

.form__input-helps {
    margin-top: .5rem;
    padding-left: .5rem;
    font-size: var(--font-size-smallest);
    color: var(--help-color);
}

.toggle {
    cursor: pointer;
}

.form__required {
    color: var(--required-color);
}

.form__input,
.form__select,
.form__textarea {
    padding: 1rem;
    font-size: var(--font-size-small);
    background-color: var(--primary-background-color);
    color: var(--text-color-body);
    border-radius: .7rem;
    border: solid .1rem var(--border-color);
    outline: none;
}

.form__input::placeholder,
.form__textarea::placeholder,
.form__select::placeholder {
    color: var(--help-color);
}

.form__input:focus,
.form__select:focus,
.form__textarea:focus {
    border-color: var(--text-color-body);
}

.form__textarea {
    resize: vertical;
    max-height: 30rem;
    min-height: 10rem;
}

.form__submit {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    margin-top: 2rem;
    border-radius: .7rem;
    background-color: var(--primary-color);
    color: var(--text-color-base);
    font-size: var(--font-size-medium);
    cursor: pointer;
}

.form__images {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.form__image {
    width: 31%;
    height: 17rem;
    border: solid .1rem var(--border-color);
    border-radius: .7rem;
}

.form__image--border {
    border: dashed .1rem var(--primary-color);
}


.form__label--file {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    cursor: pointer;
}

.form__upload-text {
    width: 70%;
    color: var(--help-color);
    font-size: 1.2rem;
    line-height: 1.5rem;
    text-align: center;
}

.form__upload-text--bold {
    color: var(--primary-color);
}

.form__label--file .svg {
    width: 5rem;
    height: 5rem;
    color: var(--primary-color);
}

.form__input--file {
    display: none;
}
</style>