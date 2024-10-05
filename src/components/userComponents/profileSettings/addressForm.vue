<template>
    <form class="form" @submit.prevent="handleSubmit">
        <div class="form__single-column">
            <label class="form__label" for="fullname">Full Name: <span class="form__required">*</span>
            </label>
            <input class="form__input" type="text" name="fullname" id="fullname" placeholder="Enter your full name"
                v-model="formData.nombre_completo">
            <div class="form__error" v-if="!$v.formData.nombre_completo.required && $v.formData.nombre_completo.$dirty">
                Full name is required</div>
            <div class="form__error"
                v-if="!($v.formData.nombre_completo.minLength && $v.formData.nombre_completo.maxLength) && $v.formData.nombre_completo.$dirty">
                Full name must be 10 to 255 characters long</div>
            <div class="form__error"
                v-if="!$v.formData.nombre_completo.hasLettersSpaces && $v.formData.nombre_completo.$dirty">Full name
                should only have letters and spaces</div>
        </div>
        <div class="form__single-column">
            <label class="form__label" for="cp">ZIP code: <span class="form__required">*</span> </label>
            <input class="form__input" type="text" name="cp" id="cp" placeholder="Enter your ZIP code here"
                v-model="formData.codigo_postal">
            <div class="form__error" v-if="!$v.formData.codigo_postal.required && $v.formData.codigo_postal.$dirty">
                ZIP
                code is
                required</div>
            <div class="form__error"
                v-if="!($v.formData.codigo_postal.minLength && $v.formData.codigo_postal.maxLength) && $v.formData.codigo_postal.$dirty">
                ZIP code must be 5 characters long</div>
            <div class="form__error"
                v-if="!$v.formData.codigo_postal.hasNumbersOnly && $v.formData.codigo_postal.$dirty">
                ZIP Code should only have numbers</div>
            <div>
                <label class="form__label" for="state">State: <span class="form__required">*</span> </label>
                <input class="form__input" type="text" name="state" id="state" placeholder="Enter here your state"
                    v-model="formData.estado">
                <div class="form__error" v-if="!$v.formData.estado.required && $v.formData.estado.$dirty">State is
                    required</div>
                <div class="form__error"
                    v-if="!($v.formData.estado.minLength && $v.formData.estado.maxLength) && $v.formData.estado.$dirty">
                    State must be 10 to 30 characters long</div>
                <div class="form__error" v-if="!$v.formData.estado.hasLettersSpaces && $v.formData.estado.$dirty">
                    State should only have letters and spaces</div>
            </div>
        </div>
        <div class="form__bi-column">
            <div>
                <label class="form__label" for="municipality">Municipality: <span class="form__required">*</span>
                </label>
                <input class="form__input" type="text" name="municipality" id="municipality"
                    placeholder="Enter here your municipality" v-model="formData.municipio">
                <div class="form__error" v-if="!$v.formData.municipio.required && $v.formData.municipio.$dirty">
                    Municipality
                    is required</div>
                <div class="form__error"
                    v-if="!($v.formData.municipio.minLength && $v.formData.municipio.maxLength) && $v.formData.municipio.$dirty">
                    Municipality must be 10 to 20 characters long</div>
                <div class="form__error" v-if="!$v.formData.municipio.hasLettersSpaces && $v.formData.municipio.$dirty">
                    Municipality should only have letters and spaces</div>
            </div>
            <div>
                <label class="form__label" for="colony">Colony: <span class="form__required">*</span> </label>
                <input class="form__input" type="text" name="colony" id="colony" placeholder="Enter here your colony"
                    v-model="formData.colonia">
                <div class="form__error" v-if="!$v.formData.colonia.required && $v.formData.colonia.$dirty">Colony is
                    required</div>
                <div class="form__error"
                    v-if="!($v.formData.colonia.minLength && $v.formData.colonia.maxLength) && $v.formData.colonia.$dirty">
                    Colony must be 10 to 50 characters long</div>
                <div class="form__error"
                    v-if="!$v.formData.colonia.hasLettersNumbersSpaces && $v.formData.colonia.$dirty">
                    Colony should only have letters, spaces and/or numbers</div>
            </div>
        </div>
        <div class="form__single-column">
            <label class="form__label" for="street">Street: <span class="form__required">*</span> </label>
            <input class="form__input" type="text" name="street" id="street" placeholder="Enter here your street"
                v-model="formData.calle">
            <div class="form__error" v-if="!$v.formData.calle.required && $v.formData.calle.$dirty">Street is
                required</div>
            <div class="form__error"
                v-if="!($v.formData.calle.minLength && $v.formData.calle.maxLength) && $v.formData.calle.$dirty">
                Street must be 10 to 30 characters long</div>
            <div class="form__error" v-if="!$v.formData.calle.hasLettersNumbersSpaces && $v.formData.calle.$dirty">
                Street should only have letters, spaces and/or numbers</div>
        </div>
        <div class="form__bi-column">
            <div>
                <label class="form__label" for="internal_number">Internal Number:</label>
                <input class="form__input" type="text" name="internal_number" id="internal_number"
                    placeholder="Enter here the internal number" v-model="formData.num_interior">
                <div class="form__error"
                    v-if="!($v.formData.num_interior.minLength && $v.formData.num_interior.maxLength) && $v.formData.num_interior.$dirty">
                    Internal Number must be 1 to 4 characters long</div>
                <div class="form__error"
                    v-if="!$v.formData.num_interior.hasLettersNumbersSpaces && $v.formData.num_interior.$dirty">
                    Internal Number should only have letters, spaces and/or numbers</div>
            </div>
            <div>
                <label class="form__label" for="external_number">External Number: <span class="form__required">*</span>
                </label>
                <input class="form__input" type="text" name="external_number" id="external_number"
                    placeholder="Enter here the external number" v-model="formData.num_exterior">
                <div class="form__error" v-if="!$v.formData.num_exterior.required && $v.formData.num_exterior.$dirty">
                    External number is required</div>
                <div class="form__error"
                    v-if="!($v.formData.num_exterior.minLength && $v.formData.num_exterior.maxLength) && $v.formData.num_exterior.$dirty">
                    External Number must be 1 to 4 characters long</div>
                <div class="form__error"
                    v-if="!$v.formData.num_exterior.hasLettersNumbersSpaces && $v.formData.num_exterior.$dirty">
                    External Number should only have letters, spaces and/or numbers</div>
            </div>
        </div>
        <div class="form__bi-column">
            <div>
                <label class="form__label" for="beetwen_street1">Between Street 1: <span class="form__required">*</span>
                </label>
                <input class="form__input" type="text" name="beetwen_street1" id="beetwen_street1"
                    placeholder="Enter here street 1" v-model="formData.entre_calle1">
                <div class="form__error" v-if="!$v.formData.entre_calle1.required && $v.formData.entre_calle1.$dirty">
                    Beetwen street 1 is required</div>
                <div class="form__error"
                    v-if="!($v.formData.entre_calle1.minLength && $v.formData.entre_calle1.maxLength) && $v.formData.entre_calle1.$dirty">
                    Beetwen street must be 1 to 100 characters long</div>
                <div class="form__error"
                    v-if="!$v.formData.entre_calle1.hasLettersNumbersSpaces && $v.formData.entre_calle1.$dirty">
                    Beetwen Street 1 should only have letters, spaces and/or numbers</div>
            </div>
            <div>
                <label class="form__label" for="beetwen_street2">Between Street 2: <span class="form__required">*</span>
                </label>
                <input class="form__input" type="text" name="beetwen_street2" id="beetwen_street2"
                    placeholder="Enter here street 2" v-model="formData.entre_calle2">
                <div class="form__error" v-if="!$v.formData.entre_calle2.required && $v.formData.entre_calle2.$dirty">
                    Beetwen street 2 is required</div>
                <div class="form__error"
                    v-if="!($v.formData.entre_calle2.minLength && $v.formData.entre_calle2.maxLength) && $v.formData.entre_calle2.$dirty">
                    Beetwen Street 2 must be 1 to 100 characters long</div>
                <div class="form__error"
                    v-if="!$v.formData.entre_calle2.hasLettersNumbersSpaces && $v.formData.entre_calle2.$dirty">
                    Beetwen Street 2 should only have letters, spaces and/or numbers</div>
            </div>
        </div>
        <div class="form__single-column">
            <label class="form__label" for="indications">Indications: <span class="form__required">*</span> </label>
            <input class="form__input" type="text" name="indications" id="indications"
                placeholder="Enter here the indications" v-model="formData.indicaciones">
            <div class="form__error" v-if="!$v.formData.indicaciones.required && $v.formData.indicaciones.$dirty">
                Indications
                is required</div>
            <div class="form__error"
                v-if="!$v.formData.indicaciones.hasLettersNumbersSpaces && $v.formData.indicaciones.$dirty">
                Indications should only have letters, spaces and/or numbers</div>
            <div class="form__error"
                v-if="!($v.formData.indicaciones.minLength && $v.formData.indicaciones.maxLength) && $v.formData.indicaciones.$dirty">
                Indications must be 10 to 255 characters long</div>
        </div>
        <div class="form__single-column">
            <label class="form__label" for="contact_phone">Contact Phone: <span class="form__required">*</span>
            </label>
            <input class="form__input" type="text" name="contact_phone" id="contact_phone"
                placeholder="Enter here your contact phone" v-model="formData.telefono_contacto">
            <div class="form__error"
                v-if="!$v.formData.telefono_contacto.required && $v.formData.telefono_contacto.$dirty">
                Contact
                Phone is required</div>
            <div class="form__error"
                v-if="!($v.formData.telefono_contacto.minLength && $v.formData.telefono_contacto.maxLength) && $v.formData.telefono_contacto.$dirty">
                Contact Phone must be 10 characters long</div>
            <div class="form__error"
                v-if="!$v.formData.telefono_contacto.hasNumbersOnly && $v.formData.telefono_contacto.$dirty">
                Contact Phone should only have numbers</div>
        </div>
        <div class="form__single-column">
            <label class="form__label" for="addressType">Address Type: <span class="form__required">*</span> </label>
            <select class="form__select" name="addressType" id="addressType" v-model="formData.tipo_direccion">
                <option value="" disabled selected>--Seleccione una opcion</option>
                <option value="Laboral">Laboral</option>
                <option value="Residencial">Residencial</option>
            </select>
            <div class="form__error" v-if="!$v.formData.tipo_direccion.required && $v.formData.tipo_direccion.$dirty">
                Address
                Type is required</div>
        </div>
        <button class="form__button">{{ isEditMode ? 'Update Address' : 'Add Address' }}</button>
    </form>
</template>
<script>
import { mapGetters } from 'vuex';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import { helpers } from 'vuelidate/lib/validators'
import Swal from 'sweetalert2';
import apiClient from '../../../store/auth-vuex';
const hasLettersNumbersSpaces = helpers.regex('hasLettersNumbersSpaces', /^[a-zA-Z0-9\s]+$/); //valida que la cadena solo contenga numeros, letras y espacios o que no contenga caracteres especiales
const hasLettersSpaces = helpers.regex('hasLettersSpaces', /^[a-zA-Z\s]+$/) //valida que la cadena solo contenga letras y espacios o que no contenga numeros ni caracteres especiales
const hasNumbersOnly = helpers.regex('hasNumbersOnly', /^[0-9]+$/) //valida que la cadena sea de numeros unicamente
export default {
    name: 'addressForm',
    computed: {
        ...mapGetters(['idUser'])
    },
    data() {
        return {
            formData: {
                nombre_completo: '', //nombre completo
                codigo_postal: '', //codigo postal
                estado: '', //estado
                municipio: '', //municipio
                colonia: '', //colonia
                calle: '', //calle
                num_exterior: '', //numero exterior
                num_interior: null, //numero interior
                entre_calle1: '', //entre calle 1
                entre_calle2: '', //entre calle 2
                indicaciones: '', //indicaciones
                telefono_contacto: '', //telefono de contacto
                tipo_direccion: '',
            },
            isEditMode: false,
        }
    },
    created() {
        const addressId = this.$route.params.addressId;

        if (addressId) {
            this.isEditMode = true;
            this.fetchAddress(addressId);
        }

    },
    validations: {
        formData: {
            nombre_completo: { required, minLength: minLength(10), maxLength: maxLength(255), hasLettersSpaces },
            codigo_postal: { required, minLength: minLength(5), maxLength: maxLength(5), hasNumbersOnly },
            estado: { required, minLength: minLength(3), maxLength: maxLength(30), hasLettersSpaces },
            municipio: { required, minLength: minLength(3), maxLength: maxLength(20), hasLettersSpaces },
            colonia: { required, minLength: minLength(5), maxLength: maxLength(50), hasLettersNumbersSpaces },
            calle: { required, minLength: minLength(5), maxLength: maxLength(30), hasLettersNumbersSpaces },
            num_exterior: { required, minLength: minLength(1), maxLength: maxLength(4), hasLettersNumbersSpaces },
            num_interior: { minLength: minLength(1), maxLength: maxLength(4), hasLettersNumbersSpaces },
            entre_calle1: { required, minLength: minLength(1), maxLength: maxLength(100), hasLettersNumbersSpaces },
            entre_calle2: { required, minLength: minLength(1), maxLength: maxLength(100), hasLettersNumbersSpaces },
            indicaciones: { required, minLength: minLength(10), maxLength: maxLength(255), hasLettersNumbersSpaces },
            telefono_contacto: { required, minLength: minLength(10), maxLength: maxLength(10), hasNumbersOnly },
            tipo_direccion: { required }
        }
    },
    methods: {
        async handleSubmit() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                Swal.fire({
                    icon: "warning",
                    text: "Error when registering, invalid data",
                    toast: true,
                    width: 'auto',
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                });
                return;
            }
            if (this.isEditMode) {
                this.updateAddress();
            } else {
                this.createAddress();
            }
        },
        async updateAddress() {
            this.$store.dispatch('setLoading', true);
            try {
                const idAddress = this.formData.id_direccion;
                await apiClient.put(`address/${idAddress}`, {
                    id_usuario: this.idUser,
                    nombre_completo: this.formData.nombre_completo,
                    codigo_postal: this.formData.codigo_postal,
                    estado: this.formData.estado,
                    municipio: this.formData.municipio,
                    colonia: this.formData.colonia,
                    calle: this.formData.calle,
                    num_exterior: this.formData.num_exterior,
                    num_interior: this.formData.num_interior,
                    entre_calle1: this.formData.entre_calle1,
                    entre_calle2: this.formData.entre_calle2,
                    tipo_direccion: this.formData.tipo_direccion,
                    indicaciones: this.formData.indicaciones,
                    telefono_contacto: this.formData.telefono_contacto
                })

                Swal.fire({
                    icon: "success",
                    text: "Successful address registration",
                    toast: true,
                    width: 'auto',
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                });
                this.$router.push('/user/address');
            } catch (error) {
                let errorMessage = 'Error updating address'
                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage += ': ' + error.response.data.message
                }
                Swal.fire({
                    icon: "warning",
                    text: errorMessage,
                    toast: true,
                    width: 'auto',
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            } finally {
                this.$store.dispatch('setLoading', false);
            }
        },
        async createAddress() {
            this.$store.dispatch('setLoading', true); //activa el loading
            try {
                await apiClient.post('/address/', {
                    id_usuario: this.idUser,
                    nombre_completo: this.formData.nombre_completo,
                    codigo_postal: this.formData.codigo_postal,
                    estado: this.formData.estado,
                    municipio: this.formData.municipio,
                    colonia: this.formData.colonia,
                    calle: this.formData.calle,
                    num_exterior: this.formData.num_exterior,
                    num_interior: this.formData.num_interior,
                    entre_calle1: this.formData.entre_calle1,
                    entre_calle2: this.formData.entre_calle2,
                    tipo_direccion: this.formData.tipo_direccion,
                    indicaciones: this.formData.indicaciones,
                    telefono_contacto: this.formData.telefono_contacto
                });

                Swal.fire({
                    icon: "success",
                    text: "Successful address registration",
                    toast: true,
                    width: 'auto',
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                });
                this.$router.push('/user/address');
            } catch (error) {
                let errorMessage = 'Error creating address '
                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage += ': ' + error.response.data.message
                }
                Swal.fire({
                    icon: "warning",
                    text: errorMessage,
                    toast: true,
                    width: 'auto',
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            } finally {
                this.$store.dispatch('setLoading', false);
            }

        },
        async fetchAddress(idAddress) {
            this.$store.dispatch('setLoading', true);  // Activar loader al inicio
            try {
                const response = await apiClient(`/address/${idAddress}`);
                this.formData = response.data;
            } catch (error) {
                let errorMessage = 'Error loading address' + error
                Swal.fire({
                    icon: "warning",
                    text: errorMessage,
                    toast: true,
                    width: 'auto',
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            } finally {
                this.$store.dispatch('setLoading', false);  // Desactivar loader al inicio
            }
        }
    }
}
</script>
<style scoped>
.form {
    margin-top: 1rem;
    font-size: 1.6rem;
}

.form__single-column,
.form__bi-column {
    padding: .3rem 0rem;
}

.form__label {
    display: block;
    margin-bottom: .5rem;
    color: var(--text-color-body);
}

.form__input,
.form__select {
    padding: .8rem;
    box-sizing: border-box;
    width: 100%;
    border: solid .1rem var(--primary-color);
    border-radius: .5rem;
    background-color: var(--tertiary-color);
    font-size: var(--text-color-base);
    margin-bottom: .5rem;
}

.form__input:focus {
    box-shadow: 0 0 .5rem rgba(98, 171, 24, 0.5);
    outline: none;
}

.form__required {
    color: var(--required-color);
}

.form__error {
    color: var(--error-color);
    padding: .3rem 0;
    font-size: 1.5rem;
}

.form__bi-column {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
}

@media (width <=390px) {
    .form__bi-column {
        display: grid;
        grid-template-columns: initial;
    }
}
</style>