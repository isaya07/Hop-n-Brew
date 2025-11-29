<template>
  <div class="container">
    <div class="level">
      <div class="level-left">
        <h1 class="title">Profils</h1>
      </div>
      <div class="level-right">
        <Button type="primary" @click="createProfile">
          <i class="fas fa-plus"></i> &nbsp; Nouveau profil
        </Button>
      </div>
    </div>

    <div class="tabs">
      <ul>
        <li :class="{ 'is-active': activeTab === 'equipment' }" @click="activeTab = 'equipment'">
          <a>Équipements</a>
        </li>
        <li :class="{ 'is-active': activeTab === 'styles' }" @click="activeTab = 'styles'">
          <a>Styles</a>
        </li>
        <li :class="{ 'is-active': activeTab === 'fermentation' }" @click="activeTab = 'fermentation'">
          <a>Fermentation</a>
        </li>
        <li :class="{ 'is-active': activeTab === 'carbonation' }" @click="activeTab = 'carbonation'">
          <a>Carbonatation</a>
        </li>
        <li :class="{ 'is-active': activeTab === 'mash' }" @click="activeTab = 'mash'">
          <a>Empâtage</a>
        </li>
      </ul>
    </div>

    <!-- Tableau des équipements -->
    <div v-if="activeTab === 'equipment'" class="table-container">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Type</th>
            <th>Taille du lot (L)</th>
            <th>Taille ébullition (L)</th>
            <th>Longueur tuyau (m)</th>
            <th>Diamètre tuyau (cm)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="equipment in equipments" :key="equipment.id">
            <td>{{ equipment.name }}</td>
            <td>{{ equipment.type || '-' }}</td>
            <td>{{ equipment.batchSize || '-' }}</td>
            <td>{{ equipment.boilSize || '-' }}</td>
            <td>{{ equipment.tubingLength || '-' }}</td>
            <td>{{ equipment.tubingDiameter || '-' }}</td>
            <td>
              <Button size="small" type="light" @click="editProfile('equipment', equipment)">
                <i class="fas fa-edit"></i>
              </Button>
              <Button size="small" type="danger" @click="deleteProfile('equipment', equipment.id!)">
                <i class="fas fa-trash"></i>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tableau des styles -->
    <div v-if="activeTab === 'styles'" class="table-container">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Type</th>
            <th>OG Min</th>
            <th>OG Max</th>
            <th>FG Min</th>
            <th>FG Max</th>
            <th>IBU Min</th>
            <th>IBU Max</th>
            <th>Couleur Min (SRM)</th>
            <th>Couleur Max (SRM)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="style in styles" :key="style.id">
            <td>{{ style.name }}</td>
            <td>{{ style.category || '-' }}</td>
            <td>{{ style.type || '-' }}</td>
            <td>{{ style.ogMin || '-' }}</td>
            <td>{{ style.ogMax || '-' }}</td>
            <td>{{ style.fgMin || '-' }}</td>
            <td>{{ style.fgMax || '-' }}</td>
            <td>{{ style.ibuMin || '-' }}</td>
            <td>{{ style.ibuMax || '-' }}</td>
            <td>{{ style.colorSrmMin || '-' }}</td>
            <td>{{ style.colorSrmMax || '-' }}</td>
            <td>
              <Button size="small" type="light" @click="editProfile('style', style)">
                <i class="fas fa-edit"></i>
              </Button>
              <Button size="small" type="danger" @click="deleteProfile('style', style.id!)">
                <i class="fas fa-trash"></i>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tableau des fermentations -->
    <div v-if="activeTab === 'fermentation'" class="table-container">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Type</th>
            <th>Forme</th>
            <th>Atténuation</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fermentation in fermentations" :key="fermentation.id">
            <td>{{ fermentation.name }}</td>
            <td>{{ fermentation.description || '-' }}</td>
            <td>{{ fermentation.type || '-' }}</td>
            <td>{{ fermentation.form || '-' }}</td>
            <td>{{ fermentation.attenutation || '-' }}</td>
            <td>{{ fermentation.notes || '-' }}</td>
            <td>
              <Button size="small" type="light" @click="editProfile('fermentation', fermentation)">
                <i class="fas fa-edit"></i>
              </Button>
              <Button size="small" type="danger" @click="deleteProfile('fermentation', fermentation.id!)">
                <i class="fas fa-trash"></i>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tableau des carbonatations -->
    <div v-if="activeTab === 'carbonation'" class="table-container">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Type</th>
            <th>Quantité</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="carbonation in carbonations" :key="carbonation.id">
            <td>{{ carbonation.name }}</td>
            <td>{{ carbonation.type }}</td>
            <td>{{ carbonation.amount || '-' }}</td>
            <td>{{ carbonation.notes || '-' }}</td>
            <td>
              <Button size="small" type="light" @click="editProfile('carbonation', carbonation)">
                <i class="fas fa-edit"></i>
              </Button>
              <Button size="small" type="danger" @click="deleteProfile('carbonation', carbonation.id!)">
                <i class="fas fa-trash"></i>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tableau des empâtages -->
    <div v-if="activeTab === 'mash'" class="table-container">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Température grain (°C)</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mash in mashes" :key="mash.id">
            <td>{{ mash.name }}</td>
            <td>{{ mash.grainTemp || '-' }}</td>
            <td>{{ mash.notes || '-' }}</td>
            <td>
              <Button size="small" type="light" @click="editProfile('mash', mash)">
                <i class="fas fa-edit"></i>
              </Button>
              <Button size="small" type="danger" @click="deleteProfile('mash', mash.id!)">
                <i class="fas fa-trash"></i>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Message si aucune donnée -->
    <div v-if="currentProfiles.length === 0" class="has-text-centered">
      <p class="is-size-5">Aucun {{ activeTab }} trouvé</p>
      <p class="is-size-6 has-text-grey">Commencez par créer votre premier profil</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useProfilesStore } from '@/stores/profiles';
import { IProfile } from '@/lib/database';
import Button from '@/components/base/Button.vue';

const router = useRouter();
const authStore = useAuthStore();
const profilesStore = useProfilesStore();

const activeTab = ref('equipment');

// Adapter les profils pour correspondre aux propriétés attendues par le template
const equipments = computed(() => profilesStore.allEquipments.map(e => ({
  ...e.attributes,
  id: e.id,
  name: e.name,
  type: e.attributes?.type || e.type || null,
  batchSize: e.attributes?.batchSize || null,
  boilSize: e.attributes?.boilSize || null,
  tubingLength: e.attributes?.tubingLength || null,
  tubingDiameter: e.attributes?.tubingDiameter || null,
})));

const styles = computed(() => profilesStore.allStyles.map(s => ({
  ...s.attributes,
  id: s.id,
  name: s.name,
  category: s.attributes?.category || null,
 ogMin: s.attributes?.ogMin || null,
  ogMax: s.attributes?.ogMax || null,
  fgMin: s.attributes?.fgMin || null,
  fgMax: s.attributes?.fgMax || null,
  ibuMin: s.attributes?.ibuMin || null,
  ibuMax: s.attributes?.ibuMax || null,
  colorSrmMin: s.attributes?.colorSrmMin || null,
 colorSrmMax: s.attributes?.colorSrmMax || null,
})));

const fermentations = computed(() => profilesStore.allFermentations.map(f => ({
  ...f.attributes,
  id: f.id,
  name: f.name,
  description: f.attributes?.description || null,
  type: f.attributes?.type || null,
  form: f.attributes?.form || null,
  attenutation: f.attributes?.attenutation || null,
  notes: f.attributes?.notes || null,
})));

const carbonations = computed(() => profilesStore.allCarbonations.map(c => ({
  ...c.attributes,
  id: c.id,
  name: c.name,
  type: c.attributes?.type || c.type,
  amount: c.attributes?.amount || null,
  notes: c.attributes?.notes || null,
})));

const mashes = computed(() => profilesStore.allMashes.map(m => ({
  ...m.attributes,
 id: m.id,
  name: m.name,
  grainTemp: m.attributes?.grainTemp || null,
  notes: m.attributes?.notes || null,
})));

const currentProfiles = computed(() => {
  switch(activeTab.value) {
    case 'equipment': return equipments.value;
    case 'styles': return styles.value;
    case 'fermentation': return fermentations.value;
    case 'carbonation': return carbonations.value;
    case 'mash': return mashes.value;
    default: return [];
  }
});

onMounted(async () => {
  await profilesStore.fetchAllProfiles();
});

const createProfile = () => {
  router.push(`/profiles/new`);
};

const editProfile = (type: string, profile: any) => {
  router.push(`/profiles/${type}/${profile.id}`);
};

const deleteProfile = async (type: string, id: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce profil ?')) {
    let result;
    
    switch(type) {
      case 'equipment':
        result = await profilesStore.deleteEquipment(id);
        break;
      case 'styles':
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
        console.error('Type de profil inconnu:', type);
        return;
    }
    
    if (!result.success) {
      console.error('Erreur lors de la suppression du profil:', result.error);
    }
  }
};
</script>