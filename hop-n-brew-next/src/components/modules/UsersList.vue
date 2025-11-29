<template>
  <div class="container">
    <div class="level">
      <div class="level-left">
        <h1 class="title">Utilisateurs</h1>
      </div>
      <div class="level-right">
        <Button type="primary" @click="createUser">
          <i class="fas fa-plus"></i> &nbsp; Nouvel utilisateur
        </Button>
      </div>
    </div>

    <!-- Barre de recherche -->
    <div class="field has-addons">
      <div class="control is-expanded">
        <input
          v-model="searchQuery"
          class="input"
          type="text"
          placeholder="Rechercher un utilisateur..."
        />
      </div>
      <div class="control">
        <Button type="light" @click="clearSearch">
          <i class="fas fa-times"></i>
        </Button>
      </div>
    </div>

    <!-- Filtres -->
    <div class="field is-grouped is-grouped-multiline">
      <div class="control">
        <div class="select">
          <select v-model="filterRole">
            <option value="">Tous les rôles</option>
            <option value="admin">Administrateur</option>
            <option value="brewer">Brasseur</option>
            <option value="viewer">Lecteur</option>
          </select>
        </div>
      </div>
      <div class="control">
        <div class="select">
          <select v-model="sortBy">
            <option value="username">Nom d'utilisateur</option>
            <option value="email">Email</option>
            <option value="dateCreated">Date de création</option>
            <option value="lastLogin">Dernière connexion</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Tableau des utilisateurs -->
    <div class="table-container">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Nom d'utilisateur</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Date de création</th>
            <th>Dernière connexion</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>
              <strong>{{ user.username }}</strong>
            </td>
            <td>{{ user.email }}</td>
            <td>
              <span 
                class="tag" 
                :class="{
                  'is-info': user.role === 'brewer',
                  'is-danger': user.role === 'admin',
                  'is-success': user.role === 'viewer'
                }"
              >
                {{ user.role }}
              </span>
            </td>
            <td>{{ formatDate(user.dateCreated) }}</td>
            <td>{{ user.lastLogin ? formatDate(user.lastLogin) : '-' }}</td>
            <td>
              <span 
                class="tag" 
                :class="{
                  'is-success': user.active,
                  'is-warning': !user.active
                }"
              >
                {{ user.active ? 'Actif' : 'Inactif' }}
              </span>
            </td>
            <td>
              <Button size="small" type="light" @click="viewUser(user.id!)">
                <i class="fas fa-eye"></i>
              </Button>
              <Button size="small" type="primary" @click="editUser(user.id!)">
                <i class="fas fa-edit"></i>
              </Button>
              <Button size="small" type="danger" @click="deleteUser(user.id!)">
                <i class="fas fa-trash"></i>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <nav class="pagination is-centered" role="navigation" aria-label="pagination">
      <a class="pagination-previous" @click="previousPage" :disabled="currentPage === 1">Précédent</a>
      <a class="pagination-next" @click="nextPage" :disabled="currentPage >= totalPages">Suivant</a>
      
      <ul class="pagination-list">
        <li v-for="page in pages" :key="page">
          <a 
            class="pagination-link" 
            :class="{ 'is-current': page === currentPage }"
            @click="goToPage(page)"
            v-if="page !== -1"
          >
            {{ page }}
          </a>
          <span class="pagination-ellipsis" v-else>&hellip;</span>
        </li>
      </ul>
    </nav>

    <!-- Message si aucun utilisateur -->
    <div v-if="filteredUsers.length === 0" class="has-text-centered">
      <p class="is-size-5">Aucun utilisateur trouvé</p>
      <p class="is-size-6 has-text-grey">Commencez par créer votre premier utilisateur</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUsersStore } from '@/stores/users';
import { IUser } from '@/lib/database';
import Button from '@/components/base/Button.vue';

const router = useRouter();
const authStore = useAuthStore();
const usersStore = useUsersStore();

const searchQuery = ref('');
const filterRole = ref<string>('');
const sortBy = ref('name');
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Adapter les utilisateurs pour correspondre aux propriétés attendues par le composant
const adaptedUsers = computed(() => {
  return usersStore.allUsers.map(user => ({
    ...user,
    username: user.name, // Utiliser name comme username
    role: 'brewer', // Valeur par défaut
    active: true, // Valeur par défaut
    dateCreated: user.createdAt?.toISOString(),
    lastLogin: user.updatedAt?.toISOString(),
  }));
});

const filteredUsers = computed(() => {
  let result = [...adaptedUsers.value];
  
  // Filtre par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(user =>
      user.username?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  }
  
  // Filtre par rôle
  if (filterRole.value) {
    result = result.filter(user => user.role === filterRole.value);
  }
  
  // Tri
  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'username':
        return (a.username || '').localeCompare(b.username || '');
      case 'email':
        return (a.email || '').localeCompare(b.email || '');
      case 'dateCreated':
        return new Date(b.dateCreated || '').getTime() - new Date(a.dateCreated || '').getTime();
      case 'lastLogin':
        return new Date(b.lastLogin || '').getTime() - new Date(a.lastLogin || '').getTime();
      default:
        return 0;
    }
 });
  
  return result;
});

const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / itemsPerPage.value);
});

const pages = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;
  
  if (totalPages.value <= maxVisiblePages) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
 } else {
    const startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1);
    
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push(-1); // Ellipsis
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    if (endPage < totalPages.value) {
      if (endPage < totalPages.value - 1) pages.push(-1); // Ellipsis
      pages.push(totalPages.value);
    }
  }
  
  return pages;
});

onMounted(async () => {
 await usersStore.fetchUsers();
});

const createUser = () => {
  router.push('/users/new');
};

const viewUser = (id: number) => {
  router.push(`/users/${id}`);
};

const editUser = (id: number) => {
  router.push(`/users/${id}/edit`);
};

const deleteUser = async (id: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    const result = await usersStore.deleteUser(id);
    if (!result.success) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', result.error);
    }
  }
};

const clearSearch = () => {
  searchQuery.value = '';
};

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR');
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (page: number) => {
  currentPage.value = page;
};

// Réinitialiser la pagination quand les filtres changent
watch([searchQuery, filterRole, sortBy], () => {
  currentPage.value = 1;
});
</script>