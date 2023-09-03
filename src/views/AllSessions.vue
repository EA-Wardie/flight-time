<script setup>
    import {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonLabel, onIonViewWillEnter,
    } from '@ionic/vue';
    import storage from '@/storage/storage.js';
    import {ref} from "vue";
    import moment from "moment";

    const existingSessions = ref([]);

    onIonViewWillEnter(() => {
        storage.getAll().then((sessions) => {
            existingSessions.value = sessions;
        });
    });

    function getTimePassed(start, end) {
        const totalMinutes = moment(end).diff(start, 'minutes');
        const hours = totalMinutes / 60;
        const minutes = (totalMinutes % 60) * 60;

        return `${hours}h ${minutes}m`;
    }
</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>All Sessions</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-list lines="full">
                <ion-item
                    button
                    detail
                    :key="session.id"
                    :router-link="`/session-details/${session.id}`"
                    v-for="(session) in existingSessions.filter(({shutoff}) => shutoff !== null)"
                >
                    <ion-label>
                        <h3>{{ moment(session.created_at).format('D MMMM YYYY @ hh:mm') }}</h3>
                        <p>{{ session.registration }}</p>
                        <p>{{ getTimePassed(session.start, session.shutoff) }}</p>
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
