<template>
  <div style="height: 100%">
    <NavbarClient></NavbarClient>
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
                  :src="profileInfo.userProfilePicUrl"
                  alt="pic"
                  class="profile-image"
                />
                <div>
                  <UserPhotoModal
                    :key="'modalEditPhoto_' + profileInfo.commonUserId"
                    :user="profileInfo"
                    @photoUpdated="fetchUserProfileInfo"
                    style="margin-bottom: 40px"
                  />
                </div>

                <h3 class="profile-name">
                  {{ profileInfo.userName }}
                  {{ profileInfo.userFirstLastName }}
                  {{ profileInfo.userSecondLastName }}
                </h3>
                <p class="profile-title">Usuario</p>
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
                <p><strong>Email:</strong> {{ profileInfo.userEmail }}</p>
                <p>
                  <strong>Teléfono:</strong> {{ profileInfo.userCellphone }}
                </p>
                <div>
                  <UserEditProfileModal
                    :key="'modalEdicion_' + profileInfo.commonUserId"
                    :user="profileInfo"
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
import NavbarClient from "../NavbarClient.vue";
import { useSecret } from "@/stores/key";
import UserPhotoModal from "./UserPhotoModal.vue";
import UserEditProfileModal from "./UserEditProfileModal.vue";

export default {
  name: "UserProfile",
  components: {
    NavbarClient,
    UserPhotoModal,
    UserEditProfileModal,
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
            this.profileInfo = this.decryptUserData(response.data);
          })
          .catch((error) => {
            console.error(
              "Hubo un error al obtener la informacion del usuario",
              error
            );
          });
      }
    },
    decryptUserData(item) {
      const fieldsToDecrypt = [
        "commonUserId",
        "userName",
        "userFirstLastName",
        "userSecondLastName",
        "userEmail",
        "userCellphone",
        "userProfilePicUrl",
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
