<template>
    <div class="addCategory">
        <h1 class="addCategory__title">Add Attribute</h1>
        <div class="adAttribute__container">
            <form @submit.prevent="addCategory" class="addCategory__form">
                <div class="addCategory__row"> <!--ROW NAME-->
                    <label for="name" class="addCategory__label">Category Name
                        <span class="addCategory__required">*</span></label>
                    <input type="text" class="addCategory__input" id="name" placeholder="Enter category name"
                        v-model="formData.name" required>
                </div>
                <div class="addCategory__row"> <!--ROW CATEGORY-->
                    <label for="name" class="addCategory__label">Category Description
                        <span class="addCategory__required">*</span></label>
                    <input type="text" class="addCategory__input" id="description"
                        placeholder="Enter category description" v-model="formData.description" required>
                </div>
                <div class="addCategory__row"> <!--ROW IMAGE-->
                    <h3 class="addCategory__label">Category Image <span class="addCategory__required">*</span></h3>
                    <div class="addCategory__image addCategory__image--border">
                        <label for="upload_images" class="addCategory__label--file">
                            <uploadImageIcon />
                            <span class="addCategory__upload-text">Drop your images here or select <span
                                    class="addCategory__upload-text--bold">click to browse</span></span>
                        </label>
                        <input type="file" accept="/image/*" id="upload_images" name="image"
                            class="addCategory__input addCategory__input--file">
                    </div>
                </div>
                <div class="addCategory__row"> <!--ROW LOGS ERROR-->
                    <div class="addCategory__label"></div>

                    <div class="attribute__errors">
                        <!-- <span class="attribute__error" v-if="!$v.formData.name.required && $v.formData.name.$error">Name -->
                        <!-- attribute is required.</span> -->
                    </div>
                </div>
                <div class="addCategory__row">
                    <div class="addCategory__label"></div>
                    <button type="submit" class="addCategory__button">Save</button>
                </div>

            </form>
        </div>
    </div>
</template>
<script>
import uploadImageIcon from '../../icons/uploadImageIcon.vue';
export default {
    name: 'addCategoryComponent',
    components: {
        uploadImageIcon
    },
    data() {
        return {
            formData: {
                name: '',
                description: '',
                image_url: ''
            }
        }
    }
}
</script>
<style scoped>
.adAttribute__container {
    margin: 3rem 0 3rem;
    background-color: var(--primary-background-color);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0px 4px 24px 2px var(--box-shadow-color);
}

.addCategory__form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
}

.addCategory__row {
    display: flex;
    align-items: center;
    justify-content: start;
}

.addCategory__label {
    width: 25rem;
    font-size: var(--font-size-small);
    color: var(--text-color-title);
}

.addCategory__input,
.addCategory__select,
.addCategory__image {
    width: calc(100% - 25rem)
}


.addCategory__button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 5rem;
    cursor: pointer;
    border: none;
    background-color: var(--primary-color);
    color: var(--text-color-base);
    font-size: var(--font-size-medium);
    border-radius: .7rem;
    transition: all .3s ease-in-out;
    text-decoration: none;
}

.addCategory__button:hover {
    background-color: var(--text-color-hover-buttons)
}

.addCategory__input--file {
    display: none;
}
</style>