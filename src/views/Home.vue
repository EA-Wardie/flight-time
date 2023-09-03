<script setup>
    import {
        IonTabBar,
        IonTabButton,
        IonTabs,
        IonLabel,
        IonIcon,
        IonPage,
        IonRouterOutlet,
    } from '@ionic/vue';
    import {airplane, fileTrayFullOutline} from 'ionicons/icons';
</script>

<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom" style="height: 60px;">
                <ion-tab-button tab="new-session" href="/home/new-session">
                    <ion-icon aria-hidden="true" :icon="airplane"/>
                    <ion-label>New Session</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="all-sessions" href="/home/all-sessions">
                    <ion-icon aria-hidden="true" :icon="fileTrayFullOutline"/>
                    <ion-label>All Sessions</ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>
