<template>
  <div class="mash-list">
    <h2 class="title is-3">Profils de brassage</h2>
    
    <!-- Liste des profils de brassage -->
    <div class="box">
      <div class="level">
        <div class="level-left">
          <h3 class="title is-4">Profils existants</h3>
        </div>
        <div class="level-right">
          <button class="button is-primary" @click="showCreateForm = true">
            <span class="icon">
              <i class="fas fa-plus"></i>
            </span>
            <span>Créer un profil</span>
          </button>
        </div>
      </div>
      
      <div class="table-container" v-if="mashProfiles.length > 0">
        <table class="table is-fullwidth is-striped is-hoverable">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Température des grains</th>
              <th>Température de la cuve</th>
              <th>Étapes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="profile in mashProfiles" :key="profile.id">
              <td>{{ profile.name }}</td>
              <td>{{ profile.description }}</td>
              <td>{{ profile.grainTemp }} °C</td>
              <td>{{ profile.tunTemp }} °C</td>
              <td>{{ profile.mashSteps.length }}</td>
              <td>
                <div class="field has-addons">
                  <p class="control">
                    <button class="button is-info is-small" @click="editProfile(profile)">
                      <span class="icon is-small">
                        <i class="fas fa-edit"></i>
                      </span>
                    </button>
                  </p>
                  <p class="control">
                    <button class="button is-danger is-small" @click="deleteProfile(profile)">
                      <span class="icon is-small">
                        <i class="fas fa-trash"></i>
                      </span>
                    </button>
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-else class="has-text-centered py-6">
        <p class="is-size-5">Aucun profil de brassage trouvé</p>
        <p class="is-size-6 has-text-grey">Créez votre premier profil de brassage pour commencer</p>
      </div>
    </div>
  
    <!-- Formulaire de création/modification de profil -->
    <div class="modal" :class="{ 'is-active': showCreateForm || showEditForm }">
      <div class="modal-background" @click="closeForm"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            {{ showEditForm ? 'Modifier le profil de brassage' : 'Créer un profil de brassage' }}
          </p>
          <button class="delete" aria-label="close" @click="closeForm"></button>
        </header>
        <section class="modal-card-body">
          <form @submit.prevent="saveProfile">
            <div class="field">
              <label class="label">Nom du profil</label>
              <div class="control">
                <input 
                  class="input" 
                  type="text" 
                  v-model="currentProfile.name" 
                  placeholder="Nom du profil de brassage"
                  required
                >
              </div>
            </div>
            
            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <textarea 
                  class="textarea" 
                  v-model="currentProfile.description" 
                  placeholder="Description du profil de brassage"
                ></textarea>
              </div>
            </div>
          
            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Température des grains (°C)</label>
                  <div class="control">
                    <input 
                      class="input" 
                      type="number" 
                      step="0.1"
                      v-model.number="currentProfile.grainTemp" 
                      required
                    >
                  </div>
                </div>
              </div>
            
              <div class="column">
                <div class="field">
                  <label class="label">Température de la cuve (°C)</label>
                  <div class="control">
                    <input 
                      class="input" 
                      type="number" 
                      step="0.1"
                      v-model.number="currentProfile.tunTemp" 
                      required
                    >
                  </div>
                </div>
              </div>
            
            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Température de rinçage (°C)</label>
                  <div class="control">
                    <input 
                      class="input" 
                      type="number" 
                      step="0.1"
                      v-model.number="currentProfile.spargeTemp" 
                      required
                    >
                  </div>
                </div>
              </div>
            
              <div class="column">
                <div class="field">
                  <label class="label">pH de rinçage</label>
                  <div class="control">
                    <input 
                      class="input" 
                      type="number" 
                      step="0.01"
                      v-model.number="currentProfile.spargePh" 
                      required
                    >
                  </div>
                </div>
              </div>
            
            <div class="field">
              <label class="checkbox">
                <input 
                  type="checkbox" 
                  v-model="currentProfile.equipAdjust"
                >
                Ajustement de température pour l'équipement
              </label>
            </div>
            
            <div class="field">
              <label class="label">Notes</label>
              <div class="control">
                <textarea 
                  class="textarea" 
                  v-model="currentProfile.notes" 
                  placeholder="Notes supplémentaires sur le profil de brassage"
                ></textarea>
              </div>
            
            <!-- Gestion des étapes de brassage -->
            <div class="box mt-4">
              <h4 class="title is-5">Étapes de brassage</h4>
              
              <div class="content" v-if="currentProfile.mashSteps.length === 0">
                <p class="has-text-centered">Aucune étape de brassage configurée</p>
              </div>
              
              <div v-else>
                <div 
                  class="box mb-3" 
                  v-for="(step, index) in currentProfile.mashSteps" 
                  :key="step.id || index"
                >
                  <div class="level">
                    <div class="level-left">
                      <h5 class="title is-6">{{ step.name }} - {{ step.stepTemp }}°C pendant {{ step.stepTime }} min</h5>
                    </div>
                    <div class="level-right">
                      <button 
                        class="button is-danger is-small" 
                        @click="removeStep(index)"
                      >
                        <span class="icon is-small">
                          <i class="fas fa-trash"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                  
                  <div class="columns is-multiline is-mobile">
                    <div class="column is-half-mobile is-half-tablet is-one-third-desktop">
                      <p><strong>Type:</strong> {{ step.type }}</p>
                    </div>
                    <div class="column is-half-mobile is-half-tablet is-one-third-desktop">
                      <p><strong>Ordre:</strong> {{ step.order }}</p>
                    </div>
                    <div class="column is-half-mobile is-half-tablet is-one-third-desktop" v-if="step.rampTime">
                      <p><strong>Rampe:</strong> {{ step.rampTime }} min</p>
                    </div>
                    <div class="column is-half-mobile is-half-tablet is-one-third-desktop" v-if="step.endTemp">
                      <p><strong>Fin:</strong> {{ step.endTemp }}°C</p>
                    </div>
                  </div>
                  
                  <div v-if="step.descriptionStep">
                    <p><strong>Description:</strong> {{ step.descriptionStep }}</p>
                  </div>
                </div>
                
                <button 
                  class="button is-info" 
                  type="button" 
                  @click="showStepForm = true"
                >
                  <span class="icon">
                    <i class="fas fa-plus"></i>
                  </span>
                  <span>Ajouter une étape</span>
                </button>
              </div>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="saveProfile">
            <span class="icon">
              <i class="fas fa-save"></i>
            </span>
            <span>Enregistrer</span>
          </button>
          <button class="button" @click="closeForm">Annuler</button>
        </footer>
      </div>
    </div>
  
    <!-- Formulaire d'ajout d'étape -->
    <div class="modal" :class="{ 'is-active': showStepForm }">
      <div class="modal-background" @click="showStepForm = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Ajouter une étape de brassage</p>
          <button class="delete" aria-label="close" @click="showStepForm = false"></button>
        </header>
        <section class="modal-card-body">
          <form @submit.prevent="addStep">
            <div class="field">
              <label class="label">Nom de l'étape</label>
              <div class="control">
                <input 
                  class="input" 
                  type="text" 
                  v-model="currentStep.name" 
                  placeholder="Nom de l'étape"
                  required
                >
              </div>
            </div>
            
            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <textarea 
                  class="textarea" 
                  v-model="currentStep.description" 
                  placeholder="Description de l'étape"
                ></textarea>
              </div>
            </div>
          
            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Température (°C)</label>
                  <div class="control">
                    <input 
                      class="input" 
                      type="number" 
                      step="0.1"
                      v-model.number="currentStep.stepTemp" 
                      required
                    >
                  </div>
                </div>
              </div>
            
              <div class="column">
                <div class="field">
                  <label class="label">Durée (min)</label>
                  <div class="control">
                    <input 
                      class="input" 
                      type="number" 
                      v-model.number="currentStep.stepTime" 
                      required
                    >
                  </div>
                </div>
              </div>
            
            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Type d'étape</label>
                  <div class="control">
                    <div class="select is-fullwidth">
                      <select v-model="currentStep.type">
                        <option value="Infusion">Infusion</option>
                        <option value="Température">Température</option>
                        <option value="Saccharification">Saccharification</option>
                        <option value="Amyle">Amyle</option>
                        <option value="Protéine">Protéine</option>
                        <option value="Dextarine">Dextarine</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            
              <div class="column">
                <div class="field">
                  <label class="label">Temps de rampe (min)</label>
                  <div class="control">
                    <input 
                      class="input" 
                      type="number" 
                      v-model.number="currentStep.rampTime"
                    >
                  </div>
                </div>
              </div>
            </div>
            
            <div class="field">
              <label class="label">Description détaillée</label>
              <div class="control">
                <textarea 
                  class="textarea" 
                  v-model="currentStep.descriptionStep" 
                  placeholder="Description détaillée de l'étape"
                ></textarea>
              </div>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="addStep">
            <span class="icon">
              <i class="fas fa-plus"></i>
            </span>
            <span>Ajouter</span>
          </button>
          <button class="button" @click="showStepForm = false">Annuler</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MashProfile } from '@/lib/recipes/MashProfile';
import { MashStep } from '@/lib/recipes/MashStep';
import { useMashStore } from '@/stores/mash';

const showCreateForm = ref(false);
const showEditForm = ref(false);
const showStepForm = ref(false);

const currentProfile = ref(new MashProfile());
const currentStep = ref(new MashStep());

const mashStore = useMashStore();
const mashProfiles = ref<MashProfile[]>([]);

// Charger les profils de brassage
onMounted(async () => {
 // Charger les données depuis le store
  await mashStore.initialize();
  mashProfiles.value = mashStore.getAllMashProfiles;
});

const closeForm = () => {
  showCreateForm.value = false;
  showEditForm.value = false;
  currentProfile.value = new MashProfile();
};

const editProfile = (profile: MashProfile) => {
  currentProfile.value = new MashProfile(profile.toObject());
  showEditForm.value = true;
};

const deleteProfile = (profile: MashProfile) => {
  if (profile.id && confirm(`Êtes-vous sûr de vouloir supprimer le profil "${profile.name}" ?`)) {
    mashStore.deleteMashProfile(profile.id);
    mashProfiles.value = mashProfiles.value.filter(p => p.id !== profile.id);
  }
};

const saveProfile = async () => {
  if (showCreateForm.value) {
    // Créer un nouveau profil
    const newProfile = await mashStore.createMashProfile(currentProfile.value.toObject());
    mashProfiles.value.push(newProfile);
  } else if (showEditForm.value && currentProfile.value.id) {
    // Mettre à jour un profil existant
    const updatedProfile = await mashStore.updateMashProfile(currentProfile.value.id, currentProfile.value.toObject());
    const index = mashProfiles.value.findIndex(p => p.id === currentProfile.value.id);
    if (index !== -1) {
      mashProfiles.value[index] = updatedProfile;
    }
 }
  
  closeForm();
};

const addStep = () => {
  // Déterminer l'ordre de la nouvelle étape
  const order = currentProfile.value.mashSteps.length > 0 
    ? Math.max(...currentProfile.value.mashSteps.map(s => s.order)) + 1 
    : 0;
  
  currentStep.value.order = order;
 currentProfile.value.addStep(new MashStep(currentStep.value.toObject()));
  currentStep.value = new MashStep();
  showStepForm.value = false;
};

const removeStep = (index: number) => {
  currentProfile.value.mashSteps.splice(index, 1);
  // Reordonner les étapes
  currentProfile.value.mashSteps.forEach((step, i) => {
    step.order = i;
 });
};
</script>

<style scoped>
.mt-4 {
  margin-top: 1rem;
}

.mb-3 {
  margin-bottom: 0.75rem;
}

.py-6 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>