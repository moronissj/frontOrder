<template>
  <div style="height: 100%">
    <NavbarAdmin></NavbarAdmin>
    <div
      class="container"
      style="
        height: 100vh;
        width: 100%;
        position: relative;
        top: -77px;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <div class="row" style="height: 60%; width: 100%">
        <div class="col-md-6">
          <div class="card profile-card" style="height: 100%">
            <div
              class="card-body"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <div class="profile-header">
                <img
                  :src="profileInfo.adminProfilePicUrl"
                  alt="pic"
                  class="profile-image"
                />
                <div>
                  <AdminPhotoModal
                    :key="'modalEditPhoto_' + profileInfo.adminId"
                    :admin="profileInfo"
                    @photoUpdated="fetchUserProfileInfo"
                    style="margin-bottom: 40px"
                  />
                </div>

                <h3 class="profile-name">
                  {{ profileInfo.adminName }}
                  {{ profileInfo.adminFirstLastName }}
                  {{ profileInfo.adminSecondLastName }}
                </h3>
                <p class="profile-title">Administrador</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card info-card" style="height: 100%">
            <div
              class="card-body"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <div class="content">
                <h1 class="info-title">Información</h1>
                <hr />
                <p><strong>Email:</strong> {{ profileInfo.adminEmail }}</p>
                <p>
                  <strong>Teléfono:</strong> {{ profileInfo.adminCellphone }}
                </p>
                <p>
                  <strong>Número de seguridad:</strong>
                  {{ profileInfo.adminSecurityNumber }}
                </p>
                <p>
                  <strong>Salario:</strong>
                  {{ profileInfo.adminSalary }}
                </p>
                <div>
                  <AdminEditProfileModal
                    :key="'modalEdicion_' + profileInfo.adminId"
                    :admin="profileInfo"
                    @actualizacionExitosa="fetchUserProfileInfo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarAdmin from "../NavbarAdmin.vue";
import AdminEditProfileModal from "./AdminEditProfileModal.vue";
import AdminPhotoModal from "./AdminPhotoModal.vue";
import { useSecret } from "@/stores/key";

export default {
  name: "AdminProfile",
  components: {
    NavbarAdmin,
    AdminEditProfileModal,
    AdminPhotoModal,
  },
  data() {
    return {
      key: "",
      profileInfo: {},
    };
  },
  methods: {
    fetchUserProfileInfo() {
      const secretStore = useSecret();
      this.key = secretStore.secretKey;

      const token = localStorage.getItem("token");
      if (token) {
        this.$http
          .get("api/accounts/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.profileInfo = this.decryptAdminData(response.data);
          })
          .catch((error) => {
            console.error(
              "Hubo un error al obtener la informacion del usuario",
              error
            );
          });
      }
    },
    decryptAdminData(item) {
      const fieldsToDecrypt = [
        "adminId",
        "adminName",
        "adminFirstLastName",
        "adminSecondLastName",
        "adminEmail",
        "adminCellphone",
        "adminSecurityNumber",
        "adminSalary",
        "adminProfilePicUrl",
      ];

      fieldsToDecrypt.forEach((field) => {
        item[field] = this.$encryptionService.decryptData(
          item[field],
          this.key
        );
      });

      return item;
    },
  },
  mounted() {
    const secretStore = useSecret();
    this.key = secretStore.secretKey;
    this.fetchUserProfileInfo();
  },
};
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
