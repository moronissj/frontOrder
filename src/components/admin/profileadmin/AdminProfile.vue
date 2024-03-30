<template>
  <div>
    <NabvarAdmin />
    <div class="container my-5">
      <div class="row">
        <div class="col-md-6">
          <div class="card profile-card">
            <div class="card-body">
              <div class="profile-header">
                <img
                  src="../../assets/buffe.PNG"
                  alt="pic"
                  class="profile-image"
                />
                <div>
                  <b-button size="lg">Cambiar foto</b-button>
                </div>

                <h3 class="profile-name">{{ "user.nombre" }}</h3>
                <p class="profile-title">Administrador</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card info-card">
            <div class="card-body">
              <h1 class="info-title">Información</h1>
              <p><strong>Email:</strong> info@example.com</p>
              <p><strong>Teléfono:</strong> 123 456 789</p>
              <p><strong>Número de seguridad:</strong> 123 456 789</p>
              <div>
                <AdminProfileModal />
                <b-button variant="danger" size="lg">Eliminar cuenta</b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NabvarAdmin from "../NavbarAdmin.vue";
import AdminProfileModal from "./AdminProfileModal.vue";
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}

.col-md-6 {
  display: flex;
  flex: 1;
  padding-right: 0;
  padding-left: 0;
}
.card {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-body {
  flex: 1;
}

.profile-card,
.info-card {
  min-height: 300px;
}
p {
  font-size: 1.25rem;
}

.profile-card {
  background: white;
  color: black;
  border: 3px solid #ea0505;
}

.profile-header {
  text-align: center;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.profile-name {
  margin-bottom: 0.25rem;
}

.btn {
  margin: 1rem;
}

.profile-title {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.info-card {
  background: #333;
  color: white;
  font-family: "Montserrat", sans-serif;
  text-align: center;
}

.info-title {
  margin-bottom: 1rem;
}

.projects {
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }

  .col-md-6 {
    flex-basis: 100%;
  }
}
</style>
