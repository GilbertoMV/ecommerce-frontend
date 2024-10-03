<template>
    <div class="addAttribute">
        <h1 class="addAttribute__title">Add Attribute</h1>
        <div class="adAttribute__container">
            <form @submit.prevent="addAttribute" class="addAttribute__form">
                <div class="addAttribute__row">
                    <label for="name" class="addAttribute__label">Attribute Name <span
                            class="addAttribute__required">*</span></label>
                    <input type="text" class="addAttribute__input" id="name" placeholder="Enter attribute name"
                        v-model="formData.name" required>
                </div>
                <div class="addAttribute__row">
                    <label for="value" class="addAttribute__label">Attribute type <span
                            class="addAttribute__required">*</span></label>
                    <select class="addAttribute__select" id="value" v-model="formData.type" required>
                        <option value="" selected disabled>-- Select an option</option>
                        <option value="color">Color</option>
                        <option value="size">Size</option>
                    </select>
                </div>
                <div class="addAttribute__row">
                    <div class="addAttribute__label"></div>
                    <div class="attribute__errors">
                        <span class="attribute__error" v-if="!$v.formData.name.required && $v.formData.name.$error">Name
                            attribute is required.</span>
                        <span class="attribute__error" v-if="!$v.formData.type.required && $v.formData.type.$error">Type
                            attribute is required.</span>
                    </div>
                </div>
                <div class="addAttribute__row">
                    <div class="addAttribute__label"></div>
                    <div class="addAttribute__button-container">
                        <button type="submit" class="addAttribute__button">Save</button>
                    </div>
                </div>

            </form>
        </div>
    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators';
import Swal from 'sweetalert2';
import apiClient from '../../../store/auth-vuex.js';
export default {
    name: 'adAttributeComponent',
    data() {
        return {
            formData: {
                name: '',
                type: ''
            }
        }
    },
    validations: {
        formData: {
            name: { required },
            type: { required }
        }
    },
    methods: {
        async addAttribute() {

            this.$store.dispatch('setLoading', true);  // Activar loader al inicio
            this.$v.$touch();
            try {
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
                if (this.formData.type === 'color') {
                    this.createAttributeColor()
                } else if (this.formData.type === 'size') {
                    this.createAttributeSize()
                }
            } catch (error) {
                console.error(error)
            } finally {
                this.$store.dispatch('setLoading', false);  // Activar loader al inicio

            }

        },
        async createAttributeColor() {
            this.$store.dispatch('setLoading', true);  // Activar loader al inicio
            try {
                await apiClient.post('/colors/', {
                    nombre: this.formData.name
                });
                Swal.fire({
                    icon: "success",
                    text: "Successful attribute registration",
                    toast: true,
                    width: 'auto',
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                });
            } catch (e) {
                console.error(e)
            } finally {
                this.$store.dispatch('setLoading', false);  // Activar loader al inicio
            }
        },
        async createAttributeSize() {
            this.$store.dispatch('setLoading', true);  // Activar loader al inicio
            try {
                await apiClient.post('/sizes/', {
                    nombre: this.formData.name
                });
                Swal.fire({
                    icon: "success",
                    text: "Successful attribute registration",
                    toast: true,
                    width: 'auto',
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                });
            } catch (e) {
                console.error(e)
            } finally {
                this.$store.dispatch('setLoading', false);  // desactivar loader al inicio

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

.addAttribute__form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
}

.addAttribute__row {
    display: flex;
    align-items: center;
    justify-content: start;
}

.addAttribute__label {
    width: 25rem;
    font-size: var(--font-size-small);
    color: var(--text-color-title);
}

.addAttribute__input,
.addAttribute__select {
    width: calc(100% - 25rem)
}

.addAttribute__button:hover {
    background-color: var(--text-color-hover-buttons)
}
</style>
