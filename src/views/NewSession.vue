<script setup>
    import {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonInput,
        IonButton,
        onIonViewWillEnter,
    } from '@ionic/vue';
    import {v4 as uuidv4} from 'uuid';
    import storage from '@/storage/storage.js';
    import {ref} from "vue";
    import moment from "moment";

    const show = ref(false);
    const registration = ref('');
    const newSession = ref({});

    let sessionsLength = '0';

    function getNow() {
        return moment();
    }

    onIonViewWillEnter(() => {
        storage.length().then((length) => {
            sessionsLength = length;

            storage.get((length - 1).toString()).then((session) => {
                const foundSession = JSON.parse(session);

                if (foundSession && foundSession.registration !== null) {
                    newSession.value = foundSession;
                } else {
                    newSession.value = {
                        id: uuidv4(),
                        registration: null,
                        start: null,
                        taxi: null,
                        takeoff: null,
                        land: null,
                        shutoff: null,
                        created_at: getNow(),
                    };
                }

                show.value = true;
            });
        });
    });

    function initNewSession() {
        registration.value = null;

        newSession.value = {
            id: uuidv4(),
            registration: null,
            start: null,
            taxi: null,
            takeoff: null,
            land: null,
            shutoff: null,
            created_at: getNow(),
        };

        storage.length().then((length) => {
            sessionsLength = length;
            storage.set(sessionsLength.toString(), JSON.stringify(newSession.value));
        });
    }

    function startSession() {
        newSession.value.registration = registration.value;
        storage.set((sessionsLength).toString(), JSON.stringify(newSession.value));
    }

    function engineStart() {
        newSession.value.start = getNow();
        storage.set((sessionsLength - 1).toString(), JSON.stringify(newSession.value));
    }

    function taxiStart() {
        newSession.value.taxi = getNow();
        storage.set((sessionsLength - 1).toString(), JSON.stringify(newSession.value));
    }

    function takeoff() {
        newSession.value.takeoff = getNow();
        storage.set((sessionsLength - 1).toString(), JSON.stringify(newSession.value));
    }

    function landed() {
        newSession.value.land = getNow();
        storage.set((sessionsLength - 1).toString(), JSON.stringify(newSession.value));
    }

    function engineShutoff() {
        registration.value = null;
        newSession.value.shutoff = getNow();
        storage.set((sessionsLength - 1).toString(), JSON.stringify(newSession.value));
    }
</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Current Session</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" v-if="show">
            <ion-card
                style="position: absolute; top: 50%; left: 0; transform: translateY(-50%); width: calc(100% - 32px);"
                v-if="newSession.registration === null"
            >
                <ion-card-header>
                    <ion-card-title>New Session</ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <ion-input
                        label="Registration"
                        placeholder="ZS-TBC"
                        v-model="registration"
                    ></ion-input>

                    <ion-button
                        style="width: 100%; margin-top: 20px;"
                        :disabled="!show || !registration"
                        @click="startSession"
                    >Start
                    </ion-button>
                </ion-card-content>
            </ion-card>
            <ion-card
                style="position: absolute; top: 50%; left: 0; transform: translateY(-50%); width: calc(100% - 32px);"
                v-else-if="newSession.start === null"
            >
                <ion-card-header>
                    <ion-card-title>Engine Start</ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <ion-button
                        style="width: 100%; margin-top: 20px;"
                        @click="engineStart"
                    >Engine Start
                    </ion-button>
                </ion-card-content>
            </ion-card>
            <ion-card
                style="position: absolute; top: 50%; left: 0; transform: translateY(-50%); width: calc(100% - 32px);"
                v-else-if="newSession.taxi === null"
            >
                <ion-card-header>
                    <ion-card-title>Taxi Start</ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <ion-button
                        style="width: 100%; margin-top: 20px;"
                        @click="taxiStart"
                    >Taxi Start
                    </ion-button>
                </ion-card-content>
            </ion-card>
            <ion-card
                style="position: absolute; top: 50%; left: 0; transform: translateY(-50%); width: calc(100% - 32px);"
                v-else-if="newSession.takeoff === null"
            >
                <ion-card-header>
                    <ion-card-title>Takeoff Start</ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <ion-button
                        style="width: 100%; margin-top: 20px;"
                        @click="takeoff"
                    >Takeoff Start
                    </ion-button>
                </ion-card-content>
            </ion-card>
            <ion-card
                style="position: absolute; top: 50%; left: 0; transform: translateY(-50%); width: calc(100% - 32px);"
                v-else-if="newSession.land === null"
            >
                <ion-card-header>
                    <ion-card-title>Landed</ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <ion-button
                        style="width: 100%; margin-top: 20px;"
                        @click="landed"
                    >Landed
                    </ion-button>
                </ion-card-content>
            </ion-card>
            <ion-card
                style="position: absolute; top: 50%; left: 0; transform: translateY(-50%); width: calc(100% - 32px);"
                v-else-if="newSession.shutoff === null"
            >
                <ion-card-header>
                    <ion-card-title>Engine Shutoff</ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <ion-button
                        style="width: 100%; margin-top: 20px;"
                        @click="engineShutoff"
                    >Engine Shutoff
                    </ion-button>
                </ion-card-content>
            </ion-card>
            <ion-card
                style="position: absolute; top: 50%; left: 0; transform: translateY(-50%); width: calc(100% - 32px);"
                v-else
            >
                <ion-card-header>
                    <ion-card-subtitle>{{
                            moment(newSession.created_at).format('D MMMM YYYY @ hh:mm')
                        }}
                    </ion-card-subtitle>
                    <ion-card-title>Last Session</ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <ion-button
                        style="width: 100%; margin-top: 20px;"
                        @click="initNewSession"
                    >Start New Session
                    </ion-button>
                    <ion-button
                        style="width: 100%;"
                        color="dark"
                        fill="outline"
                        :router-link="`/session-details/${newSession.id}`"
                    >See Details
                    </ion-button>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>
