<script setup>
    import {
        IonContent,
        IonHeader,
        IonPage,
        IonButtons,
        IonBackButton,
        IonTitle,
        IonToolbar,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonList,
        IonItem,
        IonLabel,
        onIonViewDidEnter,
    } from "@ionic/vue";
    import storage from '@/storage/storage.js';
    import {ref} from "vue";
    import moment from "moment";
    import {useRoute} from "vue-router";

    const existingSession = ref(null);
    const route = useRoute();

    onIonViewDidEnter(() => {
        const id = route.params.id;

        storage.getFromValue('id', id).then((session) => {
            existingSession.value = session;
        });
    });

    function formatTime(date) {
        return moment(date).format('hh:mm');
    }
</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>
                    {{ existingSession ? moment(existingSession.created_at).format('D MMMM YYYY @ hh:mm') : '' }}
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-card
                tyle="position: absolute; top: 50%; left: 0; transform: translateY(-50%); width: calc(100% - 32px);"
                v-if="existingSession"
            >
                <ion-card-header>
                    <ion-card-subtitle>
                        {{ moment(existingSession.created_at).format('D MMMM YYYY @ hh:mm') }}
                    </ion-card-subtitle>
                    <ion-card-title>{{ existingSession.registration }}</ion-card-title>
                </ion-card-header>
            </ion-card>
            <ion-list lines="full" v-if="existingSession">
                <ion-item>
                    <ion-label>
                        <h1>{{ formatTime(existingSession.start) }}</h1>
                        <p>Engine Start</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h1>{{ formatTime(existingSession.taxi) }}</h1>
                        <p>Taxi Started</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h1>{{ formatTime(existingSession.takeoff) }}</h1>
                        <p>Takeoff</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h1>{{ formatTime(existingSession.landed) }}</h1>
                        <p>Landed</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h1>{{ formatTime(existingSession.shutoff) }}</h1>
                        <p>Engine Shutoff</p>
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<style scoped>

</style>