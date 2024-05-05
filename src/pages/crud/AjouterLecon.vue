<template>
    <div class="row">
        <div class="large-12 medium-12 small-12 cell">
            <form @submit="upload">                
                <label>Files
                    <input type="file" id="files" ref="files" v-on:change="handleFilesUpload()" multiple/>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
        <h1>Ajouter un nouveau titre</h1>
        <!-- Form for creating a new Chapitre -->
        <form @submit="submitForm">
            <input type="file" multiple name="photos">
            <input type="text" class="form-control" value="TEST" v-model="titre" placeholder="Titre" required />
            <div v-for="(item, index) in items" :key="index">
                <input type="text" class="form-control" v-model="item.paragraphe" placeholder="Paragraphe" required />
                <input type="file" class="form-control" @change="e => { handleFileChange(index, e) }" required />
            </div>
            <base-button slot="footer" type="primary" @click="addItem" fill>Add Item</base-button>
            <button slot="footer" type="submit" fill>Save</button>
        </form>
    </div>
</template>
<script>
import axios from "axios";
import { API_URL } from '../../variable/variable.ts';
export default {
    name: "AjouterLecon",
    data() {
        return {
            chapitre: JSON.parse(localStorage.getItem("currentChapitre")),
            titre: '',
            items: [{ paragraphe: '', photo_paragraphe: null }],
            photos: [],
            files: []
        }
    },
    methods: {
        upload(event){
            event.preventDefault();
            console.log("event ", event.target[0]);
            let formData = new FormData();
            formData.append("file", event.target.files[0]);
            console.log("d", formData.get("file"));
            axios.post(API_URL + '/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log('Upload successful');
            }).catch(error => {
                console.error('Upload failed', error);
            });
        },
        handleFilesUpload() {
            this.files = this.$refs.files.files;
        },
        submitFiles() {
            let formData = new FormData();
            formData.append("file", this.files)
            console.log("d", formData.get("file"));
            axios.post(API_URL + '/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log('Upload successful');
            }).catch(error => {
                console.error('Upload failed', error);
            });
        },
        handleFileChange(index, event) {
            const fileInput = event.target;
            const file = fileInput.files[0];
            this.photos.push(file)
            if (file) {
                console.log("files ", file);
                this.$set(this.items[index], 'photo_paragraphe', file);
            }
            console.log("photo ", this.photos)
        },
        addItem() {
            this.items.push({ paragraphe: '', photo_paragraphe: '' });
        },
        async submitForm(event) {
            event.preventDefault();
            console.log(event.target[0].value)
            try {
                const formData = new FormData();
                formData.append('titre', this.titre);
                formData.append('items', JSON.stringify(this.items));
                formData.append('idChapitre', this.chapitre.idChapitre);

                // Ajouter les fichiers à formData
                this.photos.forEach((photo, index) => {
                    formData.append(`photos[${index}]`, photo);
                });

                // Envoyer les données au serveur
                await axios.post(API_URL + '/chapitres/titre', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                // Nettoyer les champs après soumission
                this.titre = '';
                this.items = [{ paragraphe: '', photo_paragraphe: '' }];
            } catch (error) {
                console.error('Erreur lors de la soumission:', error);
            }
        }

    }
}
</script>
<style scoped>
.centerDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}
</style>
