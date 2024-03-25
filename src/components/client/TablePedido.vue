<script setup>

</script>

<template>
    <div class="table-container">
        <table class="table table-warning table-striped">
        <thead>
            <tr>
                <th scope="col">No.</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellidos</th>
                <th scope="col">Foto</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td><img src="../../assets/yop.jpg" alt="Foto de Mark" style="width: 70px; height: 50px;"/></td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td><img src="../../assets/yop.jpg" alt="Foto de Mark" style="width: 70px; height: 50px;"/></td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td><img src="../../assets/yop.jpg" alt="Foto de Mark" style="width: 70px; height: 50px;"/></td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td><img src="../../assets/yop.jpg" alt="Foto de Mark" style="width: 70px; height: 50px;"/></td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td><img src="../../assets/yop.jpg" alt="Foto de Mark" style="width: 70px; height: 50px;"/></td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td><img src="../../assets/yop.jpg" alt="Foto de Mark" style="width: 70px; height: 50px;"/></td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td><img src="../../assets/yop.jpg" alt="Foto de Mark" style="width: 70px; height: 50px;"/></td>
            </tr>
            
        </tbody>
    </table>
    </div>
    
    
</template>

<style>
.table-container {
    overflow-y: auto; /* Habilita el desbordamiento vertical si el contenido excede la altura máxima */
    max-height: 400px; /* Establece la altura máxima del contenedor (ajusta según necesidades) */
    border: solid 1px; /* Opcional: Agrega un borde al contenedor si lo deseas */
}

table {
    width: 100%; /* Asegura que la tabla ocupe todo el ancho del contenedor */
    border: solid 1px;
}
</style>
