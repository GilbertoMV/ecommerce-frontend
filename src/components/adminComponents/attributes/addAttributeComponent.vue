<template>
    <div class="addAttribute">
        <h1 class="addAttribute__title">Add Attribute</h1>
        <div class="adAttribute__container">
            <form @submit.prevent="handleSubmitAttribute" class="addAttribute__form">
                <div class="addAttribute__row">
                    <label for="name" class="addAttribute__label">Attribute Name <span
                            class="addAttribute__required">*</span></label>
                    <div class="addAttribute__inputs">
                        <input type="text" class="addAttribute__input" id="name" placeholder="Enter attribute name"
                            v-model="formData.name">
                    </div>
                </div>
                <div class="addAttribute__row">
                    <label for="value" class="addAttribute__label">Attribute type <span
                            class="addAttribute__required">*</span></label>
                    <div class="addAttribute__inputs">
                        <select class="addAttribute__select" id="value" v-model="formData.type" :disabled="isEditMode">
                            <option value="" selected disabled>-- Select an option</option>
                            <option value="color">Color</option>
                            <option value="size">Size</option>
                        </select>
                    </div>
                </div>
                <div class="addAttribute__row">
                    <div class="addAttribute__label"></div>
                    <div class="attribute__errors">
                        <span class="attribute__error" v-if="!$v.formData.name.required && $v.formData.name.$error">Name
                            attribute is required.</span>
                        <span class="attribute__error" v-if="!$v.formData.type.required && $v.formData.type.$error">Type
                            attribute is required.</span>
                        <span class="attribute__error" v-if="!$v.formData.name.minLength && $v.formData.name.$error">
                            Name attribute must be at least 1 character.
                        </span>
                        <span class="attribute__error" v-if="!$v.formData.name.maxLength && $v.formData.name.$error">
                            Name attribute cannot exceed 10 characters.
                        </span>
                    </div>

                    <div class="form__logs">
                        <div class="form__log" v-if="attributeState === 'loading'">
                            <tinyLoader />
                            <span>
                                {{ isEditMode ? 'Updating attribute' : 'Adding attribute.' }}
                            </span>
                        </div>
                        <div class="form__log" v-if="attributeState === 'success'">
                            <checkIcon />
                            <span>
                                {{ isEditMode ? 'Attribute updated successfully' : 'Attribute added successfully' }}
                            </span>
                        </div>
                        <div class="form__log" v-if="attributeState === 'error'">
                            <errorIcon />
                            <span>
                                {{ isEditMode ? 'Error when updating attribute' : 'Error when assigning attribute' }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="addAttribute__row">
                    <div class="addAttribute__label"></div>
                    <div class="addAttribute__button-container">
                        <button type="submit" class="addAttribute__button">
                            {{ isEditMode ? 'Update Attribute' : 'Add Attribute' }}</button>
                    </div>
                </div>

            </form>
        </div>
    </div>
</template>
<script>
import { maxLength, minLength, required } from 'vuelidate/lib/validators';
import { fetchSizes, fetchColors } from '../../../utils/apiUtils.js'
import Swal from 'sweetalert2';
import apiClient from '../../../store/auth-vuex.js';
import checkIcon from '../../icons/checkIcon.vue';
import errorIcon from '../../icons/errorIcon.vue';
import tinyLoader from '../../mainComponents/tinyLoaderComponent.vue';
export default {
    name: 'adAttributeComponent',
    components: {
        checkIcon,
        tinyLoader,
        errorIcon
    },
    data() {
        return {
            formData: {
                name: '',
                type: ''
            },
            attributeState: '',
            isEditMode: false,
            originalData: {}
        }
    },
    async created() {
        const attributeId = this.$route.params.attributeId;
        const type = this.$route.params.type;
        if (attributeId) {
            this.isEditMode = true
            if (type === 'size') {
                const sizeData = await fetchSizes(attributeId);

                this.formData.name = sizeData.nombre;
                this.formData.type = type;
                this.originalData = {
                    name: sizeData.nombre,
                    type: type
                }
            } else if (type === 'color') {
                const colorData = await fetchColors(attributeId);
                this.formData.name = colorData.nombre;
                this.formData.type = type;
                this.originalData = {
                    name: colorData.nombre,
                    type: type
                }
            }
        }
    },
    validations: {
        formData: {
            name: { required, minLength: minLength(1), maxLength: maxLength(10) },
            type: { required }
        }
    },
    methods: {
        async handleSubmitAttribute() {
            try {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    Swal.fire({
                        icon: "warning",
                        text: "Error when adding attribute, invalid data",
                        width: 'auto',
                        toast: true,
                        position: "bottom-right",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                    return;
                }
                if (this.isEditMode) {
                    if (this.isDataUnchanged()) {
                        Swal.fire({
                            icon: "info",
                            text: "No changes have been made",
                            width: 'auto',
                            toast: true,
                            position: "bottom-right",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                        });
                        return;
                    }
                    if (this.formData.type === 'color') {
                        this.attributeState = 'loading'
                        await this.updateAttributeColor()
                        this.attributeState = 'success'
                    } else if (this.formData.type === 'size') {
                        this.attributeState = 'loading'
                        await this.updateAttributeSize()
                        this.attributeState = 'success'
                    }
                    this.clearForm()
                    setTimeout(() => {
                        this.$router.push('/admin/all-attributes');
                    }, 3000);
                } else {
                    if (this.formData.type === 'color') {
                        this.attributeState = 'loading'
                        await this.createAttributeColor()
                        this.attributeState = 'success'
                    } else if (this.formData.type === 'size') {
                        this.attributeState = 'loading'
                        await this.createAttributeSize()
                        this.attributeState = 'success'
                    }
                    this.clearForm()
                }
            } catch (error) {
                console.error(error)
                this.attributeState = 'error'
            }
        },
        isDataUnchanged() {
            return this.formData.name === this.originalData.name && this.formData.type === this.originalData.type
        },
        async createAttributeColor() {
            try {
                await apiClient.post('/colors/', {
                    nombre: this.formData.name
                });
            } catch (error) {
                console.error(error)
            }
        },
        async createAttributeSize() {
            try {
                await apiClient.post('/sizes/', {
                    nombre: this.formData.name
                });
            } catch (error) {
                console.error(error)
            }
        },
        async updateAttributeColor() {
            const attributeId = this.$route.params.attributeId;
            await apiClient.put(`/colors/${attributeId}`, {
                nombre: this.formData.name
            })
        },
        async updateAttributeSize() {
            const attributeId = this.$route.params.attributeId;
            await apiClient.put(`/sizes/${attributeId}`, {
                nombre: this.formData.name
            })
        },
        clearForm() {
            this.formData.name = '';
            this.formData.type = '';
            setTimeout(() => {
                this.attributeState = '';
            }, 5000)
            this.$v.$reset();
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

.addAttribute__form {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.addAttribute__row {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    justify-content: start;
}

.addAttribute__row:nth-last-child(3) {
    margin-bottom: 0;
}

.addAttribute__label {
    width: 25rem;
    font-size: var(--font-size-small);
    color: var(--text-color-title);
}

.addAttribute__inputs {
    display: flex;
    width: calc(100% - 25rem);
}

.addAttribute__input,
.addAttribute__select {
    width: 100%;
}


.addAttribute__button:hover {
    background-color: var(--text-color-hover-buttons)
}
</style>
