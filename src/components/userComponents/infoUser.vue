<template>
    <div class="info">
        <div class="userMainData">
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#62ab18"
                    class="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path fill-rule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>
            </div>
            <div class="data">
                <p class="name"> {{ username }} {{ paternalLastName }} {{ maternalLastName }} </p>
                <p class="email"> {{ email }} </p>
            </div>
        </div>
        <div class="userData">
            <!-- PRIMERA FILA -->
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#62ab18"
                    class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                    <path
                        d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
                </svg>
            </div>
            <div class="data">
                <p class="title">Personal Information</p>
                <p class="text">Identification information</p>
            </div>
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#62ab18"
                    class="bi bi-caret-right-fill" viewBox="0 0 20 20">
                    <path
                        d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
            </div>
            <!-- SEGUNDA FILA -->
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#62ab18"
                    class="bi bi-person-bounding-box" viewBox="0 0 16 16">
                    <path
                        d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                </svg>
            </div>
            <div class="data">
                <p class="title">Account Data</p>
                <p class="text">Data representing your account</p>
            </div>
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#62ab18"
                    class="bi bi-caret-right-fill" viewBox="0 0 20 20">
                    <path
                        d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
            </div>
            <!-- TERCERA FILA -->
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#62ab18" class="bi bi-fingerprint"
                    viewBox="0 0 16 16">
                    <path
                        d="M8.06 6.5a.5.5 0 0 1 .5.5v.776a11.5 11.5 0 0 1-.552 3.519l-1.331 4.14a.5.5 0 0 1-.952-.305l1.33-4.141a10.5 10.5 0 0 0 .504-3.213V7a.5.5 0 0 1 .5-.5Z" />
                    <path
                        d="M6.06 7a2 2 0 1 1 4 0 .5.5 0 1 1-1 0 1 1 0 1 0-2 0v.332q0 .613-.066 1.221A.5.5 0 0 1 6 8.447q.06-.555.06-1.115zm3.509 1a.5.5 0 0 1 .487.513 11.5 11.5 0 0 1-.587 3.339l-1.266 3.8a.5.5 0 0 1-.949-.317l1.267-3.8a10.5 10.5 0 0 0 .535-3.048A.5.5 0 0 1 9.569 8m-3.356 2.115a.5.5 0 0 1 .33.626L5.24 14.939a.5.5 0 1 1-.955-.296l1.303-4.199a.5.5 0 0 1 .625-.329" />
                    <path
                        d="M4.759 5.833A3.501 3.501 0 0 1 11.559 7a.5.5 0 0 1-1 0 2.5 2.5 0 0 0-4.857-.833.5.5 0 1 1-.943-.334m.3 1.67a.5.5 0 0 1 .449.546 10.7 10.7 0 0 1-.4 2.031l-1.222 4.072a.5.5 0 1 1-.958-.287L4.15 9.793a9.7 9.7 0 0 0 .363-1.842.5.5 0 0 1 .546-.449Zm6 .647a.5.5 0 0 1 .5.5c0 1.28-.213 2.552-.632 3.762l-1.09 3.145a.5.5 0 0 1-.944-.327l1.089-3.145c.382-1.105.578-2.266.578-3.435a.5.5 0 0 1 .5-.5Z" />
                    <path
                        d="M3.902 4.222a5 5 0 0 1 5.202-2.113.5.5 0 0 1-.208.979 4 4 0 0 0-4.163 1.69.5.5 0 0 1-.831-.556m6.72-.955a.5.5 0 0 1 .705-.052A4.99 4.99 0 0 1 13.059 7v1.5a.5.5 0 1 1-1 0V7a3.99 3.99 0 0 0-1.386-3.028.5.5 0 0 1-.051-.705M3.68 5.842a.5.5 0 0 1 .422.568q-.044.289-.044.59c0 .71-.1 1.417-.298 2.1l-1.14 3.923a.5.5 0 1 1-.96-.279L2.8 8.821A6.5 6.5 0 0 0 3.058 7q0-.375.054-.736a.5.5 0 0 1 .568-.422m8.882 3.66a.5.5 0 0 1 .456.54c-.084 1-.298 1.986-.64 2.934l-.744 2.068a.5.5 0 0 1-.941-.338l.745-2.07a10.5 10.5 0 0 0 .584-2.678.5.5 0 0 1 .54-.456" />
                    <path
                        d="M4.81 1.37A6.5 6.5 0 0 1 14.56 7a.5.5 0 1 1-1 0 5.5 5.5 0 0 0-8.25-4.765.5.5 0 0 1-.5-.865m-.89 1.257a.5.5 0 0 1 .04.706A5.48 5.48 0 0 0 2.56 7a.5.5 0 0 1-1 0c0-1.664.626-3.184 1.655-4.333a.5.5 0 0 1 .706-.04ZM1.915 8.02a.5.5 0 0 1 .346.616l-.779 2.767a.5.5 0 1 1-.962-.27l.778-2.767a.5.5 0 0 1 .617-.346m12.15.481a.5.5 0 0 1 .49.51c-.03 1.499-.161 3.025-.727 4.533l-.07.187a.5.5 0 0 1-.936-.351l.07-.187c.506-1.35.634-2.74.663-4.202a.5.5 0 0 1 .51-.49" />
                </svg>
            </div>
            <div class="data">
                <p class="title">Security</p>
                <p class="text">Set up your account security</p>
            </div>
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#62ab18"
                    class="bi bi-caret-right-fill" viewBox="0 0 20 20">
                    <path
                        d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
            </div>
            <!-- CUARTA FILA -->
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#62ab18" class="bi bi-geo-alt-fill"
                    viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>
            </div>
            <div class="data">
                <p class="title">Address</p>
                <p class="text">update or add delivery addresses</p>
            </div>
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#62ab18"
                    class="bi bi-caret-right-fill" viewBox="0 0 20 20">
                    <path
                        d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
            </div>
            <!-- QUINTA FILA -->
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#62ab18"
                    class="bi bi-shield-fill-check" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793z" />
                </svg>
            </div>
            <div class="data">
                <p class="title">Privacy</p>
                <p class="text">Privacy policy</p>
            </div>
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#62ab18"
                    class="bi bi-caret-right-fill" viewBox="0 0 20 20">
                    <path
                        d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
            </div>
            <!-- SEXTA FILA -->
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#62ab18"
                    class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                    <path
                        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                </svg>
            </div>
            <div class="data">
                <p class="title">TERMS AND CONDITIONS</p>
                <p class="text">TERMS AND CONDITIONS OF SERVICE / USE</p>
            </div>
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#62ab18"
                    class="bi bi-caret-right-fill" viewBox="0 0 20 20">
                    <path
                        d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'infoUserComponent',
    computed: {
        ...mapGetters(['username', 'paternalLastName', 'maternalLastName', 'email'])
    },
}
</script>

<style scoped>
.info {
    display: grid;
    grid-template-rows: 10% auto;
    width: 80%;
    justify-items: center;
    margin-top: 30px;
}

.userMainData {
    display: grid;
    grid-template-columns: 10% auto;
    width: 60%;
    border-radius: 10px;
    padding: 10px 20px;
    background: white;
    column-gap: 10px;
}

.userData {
    display: grid;
    margin-top: 30px;
    grid-template-columns: 5% auto 3%;
    grid-template-rows: repeat(6, 60px);
    row-gap: 20px;
    width: 60%;
    background: white;
    padding: 10px 20px;
    column-gap: 10px;
    border-radius: 10px;
    height: 460px;
}

.data {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.icon {
    margin: 0 auto;
}

.name {
    font-size: 20px;
    font-weight: 500;
}

.email {
    font-size: 18px;
    font-weight: 400;
    margin-top: 10px;
}

.title {
    font-size: 16px;
    font-weight: 500;
}

.text {

    font-size: 14px;
    font-weight: 400;
    margin-top: 5px;

}
</style>