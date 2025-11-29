<template>
  <div class="container">
    <div class="level">
      <div class="level-left">
        <h1 class="title">Profils</h1>
      </div>
      <div class="level-right">
        <Select
          v-model="selectedProfileType"
          :options="profileTypes"
          placeholder="Sélectionnez un type"
          size="large"
        />
      </div>
    </div>

    <!-- Formulaire d'ajout/édition de profil -->
    <div v-if="showAddProfileForm" class="modal is-active">
      <div class="modal-background" @click="showAddProfileForm = false"></div>
      <div class="modal-content">
        <Card :header="`Formulaire ${selectedProfileTypeLabel}`">
          <form @submit.prevent="handleProfileSubmit">
            <Input
              v-model="form.name"
              label="Nom du profil"
              placeholder="Ex: Style APA"
              icon="fas fa-tag"
              :error="errors.name"
            />
            
            <Select
              v-model="form.type"
              label="Type de profil"
              :options="profileTypes"
              :error="errors.type"
            />
            
            <Textarea
              v-model="form.attributes.description"
              label="Description"
              placeholder="Décrivez le profil..."
              :error="errors.description"
            />
            
            <div class="field is-grouped is-grouped-centered">
              <div class="control">
                <Button 
                  type="primary" 
                  :loading="loading"
                  :disabled="loading"
                >
                  <i class="fas fa-save"></i> &nbsp; Enregistrer
                </Button>
              </div>
              <div class="control">
                <Button 
                  type="light" 
                  @click="handleCancel"
                >
                  Annuler
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
      <button 
        class="modal-close is-large" 
        aria-label="close"
        @click="showAddProfileForm = false"
      ></button>
    </div>

    <!-- Liste des profils -->
    <div class="columns is-multiline">
      <div 
        v-for="profile in filteredProfiles" 
        :key="profile.id"
        class="column is-one-third"
      >
        <Card>
          <template #header>
            <div class="level">
              <div class="level-left">
                <span>{{ profile.name }}</span>
              </div>
              <div class="level-right">
                <Button size="small" type="light" @click="editProfile(profile)">
                  <i class="fas fa-edit"></i>
                </Button>
                <Button size="small" type="danger" @click="deleteProfile(profile.id!)">
                  <i class="fas fa-trash"></i>
                </Button>
              </div>
            </div>
          </template>
          
          <p><strong>Type:</strong> {{ profile.type }}</p>
          <p v-if="profile.attributes.description">{{ profile.attributes.description }}</p>
          <p v-else><em>Aucune description</em></p>
          
          <div class="tags">
            <span class="tag is-info">{{ profile.type }}</span>
            <span class="tag is-light">{{ formatDate(profile.createdAt) }}</span>
          </div>
        </Card>
      </div>
    </div>

    <!-- Message si aucun profil -->
    <div v-if="filteredProfiles.length === 0" class="has-text-centered">
      <p class="is-size-5">Aucun profil trouvé</p>
      <p class="is-size-6 has-text-grey">Commencez par ajouter vos premiers profils</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useProfilesStore } from '@/stores/profiles';
import { IProfile } from '@/lib/database';
import Card from '@/components/base/Card.vue';
import Input from '@/components/base/Input.vue';
import Select from '@/components/base/Select.vue';
import Textarea from '@/components/base/Textarea.vue';
import Button from '@/components/base/Button.vue';

const profilesStore = useProfilesStore();

const showAddProfileForm = ref(false);
const currentProfile = ref<IProfile | null>(null);
const loading = ref(false);
const errors = ref<Record<string, string>>({});
const selectedProfileType = ref('');

const form = ref({
  name: '',
  type: 'style' as 'style' | 'fermentation' | 'carbonation' | 'equipment' | 'mash',
  attributes: {
    description: ''
  }
});

const profileTypes = [
  { value: 'style', label: 'Style' },
  { value: 'fermentation', label: 'Fermentation' },
  { value: 'carbonation', label: 'Carbonation' },
  { value: 'equipment', label: 'Équipement' },
  { value: 'mash', label: 'Empâtage' }
];

onMounted(async () => {
  await profilesStore.fetchAllProfiles();
});

const profiles = computed(() => profilesStore.allProfiles);

const filteredProfiles = computed(() => {
  if (!selectedProfileType.value) {
    return profiles.value;
  }
  return profiles.value.filter((profile: IProfile) => profile.type === selectedProfileType.value);
});

const selectedProfileTypeLabel = computed(() => {
  const profileType = profileTypes.find(pt => pt.value === selectedProfileType.value);
  return profileType ? profileType.label : '';
});

const editProfile = (profile: IProfile) => {
  currentProfile.value = profile;
  form.value = {
    name: profile.name,
    type: profile.type,
    attributes: profile.attributes || { description: '' }
  };
  showAddProfileForm.value = true;
};

const deleteProfile = async (id: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce profil ?')) {
    // On suppose que le type de profil est connu pour déterminer quelle méthode de suppression utiliser
    // Pour l'instant, on va supposer qu'on ne sait pas quel type de profil est supprimé
    // On peut essayer de le déterminer à partir de la liste des profils ou enregistrer le type temporairement
    // Pour l'instant, on va faire une suppression générique
    const profileToDelete = profilesStore.allProfiles.find(p => p.id === id);
    let result;
    
    if (profileToDelete) {
      switch(profileToDelete.type) {
        case 'equipment':
          result = await profilesStore.deleteEquipment(id);
          break;
        case 'style':
          result = await profilesStore.deleteStyle(id);
          break;
        case 'fermentation':
          result = await profilesStore.deleteFermentation(id);
          break;
        case 'carbonation':
          result = await profilesStore.deleteCarbonation(id);
          break;
        case 'mash':
          result = await profilesStore.deleteMash(id);
          break;
        default:
          console.error('Type de profil inconnu');
          return;
      }
      
      if (!result.success) {
        console.error('Erreur lors de la suppression du profil:', result.error);
      }
    }
  }
};

const validate = (): boolean => {
  let isValid = true;
  errors.value = {};
  
  if (!form.value.name.trim()) {
    errors.value.name = 'Le nom est requis';
    isValid = false;
  }
  
  if (!form.value.type) {
    errors.value.type = 'Le type est requis';
    isValid = false;
  }
  
  return isValid;
};

const handleProfileSubmit = async () => {
  if (!validate()) return;
  
  loading.value = true;
  try {
    let result;
    
    if (currentProfile.value && currentProfile.value.id) {
      // Mise à jour
      switch(form.value.type) {
        case 'equipment':
          result = await profilesStore.updateEquipment(currentProfile.value.id, {
            ...form.value,
            attributes: form.value.attributes
          });
          break;
        case 'style':
          result = await profilesStore.updateStyle(currentProfile.value.id, {
            ...form.value,
            attributes: form.value.attributes
          });
          break;
        case 'fermentation':
          result = await profilesStore.updateFermentation(currentProfile.value.id, {
            ...form.value,
            attributes: form.value.attributes
          });
          break;
        case 'carbonation':
          result = await profilesStore.updateCarbonation(currentProfile.value.id, {
            ...form.value,
            attributes: form.value.attributes
          });
          break;
        case 'mash':
          result = await profilesStore.updateMash(currentProfile.value.id, {
            ...form.value,
            attributes: form.value.attributes
          });
          break;
        default:
          console.error('Type de profil inconnu');
          return;
      }
    } else {
      // Création
      switch(form.value.type) {
        case 'equipment':
          result = await profilesStore.createEquipment({
            ...form.value,
            type: 'equipment',
            attributes: form.value.attributes
          });
          break;
        case 'style':
          result = await profilesStore.createStyle({
            ...form.value,
            type: 'style',
            attributes: form.value.attributes
          });
          break;
        case 'fermentation':
          result = await profilesStore.createFermentation({
            ...form.value,
            type: 'fermentation',
            attributes: form.value.attributes
          });
          break;
        case 'carbonation':
          result = await profilesStore.createCarbonation({
            ...form.value,
            type: 'carbonation',
            attributes: form.value.attributes
          });
          break;
        case 'mash':
          result = await profilesStore.createMash({
            ...form.value,
            type: 'mash',
            attributes: form.value.attributes
          });
          break;
        default:
          console.error('Type de profil inconnu');
          return;
      }
    }
    
    if (result.success) {
      showAddProfileForm.value = false;
      currentProfile.value = null;
      form.value = {
        name: '',
        type: 'style' as 'style' | 'fermentation' | 'carbonation' | 'equipment' | 'mash',
        attributes: { description: '' }
      };
    } else {
      console.error('Erreur lors de l\'enregistrement du profil:', result.error);
    }
  } finally {
    loading.value = false;
  }
};

const handleCancel = () => {
  showAddProfileForm.value = false;
  currentProfile.value = null;
  form.value = {
    name: '',
    type: 'style' as 'style' | 'fermentation' | 'carbonation' | 'equipment' | 'mash',
    attributes: { description: '' }
  };
};

const formatDate = (date: Date | string) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};
</script>